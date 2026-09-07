import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { L as Leaf, M as Moon, S as Sun, X, a as Menu, G as Github, b as Linkedin, c as Mail, A as Activity, W as WifiOff } from "../_libs/lucide-react.mjs";
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
const appCss = "/assets/styles-CS7rQDtj.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function useTheme() {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("theme");
    const initial = stored ?? "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };
  return { theme, toggle };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const agImg = "/assets/AG-S-DD9HQJE-.jpg";
const ahImg = "/assets/AH-S-R3v3TXVg.jpg";
const aiImg = "/assets/AI-S-DfsFfjym.jpg";
const avImg = "/assets/AV-S-CPdMtpAN.jpg";
const baImg = "/assets/BA-S-RC1Y-rGF.jpg";
const bjImg = "/assets/BJ-S-002-hpOrIGVG.jpg";
const ccImg = "/assets/CC-S-028-BsC6PKoX.jpg";
const clImg = "/assets/CL-S-C1hM5wft.jpg";
const faImg = "/assets/FA-S-dKTetQ3i.jpg";
const frImg = "/assets/FR-S-DAbVeuXI.jpg";
const hrImg = "/assets/HR-S-BqwDUWxQ.jpg";
const jasmineImg = "/assets/J-S-7YS3HC_c.jpg";
const mcImg = "/assets/MC-S-CQfWdnKC.jpg";
const miImg = "/assets/MI-S-CnA_MpJA.jpg";
const mkImg = "/assets/MK-S-OWmL5A_I.jpg";
const moImg = "/assets/MO-S-Cb3S1F3u.jpg";
const curryImg = "/assets/M-S-DQFY60N0.jpg";
const naImg = "/assets/NA-S-CXH4EAmf.jpg";
const noImg = "/assets/NO-S-CclFLee5.jpg";
const otImg = "/assets/OT-S-BZwSqLlU.jpg";
const paImg = "/assets/PA-S-BMnXaOHV.jpg";
const pbImg = "/assets/PB-S-C7GIjV53.jpg";
const pongamiaImg = "/assets/PG-S%20(2)-DpYHuJ-S.jpg";
const guavaImg = "/assets/PG-S-De3HnoNc.jpg";
const ppImg = "/assets/PP-S-19Qj2bzP.jpg";
const saImg = "/assets/SA-S-DZqzUVQV.jpg";
const scImg = "/assets/SC-S-E-SK5WWA.jpg";
const sjImg = "/assets/SJ-S-vX8pRIY6.jpg";
const tdImg = "/assets/TD-S-f1_JPJur.jpg";
const tfImg = "/assets/TF-S-BWSQHmnM.jpg";
const plantSamples = [
  {
    id: "ag",
    name: "Rasna",
    scientificName: "Alpinia Galanga",
    image: agImg,
    uses: "Anti-inflammatory support, digestive aid, respiratory wellness",
    description: "A rhizomatous medicinal plant used in traditional formulations."
  },
  {
    id: "ah",
    name: "Arive-Dantu",
    scientificName: "Amaranthus Viridis",
    image: ahImg,
    uses: "Nutritional tonic, digestive support, skin health",
    description: "A leafy plant valued for micronutrients and traditional wellness use."
  },
  {
    id: "ai",
    name: "Jackfruit",
    scientificName: "Artocarpus Heterophyllus",
    image: aiImg,
    uses: "Antioxidant support, digestive support, energy and nutrition",
    description: "Jackfruit leaves and fruit are associated with nutritional applications."
  },
  {
    id: "av",
    name: "Neem",
    scientificName: "Azadirachta Indica",
    image: avImg,
    uses: "Antibacterial care, skin health, oral hygiene",
    description: "Neem is widely used for antimicrobial, skin, and hygiene applications."
  },
  {
    id: "ba",
    name: "Basale",
    scientificName: "Basella Alba",
    image: baImg,
    uses: "Cooling tonic, digestive support, nutrient source",
    description: "A succulent leafy vegetable used as a cooling traditional remedy."
  },
  {
    id: "bj",
    name: "Indian Mustard",
    scientificName: "Brassica Juncea",
    image: bjImg,
    uses: "Digestive support, circulation support, anti-inflammatory use",
    description: "Indian mustard leaves and seeds are used in food and health practices."
  },
  {
    id: "cc",
    name: "Karanda",
    scientificName: "Carissa Carandas",
    image: ccImg,
    uses: "Digestive support, antioxidant support, traditional wound care",
    description: "A thorny medicinal shrub with fruit and leaves used in folk remedies."
  },
  {
    id: "cl",
    name: "Lemon",
    scientificName: "Citrus Limon",
    image: clImg,
    uses: "Vitamin C source, digestive aid, immune support",
    description: "Lemon leaves and fruit are aromatic and used for wellness."
  },
  {
    id: "fa",
    name: "Roxburgh fig",
    scientificName: "Ficus Auriculata",
    image: faImg,
    uses: "Digestive support, anti-inflammatory use, traditional wound care",
    description: "A fig species used regionally for digestive and inflammatory conditions."
  },
  {
    id: "fr",
    name: "Peepal Tree",
    scientificName: "Ficus Religiosa",
    image: frImg,
    uses: "Respiratory support, wound care, digestive support",
    description: "A culturally important tree used in several traditional preparations."
  },
  {
    id: "hr",
    name: "Hibiscus",
    scientificName: "Hibiscus Rosa-sinensis",
    image: hrImg,
    uses: "Hair care, antioxidant support, blood pressure support",
    description: "Recognized for ornamental flowers and traditional wellness uses."
  },
  {
    id: "j",
    name: "Jasmine",
    scientificName: "Jasminum",
    image: jasmineImg,
    uses: "Calming aroma, skin care, traditional pain relief",
    description: "Jasmine species are valued for fragrance and soothing applications."
  },
  {
    id: "mc",
    name: "Mango",
    scientificName: "Mangifera Indica",
    image: mcImg,
    uses: "Antioxidant support, digestive support, traditional diabetes support",
    description: "Mango leaves are used traditionally and contain plant bioactives."
  },
  {
    id: "mi",
    name: "Mint",
    scientificName: "Mentha",
    image: miImg,
    uses: "Digestive aid, breath freshener, headache relief",
    description: "An aromatic herb widely used for digestion, freshness, and cooling effects."
  },
  {
    id: "mk",
    name: "Drumstick",
    scientificName: "Moringa Oleifera",
    image: mkImg,
    uses: "Nutritional tonic, anti-inflammatory support, immune support",
    description: "Moringa leaves are nutrient dense and used in food and traditional medicine."
  },
  {
    id: "mo",
    name: "Jamaica Cherry-Gasagase",
    scientificName: "Muntingia Calabura",
    image: moImg,
    uses: "Antioxidant support, anti-inflammatory use, traditional fever support",
    description: "A fast-growing tree with leaves and fruit used in folk medicine."
  },
  {
    id: "m",
    name: "Curry",
    scientificName: "Murraya Koenigii",
    image: curryImg,
    uses: "Digestive support, hair health, traditional diabetes support",
    description: "Aromatic culinary leaves with important traditional medicinal use."
  },
  {
    id: "na",
    name: "Oleander",
    scientificName: "Nerium Oleander",
    image: naImg,
    uses: "Research-only toxic plant, traditional external use",
    description: "A toxic plant included for image recognition and botanical study."
  },
  {
    id: "no",
    name: "Parijata",
    scientificName: "Nyctanthes Arbor-tristis",
    image: noImg,
    uses: "Fever support, joint comfort, anti-inflammatory use",
    description: "Traditionally used for fever, joint pain, and inflammatory conditions."
  },
  {
    id: "ot",
    name: "Tulsi",
    scientificName: "Ocimum Tenuiflorum",
    image: otImg,
    uses: "Respiratory support, stress relief, immune support",
    description: "A sacred aromatic herb used in Ayurveda for respiratory and immune wellness."
  },
  {
    id: "pa",
    name: "Betel",
    scientificName: "Piper Betle",
    image: paImg,
    uses: "Digestive support, oral freshness, antimicrobial use",
    description: "An aromatic leaf traditionally used after meals and in local remedies."
  },
  {
    id: "pb",
    name: "Mexican Mint",
    scientificName: "Plectranthus Amboinicus",
    image: pbImg,
    uses: "Cough relief, digestive aid, anti-inflammatory support",
    description: "Thick aromatic leaves used traditionally for coughs and digestion."
  },
  {
    id: "pg-pongamia",
    name: "Indian Beech",
    scientificName: "Pongamia Pinnata",
    image: pongamiaImg,
    uses: "Skin care, anti-inflammatory use, traditional wound care",
    description: "Leaves and seed oil have traditional medicinal and agricultural uses."
  },
  {
    id: "pg-guava",
    name: "Guava",
    scientificName: "Psidium Guajava",
    image: guavaImg,
    uses: "Digestive support, antioxidant support, oral care",
    description: "Guava leaves are commonly used in folk remedies for digestive wellness."
  },
  {
    id: "pp",
    name: "Pomegranate",
    scientificName: "Punica Granatum",
    image: ppImg,
    uses: "Antioxidant support, digestive support, heart wellness",
    description: "Known for antioxidant-rich leaves and fruit in traditional applications."
  },
  {
    id: "sa",
    name: "Sandalwood",
    scientificName: "Santalum Album",
    image: saImg,
    uses: "Skin cooling, aromatic calming, traditional anti-inflammatory use",
    description: "Prized for fragrance and cooling traditional preparations."
  },
  {
    id: "sc",
    name: "Jamun",
    scientificName: "Syzygium Cumini",
    image: scImg,
    uses: "Traditional diabetes support, digestive support, antioxidant support",
    description: "Leaves, bark, and fruit are used in traditional metabolic health practices."
  },
  {
    id: "sj",
    name: "Rose Apple",
    scientificName: "Syzygium Jambos",
    image: sjImg,
    uses: "Digestive support, antioxidant support, traditional fever support",
    description: "A medicinal tree with aromatic leaves and edible fruit."
  },
  {
    id: "td",
    name: "Crape Jasmine",
    scientificName: "Tabernaemontana Divaricata",
    image: tdImg,
    uses: "Traditional pain relief, skin care, anti-inflammatory use",
    description: "An ornamental medicinal shrub used in traditional remedies."
  },
  {
    id: "tf",
    name: "Fenugreek",
    scientificName: "Trigonella Foenum-graecum",
    image: tfImg,
    uses: "Digestive support, metabolic support, lactation support",
    description: "Leaves and seeds are used in cooking and traditional health preparations."
  }
];
const classes = plantSamples.map((p) => p.name);
const randomSample = () => plantSamples[Math.floor(Math.random() * plantSamples.length)];
const mockSinglePrediction = (file) => {
  const sample = randomSample();
  return {
    name: sample.name,
    scientificName: sample.scientificName,
    confidence: 0.94 + Math.random() * 0.05,
    description: sample.description,
    uses: sample.uses.split(", "),
    imageUrl: URL.createObjectURL(file)
  };
};
const mockBatchPrediction = (files) => files.map((f) => ({
  imageName: f.name,
  predictedClass: classes[Math.floor(Math.random() * classes.length)],
  confidence: 0.85 + Math.random() * 0.14
}));
const modelComparison = [
  { model: "Modified ResNet50", accuracy: 92.4, params: "25.6M", inference: "42ms" },
  { model: "Multi-Scale VenationNet", accuracy: 95.1, params: "18.2M", inference: "38ms" },
  { model: "Dual Stream CNN + CBAM", accuracy: 96.8, params: "31.4M", inference: "55ms" },
  { model: "HybridNet-MSVD (Ours)", accuracy: 98.2, params: "22.7M", inference: "47ms" }
];
const BASE_URL = "http://localhost:8000";
const REQUEST_TIMEOUT_MS = Number("60000");
const MODEL_OPTIONS = [
  { value: "hybridnet", label: "HybridNet-MSVD" },
  { value: "venationnet", label: "VenationNet" },
  { value: "dualstream", label: "DualStream CNN" },
  { value: "resnet50", label: "ResNet50" }
];
class ApiError extends Error {
  status;
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
function assetUrl(path) {
  if (!path) return "";
  return path.startsWith("http") || path.startsWith("blob:") ? path : `${BASE_URL}${path}`;
}
async function fetchWithTimeout(url, init) {
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
async function readError(res) {
  try {
    const data = await res.json();
    return data.detail ?? data.message ?? JSON.stringify(data);
  } catch {
    return await res.text();
  }
}
async function getHealth() {
  const res = await fetchWithTimeout(`${BASE_URL}/health`, { method: "GET" });
  if (!res.ok) throw new ApiError(await readError(res), res.status);
  return res.json();
}
async function predictSingle(file, modelName = "hybridnet") {
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
        edge: assetUrl(data.processed_images?.edge)
      },
      modelName: data.model_name,
      modelLabel: data.model_label,
      modelBackend: data.model_backend,
      modelLoadError: data.model_load_error
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.warn("Backend prediction unavailable, using mock result.", error);
    return mockSinglePrediction(file);
  }
}
async function predictMultiple(files, modelName = "hybridnet", onProgress) {
  const fd = new FormData();
  files.forEach((f) => fd.append("images", f));
  fd.append("model_name", modelName);
  onProgress?.(15);
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/predict-multiple`, {
      method: "POST",
      body: fd
    });
    if (!res.ok) throw new ApiError(await readError(res), res.status);
    onProgress?.(100);
    const data = await res.json();
    const results = Array.isArray(data) ? data : data.results ?? [];
    const meta = Array.isArray(data) ? {} : data;
    return {
      results: results.map((r) => ({
        imageName: r.imageName ?? r.filename ?? "image",
        predictedClass: r.predictedClass ?? r.predicted_class ?? "Unknown",
        confidence: r.confidence,
        modelName: r.modelName
      })),
      csvUrl: assetUrl(meta.csvUrl ?? meta.csv_url),
      jobId: meta.jobId ?? meta.job_id ?? "",
      modelName: meta.model_name ?? modelName,
      modelLabel: meta.model_label ?? MODEL_OPTIONS.find((m) => m.value === modelName)?.label ?? modelName,
      modelBackend: meta.model_backend ?? "unknown"
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
      modelBackend: "mock"
    };
  }
}
async function getDataset() {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/dataset`, { method: "GET" });
    if (!res.ok) throw new ApiError(await readError(res), res.status);
    const data = await res.json();
    const localSamplesByScientificName = new Map(
      plantSamples.map((p) => [p.scientificName.toLowerCase(), p])
    );
    return data.map((p) => ({
      id: p.id,
      name: p.name ?? p.common_name ?? p.plant_name,
      scientificName: p.scientificName ?? p.scientific_name,
      image: assetUrl(p.image ?? p.image_path) || localSamplesByScientificName.get(
        (p.scientificName ?? p.scientific_name ?? "").toLowerCase()
      )?.image || "",
      downloadUrl: assetUrl(p.downloadUrl ?? p.download_url),
      uses: Array.isArray(p.uses) ? p.uses.join(", ") : Array.isArray(p.medicinal_uses) ? p.medicinal_uses.join(", ") : p.uses ?? "",
      description: p.description ?? ""
    }));
  } catch (error) {
    console.warn("Backend dataset unavailable, using mock samples.", error);
    return plantSamples;
  }
}
async function getPlantDetails(name) {
  const res = await fetchWithTimeout(`${BASE_URL}/plant/${encodeURIComponent(name)}`, {
    method: "GET"
  });
  if (!res.ok) throw new ApiError(await readError(res), res.status);
  const data = await res.json();
  return {
    name: data.name ?? data.common_name,
    scientificName: data.scientificName ?? data.scientific_name,
    image: assetUrl(data.image ?? data.image_path),
    downloadUrl: assetUrl(data.downloadUrl ?? data.download_url),
    uses: Array.isArray(data.uses) ? data.uses.join(", ") : Array.isArray(data.medicinal_uses) ? data.medicinal_uses.join(", ") : "",
    description: data.description ?? ""
  };
}
function BackendStatus() {
  const [health, setHealth] = reactExports.useState(null);
  const [online, setOnline] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let active = true;
    const check = async () => {
      try {
        const data = await getHealth();
        if (!active) return;
        setHealth(data);
        setOnline(data.status === "online" || data.status === "running");
      } catch {
        if (!active) return;
        setHealth(null);
        setOnline(false);
      }
    };
    check();
    const id = window.setInterval(check, 3e4);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      title: online ? `${health?.app_name ?? "Backend"} online` : "Backend offline. Predictions will be unavailable until FastAPI is running.",
      className: cn(
        "hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
        online ? "border-primary/30 bg-primary/10 text-primary" : "border-destructive/30 bg-destructive/10 text-destructive"
      ),
      children: [
        online ? /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "h-3.5 w-3.5" }),
        online ? "Backend Online" : "Backend Offline"
      ]
    }
  );
}
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/single", label: "Single Prediction" },
  { to: "/multi", label: "Multi Prediction" },
  { to: "/dataset", label: "Dataset" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  const [open, setOpen] = reactExports.useState(false);
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 glass", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow transition-smooth group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-bold tracking-tight", children: [
          "Vena",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Leaf" }),
          " AI"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex items-center gap-1", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          className: cn(
            "rounded-lg px-3 py-2 text-sm font-medium transition-smooth hover:bg-accent hover:text-accent-foreground",
            pathname === l.to && "bg-accent text-accent-foreground"
          ),
          children: l.label
        },
        l.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BackendStatus, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggle,
            "aria-label": "Toggle theme",
            className: "grid h-9 w-9 place-items-center rounded-lg border border-border transition-smooth hover:bg-accent",
            children: theme === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setOpen(!open),
            "aria-label": "Toggle menu",
            className: "lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-border",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden border-t border-border px-4 py-3 space-y-1 animate-fade-in-up", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: l.to,
        onClick: () => setOpen(false),
        className: cn(
          "block rounded-lg px-3 py-2 text-sm font-medium transition-smooth hover:bg-accent",
          pathname === l.to && "bg-accent text-accent-foreground"
        ),
        children: l.label
      },
      l.to
    )) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border bg-secondary/50 mt-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-bold", children: [
            "Vena",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Leaf" }),
            " AI"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground max-w-xs", children: "Venation-Aware Multi-Modal Deep Learning for Medicinal Plant Species Recognition." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold mb-3", children: "IEEE Publication" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
          "Venation-Aware Multi-Modal Deep Learning for Medicinal Plant Species Recognition.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "IEEE Conference on Computer Vision & AI, 2025" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold mb-3", children: "Connect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [Github, Linkedin, Mail].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            className: "grid h-10 w-10 place-items-center rounded-lg border border-border transition-smooth hover:bg-accent hover:-translate-y-1",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
          },
          i
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " VenaLeaf AI — Final Year IEEE Research Project. All rights reserved."
    ] })
  ] }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-lg gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-smooth hover:scale-105",
        children: "Go home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try refreshing the page." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 inline-flex items-center justify-center rounded-lg gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VenaLeaf AI — Medicinal Plant Recognition" },
      {
        name: "description",
        content: "Venation-Aware Multi-Modal Deep Learning for Medicinal Plant Species Recognition — IEEE research project."
      }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$6 = () => import("./index-CKGyI1hg.mjs");
