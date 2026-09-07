import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Route, d as getPlantDetails, A as ApiError } from "./router-CUGH8Usq.mjs";
import { d as downloadImage, f as filenameFromUrl } from "./image-actions-Cba8Afqx.mjs";
import { s as ArrowLeft, q as LoaderCircle, L as Leaf, m as Download } from "../_libs/lucide-react.mjs";
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
function PlantDetailsPage() {
  const {
    name
  } = Route.useParams();
  const [plant, setPlant] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let active = true;
    setLoading(true);
    getPlantDetails(name).then((data) => {
      if (active) setPlant(data);
    }).catch((error) => {
      const message = error instanceof ApiError ? error.message : "Plant details unavailable.";
      toast.error("Could not load plant", {
        description: message
      });
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [name]);
  const handleDownload = async () => {
    if (!plant?.image) return;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dataset", className: "inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-smooth hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Dataset"
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid min-h-[420px] place-items-center rounded-3xl glass", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-8 w-8 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm font-semibold", children: "Loading plant details..." })
    ] }) }),
    !loading && plant && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl glass", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: plant.image, alt: plant.name, className: "aspect-square h-full w-full object-cover", loading: "lazy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl glass p-6 lg:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-3 w-3" }),
          "Plant Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-3xl font-bold sm:text-4xl", children: plant.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm italic text-muted-foreground", children: plant.scientificName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground", children: plant.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Medicinal Uses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 grid gap-2", children: plant.uses.split(", ").map((use) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-xl bg-secondary px-4 py-3 text-sm", children: use }, use)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleDownload, className: "mt-8 inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          "Download Image"
        ] })
      ] })
    ] })
  ] });
}
export {
  PlantDetailsPage as component
};
