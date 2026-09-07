from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status

from app.config.settings import get_settings
from app.preprocessing.pipeline import preprocess_image
from app.services.metadata_service import find_plant, plant_response, static_url
from app.services.model_service import model_service
from app.utils.errors import validate_upload, validate_upload_size


async def read_upload(file: UploadFile) -> bytes:
    validate_upload(file)
    data = await file.read()
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded image is empty.")
    validate_upload_size(data, get_settings().max_upload_size_mb)
    return data


def predict_image_bytes(data: bytes, model_name: str | None = None) -> dict:
    settings = get_settings()
    try:
        processed = preprocess_image(data, settings.static_dir / "processed", settings.input_size)
        predicted_class, confidence, model_meta = model_service.predict(
            processed["multi_modal_tensor"],
            model_name,
        )
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Prediction failed.") from exc

    plant = find_plant(predicted_class) or find_plant(predicted_class.split(" (")[0])
    details = plant_response(plant) if plant else {
        "scientific_name": predicted_class,
        "scientificName": predicted_class,
        "common_name": predicted_class,
        "name": predicted_class,
        "medicinal_uses": [],
        "uses": [],
        "description": "Plant metadata is not available for this predicted class.",
    }
    processed_urls = {key: static_url(Path(value)) for key, value in processed["paths"].items()}

    return {
        "predicted_class": predicted_class,
        "confidence_score": confidence,
        "processed_images": processed_urls,
        "medicinal_uses": details["medicinal_uses"],
        "description": details["description"],
        "scientific_name": details["scientific_name"],
        "common_name": details["common_name"],
        "name": details["common_name"],
        "scientificName": details["scientific_name"],
        "confidence": confidence,
        "uses": details["medicinal_uses"],
        **model_meta,
    }


async def predict_upload(file: UploadFile, model_name: str | None = None) -> dict:
    data = await read_upload(file)
    return predict_image_bytes(data, model_name)


async def save_upload_copy(filename: str | None, data: bytes) -> Path:
    settings = get_settings()
    suffix = Path(filename or "image.jpg").suffix.lower() or ".jpg"
    path = settings.upload_dir / f"{uuid4().hex}{suffix}"
    path.write_bytes(data)
    return path
