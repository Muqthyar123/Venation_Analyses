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
- PyTorch `.pth` trained model loading with explicit errors when a model cannot load
- RGB, CLAHE, Frangi venation, Gaussian blur, and Canny edge preprocessing
- CSV export for batch predictions
- Swagger docs at `/docs`

## Local Setup

Use Python **3.11 or 3.12**. The pinned NumPy 1.26.4 does not provide a Python 3.13
wheel, so pip may try a failing source build and leave TensorFlow incomplete.

```bash
cd backend_Venation
py -3.12 -m venv .venv
.venv\Scripts\python.exe -m pip install --upgrade pip
.venv\Scripts\python.exe -m pip install -r requirements.txt
copy .env.example .env
.venv\Scripts\python.exe run.py --reload
```

Use Python 3.11 if 3.12 is not installed. Run `py -0p` to check installed versions.
Always start the backend with the virtual environment's interpreter so the API uses
the installed PyTorch runtime.

Open `http://localhost:8000/docs`.

If port `8000` is already busy, the launcher prints the process ID that is using it. Stop that process, or run on another port:

```bash
python run.py --reload --port 8001
```

## Model Integration

Place the model files in `backend_Venation/trained_models`:

- HybridNet-MSVD: `hybridnet_best.pth`
- VenationNet: `best_venationnet_5ch.pth`
- DualStream CNN: `dual_stream_best_weights.weights.h5`
- ResNet50: `resnet50_best_weights.weights.h5`

HybridNet-MSVD is the default and its architecture is included. The other checkpoints
need their matching model architectures before they can run. The API reports an error
instead of returning a fabricated class when a model cannot load. If the project is in
OneDrive, right-click model files and choose **Always keep on this device**.

Expected input size is `224x224`. HybridNet-MSVD is the default and consumes normalized RGB plus generated venation and edge channels. The two `.weights.h5` files are weights-only artifacts; their matching Keras architectures are not included, so those options will report unavailable until their exact architectures are added.

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
