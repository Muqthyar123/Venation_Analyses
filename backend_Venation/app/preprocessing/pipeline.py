from pathlib import Path
from uuid import uuid4

import cv2
import numpy as np

try:
    from skimage.filters import frangi
except Exception:  # pragma: no cover - optional enhancement
    frangi = None


def read_image_bytes(data: bytes) -> np.ndarray:
    buffer = np.frombuffer(data, dtype=np.uint8)
    image = cv2.imdecode(buffer, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Invalid or unreadable image file.")
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)


def extract_venation(enhanced_gray: np.ndarray) -> np.ndarray:
    if frangi is not None:
        vesselness = frangi(enhanced_gray / 255.0)
        return (255 * (vesselness - vesselness.min()) / (np.ptp(vesselness) + 1e-8)).astype(np.uint8)

    blurred = cv2.GaussianBlur(enhanced_gray, (3, 3), 0)
    blackhat = cv2.morphologyEx(
        blurred,
        cv2.MORPH_BLACKHAT,
        cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (17, 17)),
    )
    sobel_x = cv2.Sobel(blackhat, cv2.CV_32F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(blackhat, cv2.CV_32F, 0, 1, ksize=3)
    magnitude = cv2.magnitude(sobel_x, sobel_y)
    return cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)


def preprocess_image(data: bytes, output_dir: Path, input_size: int = 224) -> dict:
    output_dir.mkdir(parents=True, exist_ok=True)
    rgb = read_image_bytes(data)
    rgb = cv2.resize(rgb, (input_size, input_size), interpolation=cv2.INTER_AREA)
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)

    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)
    venation = extract_venation(enhanced)

    blurred = cv2.GaussianBlur(enhanced, (5, 5), 0)
    edges = cv2.Canny(blurred, threshold1=50, threshold2=150)

    stem = uuid4().hex
    rgb_path = output_dir / f"{stem}_rgb.jpg"
    venation_path = output_dir / f"{stem}_venation.jpg"
    edge_path = output_dir / f"{stem}_edge.jpg"

    cv2.imwrite(str(rgb_path), cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR), [int(cv2.IMWRITE_JPEG_QUALITY), 92])
    cv2.imwrite(str(venation_path), venation)
    cv2.imwrite(str(edge_path), edges)

    tensor_rgb = rgb.astype(np.float32) / 255.0
    tensor_venation = np.expand_dims(venation.astype(np.float32) / 255.0, axis=-1)
    tensor_edges = np.expand_dims(edges.astype(np.float32) / 255.0, axis=-1)

    return {
        "rgb": rgb,
        "tensor": tensor_rgb,
        "multi_modal_tensor": np.concatenate([tensor_rgb, tensor_venation, tensor_edges], axis=-1),
        "paths": {
            "rgb": rgb_path,
            "venation": venation_path,
            "edge": edge_path,
        },
    }
