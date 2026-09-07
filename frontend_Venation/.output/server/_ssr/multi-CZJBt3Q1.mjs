import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { U as UploadDropzone, M as ModelSelect } from "./UploadDropzone-Bu2Tj0o7.mjs";
import { a as predictMultiple, A as ApiError } from "./router-CUGH8Usq.mjs";
import { g as Layers, n as RefreshCw, o as FolderUp, p as Trash2, X, q as LoaderCircle, I as Images, m as Download } from "../_libs/lucide-react.mjs";
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
const ALLOWED_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/png"]);
const MAX_SIZE_MB = 10;
function Multi() {
  const [files, setFiles] = reactExports.useState([]);
  const [previews, setPreviews] = reactExports.useState([]);
  const [progress, setProgress] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const [modelName, setModelName] = reactExports.useState("hybridnet");
  const [csvUrl, setCsvUrl] = reactExports.useState("");
  const [modelBackend, setModelBackend] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const folderInputRef = reactExports.useRef(null);
  const previewsRef = reactExports.useRef([]);
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
  const validateFiles = (incoming) => {
    const rejected = [];
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
    if (rejected.length) toast.error("Some files were skipped", {
      description: rejected.slice(0, 3).join("; ")
    });
    return valid;
  };
  const setSelectedFiles = (incoming, source = "Images loaded") => {
    const valid = validateFiles(incoming);
    if (!valid.length) return;
    revokePreviews();
    setFiles(valid);
    const nextPreviews = valid.map((f) => ({
      file: f,
      url: URL.createObjectURL(f)
    }));
    setPreviews(nextPreviews);
    previewsRef.current = nextPreviews;
    resetResults();
    toast.success(source, {
      description: `${valid.length} image${valid.length > 1 ? "s" : ""} ready for prediction.`
    });
  };
  const handleFiles = (fs) => {
    setSelectedFiles(fs, files.length ? "Images replaced" : "Images uploaded");
  };
  const removeImage = (index) => {
    const removed = previews[index];
    if (removed) URL.revokeObjectURL(removed.url);
    const nextFiles = files.filter((_, i) => i !== index);
    const nextPreviews = previews.filter((_, i) => i !== index);
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    previewsRef.current = nextPreviews;
    resetResults();
    toast.info("Image removed", {
      description: removed?.file.name
    });
  };
  reactExports.useEffect(() => () => revokePreviews(), []);
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
        description: `${response.results.length} image${response.results.length > 1 ? "s" : ""} processed.`
      });
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Batch prediction failed. Please retry.";
      toast.error("Batch prediction failed", {
        description: message
      });
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
        const rows = results.map((r) => `${r.imageName},${r.predictedClass},${(r.confidence * 100).toFixed(2)}`).join("\n");
        const blob = new Blob([header + rows], {
          type: "text/csv"
        });
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
      toast.error("CSV download failed", {
        description: message
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3 w-3" }),
        " Batch Mode"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold", children: "Multi Prediction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-2xl mx-auto", children: "Upload multiple images or an entire folder and run predictions in parallel." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-3xl p-6 lg:p-8 mb-8", children: !files.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(UploadDropzone, { multiple: true, onFiles: handleFiles, hint: "Drop images or a folder, then choose the HybridNet model", onError: (message) => toast.error("Invalid image", {
      description: message
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Uploaded Images" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            files.length,
            " image",
            files.length > 1 ? "s" : "",
            " selected"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), disabled: loading, className: "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-smooth hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
            "Replace Images"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => folderInputRef.current?.click(), disabled: loading, className: "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-smooth hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderUp, { className: "h-4 w-4" }),
            "Replace Folder"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => clearAll(), disabled: loading, className: "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-muted-foreground transition-smooth hover:bg-destructive hover:text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
            "Clear All"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8", children: previews.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-xl border border-border bg-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.url, alt: item.file.name, className: "aspect-square w-full object-cover transition-smooth group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeImage(i), disabled: loading, className: "absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-background/90 opacity-0 backdrop-blur transition-smooth hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100 disabled:cursor-not-allowed", "aria-label": `Remove ${item.file.name}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-background/90 px-2 py-1 text-[11px] font-medium backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate", children: item.file.name }) })
      ] }, `${item.file.name}-${i}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModelSelect, { value: modelName, onChange: setModelName, disabled: loading }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onPredict, disabled: loading || !files.length, className: "mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth disabled:opacity-50 hover:scale-[1.01]", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        " Processing ",
        progress,
        "%"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { className: "h-4 w-4" }),
        "Predict All (",
        files.length,
        ")"
      ] }) }),
      (loading || progress > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-2 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full gradient-primary transition-all duration-200", style: {
        width: `${progress}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground text-center", children: "POST /predict-multiple" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: ".jpg,.jpeg,.png,image/jpeg,image/png", multiple: true, className: "hidden", onChange: (e) => {
        setSelectedFiles(Array.from(e.target.files ?? []), "Images replaced");
        e.target.value = "";
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: folderInputRef,
          type: "file",
          accept: ".jpg,.jpeg,.png,image/jpeg,image/png",
          multiple: true,
          className: "hidden",
          webkitdirectory: "",
          onChange: (e) => {
            setSelectedFiles(Array.from(e.target.files ?? []), "Folder replaced");
            e.target.value = "";
          }
        }
      )
    ] }) }),
    results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 lg:p-8 animate-fade-in-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold", children: [
            "Results (",
            results.length,
            ")"
          ] }),
          modelBackend && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            "Backend: ",
            modelBackend
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: downloadCSV, className: "inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-smooth hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Download CSV"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold", children: "Image Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold", children: "Predicted Class" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-semibold", children: "Confidence" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: results.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-accent/30 transition-smooth", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-mono text-xs truncate max-w-[200px]", children: r.imageName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-semibold", children: r.predictedClass }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold", children: [
              (r.confidence * 100).toFixed(1),
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-16 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-full gradient-primary", style: {
              width: `${r.confidence * 100}%`
            } }) })
          ] }) })
        ] }, `${r.imageName}-${i}`)) })
      ] }) })
    ] })
  ] });
}
export {
  Multi as component
};