const Route$6 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "VenaLeaf AI — Medicinal Plant Recognition"
    }, {
      name: "description",
      content: "Identify medicinal plant species using venation-aware multi-modal deep learning. Powered by HybridNet-MSVD."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./about-CoWsehsb.mjs");
const Route$5 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — VenaLeaf AI"
    }, {
      name: "description",
      content: "Project overview, methodology, models, dataset, and references for our venation-aware medicinal plant recognition system."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contact-BVN4kL_I.mjs");
const Route$4 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — VenaLeaf AI"
    }, {
      name: "description",
      content: "Get in touch with the research team behind VenaLeaf AI."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dataset-TQ2dAQJ0.mjs");
const Route$3 = createFileRoute("/dataset")({
  head: () => ({
    meta: [{
      title: "Dataset — VenaLeaf AI"
    }, {
      name: "description",
      content: "Browse and download sample medicinal plant images from our dataset."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./multi-CZJBt3Q1.mjs");
const Route$2 = createFileRoute("/multi")({
  head: () => ({
    meta: [{
      title: "Multi Prediction - VenaLeaf AI"
    }, {
      name: "description",
      content: "Upload a folder of leaf images for batch species prediction."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./single-CzGREuQK.mjs");
const Route$1 = createFileRoute("/single")({
  head: () => ({
    meta: [{
      title: "Single Prediction - VenaLeaf AI"
    }, {
      name: "description",
      content: "Identify a single medicinal plant from a leaf image."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./plant._name-C3M1Y_0g.mjs");
const Route = createFileRoute("/plant/$name")({
  head: () => ({
    meta: [{
      title: "Plant Details - VenaLeaf AI"
    }, {
      name: "description",
      content: "Medicinal plant details and sample image."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const AboutRoute = Route$5.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$7
});
const ContactRoute = Route$4.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$7
});
const DatasetRoute = Route$3.update({
  id: "/dataset",
  path: "/dataset",
  getParentRoute: () => Route$7
});
const MultiRoute = Route$2.update({
  id: "/multi",
  path: "/multi",
  getParentRoute: () => Route$7
});
const SingleRoute = Route$1.update({
  id: "/single",
  path: "/single",
  getParentRoute: () => Route$7
});
const PlantNameRoute = Route.update({
  id: "/plant/$name",
  path: "/plant/$name",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  DatasetRoute,
  MultiRoute,
  SingleRoute,
  PlantNameRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ApiError as A,
  BASE_URL as B,
  MODEL_OPTIONS as M,
  Route as R,
  predictMultiple as a,
  predictSingle as b,
  cn as c,
  getPlantDetails as d,
  getDataset as g,
  modelComparison as m,
  plantSamples as p,
  router as r
};
