import { mockBatchPrediction, mockSinglePrediction, plantSamples } from "./mock-data";

export const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const REQUEST_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 60000);

export type ModelName = "hybridnet" | "venationnet" | "dualstream" | "resnet50";

export const MODEL_OPTIONS: Array<{ value: ModelName; label: string }> = [
  { value: "hybridnet", label: "HybridNet-MSVD" },
  { value: "venationnet", label: "VenationNet" },
  { value: "dualstream", label: "DualStream CNN" },
  { value: "resnet50", label: "ResNet50" },
];

export interface HealthResponse {
  status: string;
  app_name?: string;
  default_model_name?: string;
  dataset_dir_exists?: boolean;
  max_upload_size_mb?: number;
  models?: Array<{
    key: string;
    label: string;
    framework: string;
    exists: boolean;
    loaded_backend: string;
    load_error?: string | null;
  }>;
}

export interface PredictionResult {
  name: string;
  scientificName: string;
  confidence: number;
  description: string;
  uses: string[];
  imageUrl: string;
  processedImages?: {
    rgb: string;
    venation: string;
    edge: string;
  };
  modelName?: string;
  modelLabel?: string;
  modelBackend?: string;
  modelLoadError?: string | null;
}

export interface BatchPrediction {
  imageName: string;
  predictedClass: string;
  confidence: number;
  modelName?: string;
}

export interface BatchPredictionResponse {
  results: BatchPrediction[];
  csvUrl: string;
  jobId: string;
  modelName: string;
  modelLabel: string;
  modelBackend: string;
}

export interface PlantDetails {
  id?: string;
  name: string;
  scientificName: string;
  image: string;
  downloadUrl?: string;
  uses: string;
  description: string;
}

interface RawBatchPrediction {
  imageName?: string;
  filename?: string;
  predictedClass?: string;
  predicted_class?: string;
  confidence: number;
  modelName?: string;
}

interface RawBatchPredictionResponse {
  results?: RawBatchPrediction[];
  csvUrl?: string;
  csv_url?: string;
  jobId?: string;
  job_id?: string;
  model_name?: string;
  model_label?: string;
  model_backend?: string;
}

interface RawDatasetSample {
  id?: string;
  name?: string;
  common_name?: string;
  plant_name?: string;
  scientificName?: string;
  scientific_name?: string;
  image?: string;
  image_path?: string;
  downloadUrl?: string;
  download_url?: string;
  uses?: string[] | string;
  medicinal_uses?: string[] | string;
  description?: string;
}

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function assetUrl(path?: string | null) {
  if (!path) return "";
  return path.startsWith("http") || path.startsWith("blob:") ? path : `${BASE_URL}${path}`;
}

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timed out. Please try again.");
    }
    throw new ApiError("Backend is offline or unreachable.");
  } finally {
    window.clearTimeout(timeout);
  }
}

async function readError(res: Response) {
  try {
    const data = await res.json();
    return data.detail ?? data.message ?? JSON.stringify(data);
  } catch {
    return await res.text();
  }
}

export async function getHealth(): Promise<HealthResponse> {
  const res = await fetchWithTimeout(`${BASE_URL}/health`, { method: "GET" });
  if (!res.ok) throw new ApiError(await readError(res), res.status);
  return res.json();
}

