import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { p as plantSamples, g as getDataset } from "./router-CUGH8Usq.mjs";
import { d as downloadImage, f as filenameFromUrl, s as storePredictionImage } from "./image-actions-Cba8Afqx.mjs";
import { d as Sparkles, l as Search, m as Download } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function Dataset() {
  const navigate = useNavigate();
  const [q, setQ] = reactExports.useState("");
  const [samples, setSamples] = reactExports.useState(plantSamples);
  reactExports.useEffect(() => {
    getDataset().then(setSamples).catch(() => toast.error("Dataset unavailable", {
      description: "Showing local sample data."
    }));
  }, []);
  const filtered = reactExports.useMemo(() => samples.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.scientificName.toLowerCase().includes(q.toLowerCase())), [q, samples]);
  const handleDownload = async (plant) => {
    try {
      await downloadImage(plant.downloadUrl ?? plant.image, filenameFromUrl(plant.image, `${plant.name}.jpg`));
      toast.success("Download started", {
        description: plant.name
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not download image.";
      toast.error("Download failed", {
        description: message
      });
    }
  };
  const handleUseForPrediction = (plant) => {
    try {
      storePredictionImage(plant);
      toast.success("Image sent to prediction", {
        description: plant.name
      });
      navigate({
        to: "/single"
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not send image to prediction.";
      toast.error("Navigation failed", {
        description: message
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
        " Sample Dataset"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold", children: "Medicinal Plant Library" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-2xl mx-auto", children: "Browse representative samples from our 30-species training set. Download any sample to test the model." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto mb-10 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by name or scientific name...", className: "w-full pl-11 pr-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-primary transition-smooth" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group glass rounded-2xl overflow-hidden hover-lift", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, loading: "lazy", className: "h-full w-full object-cover transition-smooth group-hover:scale-110" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-muted-foreground", children: p.scientificName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground line-clamp-2", children: p.uses }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => handleDownload(p), className: "inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-smooth hover:bg-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
            " Download"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/plant/$name", params: {
            name: p.scientificName
          }, className: "inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-smooth hover:bg-accent", children: "Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleUseForPrediction(p), className: "col-span-2 inline-flex items-center justify-center rounded-lg gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-smooth hover:scale-[1.02]", children: "Use for Prediction" })
        ] })
      ] })
    ] }, p.id)) }),
    !filtered.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "No plants match your search." })
  ] });
}
export {
  Dataset as component
};
