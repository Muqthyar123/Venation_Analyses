import { createFileRoute } from "@tanstack/react-router";
import { Download, FolderUp, Images, Layers, Loader2, RefreshCw, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ModelSelect } from "@/components/ModelSelect";
import { UploadDropzone } from "@/components/UploadDropzone";
import { ApiError, predictMultiple, type ModelName } from "@/lib/api";
import type { Prediction } from "@/lib/mock-data";

export const Route = createFileRoute("/multi")({
  head: () => ({
    meta: [
      { title: "Multi Prediction - VenaLeaf AI" },
      {
        name: "description",
        content: "Upload a folder of leaf images for batch species prediction.",
      },
    ],
  }),
  component: Multi,
});

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png"]);
const MAX_SIZE_MB = 10;

function Multi() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Array<{ file: File; url: string }>>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Prediction[]>([]);
  const [modelName, setModelName] = useState<ModelName>("hybridnet");
  const [csvUrl, setCsvUrl] = useState("");
  const [modelBackend, setModelBackend] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const previewsRef = useRef<Array<{ file: File; url: string }>>([]);

  const revokePreviews = (items = previewsRef.current) => {
    items.forEach((item) => URL.revokeObjectURL(item.url));
  };

  const resetResults = () => {
    setResults([]);
    setCsvUrl("");
    setModelBackend("");
    setProgress(0);
    setLoading(false);
  };

  const clearAll = (notify = true) => {
    revokePreviews();
    setFiles([]);
    setPreviews([]);
    previewsRef.current = [];
    resetResults();
    if (notify) toast.info("Upload list cleared");
  };

  const validateFiles = (incoming: File[]) => {
    const rejected: string[] = [];
    const maxBytes = MAX_SIZE_MB * 1024 * 1024;
    const valid = incoming.filter((file) => {
      if (!ALLOWED_TYPES.has(file.type)) {
        rejected.push(`${file.name}: unsupported format`);
        return false;
      }
      if (file.size > maxBytes) {
        rejected.push(`${file.name}: larger than ${MAX_SIZE_MB} MB`);
        return false;
      }
      return true;
    });

    if (rejected.length)
      toast.error("Some files were skipped", { description: rejected.slice(0, 3).join("; ") });
    return valid;
  };

  const setSelectedFiles = (incoming: File[], source = "Images loaded") => {
    const valid = validateFiles(incoming);
    if (!valid.length) return;
    revokePreviews();
    setFiles(valid);
    const nextPreviews = valid.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setPreviews(nextPreviews);
    previewsRef.current = nextPreviews;
    resetResults();
    toast.success(source, {
      description: `${valid.length} image${valid.length > 1 ? "s" : ""} ready for prediction.`,
    });
  };

  const handleFiles = (fs: File[]) => {
    setSelectedFiles(fs, files.length ? "Images replaced" : "Images uploaded");
  };

  const removeImage = (index: number) => {
    const removed = previews[index];
    if (removed) URL.revokeObjectURL(removed.url);
    const nextFiles = files.filter((_, i) => i !== index);
    const nextPreviews = previews.filter((_, i) => i !== index);
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    previewsRef.current = nextPreviews;
    resetResults();
    toast.info("Image removed", { description: removed?.file.name });
  };

  useEffect(() => () => revokePreviews(), []);

  const onPredict = async () => {
    if (!files.length) {
      toast.error("Upload at least one image");
      return;
    }
    setLoading(true);
    setProgress(0);
    try {
      const response = await predictMultiple(files, modelName, setProgress);
      setResults(response.results);
      setCsvUrl(response.csvUrl);
      setModelBackend(response.modelBackend);
      toast.success("Batch prediction completed", {
        description: `${response.results.length} image${response.results.length > 1 ? "s" : ""} processed.`,
      });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Batch prediction failed. Please retry.";
      toast.error("Batch prediction failed", { description: message });
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = async () => {
    try {
      if (csvUrl) {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Could not download CSV.");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = csvUrl.split("/").pop() || "predictions.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 500);
      } else {
        const header = "image_name,predicted_class,confidence\n";
        const rows = results
          .map((r) => `${r.imageName},${r.predictedClass},${(r.confidence * 100).toFixed(2)}`)
          .join("\n");
        const blob = new Blob([header + rows], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "predictions.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 500);
      }
      toast.success("CSV download started");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Download failed.";
      toast.error("CSV download failed", { description: message });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold">
          <Layers className="h-3 w-3" /> Batch Mode
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">Multi Prediction</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Upload multiple images or an entire folder and run predictions in parallel.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 lg:p-8 mb-8">
        {!files.length ? (
          <UploadDropzone
            multiple
            onFiles={handleFiles}
            hint="Drop images or a folder, then choose the HybridNet model"
            onError={(message) => toast.error("Invalid image", { description: message })}
          />
        ) : (
          <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold">Uploaded Images</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {files.length} image{files.length > 1 ? "s" : ""} selected
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-smooth hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw className="h-4 w-4" />
                  Replace Images
                </button>
                <button
                  type="button"
                  onClick={() => folderInputRef.current?.click()}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-smooth hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FolderUp className="h-4 w-4" />
                  Replace Folder
                </button>
                <button
                  type="button"
                  onClick={() => clearAll()}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-muted-foreground transition-smooth hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {previews.map((item, i) => (
                <div
                  key={`${item.file.name}-${i}`}
                  className="group relative overflow-hidden rounded-xl border border-border bg-secondary"
                >
                  <img
                    src={item.url}
                    alt={item.file.name}
                    className="aspect-square w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    disabled={loading}
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-background/90 opacity-0 backdrop-blur transition-smooth hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100 disabled:cursor-not-allowed"
                    aria-label={`Remove ${item.file.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 bg-background/90 px-2 py-1 text-[11px] font-medium backdrop-blur">
                    <p className="truncate">{item.file.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <ModelSelect value={modelName} onChange={setModelName} disabled={loading} />
            </div>
            <button
              onClick={onPredict}
              disabled={loading || !files.length}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth disabled:opacity-50 hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing {progress}%
                </>
              ) : (
                <>
                  <Images className="h-4 w-4" />
                  Predict All ({files.length})
                </>
              )}
            </button>
            {(loading || progress > 0) && (
              <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full gradient-primary transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground text-center">POST /predict-multiple</p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              multiple
              className="hidden"
              onChange={(e) => {
                setSelectedFiles(Array.from(e.target.files ?? []), "Images replaced");
                e.target.value = "";
              }}
            />
            <input
              ref={folderInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              multiple
              className="hidden"
              // @ts-expect-error non-standard but supported by Chromium for folder upload
              webkitdirectory=""
              onChange={(e) => {
                setSelectedFiles(Array.from(e.target.files ?? []), "Folder replaced");
                e.target.value = "";
              }}
            />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="glass rounded-3xl p-6 lg:p-8 animate-fade-in-up">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
              <h3 className="text-xl font-bold">Results ({results.length})</h3>
              {modelBackend && (
                <p className="mt-1 text-xs text-muted-foreground">Backend: {modelBackend}</p>
              )}
            </div>
            <button
              onClick={downloadCSV}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-smooth hover:bg-accent"
            >
              <Download className="h-4 w-4" /> Download CSV
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left p-3 font-semibold">#</th>
                  <th className="text-left p-3 font-semibold">Image Name</th>
                  <th className="text-left p-3 font-semibold">Predicted Class</th>
                  <th className="text-left p-3 font-semibold">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={`${r.imageName}-${i}`}
                    className="border-t border-border hover:bg-accent/30 transition-smooth"
                  >
                    <td className="p-3 text-muted-foreground">{i + 1}</td>
                    <td className="p-3 font-mono text-xs truncate max-w-[200px]">{r.imageName}</td>
                    <td className="p-3 font-semibold">{r.predictedClass}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="text-primary font-semibold">
                          {(r.confidence * 100).toFixed(1)}%
                        </span>
                        <span className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
                          <span
                            className="block h-full gradient-primary"
                            style={{ width: `${r.confidence * 100}%` }}
                          />
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
