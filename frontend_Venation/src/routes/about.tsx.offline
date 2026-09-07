import { createFileRoute } from "@tanstack/react-router";
import { Check, FileText, Layers, Microscope, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import venationArchitecture from "@/images/Venation Architecture.png";
import { modelComparison } from "@/lib/mock-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VenaLeaf AI" },
      {
        name: "description",
        content:
          "Project overview, methodology, models, dataset, and references for our venation-aware medicinal plant recognition system.",
      },
    ],
  }),
  component: About,
});

const objectives = [
  "Build a curated dataset of 30 medicinal plant species with venation focus",
  "Develop preprocessing pipelines: CLAHE, Frangi, Canny",
  "Train ResNet50, VenationNet, and Dual Stream CNN baselines",
  "Propose HybridNet-MSVD: a fused multi-modal architecture",
  "Achieve ≥ 98% top-1 accuracy on held-out test set",
];

const preprocessing = [
  { name: "RGB Processing", desc: "Standard normalization and resizing to 224×224." },
  {
    name: "CLAHE",
    desc: "Contrast Limited Adaptive Histogram Equalization for venation enhancement.",
  },
  {
    name: "Frangi Filter",
    desc: "Multi-scale Hessian-based vesselness filter to amplify vein structures.",
  },
  {
    name: "Canny Edge",
    desc: "Gradient-based edge detection capturing leaf contours and venation network.",
  },
];

const models = [
  {
    name: "Modified ResNet50",
    desc: "Adapted residual backbone with botanical fine-tuning and dropout regularisation.",
  },
  {
    name: "Multi-Scale VenationNet",
    desc: "Custom CNN with parallel receptive fields targeting fine and coarse venation.",
  },
  {
    name: "HybridNet-MSVD",
    desc: "Our proposed network — fuses RGB + venation streams with cross-attention.",
  },
  {
    name: "Dual Stream CNN + CBAM",
    desc: "Two-stream architecture with Convolutional Block Attention Modules.",
  },
];

