from fastapi import APIRouter

from app.config.settings import get_settings
from app.services.model_service import model_service

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict:
    settings = get_settings()
    return {
        "status": "online",
        "app_name": settings.app_name,
        "default_model_name": settings.default_model_name,
        "dataset_dir_exists": settings.dataset_dir.exists(),
        "max_upload_size_mb": settings.max_upload_size_mb,
        "cors_origins": settings.cors_origins,
        "models": model_service.model_status(),
    }
