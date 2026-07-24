import { motion } from "framer-motion";
import { Images } from "lucide-react";

export default function GalleryToolbar({ totalImages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="max-w-2xl">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-zinc-200
            bg-white
            px-4
            py-2
            shadow-sm
            dark:border-zinc-800
            dark:bg-zinc-900
          "
        >
          <Images
            size={16}
            className="text-purple-500"
          />

          <span
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.22em]
              text-zinc-600
              dark:text-zinc-300
            "
          >
            Galerie
          </span>
        </div>

        <h2
          className="
            mt-6
            text-4xl
            font-bold
            tracking-tight
            text-zinc-900
            dark:text-white
            lg:text-5xl
          "
        >
          Aperçu du projet
        </h2>

        <p
          className="
            mt-4
            text-lg
            leading-8
            text-zinc-600
            dark:text-zinc-400
          "
        >
          Découvrez quelques captures du projet. Cliquez sur une image pour
          l'afficher en plein écran et naviguer librement dans la galerie.
        </p>
      </div>

      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          flex
          items-center
          gap-4
          self-start
          rounded-3xl
          border
          border-zinc-200
          bg-white
          px-6
          py-5
          shadow-sm
          dark:border-zinc-800
          dark:bg-zinc-900
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-purple-500/20
            to-fuchsia-500/10
          "
        >
          <Images
            size={24}
            className="text-purple-500"
          />
        </div>

        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-zinc-500
              dark:text-zinc-400
            "
          >
            Images
          </p>

          <div className="mt-1 flex items-end gap-2">
            <span
              className="
                text-3xl
                font-bold
                text-zinc-900
                dark:text-white
              "
            >
              {String(totalImages).padStart(2, "0")}
            </span>

            <span
              className="
                mb-1
                text-sm
                text-zinc-500
                dark:text-zinc-400
              "
            >
              disponibles
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}