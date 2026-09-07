import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn, M as MODEL_OPTIONS } from "./router-CUGH8Usq.mjs";
import { U as Upload, I as Images, o as FolderUp, B as Brain } from "../_libs/lucide-react.mjs";
function ModelSelect({ value, onChange, disabled = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-2 flex items-center gap-2 text-sm font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-primary" }),
      "Model"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        value,
        disabled,
        onChange: (event) => onChange(event.target.value),
        className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium outline-none transition-smooth focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60",
        children: MODEL_OPTIONS.map((model) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: model.value, children: model.label }, model.value))
      }
    )
  ] });
}
const ALLOWED_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/png"]);
function UploadDropzone({
  multiple = false,
  onFiles,
  accept = ".jpg,.jpeg,.png,image/jpeg,image/png",
  hint,
  onError,
  maxSizeMb = 10
}) {
  const [drag, setDrag] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const folderInputRef = reactExports.useRef(null);
  const handle = reactExports.useCallback(
    (list) => {
      if (!list) return;
      const maxBytes = maxSizeMb * 1024 * 1024;
      const rejected = [];
      const files = Array.from(list).filter((f) => {
        if (!ALLOWED_TYPES.has(f.type)) {
          rejected.push(`${f.name}: unsupported format`);
          return false;
        }
        if (f.size > maxBytes) {
          rejected.push(`${f.name}: larger than ${maxSizeMb} MB`);
          return false;
        }
        return true;
      });
      if (rejected.length) onError?.(rejected.slice(0, 3).join("; "));
      if (files.length) onFiles(multiple ? files : [files[0]]);
    },
    [maxSizeMb, multiple, onError, onFiles]
  );
  const openFiles = () => fileInputRef.current?.click();
  const openFolder = () => folderInputRef.current?.click();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: openFiles,
      onDragOver: (e) => {
        e.preventDefault();
        setDrag(true);
      },
      onDragLeave: () => setDrag(false),
      onDrop: (e) => {
        e.preventDefault();
        setDrag(false);
        handle(e.dataTransfer.files);
      },
      className: cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-smooth",
        drag ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-accent/30"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-full gradient-primary shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
            "Drop your image",
            multiple ? "s" : "",
            " here"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: hint ?? "or click to browse - PNG, JPG up to 10 MB" })
        ] }),
        multiple && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                openFiles();
              },
              className: "inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 text-xs font-semibold transition-smooth hover:bg-accent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Images, { className: "h-3.5 w-3.5" }),
                "Browse Images"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                openFolder();
              },
              className: "inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 text-xs font-semibold transition-smooth hover:bg-accent",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderUp, { className: "h-3.5 w-3.5" }),
                "Browse Folder"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept,
            multiple,
            className: "hidden",
            onChange: (e) => {
              handle(e.target.files);
              e.target.value = "";
            }
          }
        ),
        multiple && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: folderInputRef,
            type: "file",
            accept,
            multiple: true,
            className: "hidden",
            webkitdirectory: "",
            onChange: (e) => {
              handle(e.target.files);
              e.target.value = "";
            }
          }
        )
      ]
    }
  );
}
export {
  ModelSelect as M,
  UploadDropzone as U
};
