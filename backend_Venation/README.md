# Venation-Aware Plant Recognition Backend

FastAPI backend for **Venation-Aware Multi-Modal Deep Learning for Medicinal Plant Species Recognition**.

## Features

- `GET /health`
- `POST /predict-single`
- `POST /predict-multiple`
- `GET /download-results/{filename}`
- `GET /progress/{job_id}`
- `GET /dataset`
- `GET /plant/{name}`
- Static processed images at `/static/processed/...`
- Dataset image serving from `frontend/src/images` at `/dataset-images/...`
- TensorFlow `.h5` and PyTorch `.pth` model loading with deterministic fallback predictions
- RGB, CLAHE, Frangi venation, Gaussian blur, and Canny edge preprocessing
- CSV export for batch predictions
- Swagger docs at `/docs`

## Local Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python run.py --reload
```

Open `http://localhost:8000/docs`.

If port `8000` is already busy, the launcher prints the process ID that is using it. Stop that process, or run on another port:

```bash
python run.py --reload --port 8001
```

## Model Integration

Place a model in `backend/trained_models`:

- TensorFlow: `model.h5`
- PyTorch: `model.pth`

Or set `MODEL_PATH` in `.env`.

If the project is inside OneDrive, make sure `.pth` model files are stored locally. In File Explorer, right-click each `.pth` file in `backend/trained_models` and choose **Always keep on this device**. If OneDrive leaves the file as online-only, PyTorch may fail with `[Errno 22] Invalid argument` and the API will use fallback inference.

Expected input size is `224x224`. The service passes normalized RGB tensors to trained models and uses generated venation/edge channels for preprocessing output and fallback scoring.

## Example Response

```json
{
  "predicted_class": "Ocimum Tenuiflorum (Tulsi)",
  "confidence_score": 0.94,
  "processed_images": {
    "rgb": "/static/processed/example_rgb.jpg",
    "venation": "/static/processed/example_venation.jpg",
    "edge": "/static/processed/example_edge.jpg"
  },
  "medicinal_uses": ["Respiratory support", "Stress relief", "Immune support"],
  "description": "Tulsi is a sacred aromatic herb widely used in Ayurveda for respiratory and immune wellness."
}
```

## Frontend

The React frontend can call:

```env
VITE_API_URL=http://localhost:8000
```

CORS is enabled for `localhost:3000` and `localhost:5173`.

## Docker

```bash
cd backend
docker build -t venation-api .
docker run -p 8000:8000 venation-api
```

## Render or Railway

Use:

- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

Upload trained model files through persistent storage or set `MODEL_PATH` to a mounted path.
