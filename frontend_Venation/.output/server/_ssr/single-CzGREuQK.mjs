import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { U as UploadDropzone, M as ModelSelect } from "./UploadDropzone-Bu2Tj0o7.mjs";
import { r as readPredictionImageTransfer, t as transferToFile, c as clearPredictionImageTransfer } from "./image-actions-Cba8Afqx.mjs";
import { b as predictSingle, A as ApiError } from "./router-CUGH8Usq.mjs";
import { d as Sparkles, q as LoaderCircle, X, n as RefreshCw, L as Leaf, C as Check, r as ImagePlus } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function Single() {
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [loadingTransfer, setLoadingTransfer] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [modelName, setModelName] = reactExports.useState("hybridnet");
  const replaceInputRef = reactExports.useRef(null);
  const previewRef = reactExports.useRef("");
  const clearPreviewUrl = reactExports.useCallback(() => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = "";
  }, []);
  const resetPredictionState = reactExports.useCallback(() => {
    setResult(null);
    setLoading(false);
  }, []);
  const setSelectedFile = reactExports.useCallback((selected, source = "Image ready") => {
    clearPreviewUrl();
    const nextPreview = URL.createObjectURL(selected);
    previewRef.current = nextPreview;
    setFile(selected);
    setPreview(nextPreview);
    resetPredictionState();
    toast.success(source, {
      description: selected.name
    });
  }, [clearPreviewUrl, resetPredictionState]);
  const handleFiles = (files) => {
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
  reactExports.useEffect(() => {
    const transfer = readPredictionImageTransfer();
    if (!transfer) return;
    let active = true;
    setLoadingTransfer(true);
    transferToFile(transfer).then((transferredFile) => {
      if (!active) return;
      setSelectedFile(transferredFile, "Dataset image loaded");
    }).catch((error) => {
      const message = error instanceof Error ? error.message : "Could not load the selected dataset image.";
      toast.error("Image transfer failed", {
        description: message
      });
    }).finally(() => {
      clearPredictionImageTransfer();
      if (active) setLoadingTransfer(false);
    });
    return () => {
      active = false;
    };
  }, [setSelectedFile]);
  reactExports.useEffect(() => () => clearPreviewUrl(), [clearPreviewUrl]);
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
        description: `${r.name} (${(r.confidence * 100).toFixed(1)}% confidence)`
      });
      if (r.modelLoadError) {
        toast.warning("Model file used fallback inference", {
          description: r.modelLoadError
        });
      }
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Prediction failed. Please try another image.";
      toast.error("Prediction failed", {
        description: message
      });
    } finally {
      setLoading(false);
    }
  };
  const processedImages = result?.processedImages;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " Single Image Mode"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold", children: "Single Prediction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-2xl mx-auto", children: "Upload one leaf image and get an instant species prediction with venation analysis." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 lg:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-lg", children: "1. Upload Image" }),
          file && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-3 py-1 text-xs font-semibold", children: file.name })
        ] }),
        !preview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UploadDropzone, { onFiles: handleFiles, onError: (message) => toast.error("Invalid image", {
            description: message
          }) }),
          loadingTransfer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center rounded-2xl bg-background/75 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-sm font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
            "Loading selected image..."
          ] }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "Selected leaf preview", className: "w-full aspect-square object-cover transition-smooth" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: reset, className: "absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur transition-smooth hover:bg-destructive hover:text-destructive-foreground", "aria-label": "Remove selected image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-2 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => replaceInputRef.current?.click(), disabled: loading, className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-smooth hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
              "Replace Image"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: reset, disabled: loading, className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-muted-foreground transition-smooth hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
              "Remove Image"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: replaceInputRef, type: "file", accept: ".jpg,.jpeg,.png,image/jpeg,image/png", className: "hidden", onChange: (e) => {
            handleFiles(Array.from(e.target.files ?? []));
            e.target.value = "";
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModelSelect, { value: modelName, onChange: setModelName, disabled: loading }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onPredict, disabled: !file || loading || loadingTransfer, className: "mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] disabled:hover:scale-100", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Analyzing venation..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-4 w-4" }),
          " Predict Species"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground text-center", children: "POST /predict-single" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-3xl p-12 grid place-items-center min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-20 w-20 mx-auto place-items-center rounded-full gradient-primary animate-pulse-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-10 w-10 text-primary-foreground animate-pulse" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-semibold", children: "Running selected model..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Extracting venation features" })
        ] }) }),
        result && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 animate-fade-in-up", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: "Prediction" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-3xl font-bold", children: result.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm italic text-muted-foreground", children: result.scientificName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Confidence" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                  (result.confidence * 100).toFixed(1),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full gradient-primary transition-all duration-1000", style: {
                width: `${result.confidence * 100}%`
              } }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm text-muted-foreground", children: result.description }),
            result.modelLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl bg-secondary px-4 py-3 text-xs text-muted-foreground", children: [
              "Model:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: result.modelLabel }),
              " | ",
              "Backend:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: result.modelBackend })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 animate-fade-in-up", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-3", children: "Medicinal Uses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: result.uses.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
              u
            ] }, u)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 animate-fade-in-up", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold mb-4", children: "Processing Stages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [{
              label: "RGB",
              src: processedImages?.rgb ?? preview,
              filter: "none"
            }, {
              label: "Venation",
              src: processedImages?.venation ?? preview,
              filter: processedImages?.venation ? "none" : "grayscale(1) contrast(1.4) brightness(0.85)"
            }, {
              label: "Edge Map",
              src: processedImages?.edge ?? preview,
              filter: processedImages?.edge ? "none" : "invert(1) contrast(2) grayscale(1)"
            }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.src, alt: s.label, className: "h-full w-full object-cover", style: {
                filter: s.filter
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs font-medium text-center", children: s.label })
            ] }, s.label)) })
          ] })
        ] }),
        !loading && !result && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-3xl p-12 grid place-items-center min-h-[400px] text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-10 w-10 text-muted-foreground mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-semibold", children: "Awaiting prediction" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upload an image and click Predict." })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Single as component
};
