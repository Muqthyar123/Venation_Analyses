from pydantic import BaseModel, Field


class ProcessedImages(BaseModel):
    rgb: str
    venation: str
    edge: str


class SinglePredictionResponse(BaseModel):
    predicted_class: str
    confidence_score: float = Field(ge=0, le=1)
    processed_images: ProcessedImages
    medicinal_uses: list[str]
    description: str
    scientific_name: str
    common_name: str
    name: str
    scientificName: str
    confidence: float
    uses: list[str]
    model_name: str
    model_label: str
    model_backend: str
    model_file: str
    model_load_error: str | None = None


class BatchPredictionItem(BaseModel):
    filename: str
    predicted_class: str
    confidence: float
    imageName: str
    predictedClass: str
    modelName: str


class BatchPredictionResponse(BaseModel):
    results: list[BatchPredictionItem]
    csv_url: str
    csvUrl: str
    job_id: str
    jobId: str
    model_name: str
    model_label: str
    model_backend: str


class DatasetSample(BaseModel):
    id: str
    plant_name: str
    name: str
    scientific_name: str
    scientificName: str
    common_name: str
    medicinal_uses: list[str]
    uses: list[str]
    description: str
    image_path: str | None
    image: str | None
    download_url: str | None


class PlantDetails(BaseModel):
    scientific_name: str
    scientificName: str
    common_name: str
    name: str
    medicinal_uses: list[str]
    uses: list[str]
    description: str
    image_path: str | None = None
    image: str | None = None
    download_url: str | None = None