const tech = ["Python", "TensorFlow", "PyTorch", "OpenCV", "React", "Tailwind"];

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">
      <SectionHeader
        eyebrow="About the Project"
        title="Decoding plants with venation-aware AI"
        subtitle="A research project combining computer vision, deep learning, and botanical science to identify medicinal plants from leaf imagery."
      />

      {/* Overview & Problem */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-8 hover-lift">
          <Microscope className="h-8 w-8 text-primary" />
          <h3 className="mt-4 text-2xl font-bold">Project Overview</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Medicinal plant misidentification poses serious risks in traditional medicine and
            pharmacology. Existing image-based classifiers rely heavily on global leaf shape — yet
            the most discriminative botanical signature lies in the venation pattern. Our project
            explicitly models leaf venation as a distinct modality, fused with RGB cues, to deliver
            robust and explainable species recognition.
          </p>
        </div>
        <div className="glass rounded-2xl p-8 hover-lift">
          <FileText className="h-8 w-8 text-primary" />
          <h3 className="mt-4 text-2xl font-bold">Problem Statement</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Conventional CNNs achieve ~90% accuracy on plant datasets but fail on visually similar
            species sharing similar leaf shape. We address this by extracting and learning from
            venation patterns through a dedicated processing stream and multi-modal fusion.
          </p>
        </div>
      </div>

      {/* Objectives */}
      <div>
        <SectionHeader eyebrow="Goals" title="Research Objectives" />
        <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {objectives.map((o) => (
            <div key={o} className="flex gap-3 glass rounded-xl p-4 hover-lift">
              <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-primary">
                <Check className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <p className="text-sm">{o}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset */}
      <div className="glass rounded-3xl p-10">
        <SectionHeader
          eyebrow="Dataset"
          title="1,500+ images across 30 species"
          subtitle="Curated from open botanical sources, augmented with horizontal flips, rotations, and venation-preserving transforms."
        />
        <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { k: "30", v: "Species" },
            { k: "1500+", v: "Images" },
            { k: "80/10/10", v: "Train/Val/Test" },
          ].map((s) => (
            <div key={s.v} className="text-center rounded-xl bg-secondary/50 p-5">
              <div className="text-3xl font-bold text-gradient">{s.k}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Preprocessing */}
      <div>
        <SectionHeader eyebrow="Pipeline" title="Preprocessing Techniques" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {preprocessing.map((p) => (
            <div key={p.name} className="glass rounded-2xl p-6 hover-lift">
              <Layers className="h-6 w-6 text-primary" />
              <h4 className="mt-3 font-semibold">{p.name}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture diagram */}
      <div>
        <SectionHeader eyebrow="Architecture" title="Workflow Diagram" />
        <div className="mt-10 glass rounded-3xl p-4 sm:p-6 lg:p-8">
          <figure className="overflow-hidden rounded-2xl border border-border bg-background shadow-card">
            <img
              src={venationArchitecture}
              alt="Venation-aware HybridNet-MSVD architecture workflow"
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </figure>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            RGB stream and venation-enhanced structural features are fused for medicinal plant
            species classification.
          </p>
        </div>
      </div>

      {/* Models */}
      <div>
        <SectionHeader eyebrow="Models" title="Deep Learning Architectures Used" />
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {models.map((m) => (
            <div key={m.name} className="glass rounded-2xl p-6 hover-lift">
              <h4 className="text-lg font-bold">{m.name}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accuracy Table */}
      <div>
        <SectionHeader eyebrow="Results" title="Model Accuracy Comparison" />
        <div className="mt-10 glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 font-semibold">Model</th>
                <th className="text-left p-4 font-semibold">Accuracy</th>
                <th className="text-left p-4 font-semibold">Parameters</th>
                <th className="text-left p-4 font-semibold">Inference</th>
              </tr>
            </thead>
            <tbody>
              {modelComparison.map((m) => (
                <tr
                  key={m.model}
                  className="border-t border-border hover:bg-accent/30 transition-smooth"
                >
                  <td className="p-4 font-medium">{m.model}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2">
                      <span className="font-semibold text-primary">{m.accuracy}%</span>
                      <span className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
                        <span
                          className="block h-full gradient-primary"
                          style={{ width: `${m.accuracy}%` }}
                        />
                      </span>
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{m.params}</td>
                  <td className="p-4 text-muted-foreground">{m.inference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tech */}
      <div>
        <SectionHeader eyebrow="Stack" title="Technologies Used" />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full glass px-5 py-2 text-sm font-semibold hover-lift cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Future Scope */}
      <div className="glass rounded-3xl p-10">
        <Rocket className="h-8 w-8 text-primary" />
        <h3 className="mt-4 text-2xl font-bold">Future Scope</h3>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li>• Extend dataset to 100+ medicinal species across global flora</li>
          <li>• Mobile deployment with on-device inference (TFLite / CoreML)</li>
          <li>• Integrate spectral imaging for chemical composition estimation</li>
          <li>• Explainability dashboards with Grad-CAM venation heatmaps</li>
        </ul>
      </div>

      {/* References */}
      <div>
        <SectionHeader eyebrow="Publication" title="References" />
        <div className="mt-8 glass rounded-2xl p-6 space-y-3 text-sm text-muted-foreground">
          <p>[1] He et al., "Deep Residual Learning for Image Recognition", CVPR 2016.</p>
          <p>[2] Frangi et al., "Multiscale Vessel Enhancement Filtering", MICCAI 1998.</p>
          <p>[3] Woo et al., "CBAM: Convolutional Block Attention Module", ECCV 2018.</p>
          <p>
            [4] Our Paper — "Venation-Aware Multi-Modal Deep Learning for Medicinal Plant Species
            Recognition", IEEE 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
