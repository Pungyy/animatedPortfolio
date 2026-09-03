import { useContext, useEffect, useMemo, useRef, useState } from "react";
import GlobeGL from "react-globe.gl";

import ThemeContext from "../../contexts/ThemeContext";
import { COUNTRY_COORDS } from "./countryCoords";

const ACCENT_DARK = "#a78bfa";
const ACCENT_LIGHT = "#2563eb";

export default function Globe({ countries = [] }) {
  const wrapRef = useRef(null);
  const globeRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  const [size, setSize] = useState(0);
  const [ready, setReady] = useState(false);

  const points = useMemo(() => {
    const max = Math.max(...countries.map((c) => c.count || 1), 1);
    return countries
      .map((c) => {
        const loc = COUNTRY_COORDS[c.country];
        if (!loc) return null;
        return {
          lat: loc[0],
          lng: loc[1],
          country: c.country,
          count: c.count || 1,
          weight: (c.count || 1) / max,
        };
      })
      .filter(Boolean);
  }, [countries]);

  // responsive square sizing
  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;
    const ro = new ResizeObserver(() => {
      setSize(Math.min(el.offsetWidth, 480));
    });
    ro.observe(el);
    setSize(Math.min(el.offsetWidth, 480));
    return () => ro.disconnect();
  }, []);

  // camera + controls
  useEffect(() => {
    const g = globeRef.current;
    if (!g || !ready) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const controls = g.controls();
    controls.enableZoom = false;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.55;

    g.pointOfView({ lat: 22, lng: 8, altitude: 2.3 }, 0);
  }, [ready]);

  const accent = dark ? ACCENT_DARK : ACCENT_LIGHT;

  return (
    <div
      ref={wrapRef}
      className="mx-auto aspect-square w-full max-w-[420px]"
    >
      {size > 0 && (
        <GlobeGL
          ref={globeRef}
          width={size}
          height={size}
          animateIn={false}
          onGlobeReady={() => setReady(true)}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={
            dark ? "/textures/earth-dark.jpg" : "/textures/earth-day.jpg"
          }
          bumpImageUrl="/textures/earth-topology.png"
          showAtmosphere
          atmosphereColor={accent}
          atmosphereAltitude={0.18}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => accent}
          pointAltitude={(d) => 0.01 + d.weight * 0.14}
          pointRadius={(d) => 0.35 + d.weight * 0.5}
          pointResolution={12}
          pointsMerge={false}
          pointLabel={(d) => `${d.country} · ${d.count}`}
          ringsData={points}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => accent}
          ringMaxRadius={(d) => 2 + d.weight * 3}
          ringPropagationSpeed={1.4}
          ringRepeatPeriod={1600}
        />
      )}
    </div>
  );
}
