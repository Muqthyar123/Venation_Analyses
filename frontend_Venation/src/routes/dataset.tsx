import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Download, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getDataset, type PlantDetails } from "@/lib/api";
import { downloadImage, filenameFromUrl, storePredictionImage } from "@/lib/image-actions";
import { plantSamples } from "@/lib/mock-data";

export const Route = createFileRoute("/dataset")({
  head: () => ({
    meta: [
      { title: "Dataset — VenaLeaf AI" },
      {
        name: "description",
        content: "Browse and download sample medicinal plant images from our dataset.",
      },
    ],
  }),
  component: Dataset,
});

function Dataset() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [samples, setSamples] = useState(plantSamples);
  useEffect(() => {
    getDataset()
      .then(setSamples)
      .catch(() =>
        toast.error("Dataset unavailable", { description: "Showing local sample data." }),
      );
  }, []);
  const filtered = useMemo(
    () =>
      samples.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.scientificName.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, samples],
  );

  const handleDownload = async (plant: PlantDetails) => {
    try {
      await downloadImage(
        plant.downloadUrl ?? plant.image,
        filenameFromUrl(plant.image, `${plant.name}.jpg`),
      );
      toast.success("Download started", { description: plant.name });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not download image.";
      toast.error("Download failed", { description: message });
    }
  };

  const handleUseForPrediction = (plant: PlantDetails) => {
    try {
      storePredictionImage(plant);
      toast.success("Image sent to prediction", { description: plant.name });
      navigate({ to: "/single" });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not send image to prediction.";
      toast.error("Navigation failed", { description: message });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold">
          <Sparkles className="h-3 w-3" /> Sample Dataset
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">Medicinal Plant Library</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Browse representative samples from our 30-species training set. Download any sample to
          test the model.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or scientific name..."
          className="w-full pl-11 pr-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="group glass rounded-2xl overflow-hidden hover-lift">
            <div className="aspect-square overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-smooth group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-xs italic text-muted-foreground">{p.scientificName}</p>
              <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{p.uses}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDownload(p)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-smooth hover:bg-accent"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
                <Link
                  to="/plant/$name"
                  params={{ name: p.scientificName }}
                  className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-semibold transition-smooth hover:bg-accent"
                >
                  Details
                </Link>
                <button
                  type="button"
                  onClick={() => handleUseForPrediction(p)}
                  className="col-span-2 inline-flex items-center justify-center rounded-lg gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-smooth hover:scale-[1.02]"
                >
                  Use for Prediction
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!filtered.length && (
        <p className="text-center text-muted-foreground py-12">No plants match your search.</p>
      )}
    </div>
  );
}
