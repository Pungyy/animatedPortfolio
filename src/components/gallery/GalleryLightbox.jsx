import Lightbox from "yet-another-react-lightbox";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "./gallery.css";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function GalleryLightbox({
  open,
  close,
  index,
  slides,
}) {
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={[
        Zoom,
        Fullscreen,
        Download,
        Slideshow,
        Thumbnails,
      ]}
      carousel={{
        finite: false,
        preload: 3,
        imageFit: "contain",
      }}
      animation={{
        fade: 300,
        swipe: 400,
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
      }}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2,
        doubleTapDelay: 300,
        doubleClickDelay: 300,
        keyboardMoveDistance: 50,
        wheelZoomDistanceFactor: 120,
        pinchZoomDistanceFactor: 120,
        scrollToZoom: true,
      }}
      thumbnails={{
        position: "bottom",
        width: 110,
        height: 70,
        border: 0,
        borderRadius: 14,
        padding: 4,
        gap: 12,
      }}
      slideshow={{
        autoplay: false,
        delay: 3000,
      }}
      render={{
        buttonPrev: slides.length <= 1 ? () => null : undefined,
        buttonNext: slides.length <= 1 ? () => null : undefined,
      }}
    />
  );
}