from pydantic import BaseModel, Field


class ProcessedImages(BaseModel):
    rgb: str
    venation: str
    edge: str


class SinglePredictionResponse(BaseModel):
    success: bool = True
    valid_leaf: bool = True
    leaf_probability: float | None = Field(default=None, ge=0, le=1)
    message: str | None = None
    predicted_class: str | None = None
    confidence_score: float | None = Field(default=None, ge=0, le=1)
    processed_images: ProcessedImages | None = None
    medicinal_uses: list[str] = Field(default_factory=list)
    description: str | None = None
    scientific_name: str | None = None
    common_name: str | None = None
    name: str | None = None
    scientificName: str | None = None
    confidence: float | None = None
    uses: list[str] = Field(default_factory=list)
    model_name: str | None = None
    model_label: str | None = None
    model_backend: str | None = None
    model_file: str | None = None
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
