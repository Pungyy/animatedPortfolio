import { useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import GalleryControls from "./GalleryControls";
import GalleryCounter from "./GalleryCounter";

export default function GalleryViewer({
  open,
  images,
  currentIndex,
  setCurrentIndex,
  close,
}) {
  const totalImages = images.length;

  const currentImage = useMemo(() => {
    if (currentIndex < 0 || currentIndex >= totalImages) {
      return null;
    }

    return images[currentIndex];
  }, [images, currentIndex, totalImages]);

  const previous = useCallback(() => {
    setCurrentIndex((index) =>
      index <= 0 ? totalImages - 1 : index - 1
    );
  }, [setCurrentIndex, totalImages]);

  const next = useCallback(() => {
    setCurrentIndex((index) =>
      index >= totalImages - 1 ? 0 : index + 1
    );
  }, [setCurrentIndex, totalImages]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "Escape":
          close();
          break;

        case "ArrowLeft":
          previous();
          break;

        case "ArrowRight":
          next();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close, previous, next]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!currentImage) {
      return;
    }

    const preload = [];

    const previousIndex =
      currentIndex === 0
        ? totalImages - 1
        : currentIndex - 1;

    const nextIndex =
      currentIndex === totalImages - 1
        ? 0
        : currentIndex + 1;

    [previousIndex, nextIndex].forEach((index) => {
      const img = new Image();
      img.src = images[index].image_url;
      preload.push(img);
    });

    return () => {
      preload.length = 0;
    };
  }, [currentImage, currentIndex, images, totalImages]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && currentImage && (
                <motion.div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/75
            backdrop-blur-2xl
            p-6
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.25,
          }}
          onClick={close}
        >
          <motion.div
            className="
              relative
              flex
              h-full
              w-full
              max-w-7xl
              items-center
              justify-center
            "
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <GalleryControls
              onPrevious={previous}
              onNext={next}
              onClose={close}
            />

            <GalleryCounter
              current={currentIndex + 1}
              total={totalImages}
            />

            <motion.div
              key={currentImage.id ?? currentImage.image_url}
              className="
                relative
                flex
                max-h-full
                max-w-full
                items-center
                justify-center
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                shadow-2xl
              "
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <img
                src={currentImage.image_url}
                alt={
                  currentImage.alt ??
                  currentImage.title ??
                  `Image ${currentIndex + 1}`
                }
                draggable={false}
                className="
                  max-h-[85vh]
                  max-w-[92vw]
                  select-none
                  object-contain
                "
              />
            </motion.div>
                        {totalImages > 1 && (
              <div
                className="
                  absolute
                  bottom-8
                  left-1/2
                  flex
                  -translate-x-1/2
                  gap-3
                  overflow-x-auto
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/40
                  p-3
                  backdrop-blur-xl
                "
              >
                {images.map((image, index) => (
                  <button
                    key={image.id ?? image.image_url}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      relative
                      h-16
                      w-24
                      overflow-hidden
                      rounded-xl
                      transition-all
                      duration-300
                      ${
                        currentIndex === index
                          ? "ring-2 ring-white scale-105"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      }
                    `}
                  >
                    <img
                      src={image.image_url}
                      alt={`Miniature ${index + 1}`}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}