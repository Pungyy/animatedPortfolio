import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

// Fond sombre + bord clair : le bouton reste visible même par-dessus une
// image à fond blanc.
const BTN =
  "flex items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 shadow-[0_2px_14px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

// Dégradé qui fait disparaître les vignettes en douceur sur les bords.
const STRIP_MASK =
  "linear-gradient(to right, transparent, #000 20px, #000 calc(100% - 20px), transparent)";

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
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (delta) => {
      setDirection(delta);
      setCurrentIndex((i) => (i + delta + total) % total);
    },
    [setCurrentIndex, total]
  );

  const previous = useCallback(() => go(-1), [go]);
  const next = useCallback(() => go(1), [go]);

  const jumpTo = useCallback(
    (i) => {
      setDirection(i > currentIndex ? 1 : -1);
      setCurrentIndex(i);
    },
    [currentIndex, setCurrentIndex]
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
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
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
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-4 pb-28 pt-16 sm:px-24"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={close}
            drag={total > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) next();
              else if (info.offset.x > 70) previous();
            }}
          >
            <motion.img
              key={currentImage.id ?? currentIndex}
              src={currentImage.image_url}
              alt={currentImage.alt ?? `Aperçu ${currentIndex + 1}`}
              draggable={false}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.24, ease: EASE }}
              className="max-h-full w-auto max-w-4xl select-none rounded-xl object-contain shadow-2xl"
            />
          </motion.div>

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

          {/* Bande de vignettes */}
          {total > 1 && (
            <div
              className="absolute inset-x-0 bottom-0 z-20 pb-5 pt-2"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="no-scrollbar mx-auto flex max-w-[min(100%,32rem)] gap-1.5 overflow-x-auto px-5"
                style={{ maskImage: STRIP_MASK, WebkitMaskImage: STRIP_MASK }}
              >
                {images.map((image, i) => {
                  const active = i === currentIndex;
                  return (
                    <button
                      key={image.id ?? i}
                      ref={active ? activeThumbRef : undefined}
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-label={`Aperçu ${i + 1}`}
                      aria-current={active}
                      className={
                        "h-10 w-14 shrink-0 overflow-hidden rounded-md transition-all duration-200 sm:h-11 sm:w-16 " +
                        (active
                          ? "opacity-100 ring-2 ring-white"
                          : "opacity-30 hover:opacity-70")
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
