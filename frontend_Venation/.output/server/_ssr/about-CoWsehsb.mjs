import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SectionHeader } from "./SectionHeader-CYDJ38mK.mjs";
import { m as modelComparison } from "./router-CUGH8Usq.mjs";
import "../_libs/sonner.mjs";
import { i as Microscope, F as FileText, C as Check, g as Layers, R as Rocket } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const venationArchitecture = "/assets/Venation%20Architecture-DL1w299r.png";
const objectives = ["Build a curated dataset of 30 medicinal plant species with venation focus", "Develop preprocessing pipelines: CLAHE, Frangi, Canny", "Train ResNet50, VenationNet, and Dual Stream CNN baselines", "Propose HybridNet-MSVD: a fused multi-modal architecture", "Achieve ≥ 98% top-1 accuracy on held-out test set"];
const preprocessing = [{
  name: "RGB Processing",
  desc: "Standard normalization and resizing to 224×224."
}, {
  name: "CLAHE",
  desc: "Contrast Limited Adaptive Histogram Equalization for venation enhancement."
}, {
  name: "Frangi Filter",
  desc: "Multi-scale Hessian-based vesselness filter to amplify vein structures."
}, {
  name: "Canny Edge",
  desc: "Gradient-based edge detection capturing leaf contours and venation network."
}];
const models = [{
  name: "Modified ResNet50",
  desc: "Adapted residual backbone with botanical fine-tuning and dropout regularisation."
}, {
  name: "Multi-Scale VenationNet",
  desc: "Custom CNN with parallel receptive fields targeting fine and coarse venation."
}, {
  name: "HybridNet-MSVD",
  desc: "Our proposed network — fuses RGB + venation streams with cross-attention."
}, {
  name: "Dual Stream CNN + CBAM",
  desc: "Two-stream architecture with Convolutional Block Attention Modules."
}];
const tech = ["Python", "TensorFlow", "PyTorch", "OpenCV", "React", "Tailwind"];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "About the Project", title: "Decoding plants with venation-aware AI", subtitle: "A research project combining computer vision, deep learning, and botanical science to identify medicinal plants from leaf imagery." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-8 hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Microscope, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-bold", children: "Project Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: "Medicinal plant misidentification poses serious risks in traditional medicine and pharmacology. Existing image-based classifiers rely heavily on global leaf shape — yet the most discriminative botanical signature lies in the venation pattern. Our project explicitly models leaf venation as a distinct modality, fused with RGB cues, to deliver robust and explainable species recognition." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-8 hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-bold", children: "Problem Statement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground leading-relaxed", children: "Conventional CNNs achieve ~90% accuracy on plant datasets but fail on visually similar species sharing similar leaf shape. We address this by extracting and learning from venation patterns through a dedicated processing stream and multi-modal fusion." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Goals", title: "Research Objectives" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto", children: objectives.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 glass rounded-xl p-4 hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: o })
      ] }, o)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Dataset", title: "1,500+ images across 30 species", subtitle: "Curated from open botanical sources, augmented with horizontal flips, rotations, and venation-preserving transforms." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto", children: [{
        k: "30",
        v: "Species"
      }, {
        k: "1500+",
        v: "Images"
      }, {
        k: "80/10/10",
        v: "Train/Val/Test"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center rounded-xl bg-secondary/50 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-gradient", children: s.k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: s.v })
      ] }, s.v)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Pipeline", title: "Preprocessing Techniques" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: preprocessing.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-6 w-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-3 font-semibold", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: p.desc })
      ] }, p.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Architecture", title: "Workflow Diagram" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 glass rounded-3xl p-4 sm:p-6 lg:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { className: "overflow-hidden rounded-2xl border border-border bg-background shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: venationArchitecture, alt: "Venation-aware HybridNet-MSVD architecture workflow", className: "h-auto w-full object-contain", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-sm text-muted-foreground", children: "RGB stream and venation-enhanced structural features are fused for medicinal plant species classification." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Models", title: "Deep Learning Architectures Used" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid sm:grid-cols-2 gap-5", children: models.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-bold", children: m.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: m.desc })
      ] }, m.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Results", title: "Model Accuracy Comparison" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 glass rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-4 font-semibold", children: "Model" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-4 font-semibold", children: "Accuracy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-4 font-semibold", children: "Parameters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-4 font-semibold", children: "Inference" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: modelComparison.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-accent/30 transition-smooth", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-medium", children: m.model }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
              m.accuracy,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-20 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-full gradient-primary", style: {
              width: `${m.accuracy}%`
            } }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-muted-foreground", children: m.params }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-muted-foreground", children: m.inference })
        ] }, m.model)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Stack", title: "Technologies Used" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap justify-center gap-3", children: tech.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full glass px-5 py-2 text-sm font-semibold hover-lift cursor-default", children: t }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-bold", children: "Future Scope" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Extend dataset to 100+ medicinal species across global flora" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Mobile deployment with on-device inference (TFLite / CoreML)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Integrate spectral imaging for chemical composition estimation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Explainability dashboards with Grad-CAM venation heatmaps" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Publication", title: "References" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 glass rounded-2xl p-6 space-y-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '[1] He et al., "Deep Residual Learning for Image Recognition", CVPR 2016.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '[2] Frangi et al., "Multiscale Vessel Enhancement Filtering", MICCAI 1998.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '[3] Woo et al., "CBAM: Convolutional Block Attention Module", ECCV 2018.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '[4] Our Paper — "Venation-Aware Multi-Modal Deep Learning for Medicinal Plant Species Recognition", IEEE 2025.' })
      ] })
    ] })
  ] });
}
export {
  About as component
};
