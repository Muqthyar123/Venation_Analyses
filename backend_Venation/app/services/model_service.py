from dataclasses import dataclass
from pathlib import Path
import sys
from typing import Any

import numpy as np

from app.config.settings import get_settings
from app.services.metadata_service import class_names


@dataclass(frozen=True)
class ModelSpec:
    key: str
    label: str
    filename: str
    framework: str
    channels: int


AVAILABLE_MODELS: dict[str, ModelSpec] = {
    "venationnet": ModelSpec(
        key="venationnet",
        label="VenationNet",
        filename="best_venationnet_5ch.pth",
        framework="pytorch",
        channels=5,
    ),
    "dualstream": ModelSpec(
        key="dualstream",
        label="DualStream CNN",
        filename="dual_stream_best_weights.weights.h5",
        framework="tensorflow",
        channels=3,
    ),
    "hybridnet": ModelSpec(
        key="hybridnet",
        label="HybridNet-MSVD",
        filename="hybridnet_best.pth",
        framework="pytorch",
        channels=5,
    ),
    "resnet50": ModelSpec(
        key="resnet50",
        label="ResNet50",
        filename="resnet50_best_weights.weights.h5",
        framework="tensorflow",
        channels=3,
    ),
}


class ModelUnavailableError(RuntimeError):
    """Raised when the selected trained model cannot be used for inference."""


class LoadedModel:
    def __init__(self, spec: ModelSpec) -> None:
        self.settings = get_settings()
        self.spec = spec
        self.path = self.settings.model_dir / spec.filename
        self.model: Any | None = None
        self.backend = "unavailable"
        self.load_error: str | None = None
        self._load_model()

    def _load_model(self) -> None:
        if not self.path.exists():
            self.load_error = f"Model file not found: {self.path.name}"
            return

        if self._is_onedrive_placeholder():
            self.load_error = (
                f"{self.path.name} is a OneDrive online-only placeholder. "
                "Right-click the file in File Explorer and choose 'Always keep on this device', "
                "then restart the backend."
            )
            return

        if self.spec.framework == "tensorflow":
            self._load_tensorflow()
        elif self.spec.framework == "pytorch":
            self._load_pytorch()

    def _is_onedrive_placeholder(self) -> bool:
        if sys.platform != "win32":
            # Placeholder detection below is Windows-specific. On other systems,
            # continue to the framework loader and let it report any file issue.
            return False

        try:
            import ctypes

            FILE_ATTRIBUTE_OFFLINE = 0x1000
            FILE_ATTRIBUTE_RECALL_ON_OPEN = 0x40000
            FILE_ATTRIBUTE_RECALL_ON_DATA_ACCESS = 0x400000
            attrs = ctypes.windll.kernel32.GetFileAttributesW(str(self.path))
            cloud_only_attrs = (
                FILE_ATTRIBUTE_OFFLINE
                | FILE_ATTRIBUTE_RECALL_ON_OPEN
                | FILE_ATTRIBUTE_RECALL_ON_DATA_ACCESS
            )
            return attrs != -1 and bool(attrs & cloud_only_attrs)
        except Exception:
            return False

    def _load_tensorflow(self) -> None:
        # These .weights.h5 artifacts do not include a Keras model config.
        # Without the exact training architecture, loading weights into a guessed
        # network could produce convincing but incorrect class scores.
        self.load_error = (
            f"{self.path.name} contains weights only. Its matching Keras "
            "architecture is not present in this project."
        )

    def _load_pytorch(self) -> None:
        try:
            import torch

            loaded = torch.load(self.path, map_location="cpu", weights_only=True)
            if isinstance(loaded, dict):
                for state_key in ("state_dict", "model_state_dict", "model"):
                    candidate = loaded.get(state_key)
                    if isinstance(candidate, dict):
                        loaded = candidate
                        break
                if self.spec.key == "hybridnet":
                    from app.services.hybrid_model import HybridNetMSVD

                    self.model = HybridNetMSVD(num_classes=len(class_names()))
                    # Checkpoints saved by DataParallel prefix parameters with
                    # "module.". Normalize that common prefix before strict load.
                    if loaded and all(key.startswith("module.") for key in loaded):
                        loaded = {key.removeprefix("module."): value for key, value in loaded.items()}
                    self.model.load_state_dict(loaded)
                else:
                    self.model = None
                    self.backend = "unavailable"
                    self.load_error = (
                        f"{self.path.name} appears to be a PyTorch state_dict/checkpoint. "
                        "Provide the matching model class before loading this checkpoint."
                    )
                    return
            else:
                self.model = loaded

            if hasattr(self.model, "eval"):
                self.model.eval()
            self.backend = "pytorch"
        except Exception as exc:
            self.model = None
            self.backend = "unavailable"
            self.load_error = f"{self.path.name} could not be loaded by PyTorch. Details: {exc}"


