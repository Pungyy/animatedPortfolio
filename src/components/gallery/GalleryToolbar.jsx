import { motion } from "framer-motion";
import { Images } from "lucide-react";

export default function GalleryToolbar({
  totalImages,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        flex
        flex-col
        items-start
        justify-between
        gap-6
        md:flex-row
        md:items-end
      "
    >
      <div>
        <h2
          className="
            text-4xl
            font-semibold
            tracking-tight
            text-[var(--text-primary)]
          "
        >
          Galerie
        </h2>

        <p
          className="
            mt-4
            max-w-2xl
            text-lg
            leading-8
            text-[var(--text-secondary)]
          "
        >
          Découvrez les principales interfaces et fonctionnalités du projet à
          travers cette galerie interactive.
        </p>
      </div>

      <motion.div
        whileHover={{
          scale: 1.04,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          flex
          items-center
          gap-3
          rounded-full
          border
          border-[var(--border)]
          bg-[var(--surface)]
          px-5
          py-3
          shadow-[var(--shadow-card)]
          backdrop-blur-xl
        "
      >
        <Images
          size={18}
          className="text-[var(--accent)]"
        />

        <span
          className="
            text-sm
            font-medium
            text-[var(--text-primary)]
          "
        >
          {totalImages} image{totalImages > 1 ? "s" : ""}
        </span>
      </motion.div>
    </motion.div>
  );
}