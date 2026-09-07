import { Brain } from "lucide-react";
import { MODEL_OPTIONS, type ModelName } from "@/lib/api";

interface Props {
  value: ModelName;
  onChange: (value: ModelName) => void;
  disabled?: boolean;
}

export function ModelSelect({ value, onChange, disabled = false }: Props) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <Brain className="h-4 w-4 text-primary" />
        Model
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value as ModelName)}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium outline-none transition-smooth focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {MODEL_OPTIONS.map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
    </label>
  );
}
