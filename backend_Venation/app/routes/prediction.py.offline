from uuid import uuid4

from fastapi import APIRouter, BackgroundTasks, File, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse

from app.config.settings import get_settings
from app.models.schemas import BatchPredictionResponse, SinglePredictionResponse
from app.services.prediction_service import predict_image_bytes, predict_upload, read_upload, save_upload_copy
from app.services.progress_service import get_progress, set_progress
from app.utils.csv_export import write_prediction_csv
from app.utils.errors import validate_upload

router = APIRouter(tags=["prediction"])


@router.post("/predict-single", response_model=SinglePredictionResponse)
async def predict_single(
    image: UploadFile = File(...),
    model_name: str | None = Form(default=None),
) -> dict:
    return await predict_upload(image, model_name)


@router.post("/predict-multiple", response_model=BatchPredictionResponse)
async def predict_multiple(
    background_tasks: BackgroundTasks,
    images: list[UploadFile] = File(...),
    model_name: str | None = Form(default=None),
) -> dict:
    if not images:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload at least one image.")

    job_id = uuid4().hex
    set_progress(job_id, 0)
    rows = []
    total = len(images)
    for index, image in enumerate(images, start=1):
        validate_upload(image)
        data = await read_upload(image)
        background_tasks.add_task(save_upload_copy, image.filename, data)
        result = predict_image_bytes(data, model_name)
        row = {
            "filename": image.filename,
            "predicted_class": result["predicted_class"],
            "confidence": round(float(result["confidence_score"]), 6),
            "modelName": result["model_name"],
        }
        rows.append(row)
        set_progress(job_id, int(index / total * 100))

    settings = get_settings()
    csv_path = settings.results_dir / f"predictions_{job_id}.csv"
    write_prediction_csv(rows, csv_path)
    set_progress(job_id, 100, "completed")

    return {
        "results": [
            {
                **row,
                "imageName": row["filename"],
                "predictedClass": row["predicted_class"],
            }
            for row in rows
        ],
        "csv_url": f"/download-results/{csv_path.name}",
        "csvUrl": f"/download-results/{csv_path.name}",
        "job_id": job_id,
        "jobId": job_id,
        "model_name": rows[0]["modelName"],
        "model_label": result["model_label"],
        "model_backend": result["model_backend"],
    }


@router.get("/download-results/{filename}")
async def download_results(filename: str) -> FileResponse:
    settings = get_settings()
    path = settings.results_dir / filename
    if not path.exists() or path.suffix.lower() != ".csv":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CSV result file not found.")
    return FileResponse(path, media_type="text/csv", filename=filename)


@router.get("/progress/{job_id}")
async def prediction_progress(job_id: str) -> dict:
    return get_progress(job_id)
