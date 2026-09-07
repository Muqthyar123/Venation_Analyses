import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Database,
  GitBranch,
  Layers,
  Leaf,
  ScanSearch,
  Sparkles,
  Target,
} from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VenaLeaf AI — Medicinal Plant Recognition" },
      {
        name: "description",
        content:
          "Identify medicinal plant species using venation-aware multi-modal deep learning. Powered by HybridNet-MSVD.",
      },
    ],
  }),
  component: Home,
});

const features = [
  { icon: ScanSearch, title: "Venation Analysis", desc: "Frangi filter and edge detection extract intricate leaf vein patterns." },
  { icon: Brain, title: "Deep Learning Models", desc: "ResNet50, VenationNet, and HybridNet trained on 30 species." },
  { icon: Layers, title: "Multi-Modal Fusion", desc: "Combines RGB, venation, and edge features for robust recognition." },
  { icon: Target, title: "High Accuracy", desc: "98.2% top-1 accuracy on our curated medicinal plant dataset." },
];

const stats = [
  { value: "30", label: "Plant Species" },
  { value: "1500+", label: "Training Images" },
  { value: "98%", label: "Model Accuracy" },
  { value: "4", label: "Deep Models" },
];

const workflow = [
  { icon: ScanSearch, title: "Image Upload" },
  { icon: Sparkles, title: "Preprocessing" },
  { icon: GitBranch, title: "Venation Extraction" },
  { icon: Brain, title: "Model Prediction" },
  { icon: Leaf, title: "Result" },
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-30">
          <img src={heroBanner} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold">
                <Sparkles className="h-3 w-3" /> IEEE Research Project 2025
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Venation-Aware AI for{" "}
                <span className="block bg-gradient-to-r from-primary-glow to-white bg-clip-text text-transparent">
                  Medicinal Plant Recognition
                </span>
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/85 max-w-xl">
                A multi-modal deep learning framework that fuses RGB imagery with extracted leaf
                venation to identify 30 medicinal plant species with state-of-the-art accuracy.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/single"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-elegant transition-smooth hover:scale-105"
                >
                  Single Prediction <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/multi"
                  className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold text-white transition-smooth hover:bg-white/20"
                >
                  Multi Prediction
                </Link>
                <Link
                  to="/dataset"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-smooth hover:bg-white/10"
                >
                  <Database className="h-4 w-4" /> View Dataset
                </Link>
              </div>
            </div>
            <div className="hidden lg:block animate-float">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-primary-glow/30 blur-3xl"></div>
                <img
                  src={heroBanner}
                  alt="AI venation leaf"
                  className="relative rounded-3xl shadow-elegant"
                  width={1536}
                  height={1024}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Capabilities"
          title="A new lens on plant intelligence"
          subtitle="Combining classical computer vision with modern deep learning to unlock the hidden language of leaves."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group glass rounded-2xl p-6 hover-lift"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary shadow-glow transition-smooth group-hover:scale-110">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-gradient">{s.value}</div>
                <div className="mt-2 text-sm text-muted-foreground font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How It Works"
          title="From leaf to label in seconds"
          subtitle="A five-stage pipeline that turns a single photograph into a confident species prediction."
        />
        <div className="mt-14 flex flex-wrap justify-center items-center gap-3 lg:gap-2">
          {workflow.map((w, i) => (
            <div key={w.title} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-2 group">
                <div className="grid h-16 w-16 place-items-center rounded-2xl glass shadow-card transition-smooth group-hover:scale-110 group-hover:shadow-glow">
                  <w.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="text-xs font-semibold text-center max-w-[100px]">{w.title}</span>
              </div>
              {i < workflow.length - 1 && (
                <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-10 lg:p-16 text-center text-primary-foreground shadow-elegant">
          <h3 className="text-3xl sm:text-4xl font-bold">Ready to identify your first plant?</h3>
          <p className="mt-4 text-primary-foreground/85 max-w-2xl mx-auto">
            Upload a leaf image and let our HybridNet-MSVD model do the rest.
          </p>
          <Link
            to="/single"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-glow transition-smooth hover:scale-105"
          >
            Try Single Prediction <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
