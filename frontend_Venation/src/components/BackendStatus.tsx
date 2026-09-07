import { Activity, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { getHealth, type HealthResponse } from "@/lib/api";
import { cn } from "@/lib/utils";

export function BackendStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [online, setOnline] = useState(false);

  useEffect(() => {
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
    const id = window.setInterval(check, 30000);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div
      title={
        online
          ? `${health?.app_name ?? "Backend"} online`
          : "Backend offline. Predictions will be unavailable until FastAPI is running."
      }
      className={cn(
        "hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
        online
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-destructive/30 bg-destructive/10 text-destructive",
      )}
    >
      {online ? <Activity className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
      {online ? "Backend Online" : "Backend Offline"}
    </div>
  );
}
