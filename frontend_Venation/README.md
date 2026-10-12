# VenaLeaf AI Frontend

React frontend for the venation-aware medicinal plant recognition project.

The app provides:

- Home, About, Dataset, Single Prediction, Multi Prediction, and Contact pages
- Dataset browsing with plant details, image download, and "Use for Prediction"
- Single-image prediction with model selection and processed image previews
- Multi-image batch prediction with CSV export
- Backend health indicator and dark/light theme support

## Tech Stack

- React 19
- TanStack Start and TanStack Router
- Vite
- Tailwind CSS v4
- Lucide React icons
- Sonner toast notifications

## Setup

```bash
cd frontend_Venation
npm install
```

Create or update `.env` if needed:

```env
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT_MS=60000
```

## Run Locally

```bash
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

On Windows PowerShell, if `npm run ...` is blocked by execution policy, use:

```bash
npm.cmd run dev
```

## Build

```bash
npm run build
```

Or on Windows PowerShell:

```bash
npm.cmd run build
```

## Backend Integration

The frontend calls the FastAPI backend configured by `VITE_API_URL`.

Important endpoints used by the app:

- `GET /health`
- `GET /dataset`
- `GET /plant/{name}`
- `GET /dataset-images/{image_path}`
- `GET /download-dataset-image/{image_path}`
- `POST /predict-single`
- `POST /predict-multiple`
- `GET /download-results/{filename}`

Dataset images come from the backend. If the backend is restarted after dataset or path changes, the Dataset page should show real image URLs and downloads should use the matching local file.

## Dataset Image Transfer

The Dataset page stores the selected plant image in browser local storage, then the Single Prediction page fetches it and converts it into a `File`.

The transfer logic accepts JPG, JPEG, and PNG images. If the backend does not provide a `download_url`, the frontend falls back to the visible dataset image URL.

Relevant files:

- `src/lib/api.ts`
- `src/lib/image-actions.ts`
- `src/routes/dataset.tsx`
- `src/routes/single.tsx`
- `src/routes/plant.$name.tsx`

## Project Structure

```text
src/
  assets/              Hero image assets
  components/          Navbar, Footer, upload, status, UI components
  hooks/               Theme and mobile hooks
  images/              Bundled fallback sample images
  lib/                 API client, image actions, mock data
  routes/              File-based app routes
  styles.css           Global styles and design tokens
```

## Troubleshooting

- If dataset downloads fetch an HTML page instead of an image, check that `VITE_API_URL` points to the backend and that `/dataset` returns non-empty `image` or `download_url` values.
- If the Dataset page still shows old/null image paths after backend changes, restart the backend process.
- If prediction upload from Dataset fails, clear browser local storage for the app and try again after refreshing.
- If model selection shows fallback backend, check the backend model files and dependencies.
