import { useEffect } from "react";

import { prefetchRoute } from "../../lib/routePrefetch";

function onIntent(event) {
  const anchor = event.target.closest?.("a[href]");
  if (!anchor) return;

  const href = anchor.getAttribute("href");
  if (!href || !href.startsWith("/")) return;

  prefetchRoute(href.split("#")[0].split("?")[0]);
}

// Précharge le code d'une page dès qu'un lien vers elle est survolé, pris
// au clavier (focus) ou touché sur mobile — le clic tombe alors sur un
// chunk déjà en mémoire et la transition ne montre jamais de loader.
export default function RoutePrefetcher() {
  useEffect(() => {
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("focusin", onIntent, { passive: true });
    document.addEventListener("touchstart", onIntent, { passive: true });

    return () => {
      document.removeEventListener("pointerover", onIntent);
      document.removeEventListener("focusin", onIntent);
      document.removeEventListener("touchstart", onIntent);
    };
  }, []);

  return null;
}