export async function predictSingle(file: File, modelName: ModelName = "hybridnet") {
  const fd = new FormData();
  fd.append("image", file);
  fd.append("model_name", modelName);

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/predict-single`, { method: "POST", body: fd });
    if (!res.ok) throw new ApiError(await readError(res), res.status);
    const data = await res.json();

    return {
      ...data,
      name: data.name ?? data.common_name ?? data.predicted_class,
      scientificName: data.scientificName ?? data.scientific_name ?? data.predicted_class,
      confidence: data.confidence ?? data.confidence_score,
      uses: data.uses ?? data.medicinal_uses ?? [],
      imageUrl: assetUrl(data.processed_images?.rgb),
      processedImages: {
        rgb: assetUrl(data.processed_images?.rgb),
        venation: assetUrl(data.processed_images?.venation),
        edge: assetUrl(data.processed_images?.edge),
      },
      modelName: data.model_name,
      modelLabel: data.model_label,
      modelBackend: data.model_backend,
      modelLoadError: data.model_load_error,
    } satisfies PredictionResult;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.warn("Backend prediction unavailable, using mock result.", error);
    return mockSinglePrediction(file);
  }
}

export async function predictMultiple(
  files: File[],
  modelName: ModelName = "hybridnet",
  onProgress?: (pct: number) => void,
): Promise<BatchPredictionResponse> {
  const fd = new FormData();
  files.forEach((f) => fd.append("images", f));
  fd.append("model_name", modelName);
  onProgress?.(15);

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/predict-multiple`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) throw new ApiError(await readError(res), res.status);
    onProgress?.(100);
    const data = (await res.json()) as RawBatchPredictionResponse | RawBatchPrediction[];
    const results = Array.isArray(data) ? data : (data.results ?? []);
    const meta = Array.isArray(data) ? {} : data;

    return {
      results: results.map((r) => ({
        imageName: r.imageName ?? r.filename ?? "image",
        predictedClass: r.predictedClass ?? r.predicted_class ?? "Unknown",
        confidence: r.confidence,
        modelName: r.modelName,
      })),
      csvUrl: assetUrl(meta.csvUrl ?? meta.csv_url),
      jobId: meta.jobId ?? meta.job_id ?? "",
      modelName: meta.model_name ?? modelName,
      modelLabel:
        meta.model_label ?? MODEL_OPTIONS.find((m) => m.value === modelName)?.label ?? modelName,
      modelBackend: meta.model_backend ?? "unknown",
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.warn("Backend batch prediction unavailable, using mock results.", error);
    for (let i = 20; i <= 100; i += 20) {
      await new Promise((r) => setTimeout(r, 120));
      onProgress?.(i);
    }
    return {
      results: mockBatchPrediction(files),
      csvUrl: "",
      jobId: "mock",
      modelName,
      modelLabel: MODEL_OPTIONS.find((m) => m.value === modelName)?.label ?? modelName,
      modelBackend: "mock",
    };
  }
}

export async function getDataset(): Promise<PlantDetails[]> {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/dataset`, { method: "GET" });
    if (!res.ok) throw new ApiError(await readError(res), res.status);
    const data = (await res.json()) as RawDatasetSample[];
    const localSamplesByScientificName = new Map(
      plantSamples.map((p) => [p.scientificName.toLowerCase(), p]),
    );

    return data.map((p) => ({
      id: p.id,
      name: p.name ?? p.common_name ?? p.plant_name,
      scientificName: p.scientificName ?? p.scientific_name,
      image:
        assetUrl(p.image ?? p.image_path) ||
        localSamplesByScientificName.get(
          (p.scientificName ?? p.scientific_name ?? "").toLowerCase(),
        )?.image ||
        "",
      downloadUrl: assetUrl(p.downloadUrl ?? p.download_url),
      uses: Array.isArray(p.uses)
        ? p.uses.join(", ")
        : Array.isArray(p.medicinal_uses)
          ? p.medicinal_uses.join(", ")
          : (p.uses ?? ""),
      description: p.description ?? "",
    }));
  } catch (error) {
    console.warn("Backend dataset unavailable, using mock samples.", error);
    return plantSamples;
  }
}

export async function getPlantDetails(name: string): Promise<PlantDetails> {
  const res = await fetchWithTimeout(`${BASE_URL}/plant/${encodeURIComponent(name)}`, {
    method: "GET",
  });
  if (!res.ok) throw new ApiError(await readError(res), res.status);
  const data = await res.json();

  return {
    name: data.name ?? data.common_name,
    scientificName: data.scientificName ?? data.scientific_name,
    image: assetUrl(data.image ?? data.image_path),
    downloadUrl: assetUrl(data.downloadUrl ?? data.download_url),
    uses: Array.isArray(data.uses)
      ? data.uses.join(", ")
      : Array.isArray(data.medicinal_uses)
        ? data.medicinal_uses.join(", ")
        : "",
    description: data.description ?? "",
  };
}
