import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Fond sombre + bord clair : le bouton reste visible même par-dessus une
// image à fond blanc.
const BTN =
  "flex items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 shadow-[0_2px_14px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

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

  const activeThumbRef = useRef(null);

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

  // Recentre la vignette active dans la bande.
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [currentIndex]);

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
          className="fixed inset-0 z-[9999] bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={close}
        >
          {/* Compteur */}
          <span className="pointer-events-none absolute left-5 top-5 z-20 text-xs font-medium tabular-nums tracking-[0.15em] text-white/45">
            {String(currentIndex + 1).padStart(2, "0")}
            <span className="mx-1.5 text-white/20">/</span>
            {String(total).padStart(2, "0")}
          </span>

          {/* Fermer */}
          <button
            type="button"
            onClick={close}
            className={`${BTN} absolute right-4 top-4 z-20 h-9 w-9`}
            aria-label="Fermer"
          >
            <X size={17} />
          </button>

          {/* Image */}
          <div
            className="absolute inset-0 flex items-center justify-center px-4 pb-28 pt-16 sm:px-24"
            onClick={close}
          >
            <motion.img
              key={currentImage.id ?? currentImage.image_url}
              src={currentImage.image_url}
              alt={currentImage.alt ?? `Aperçu ${currentIndex + 1}`}
              draggable={false}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
              className="max-h-full w-auto max-w-4xl select-none rounded-xl object-contain shadow-2xl"
            />

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    previous();
                  }}
                  className={`${BTN} absolute left-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 sm:left-5 sm:h-11 sm:w-11`}
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
                  className={`${BTN} absolute right-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 sm:right-5 sm:h-11 sm:w-11`}
                  aria-label="Image suivante"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Bande de vignettes */}
          {total > 1 && (
            <div
              className="absolute inset-x-0 bottom-0 z-20 pb-5 pt-2"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="no-scrollbar mx-auto flex max-w-[min(100%,32rem)] gap-1.5 overflow-x-auto px-4">
                {images.map((image, i) => {
                  const active = i === currentIndex;
                  return (
                    <button
                      key={image.id ?? image.image_url}
                      ref={active ? activeThumbRef : undefined}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Aperçu ${i + 1}`}
                      aria-current={active}
                      className={
                        "h-10 w-14 shrink-0 overflow-hidden rounded-md transition sm:h-11 sm:w-16 " +
                        (active
                          ? "opacity-100 ring-2 ring-white"
                          : "opacity-35 hover:opacity-70")
                      }
                    >
                      <img
                        src={image.image_url}
                        alt=""
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
