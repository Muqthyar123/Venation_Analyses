import { createFileRoute } from "@tanstack/react-router";
import { Check, ImagePlus, Leaf, Loader2, RefreshCw, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ModelSelect } from "@/components/ModelSelect";
import { UploadDropzone } from "@/components/UploadDropzone";
import {
  clearPredictionImageTransfer,
  readPredictionImageTransfer,
  transferToFile,
} from "@/lib/image-actions";
import { ApiError, predictSingle, type ModelName } from "@/lib/api";

export const Route = createFileRoute("/single")({
  head: () => ({
    meta: [
      { title: "Single Prediction - VenaLeaf AI" },
      { name: "description", content: "Identify a single medicinal plant from a leaf image." },
    ],
  }),
  component: Single,
});

type Result = Awaited<ReturnType<typeof predictSingle>>;

function Single() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [modelName, setModelName] = useState<ModelName>("hybridnet");
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef("");

  const clearPreviewUrl = useCallback(() => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = "";
  }, []);

  const resetPredictionState = useCallback(() => {
    setResult(null);
    setLoading(false);
  }, []);

  const setSelectedFile = useCallback(
    (selected: File, source = "Image ready") => {
      clearPreviewUrl();
      const nextPreview = URL.createObjectURL(selected);
      previewRef.current = nextPreview;
      setFile(selected);
      setPreview(nextPreview);
      resetPredictionState();
      toast.success(source, { description: selected.name });
    },
    [clearPreviewUrl, resetPredictionState],
  );

  const handleFiles = (files: File[]) => {
    const selected = files[0];
    if (!selected) return;
    setSelectedFile(selected, file ? "Image replaced" : "Image uploaded");
  };

  const reset = () => {
    clearPreviewUrl();
    setFile(null);
    setPreview("");
    resetPredictionState();
    toast.info("Prediction reset");
  };

  useEffect(() => {
    const transfer = readPredictionImageTransfer();
    if (!transfer) return;

    let active = true;
    setLoadingTransfer(true);
    transferToFile(transfer)
      .then((transferredFile) => {
        if (!active) return;
        setSelectedFile(transferredFile, "Dataset image loaded");
      })
      .catch((error) => {
        const message =
          error instanceof Error ? error.message : "Could not load the selected dataset image.";
        toast.error("Image transfer failed", { description: message });
      })
      .finally(() => {
        clearPredictionImageTransfer();
        if (active) setLoadingTransfer(false);
      });

    return () => {
      active = false;
    };
  }, [setSelectedFile]);

  useEffect(() => () => clearPreviewUrl(), [clearPreviewUrl]);

  const onPredict = async () => {
    if (!file) {
      toast.error("Upload an image first");
      return;
    }
    setLoading(true);
    try {
      const r = await predictSingle(file, modelName);
      setResult(r);
      toast.success("Prediction completed", {
        description: `${r.name} (${(r.confidence * 100).toFixed(1)}% confidence)`,
      });
      if (r.modelLoadError) {
        toast.warning("Model file used fallback inference", {
          description: r.modelLoadError,
        });
      }
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Prediction failed. Please try another image.";
      toast.error("Prediction failed", { description: message });
    } finally {
      setLoading(false);
    }
  };

  const processedImages = result?.processedImages;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold">
          <Sparkles className="h-3 w-3" /> Single Image Mode
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">Single Prediction</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Upload one leaf image and get an instant species prediction with venation analysis.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-6 lg:p-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-semibold text-lg">1. Upload Image</h2>
            {file && (
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                {file.name}
              </span>
            )}
          </div>

          {!preview ? (
            <div className="relative">
              <UploadDropzone
                onFiles={handleFiles}
                onError={(message) => toast.error("Invalid image", { description: message })}
              />
              {loadingTransfer && (
                <div className="absolute inset-0 grid place-items-center rounded-2xl bg-background/75 backdrop-blur">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    Loading selected image...
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <img
                  src={preview}
                  alt="Selected leaf preview"
                  className="w-full aspect-square object-cover transition-smooth"
                />
                <button
                  type="button"
                  onClick={reset}
                  className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur transition-smooth hover:bg-destructive hover:text-destructive-foreground"
                  aria-label="Remove selected image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => replaceInputRef.current?.click()}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-smooth hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw className="h-4 w-4" />
                  Replace Image
                </button>
                <button
                  type="button"
                  onClick={reset}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-muted-foreground transition-smooth hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <X className="h-4 w-4" />
                  Remove Image
                </button>
              </div>
              <input
                ref={replaceInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                className="hidden"
                onChange={(e) => {
                  handleFiles(Array.from(e.target.files ?? []));
                  e.target.value = "";
                }}
              />
            </div>
          )}

          <div className="mt-5">
            <ModelSelect value={modelName} onChange={setModelName} disabled={loading} />
          </div>

          <button
            onClick={onPredict}
            disabled={!file || loading || loadingTransfer}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Analyzing venation...
              </>
            ) : (
              <>
                <Leaf className="h-4 w-4" /> Predict Species
              </>
            )}
          </button>
          <p className="mt-3 text-xs text-muted-foreground text-center">POST /predict-single</p>
        </div>

        <div className="space-y-6">
          {loading && (
            <div className="glass rounded-3xl p-12 grid place-items-center min-h-[400px]">
              <div className="text-center">
                <div className="grid h-20 w-20 mx-auto place-items-center rounded-full gradient-primary animate-pulse-glow">
                  <Leaf className="h-10 w-10 text-primary-foreground animate-pulse" />
                </div>
                <p className="mt-5 font-semibold">Running selected model...</p>
                <p className="text-sm text-muted-foreground mt-1">Extracting venation features</p>
              </div>
            </div>
          )}

          {result && !loading && (
            <>
              <div className="glass rounded-3xl p-6 animate-fade-in-up">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Prediction
                </span>
                <h3 className="mt-3 text-3xl font-bold">{result.name}</h3>
                <p className="text-sm italic text-muted-foreground">{result.scientificName}</p>
                <div className="mt-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Confidence</span>
                    <span className="font-bold text-primary">
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full gradient-primary transition-all duration-1000"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">{result.description}</p>
                {result.modelLabel && (
                  <div className="mt-4 rounded-xl bg-secondary px-4 py-3 text-xs text-muted-foreground">
                    Model:{" "}
                    <span className="font-semibold text-foreground">{result.modelLabel}</span>
                    {" | "}
                    Backend:{" "}
                    <span className="font-semibold text-foreground">{result.modelBackend}</span>
                  </div>
                )}
              </div>

              <div className="glass rounded-3xl p-6 animate-fade-in-up">
                <h4 className="font-semibold mb-3">Medicinal Uses</h4>
                <ul className="space-y-2">
                  {result.uses.map((u) => (
                    <li key={u} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-3xl p-6 animate-fade-in-up">
                <h4 className="font-semibold mb-4">Processing Stages</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "RGB", src: processedImages?.rgb ?? preview, filter: "none" },
                    {
                      label: "Venation",
                      src: processedImages?.venation ?? preview,
                      filter: processedImages?.venation
                        ? "none"
                        : "grayscale(1) contrast(1.4) brightness(0.85)",
                    },
                    {
                      label: "Edge Map",
                      src: processedImages?.edge ?? preview,
                      filter: processedImages?.edge ? "none" : "invert(1) contrast(2) grayscale(1)",
                    },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="aspect-square rounded-xl overflow-hidden border border-border">
                        <img
                          src={s.src}
                          alt={s.label}
                          className="h-full w-full object-cover"
                          style={{ filter: s.filter }}
                        />
                      </div>
                      <p className="mt-2 text-xs font-medium text-center">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!loading && !result && (
            <div className="glass rounded-3xl p-12 grid place-items-center min-h-[400px] text-center">
              <div>
                <ImagePlus className="h-10 w-10 text-muted-foreground mx-auto" />
                <p className="mt-3 font-semibold">Awaiting prediction</p>
                <p className="text-sm text-muted-foreground">Upload an image and click Predict.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
