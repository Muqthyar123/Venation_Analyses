import { FolderUp, Images, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  accept?: string;
  hint?: string;
  onError?: (message: string) => void;
  maxSizeMb?: number;
}

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png"]);

export function UploadDropzone({
  multiple = false,
  onFiles,
  accept = ".jpg,.jpeg,.png,image/jpeg,image/png",
  hint,
  onError,
  maxSizeMb = 10,
}: Props) {
  const [drag, setDrag] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handle = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const maxBytes = maxSizeMb * 1024 * 1024;
      const rejected: string[] = [];
      const files = Array.from(list).filter((f) => {
        if (!ALLOWED_TYPES.has(f.type)) {
          rejected.push(`${f.name}: unsupported format`);
          return false;
        }
        if (f.size > maxBytes) {
          rejected.push(`${f.name}: larger than ${maxSizeMb} MB`);
          return false;
        }
        return true;
      });
      if (rejected.length) onError?.(rejected.slice(0, 3).join("; "));
      if (files.length) onFiles(multiple ? files : [files[0]]);
    },
    [maxSizeMb, multiple, onError, onFiles],
  );

  const openFiles = () => fileInputRef.current?.click();
  const openFolder = () => folderInputRef.current?.click();

  return (
    <div
      onClick={openFiles}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handle(e.dataTransfer.files);
      }}
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-smooth",
        drag
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border hover:border-primary/50 hover:bg-accent/30",
      )}
    >
      <div className="grid h-14 w-14 place-items-center rounded-full gradient-primary shadow-glow">
        <Upload className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <p className="font-medium">Drop your image{multiple ? "s" : ""} here</p>
        <p className="text-sm text-muted-foreground mt-1">
          {hint ?? "or click to browse - PNG, JPG up to 10 MB"}
        </p>
      </div>

      {multiple && (
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openFiles();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 text-xs font-semibold transition-smooth hover:bg-accent"
          >
            <Images className="h-3.5 w-3.5" />
            Browse Images
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openFolder();
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 px-3 py-2 text-xs font-semibold transition-smooth hover:bg-accent"
          >
            <FolderUp className="h-3.5 w-3.5" />
            Browse Folder
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = "";
        }}
      />

      {multiple && (
        <input
          ref={folderInputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          // @ts-expect-error non-standard but supported by Chromium for folder upload
          webkitdirectory=""
          onChange={(e) => {
            handle(e.target.files);
            e.target.value = "";
          }}
        />
      )}
    </div>
  );
}
