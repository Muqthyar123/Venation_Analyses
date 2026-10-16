"""Cached binary leaf-image validation used before species preprocessing."""

from functools import lru_cache
from pathlib import Path
import sys
from threading import RLock

import cv2
import numpy as np

from app.config.settings import get_settings

_inference_lock = RLock()


class LeafValidator:
    def __init__(self, model_path: Path, threshold_path: Path) -> None:
        if sys.version_info >= (3, 13):
            raise RuntimeError(
                "This backend's pinned NumPy 1.26.4 and TensorFlow 2.17.1 stack "
                "requires Python 3.11 or 3.12. Create a fresh Python 3.11/3.12 "
                "environment and reinstall requirements.txt."
            )
        if not model_path.is_file() or model_path.stat().st_size == 0:
            raise RuntimeError(f"Leaf validator model is missing or empty: {model_path.name}")
        if not threshold_path.is_file():
            raise RuntimeError(f"Leaf validation threshold is missing: {threshold_path.name}")
        try:
            threshold = float(threshold_path.read_text(encoding="utf-8").strip())
        except (OSError, ValueError) as exc:
            raise RuntimeError("Leaf validation threshold must contain one number from 0 to 1.") from exc
        if not 0 <= threshold <= 1:
            raise RuntimeError("Leaf validation threshold must be between 0 and 1.")

        try:
            from tensorflow.keras.models import load_model

            self.model = load_model(model_path, compile=False)
        except Exception as exc:
            raise RuntimeError(
                f"The saved leaf validator could not be loaded ({type(exc).__name__}: {exc}). "
                "Reinstall requirements.txt in the backend's Python 3.11/3.12 environment."
            ) from exc
        self.threshold = threshold
        shape = self.model.input_shape
        if isinstance(shape, list):
            raise RuntimeError("The saved leaf validator must have a single image input.")
        self.height = int(shape[1] or 224)
        self.width = int(shape[2] or 224)
        self.channels = int(shape[3] or 3)
        if self.channels != 3:
            raise RuntimeError("The saved leaf validator must accept three-channel RGB images.")

    def validate(self, image_bytes: bytes) -> tuple[bool, float]:
        raw = cv2.imdecode(np.frombuffer(image_bytes, dtype=np.uint8), cv2.IMREAD_COLOR)
        if raw is None:
            raise ValueError("Invalid or unreadable image file.")
        if raw.shape[0] * raw.shape[1] > 40_000_000:
            raise ValueError("Image dimensions are too large to process safely.")
        rgb = cv2.cvtColor(raw, cv2.COLOR_BGR2RGB)
        rgb = cv2.resize(rgb, (self.width, self.height), interpolation=cv2.INTER_LINEAR)
        # The saved Keras graph contains Rescaling(scale=1/127.5, offset=-1),
        # so it expects RGB float pixels in their original [0, 255] range.
        batch = np.expand_dims(rgb.astype(np.float32), axis=0)
        try:
            with _inference_lock:
                output = np.asarray(self.model.predict(batch, verbose=0), dtype=np.float32)
        except Exception as exc:
            raise RuntimeError("Leaf image validation failed.") from exc
        values = output.reshape(output.shape[0], -1)[0]
        if values.size == 1:
            probability = float(values[0])
        elif values.size == 2:
            probability = float(values[1])
        else:
            raise RuntimeError("The saved leaf validator must produce one or two class scores.")
        if not np.isfinite(probability):
            raise RuntimeError("The saved leaf validator produced an invalid probability.")
        # Two-value outputs can be logits; sigmoid and softmax model outputs are already
        # probabilities. Clamp only for numerical safety after normalizing logits.
        if probability < 0 or probability > 1:
            if values.size == 1:
                probability = float(1.0 / (1.0 + np.exp(-np.clip(probability, -80, 80))))
            else:
                shifted = values - np.max(values)
                probs = np.exp(shifted) / np.exp(shifted).sum()
                probability = float(probs[1])
        return probability >= self.threshold, min(1.0, max(0.0, probability))


@lru_cache(maxsize=1)
def get_leaf_validator() -> LeafValidator:
    settings = get_settings()
    return LeafValidator(
        settings.model_dir / "leaf_validator_best.keras",
        settings.model_dir / "leaf_threshold.txt",
    )
