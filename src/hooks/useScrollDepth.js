import { useEffect } from "react";

import { trackAction } from "../services/analytics.service";

/**
 * Envoie un event `scroll_depth` (detail = "25" | "50" | "75" | "100")
 * une seule fois par palier et par montage.
 */
export default function useScrollDepth(page) {
  useEffect(() => {
    if (!page) return;

    const sent = new Set();
    const thresholds = [50, 100];

    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const pct = (window.scrollY / scrollable) * 100;

      for (const t of thresholds) {
        if (pct >= t && !sent.has(t)) {
          sent.add(t);
          trackAction("scroll_depth", String(t));
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    const id = setTimeout(onScroll, 1500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(id);
    };
  }, [page]);
}
