import { useContext, useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

import ThemeContext from "../../contexts/ThemeContext";
import { COUNTRY_COORDS } from "./countryCoords";

const ACCENT_DARK = [0.65, 0.5, 1]; // ~#8b5cf6, un peu poussé pour rester lisible
const ACCENT_LIGHT = [0.145, 0.388, 0.922]; // #2563eb

export default function Globe({ countries = [] }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const pointerInteracting = useRef(null);
  const pointerMovement = useRef(0);
  const phiRef = useRef(0.2);

  const [supported] = useState(() => {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !supported) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = containerRef.current.offsetWidth || 380;
    const onResize = () => {
      if (containerRef.current) width = containerRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    const dark = theme === "dark";
    const maxCount = Math.max(...countries.map((c) => c.count || 1), 1);

    const markers = countries
      .map((c) => {
        const loc = COUNTRY_COORDS[c.country];
        if (!loc) return null;
        return {
          location: loc,
          size: 0.04 + ((c.count || 1) / maxCount) * 0.06,
        };
      })
      .filter(Boolean);

    let globe;
    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: phiRef.current,
        theta: 0.25,
        dark: dark ? 1 : 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: dark ? 6 : 3.2,
        baseColor: dark ? [0.32, 0.32, 0.36] : [0.92, 0.92, 0.95],
        markerColor: dark ? ACCENT_DARK : ACCENT_LIGHT,
        glowColor: dark ? [0.55, 0.55, 0.62] : [0.85, 0.85, 0.9],
        markers,
        onRender: (state) => {
          if (!pointerInteracting.current && !reduce) {
            phiRef.current += 0.0035;
          }
          state.phi = phiRef.current + pointerMovement.current;
          state.width = width * 2;
          state.height = width * 2;
        },
      });
    } catch (e) {
      console.error("globe init failed", e);
      window.removeEventListener("resize", onResize);
      return;
    }

    const t = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 120);

    return () => {
      clearTimeout(t);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [theme, countries, supported]);

  if (!supported) return null;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[380px]"
    >
      <canvas
        ref={canvasRef}
        aria-label="Carte des visiteurs"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerMovement.current = delta / 180;
          }
        }}
        className="h-full w-full cursor-grab opacity-0 transition-opacity duration-700"
      />
    </div>
  );
}