class ModelService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.classes = class_names()
        self._cache: dict[str, LoadedModel] = {}

    def normalize_model_name(self, model_name: str | None) -> str:
        key = (model_name or self.settings.default_model_name).strip().lower()
        aliases = {
            "dual_stream": "dualstream",
            "dual-stream": "dualstream",
            "dual stream": "dualstream",
            "hybrid": "hybridnet",
            "hybridnet-msvd": "hybridnet",
            "venation": "venationnet",
            "resnet": "resnet50",
        }
        key = aliases.get(key, key)
        if key not in AVAILABLE_MODELS:
            valid = ", ".join(AVAILABLE_MODELS)
            raise ValueError(f"Invalid model selection '{model_name}'. Choose one of: {valid}.")
        return key

    def get_loaded_model(self, model_name: str | None) -> LoadedModel:
        key = self.normalize_model_name(model_name)
        if key not in self._cache:
            self._cache[key] = LoadedModel(AVAILABLE_MODELS[key])
        return self._cache[key]

    def model_status(self) -> list[dict]:
        statuses = []
        for key, spec in AVAILABLE_MODELS.items():
            loaded = self._cache.get(key)
            path = self.settings.model_dir / spec.filename
            statuses.append(
                {
                    "key": key,
                    "label": spec.label,
                    "framework": spec.framework,
                    "channels": spec.channels,
                    "filename": spec.filename,
                    "exists": path.exists(),
                    "loaded_backend": loaded.backend if loaded else "not_loaded",
                    "load_error": loaded.load_error if loaded else None,
                }
            )
        return statuses

    @staticmethod
    def _softmax(values: np.ndarray) -> np.ndarray:
        values = values.astype(np.float64)
        exp = np.exp(values - np.max(values))
        return exp / np.sum(exp)

    def predict(self, tensor: np.ndarray, model_name: str | None = None) -> tuple[str, float, dict]:
        loaded = self.get_loaded_model(model_name)
        if loaded.model is None:
            detail = loaded.load_error or f"{loaded.spec.label} is not available."
            raise ModelUnavailableError(
                f"Cannot predict with {loaded.spec.label}: {detail}"
            )

        if loaded.backend == "tensorflow":
            batch = np.expand_dims(tensor[:, :, : loaded.spec.channels], axis=0)
            raw = loaded.model.predict(batch, verbose=0)[0]
            probabilities = np.asarray(raw, dtype=np.float64).reshape(-1)
            if not np.all(np.isfinite(probabilities)):
                raise ModelUnavailableError(f"{loaded.spec.label} returned invalid scores.")
            # Keras classifiers may return either logits or probabilities.
            if np.any(probabilities < 0) or not np.isclose(probabilities.sum(), 1.0, atol=1e-3):
                probabilities = self._softmax(probabilities)
        elif loaded.backend == "pytorch":
            import torch

            batch = tensor[:, :, : loaded.spec.channels].transpose(2, 0, 1)
            with torch.no_grad():
                raw = loaded.model(torch.tensor(batch, dtype=torch.float32).unsqueeze(0))
                probabilities = torch.nn.functional.softmax(raw, dim=1).cpu().numpy()[0]

        if probabilities.size != len(self.classes):
            raise ModelUnavailableError(
                f"{loaded.spec.label} returned {probabilities.size} scores, but the "
                f"configured class list contains {len(self.classes)} species."
            )

        label_index = int(np.argmax(probabilities))
        return self.classes[label_index], float(probabilities[label_index]), self._metadata(loaded)

    @staticmethod
    def _metadata(loaded: LoadedModel) -> dict:
        return {
            "model_name": loaded.spec.key,
            "model_label": loaded.spec.label,
            "model_backend": loaded.backend,
            "model_file": loaded.spec.filename,
            "model_load_error": loaded.load_error,
        }


model_service = ModelService()
