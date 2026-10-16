import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.config.settings import get_settings
from app.routes import dataset, health, prediction
from app.services.leaf_validation import get_leaf_validator
from app.services.model_service import model_service

settings = get_settings()
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
logger = logging.getLogger("venation-api")

app = FastAPI(
    title=settings.app_name,
    description="Venation-aware multi-modal API for medicinal plant species recognition.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=settings.static_dir), name="static")
app.mount("/results", StaticFiles(directory=settings.results_dir), name="results")
if settings.dataset_dir.exists():
    app.mount("/dataset-images", StaticFiles(directory=settings.dataset_dir), name="dataset-images")

app.include_router(health.router)
app.include_router(prediction.router)
app.include_router(dataset.router)


@app.on_event("startup")
async def load_prediction_dependencies() -> None:
    # Fail fast when the required validator or threshold is missing or unusable.
    get_leaf_validator()
    # Load the default species model on startup so a missing dependency or an
    # incompatible checkpoint is visible in the backend log and /health before
    # the first uploaded image is classified.
    model = model_service.get_loaded_model(settings.default_model_name)
    if model.model is None:
        logger.error("Default model is unavailable: %s", model.load_error)
    else:
        logger.info("Loaded default model %s from %s", model.spec.label, model.path.name)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled error for %s", request.url.path)
    return JSONResponse(status_code=500, content={"detail": "Internal server error."})
