import { motion } from "framer-motion";

export default function GalleryCounter({
  current,
  total,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        absolute
        left-1/2
        top-6
        z-30
        -translate-x-1/2
      "
    >
      <div
        className="
          rounded-full
          border
          border-white/10
          bg-black/40
          px-5
          py-2
          backdrop-blur-xl
          shadow-xl
        "
      >
        <span
          className="
            text-sm
            font-medium
            tracking-[0.2em]
            text-white/90
          "
        >
          {String(current).padStart(2, "0")}
          <span className="mx-2 text-white/40">/</span>
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}