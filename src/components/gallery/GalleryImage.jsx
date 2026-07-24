import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function GalleryImage({
  image,
  index,
  featured = false,
  totalImages,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      whileHover={{
        y: -8,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        shadow-2xl
        transition-all
        duration-500

        ${
          featured
            ? "lg:col-span-8 lg:row-span-2 aspect-[16/10]"
            : "lg:col-span-4 aspect-[4/3]"
        }
      `}
    >
      {/* Image */}
      <img
        src={image.image_url}
        alt={image.alt ?? `Image ${index + 1}`}
        loading="lazy"
        draggable={false}
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />

      {/* Dégradé */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/60
          via-black/10
          to-transparent
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Halo */}
      <div
        className="
          absolute
          inset-0
          bg-white/5
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Bouton */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileHover={{
          scale: 1.05,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          flex
          h-16
          w-16
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/20
          bg-white/10
          text-white
          opacity-0
          backdrop-blur-xl
          transition-all
          duration-300
          group-hover:opacity-100
        "
      >
        <Search size={26} />
      </motion.div>

      {/* Badge */}
      {featured && (
        <div
          className="
            absolute
            left-6
            top-6
            rounded-full
            border
            border-white/15
            bg-black/35
            px-4
            py-2
            text-xs
            font-medium
            tracking-widest
            text-white/90
            backdrop-blur-xl
          "
        >
          Galerie · {totalImages} images
        </div>
      )}

      {/* Numéro */}
      <div
        className="
          absolute
          bottom-6
          right-6
          rounded-full
          border
          border-white/15
          bg-black/35
          px-4
          py-2
          text-sm
          font-medium
          text-white
          backdrop-blur-xl
        "
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.button>
  );
}