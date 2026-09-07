import mimetypes

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

from app.config.settings import get_settings
from app.models.schemas import DatasetSample, PlantDetails
from app.services.dataset_service import IMAGE_EXTENSIONS
from app.services.dataset_service import dataset_samples, sample_image_download_url, sample_image_url
from app.services.metadata_service import find_plant, plant_response

router = APIRouter(tags=["dataset"])


@router.get("/dataset", response_model=list[DatasetSample])
async def dataset() -> list[dict]:
    return dataset_samples()


@router.get("/plant/{name}", response_model=PlantDetails)
async def plant_details(name: str) -> dict:
    plant = find_plant(name)
    if not plant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plant not found.")
    url = sample_image_url(plant["scientific_name"])
    download_url = sample_image_download_url(plant["scientific_name"]) or url
    return {
        **plant_response(plant),
        "image_path": url,
        "image": url,
        "download_url": download_url,
    }


@router.get("/download-dataset-image/{image_path:path}")
async def download_dataset_image(image_path: str) -> FileResponse:
    settings = get_settings()
    requested = (settings.dataset_dir / image_path).resolve()
    dataset_root = settings.dataset_dir.resolve()

    if not requested.is_file() or requested.suffix.lower() not in IMAGE_EXTENSIONS:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found.")

    try:
        requested.relative_to(dataset_root)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image path.")

    media_type = mimetypes.guess_type(requested.name)[0] or "application/octet-stream"
    return FileResponse(requested, media_type=media_type, filename=requested.name)
