import { BASE_URL, type PlantDetails } from "./api";

const TRANSFER_KEY = "venaleaf:selectedPredictionImage";
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/jpg", "image/pjpeg", "image/png"]);
const ALLOWED_IMAGE_EXTENSIONS = /\.(jpe?g|png)(?:$|[?#])/i;

export interface PredictionImageTransfer {
  imageUrl: string;
  fetchUrl?: string;
  filename: string;
  name: string;
  scientificName: string;
}

export function filenameFromUrl(url: string, fallback = "leaf-image.jpg") {
  try {
    const parsed = new URL(url, window.location.origin);
    const name = decodeURIComponent(parsed.pathname.split("/").filter(Boolean).pop() ?? "");
    return name || fallback;
  } catch {
    return fallback;
  }
}

export function apiUrl(path?: string | null) {
  if (!path) return "";
  return path.startsWith("http") || path.startsWith("blob:") ? path : `${BASE_URL}${path}`;
}

export async function downloadImage(url: string, filename?: string) {
  const resolvedUrl = apiUrl(url);
  if (!resolvedUrl) throw new Error("Image URL is unavailable.");

  const response = await fetch(resolvedUrl);
  if (!response.ok) throw new Error("Image download failed.");

  const blob = await response.blob();
  if (!isSupportedImageBlob(blob, resolvedUrl, filename)) {
    throw new Error("Selected dataset file is not a supported JPG or PNG image.");
  }

  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename || filenameFromUrl(resolvedUrl);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 500);
}

export function storePredictionImage(plant: PlantDetails) {
  if (!plant.image) throw new Error("Image URL is unavailable.");
  const payload: PredictionImageTransfer = {
    imageUrl: plant.image,
    fetchUrl: plant.downloadUrl || plant.image,
    filename: filenameFromUrl(plant.downloadUrl || plant.image, `${plant.name}.jpg`),
    name: plant.name,
    scientificName: plant.scientificName,
  };
  window.localStorage.setItem(TRANSFER_KEY, JSON.stringify(payload));
}

export function readPredictionImageTransfer() {
  const raw = window.localStorage.getItem(TRANSFER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PredictionImageTransfer;
  } catch {
    window.localStorage.removeItem(TRANSFER_KEY);
    return null;
  }
}

export function clearPredictionImageTransfer() {
  window.localStorage.removeItem(TRANSFER_KEY);
}

export async function transferToFile(transfer: PredictionImageTransfer) {
  const sourceUrl = transfer.fetchUrl || transfer.imageUrl;
  const resolvedUrl = apiUrl(sourceUrl);
  if (!resolvedUrl) throw new Error("Image URL is unavailable.");

  const response = await fetch(resolvedUrl);
  if (!response.ok) throw new Error("Could not load selected dataset image.");

  const blob = await response.blob();
  if (!isSupportedImageBlob(blob, resolvedUrl, transfer.filename)) {
    throw new Error("Selected dataset file is not a supported JPG or PNG image.");
  }

  return new File([blob], transfer.filename, { type: blob.type || "image/jpeg" });
}

function isSupportedImageBlob(blob: Blob, url: string, filename?: string) {
  return (
    ALLOWED_IMAGE_TYPES.has(blob.type.toLowerCase()) ||
    ALLOWED_IMAGE_EXTENSIONS.test(filename ?? "") ||
    ALLOWED_IMAGE_EXTENSIONS.test(url)
  );
}
