import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const buttonClass = `
group
flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-white/10
bg-white/10
text-white
backdrop-blur-xl
transition-colors
hover:bg-white/20
`;

export default function GalleryControls({
  onPrevious,
  onNext,
  onClose,
}) {
  return (
    <>
      {/* Fermer */}
      <motion.button
        type="button"
        onClick={onClose}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`${buttonClass} absolute right-6 top-6 z-30`}
      >
        <X
          size={22}
          className="transition-transform duration-300 group-hover:rotate-90"
        />
      </motion.button>

      {/* Précédent */}
      <motion.button
        type="button"
        onClick={onPrevious}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`${buttonClass} absolute left-6 top-1/2 z-30 -translate-y-1/2`}
      >
        <ChevronLeft
          size={26}
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
      </motion.button>

      {/* Suivant */}
      <motion.button
        type="button"
        onClick={onNext}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`${buttonClass} absolute right-6 top-1/2 z-30 -translate-y-1/2`}
      >
        <ChevronRight
          size={26}
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </motion.button>
    </>
  );
}