import { useState } from "react";
import { motion } from "framer-motion";

import GalleryToolbar from "./GalleryToolbar";
import GalleryImage from "./GalleryImage";
import GalleryViewer from "./GalleryViewer";

export default function ProjectGallery({ project }) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  if (!project?.gallery?.length) {
    return null;
  }

  const images = project.gallery;

  return (
    <>
      <motion.section
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-100px",
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative"
      >
        <GalleryToolbar totalImages={images.length} />

        <div
          className="
            mt-12
            grid
            gap-6
            lg:grid-cols-12
          "
        >
          {images.map((image, index) => (
            <GalleryImage
              key={image.id}
              image={image}
              index={index}
              featured={index === 0}
              totalImages={images.length}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </motion.section>

      <GalleryViewer
        open={currentIndex >= 0}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        close={() => setCurrentIndex(-1)}
      />
    </>
  );
}