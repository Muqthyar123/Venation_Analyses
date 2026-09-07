import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SectionHeader } from "./SectionHeader-CYDJ38mK.mjs";
import { d as Sparkles, e as ArrowRight, D as Database, f as ScanSearch, B as Brain, g as Layers, T as Target, h as GitBranch, L as Leaf } from "../_libs/lucide-react.mjs";
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
const heroBanner = "/assets/hero-banner-BoEGvt1W.jpg";
const features = [{
  icon: ScanSearch,
  title: "Venation Analysis",
  desc: "Frangi filter and edge detection extract intricate leaf vein patterns."
}, {
  icon: Brain,
  title: "Deep Learning Models",
  desc: "ResNet50, VenationNet, and HybridNet trained on 30 species."
}, {
  icon: Layers,
  title: "Multi-Modal Fusion",
  desc: "Combines RGB, venation, and edge features for robust recognition."
}, {
  icon: Target,
  title: "High Accuracy",
  desc: "98.2% top-1 accuracy on our curated medicinal plant dataset."
}];
const stats = [{
  value: "30",
  label: "Plant Species"
}, {
  value: "1500+",
  label: "Training Images"
}, {
  value: "98%",
  label: "Model Accuracy"
}, {
  value: "4",
  label: "Deep Models"
}];
const workflow = [{
  icon: ScanSearch,
  title: "Image Upload"
}, {
  icon: Sparkles,
  title: "Preprocessing"
}, {
  icon: GitBranch,
  title: "Venation Extraction"
}, {
  icon: Brain,
  title: "Model Prediction"
}, {
  icon: Leaf,
  title: "Result"
}];
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden gradient-hero text-primary-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBanner, alt: "", className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            " IEEE Research Project 2025"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl", children: [
            "Venation-Aware AI for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block bg-gradient-to-r from-primary-glow to-white bg-clip-text text-transparent", children: "Medicinal Plant Recognition" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-primary-foreground/85 max-w-xl", children: "A multi-modal deep learning framework that fuses RGB imagery with extracted leaf venation to identify 30 medicinal plant species with state-of-the-art accuracy." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/single", className: "inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-elegant transition-smooth hover:scale-105", children: [
              "Single Prediction ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/multi", className: "inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold text-white transition-smooth hover:bg-white/20", children: "Multi Prediction" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dataset", className: "inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-smooth hover:bg-white/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4" }),
              " View Dataset"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block animate-float", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-3xl bg-primary-glow/30 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBanner, alt: "AI venation leaf", className: "relative rounded-3xl shadow-elegant", width: 1536, height: 1024 })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Core Capabilities", title: "A new lens on plant intelligence", subtitle: "Combining classical computer vision with modern deep learning to unlock the hidden language of leaves." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group glass rounded-2xl p-6 hover-lift", style: {
        animationDelay: `${i * 80}ms`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl gradient-primary shadow-glow transition-smooth group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-6 w-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-semibold text-lg", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: f.desc })
      ] }, f.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/50 border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl sm:text-5xl font-bold text-gradient", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground font-medium", children: s.label })
    ] }, s.label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "How It Works", title: "From leaf to label in seconds", subtitle: "A five-stage pipeline that turns a single photograph into a confident species prediction." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 flex flex-wrap justify-center items-center gap-3 lg:gap-2", children: workflow.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl glass shadow-card transition-smooth group-hover:scale-110 group-hover:shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(w.icon, { className: "h-7 w-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-center max-w-[100px]", children: w.title })
        ] }),
        i < workflow.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground hidden sm:block" })
      ] }, w.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl gradient-hero p-10 lg:p-16 text-center text-primary-foreground shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl sm:text-4xl font-bold", children: "Ready to identify your first plant?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-primary-foreground/85 max-w-2xl mx-auto", children: "Upload a leaf image and let our HybridNet-MSVD model do the rest." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/single", className: "mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-glow transition-smooth hover:scale-105", children: [
        "Try Single Prediction ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
