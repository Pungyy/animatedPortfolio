import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function GalleryImage({
  image,
  index,
  featured,
  totalImages,
  onClick,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      whileHover={{
        y: -8,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
      }}
      onClick={onClick}
      className={`
        group
        relative
        cursor-pointer
        overflow-hidden
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-[var(--shadow-card)]
        transition-all
        duration-500
        ${
          featured
            ? "rounded-[44px] p-3 lg:col-span-12"
            : "rounded-[36px] p-3 lg:col-span-6"
        }
      `}
    >
      {/* Image */}

      <motion.img
        src={image.image_url}
        alt={`Capture ${index + 1}`}
        whileHover={{
          scale: 1.04,
        }}
        transition={{
          duration: 0.6,
        }}
        className={`
          w-full
          object-cover
          ${
            featured
              ? "aspect-[16/8] rounded-[34px]"
              : "aspect-[16/10] rounded-[28px]"
          }
        `}
      />

      {/* Overlay */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        className={`
          absolute
          inset-3
          flex
          items-center
          justify-center
          ${
            featured
              ? "rounded-[34px]"
              : "rounded-[28px]"
          }
          bg-gradient-to-b
          from-black/5
          via-black/10
          to-black/35
          backdrop-blur-[2px]
        `}
      >
        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow-2xl
          "
        >
          <Search
            size={28}
            className="text-black"
          />
        </motion.div>
      </motion.div>

      {/* Badge */}

      {featured && totalImages > 1 && (
        <div
          className="
            absolute
            bottom-8
            right-8
            rounded-full
            border
            border-white/20
            bg-black/55
            px-5
            py-2
            text-sm
            font-medium
            text-white
            backdrop-blur-xl
          "
        >
          📷 {totalImages} images
        </div>
      )}

      {/* Halo */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            -top-32
            left-1/2
            h-72
            w-72
            -translate-x-1/2
            rounded-full
            bg-white/10
            blur-3xl
          "
        />
      </div>
    </motion.div>
  );
}