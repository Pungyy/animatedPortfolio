import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Fond sombre + bord clair : le bouton reste visible même par-dessus une
// image à fond blanc.
const BTN =
  "flex items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/25 shadow-[0_2px_14px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

export default function GalleryViewer({
  open,
  images,
  currentIndex,
  setCurrentIndex,
  close,
}) {
  const total = images.length;
  const currentImage =
    currentIndex >= 0 && currentIndex < total ? images[currentIndex] : null;

  const previous = useCallback(
    () => setCurrentIndex((i) => (i <= 0 ? total - 1 : i - 1)),
    [setCurrentIndex, total]
  );

  const next = useCallback(
    () => setCurrentIndex((i) => (i >= total - 1 ? 0 : i + 1)),
    [setCurrentIndex, total]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (event) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") previous();
      else if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, previous, next]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!currentImage || total < 2) return;

    [(currentIndex + 1) % total, (currentIndex - 1 + total) % total].forEach(
      (i) => {
        const img = new Image();
        img.src = images[i].image_url;
      }
    );
  }, [currentImage, currentIndex, images, total]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && currentImage && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Galerie du projet"
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          {/* Barre du haut */}
          <div
            className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="text-xs font-medium tabular-nums tracking-[0.15em] text-white/55">
              {String(currentIndex + 1).padStart(2, "0")}
              <span className="mx-1.5 text-white/25">/</span>
              {String(total).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={close}
              className={`${BTN} h-9 w-9`}
              aria-label="Fermer"
            >
              <X size={17} />
            </button>
          </div>

          {/* Image */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-2 sm:px-20"
            onClick={close}
          >
            <motion.img
              key={currentImage.id ?? currentImage.image_url}
              src={currentImage.image_url}
              alt={currentImage.alt ?? `Aperçu ${currentIndex + 1}`}
              draggable={false}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl"
            />

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    previous();
                  }}
                  className={`${BTN} absolute left-1.5 top-1/2 h-10 w-10 -translate-y-1/2 sm:left-6 sm:h-11 sm:w-11`}
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    next();
                  }}
                  className={`${BTN} absolute right-1.5 top-1/2 h-10 w-10 -translate-y-1/2 sm:right-6 sm:h-11 sm:w-11`}
                  aria-label="Image suivante"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Miniatures */}
          {total > 1 && (
            <div
              className="shrink-0 overflow-x-auto px-4 py-3 sm:px-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto flex w-max gap-2">
                {images.map((image, i) => (
                  <button
                    key={image.id ?? image.image_url}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Aperçu ${i + 1}`}
                    aria-current={i === currentIndex}
                    className={
                      "h-12 w-16 shrink-0 overflow-hidden rounded-md transition sm:h-14 sm:w-20 " +
                      (i === currentIndex
                        ? "ring-2 ring-white"
                        : "opacity-40 hover:opacity-80")
                    }
                  >
                    <img
                      src={image.image_url}
                      alt=""
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
