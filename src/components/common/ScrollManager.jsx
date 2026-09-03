import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Sur changement de route :
 *  - avec un hash (#about depuis /blog) → attend que la section existe
 *    puis scrolle dessus (le contenu se charge en asynchrone)
 *  - sans hash → remet en haut de page
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let tries = 0;

      const scroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries++ < 40) {
          setTimeout(scroll, 80);
        }
      };

      const t = setTimeout(scroll, 60);
      return () => clearTimeout(t);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
