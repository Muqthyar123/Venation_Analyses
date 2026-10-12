# VenaLeaf AI

Venation-aware medicinal plant recognition system with a FastAPI backend and a React/TanStack frontend.

The project supports dataset browsing, image download, single-image prediction, batch prediction, processed venation previews, and model selection across HybridNet-MSVD, VenationNet, DualStream CNN, and ResNet50.

## Repository Layout

```text
.
  backend_Venation/       FastAPI API, model loading, preprocessing, dataset serving
  frontend_Venation/      React/TanStack frontend
  docker-compose.yml      Container setup
```

## Dataset Location

The backend serves dataset images from:

```text
backend_Venation/app/dataset/Segmented Medicinal Leaf Images
```

Each plant should have its own folder, for example:

```text
backend_Venation/app/dataset/Segmented Medicinal Leaf Images/Amaranthus Viridis (Arive-Dantu)/AV-S-001.jpg
```

The backend exposes these images through:

- `/dataset-images/...` for display
- `/download-dataset-image/...` for downloads

Restart the backend after changing dataset folders, `.env`, or backend code.

## Backend Setup

```bash
cd backend_Venation
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python run.py --reload
```

Open:

```text
http://localhost:8000/docs
```

Useful endpoints:

- `GET /health`
- `GET /dataset`
- `GET /plant/{name}`
- `POST /predict-single`
- `POST /predict-multiple`
- `GET /download-results/{filename}`

## Frontend Setup

```bash
cd frontend_Venation
npm install
npm run dev
```

If PowerShell blocks `npm.ps1`, use:

```bash
npm.cmd run dev
```

Set the frontend API URL in `frontend_Venation/.env`:

```env
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT_MS=60000
```

## Model Files

Place trained models in:

```text
backend_Venation/trained_models
```

Expected files:

```text
best_venationnet_5ch.pth
dual_stream_best_weights.weights.h5
hybridnet_best.pth
resnet50_best_weights.weights.h5
```

If a model cannot be loaded, the backend may use deterministic fallback inference. For OneDrive folders, make sure model files are stored locally with "Always keep on this device".

## Common Workflow

1. Start the backend on `http://localhost:8000`.
2. Start the frontend on the Vite URL, usually `http://localhost:5173`.
3. Open Dataset to browse plants.
4. Use Details to view a plant image and metadata.
5. Use Download to save the selected dataset image.
6. Use for Prediction to send the selected image to Single Prediction.

## Troubleshooting

- Dataset image is blank: restart the backend and check that `/dataset` returns real `image` URLs.
- Download does not start: verify the backend is online and `/download-dataset-image/...` returns a JPG or PNG.
- "Selected dataset file is not a supported JPG or PNG image": the app likely fetched an HTML error page instead of an image. Check `VITE_API_URL`, backend status, and dataset URLs.
- Non-HybridNet model uses fallback: verify TensorFlow/PyTorch dependencies and that the matching model architecture/checkpoint can be loaded.
- PowerShell blocks npm: run `npm.cmd run dev` or `npm.cmd run build`.

## Build Checks

Frontend production build:

```bash
cd frontend_Venation
npm.cmd run build
```

Backend smoke check:

```bash
cd backend_Venation
python run.py --reload
```
