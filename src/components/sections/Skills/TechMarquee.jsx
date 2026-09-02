import { useContext, useMemo } from "react";

import PortfolioContext from "../../../contexts/PortfolioContext";

import TechnologyIcon from "../../ui/TechnologyIcon";




/*
 * Pastilles minimum par ligne : on duplique la liste
 * jusqu'à l'atteindre pour garder un défilement dense.
 */
const MIN_ITEMS = 16;

const ROW_COUNT = 3;

const ROW_SPEEDS = [3.4, 2.7, 3.9];


/*
 * Quelques entrées de la table `technologies` ont une icône
 * incohérente (concept sans logo officiel). On la corrige
 * ici, à l'affichage, sans toucher à la base.
 */
const ICON_OVERRIDES = {
  json: "json",
  oauth: "jsonwebtokens",
  curl: "",
};




/* Normalise un nom pour repérer les doublons skills / technologies. */
function normalizeName(name) {

  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/[0-9]+$/, "");

}




/* Couleur de marque -> null si trop sombre (illisible en thème sombre). */
function readableColor(hex) {

  if (!hex) return null;

  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return hex;

  const value = parseInt(match[1], 16);

  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance < 42 ? null : hex;

}




function TechPill({ tech, duplicate }) {

  const color = readableColor(tech.color) || "var(--text-primary)";


  return (

    <div

      data-dup={duplicate ? "true" : undefined}

      aria-hidden={duplicate ? "true" : undefined}

      className="
        tech-pill

        mr-4

        flex

        shrink-0

        items-center

        gap-2.5

        rounded-full

        border

        bg-[var(--surface)]

        px-5

        py-3
      "

      style={{ "--pill-color": color }}

    >

      <span className="flex" style={{ color }}>

        <TechnologyIcon
          name={tech.icon || tech.name}
          size={20}
        />

      </span>


      <span

        className="
          whitespace-nowrap

          text-[15px]

          font-medium

          text-[var(--text-primary)]
        "

      >

        {tech.name}

      </span>

    </div>

  );

}




function MarqueeRow({ items, repeat, reverse, speed }) {

  const loop = Array.from({ length: repeat }).flatMap(() => items);

  const duration = `${Math.round(loop.length * speed)}s`;


  return (

    <div className="tech-marquee overflow-hidden py-1">

      <div

        className={
          "tech-marquee__track" +
          (reverse ? " tech-marquee__track--reverse" : "")
        }

        style={{
          "--marquee-duration": duration,
          "--marquee-repeat": repeat,
        }}

      >

        {
          loop.map((tech, i) => (

            <TechPill

              key={`${tech.key}-${i}`}

              tech={tech}

              duplicate={i >= items.length}

            />

          ))
        }

      </div>

    </div>

  );

}




export default function TechMarquee() {

  const { skills, technologies } = useContext(PortfolioContext);


  const rows = useMemo(() => {

    const seen = new Set();
    const merged = [];

    const source = [
      ...(skills ?? []),
      ...(technologies ?? []),
    ];

    for (const item of source) {

      if (!item?.name) continue;

      const norm = normalizeName(item.name);

      if (seen.has(norm)) continue;
      seen.add(norm);

      merged.push({
        key: item.id ?? norm,
        name: item.name,
        icon:
          norm in ICON_OVERRIDES
            ? ICON_OVERRIDES[norm]
            : item.icon,
        color: item.color,
      });

    }


    const buckets = Array.from(
      { length: ROW_COUNT },
      () => []
    );

    merged.forEach((tech, i) => {
      buckets[i % ROW_COUNT].push(tech);
    });

    return buckets.filter((bucket) => bucket.length > 0);

  }, [skills, technologies]);


  if (!rows.length) {
    return null;
  }


  return (

    <div className="space-y-4">

      {
        rows.map((items, index) => (

          <MarqueeRow

            key={index}

            items={items}

            repeat={Math.max(
              2,
              Math.ceil(MIN_ITEMS / items.length)
            )}

            reverse={index % 2 === 1}

            speed={ROW_SPEEDS[index % ROW_SPEEDS.length]}

          />

        ))
      }

    </div>

  );

}
