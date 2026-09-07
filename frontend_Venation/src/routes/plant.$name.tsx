import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Leaf, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ApiError, getPlantDetails, type PlantDetails } from "@/lib/api";
import { downloadImage, filenameFromUrl } from "@/lib/image-actions";

export const Route = createFileRoute("/plant/$name")({
  head: () => ({
    meta: [
      { title: "Plant Details - VenaLeaf AI" },
      { name: "description", content: "Medicinal plant details and sample image." },
    ],
  }),
  component: PlantDetailsPage,
});

function PlantDetailsPage() {
  const { name } = Route.useParams();
  const [plant, setPlant] = useState<PlantDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getPlantDetails(name)
      .then((data) => {
        if (active) setPlant(data);
      })
      .catch((error) => {
        const message = error instanceof ApiError ? error.message : "Plant details unavailable.";
        toast.error("Could not load plant", { description: message });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [name]);

  const handleDownload = async () => {
    if (!plant?.image) return;
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/dataset"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-smooth hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Dataset
      </Link>

      {loading && (
        <div className="mt-10 grid min-h-[420px] place-items-center rounded-3xl glass">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm font-semibold">Loading plant details...</p>
          </div>
        </div>
      )}

      {!loading && plant && (
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-3xl glass">
            <img
              src={plant.image}
              alt={plant.name}
              className="aspect-square h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <section className="rounded-3xl glass p-6 lg:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold">
              <Leaf className="h-3 w-3" />
              Plant Details
            </span>
            <h1 className="mt-5 text-3xl font-bold sm:text-4xl">{plant.name}</h1>
            <p className="mt-2 text-sm italic text-muted-foreground">{plant.scientificName}</p>
            <p className="mt-6 text-muted-foreground">{plant.description}</p>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Medicinal Uses</h2>
              <ul className="mt-3 grid gap-2">
                {plant.uses.split(", ").map((use) => (
                  <li key={use} className="rounded-xl bg-secondary px-4 py-3 text-sm">
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="mt-8 inline-flex items-center gap-2 rounded-xl gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
            >
              <Download className="h-4 w-4" />
              Download Image
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
