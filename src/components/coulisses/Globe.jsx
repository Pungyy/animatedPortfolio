import { useContext, useEffect, useMemo, useRef, useState } from "react";
import GlobeGL from "react-globe.gl";
import * as THREE from "three";

import ThemeContext from "../../contexts/ThemeContext";
import { COUNTRY_COORDS } from "./countryCoords";

const ACCENT_DARK = "#a78bfa";
const ACCENT_LIGHT = "#2563eb";

export default function Globe({ countries = [] }) {
  const wrapRef = useRef(null);
  const globeRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";
  const accent = dark ? ACCENT_DARK : ACCENT_LIGHT;
  const accentRgb = dark ? "167, 139, 250" : "37, 99, 235";

  const [size, setSize] = useState(0);
  const [land, setLand] = useState([]);
  const [ready, setReady] = useState(false);

  // Le globe est remonté (key) quand le thème change — on remet `ready` à
  // zéro dans la phase de rendu pour que l'effet des contrôles se rejoue.
  const [prevDark, setPrevDark] = useState(dark);
  if (prevDark !== dark) {
    setPrevDark(dark);
    setReady(false);
  }

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

  // Matériau sombre (dark uniquement) — sphère éclairée pour détacher les
  // continents en pointillés du fond. En clair on garde la vraie texture.
  const darkMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: "#0e0e1a",
        emissive: "#0e0e1a",
        emissiveIntensity: 0.35,
        shininess: 1,
      }),
    []
  );

  useEffect(() => {
    let ignore = false;
    fetch("/world-110m.geojson")
      .then((r) => r.json())
      .then((geo) => !ignore && setLand(geo.features || []))
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;
    const ro = new ResizeObserver(() =>
      setSize(Math.min(el.offsetWidth, 520))
    );
    ro.observe(el);
    setSize(Math.min(el.offsetWidth, 520));
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g || !ready) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const controls = g.controls();
    controls.enableZoom = true;
    controls.minDistance = 185;
    controls.maxDistance = 460;
    controls.enablePan = false;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.5;
    controls.rotateSpeed = 0.6;

    g.pointOfView({ lat: 20, lng: 6, altitude: 2.4 }, 0);
  }, [ready]);

  return (
    <div
      ref={wrapRef}
      className="mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-full [&_canvas]:cursor-grab [&_canvas:active]:cursor-grabbing"
    >
      {size > 0 && (
        <GlobeGL
          key={dark ? "dark" : "light"}
          ref={globeRef}
          width={size}
          height={size}
          animateIn={false}
          onGlobeReady={() => setReady(true)}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={dark ? undefined : "/textures/earth-day.jpg"}
          bumpImageUrl={dark ? undefined : "/textures/earth-topology.png"}
          globeMaterial={dark ? darkMaterial : undefined}
          showAtmosphere
          atmosphereColor={accent}
          atmosphereAltitude={dark ? 0.24 : 0.14}
          hexPolygonsData={dark ? land : []}
          hexPolygonResolution={3}
          hexPolygonMargin={0.32}
          hexPolygonUseDots
          hexPolygonAltitude={0.003}
          hexPolygonColor={() => `rgba(${accentRgb}, 0.55)`}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => accent}
          pointAltitude={(d) => 0.015 + d.weight * 0.16}
          pointRadius={(d) => 0.32 + d.weight * 0.55}
          pointResolution={14}
          pointsMerge={false}
          pointLabel={(d) => `${d.country} · ${d.count}`}
          ringsData={points}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => (t) => `rgba(${accentRgb}, ${1 - t})`}
          ringMaxRadius={(d) => 2.5 + d.weight * 3.5}
          ringPropagationSpeed={1.6}
          ringRepeatPeriod={1500}
        />
      )}
    </div>
  );
}
