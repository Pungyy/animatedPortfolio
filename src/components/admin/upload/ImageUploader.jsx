import { useRef, useState } from "react";
import {
  ImagePlus,
  Trash2,
  UploadCloud,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function ImageUploader({
  value,
  onUpload,
}) {
  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  function validate(file) {
    if (!file) return false;

    if (!file.type.startsWith("image/")) {
      toast.error("Le fichier sélectionné n'est pas une image.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5 Mo.");
      return false;
    }

    return true;
  }

  async function handleFile(file) {
    if (!validate(file)) return;

    try {
      setUploading(true);

      await onUpload(file);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!uploading) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);

          if (uploading) return;

          handleFile(e.dataTransfer.files[0]);
        }}
        className={`group relative flex min-h-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200 ${
          dragging
            ? "border-violet-500 bg-violet-500/10"
            : "border-zinc-700 hover:border-violet-500"
        }`}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Couverture"
              className="h-full max-h-[450px] w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
              <div className="flex flex-col items-center gap-3 text-white">
                <ImagePlus size={42} />
                <p>Cliquer pour remplacer l'image</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-5 text-zinc-400">
            {uploading ? (
              <>
                <Loader2
                  size={48}
                  className="animate-spin"
                />

                <p>Upload en cours...</p>
              </>
            ) : (
              <>
                <UploadCloud size={52} />

                <div className="text-center">
                  <p className="font-medium text-white">
                    Dépose ton image ici
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    ou clique pour sélectionner un fichier
                  </p>

                  <p className="mt-4 text-xs">
                    PNG • JPG • WEBP
                    <br />
                    Maximum 5 Mo
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleFile(e.target.files[0])
        }
      />

      <div className="flex gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ImagePlus size={18} />

          {value ? "Remplacer" : "Choisir une image"}
        </button>

        {value && (
          <button
            type="button"
            disabled={uploading}
            onClick={() => onUpload(null)}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={18} />
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
}