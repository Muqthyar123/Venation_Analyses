import { B as BASE_URL } from "./router-CUGH8Usq.mjs";
const TRANSFER_KEY = "venaleaf:selectedPredictionImage";
const ALLOWED_IMAGE_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/png"]);
function filenameFromUrl(url, fallback = "leaf-image.jpg") {
  try {
    const parsed = new URL(url, window.location.origin);
    const name = decodeURIComponent(parsed.pathname.split("/").filter(Boolean).pop() ?? "");
    return name || fallback;
  } catch {
    return fallback;
  }
}
function apiUrl(path) {
  if (!path) return "";
  return path.startsWith("http") || path.startsWith("blob:") ? path : `${BASE_URL}${path}`;
}
async function downloadImage(url, filename) {
  const resolvedUrl = apiUrl(url);
  if (!resolvedUrl) throw new Error("Image URL is unavailable.");
  const response = await fetch(resolvedUrl);
  if (!response.ok) throw new Error("Image download failed.");
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename || filenameFromUrl(resolvedUrl);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 500);
}
function storePredictionImage(plant) {
  if (!plant.image) throw new Error("Image URL is unavailable.");
  const payload = {
    imageUrl: plant.image,
    fetchUrl: plant.downloadUrl ?? plant.image,
    filename: filenameFromUrl(plant.image, `${plant.name}.jpg`),
    name: plant.name,
    scientificName: plant.scientificName
  };
  window.localStorage.setItem(TRANSFER_KEY, JSON.stringify(payload));
}
function readPredictionImageTransfer() {
  const raw = window.localStorage.getItem(TRANSFER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    window.localStorage.removeItem(TRANSFER_KEY);
    return null;
  }
}
function clearPredictionImageTransfer() {
  window.localStorage.removeItem(TRANSFER_KEY);
}
async function transferToFile(transfer) {
  const response = await fetch(apiUrl(transfer.fetchUrl ?? transfer.imageUrl));
  if (!response.ok) throw new Error("Could not load selected dataset image.");
  const blob = await response.blob();
  if (!ALLOWED_IMAGE_TYPES.has(blob.type)) {
    throw new Error("Selected dataset file is not a supported JPG or PNG image.");
  }
  return new File([blob], transfer.filename, { type: blob.type || "image/jpeg" });
}
export {
  clearPredictionImageTransfer as c,
  downloadImage as d,
  filenameFromUrl as f,
  readPredictionImageTransfer as r,
  storePredictionImage as s,
  transferToFile as t
};
