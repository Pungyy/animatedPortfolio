import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import usePortfolio from "../../../hooks/usePortfolio";

const FALLBACK_STACK = {
  frontend: ["React", "TypeScript", "Next.js"],
  backend: ["PHP", "Node.js"],
  database: ["Supabase", "PostgreSQL"],
};

// Petit rendu de code stylisé — pas du vrai code exécuté, juste une mise
// en couleur façon éditeur pour illustrer le stack sans photo générique.
function Token({ children, className = "" }) {
  return <span className={className}>{children}</span>;
}

const KEYWORD = "text-fuchsia-500 dark:text-fuchsia-400";
const FN = "text-sky-600 dark:text-sky-400";
const STRING = "text-emerald-600 dark:text-emerald-400";
const TAG = "text-rose-500 dark:text-rose-400";
const ATTR = "text-amber-600 dark:text-amber-400";
const MUTED = "text-[var(--text-muted)]";
const DIM = "text-[var(--text-secondary)]";
const TEXT = "text-[var(--text-primary)]";

function bucketFor(category) {
  const c = (category || "").toLowerCase();
  if (c.includes("front")) return "frontend";
  if (c.includes("back")) return "backend";
  if (c.includes("base") || c.includes("data")) return "database";
  return null;
}

// Regroupe les compétences admin par catégorie (ordre = display_order).
function groupSkills(skills) {
  const grouped = { frontend: [], backend: [], database: [] };

  (skills || []).forEach((s) => {
    const bucket = bucketFor(s.category);
    if (bucket && s.name) grouped[bucket].push(s.name);
  });

  const hasAny = Object.values(grouped).some((list) => list.length);
  if (!hasAny) return FALLBACK_STACK;

  return {
    frontend: grouped.frontend.slice(0, 3),
    backend: grouped.backend.slice(0, 3),
    database: grouped.database.slice(0, 3),
  };
}

// `["Item", "Item"]` coloré, sur une seule ligne de tokens.
function arrayTokens(names) {
  return [
    <Token key="open" className={DIM}>[</Token>,
    ...names.flatMap((name, i) => [
      <Token key={`s${i}`} className={STRING}>{`"${name}"`}</Token>,
      <Token key={`sep${i}`} className={DIM}>
        {i < names.length - 1 ? ", " : ""}
      </Token>,
    ]),
    <Token key="close" className={DIM}>]</Token>,
  ];
}

function categoryLine(key, names) {
  return [
    <Token key="indent" className={DIM}>{"    "}</Token>,
    <Token key="key" className={ATTR}>{key}</Token>,
    <Token key="colon" className={DIM}>{": "}</Token>,
    ...arrayTokens(names),
    <Token key="comma" className={DIM}>,</Token>,
  ];
}

function buildLines(stack) {
  const { frontend, backend, database } = stack;

  return [
    [<Token key="c" className={`${MUTED} italic`}>// ce que je construis</Token>],
    [
      <Token key="1" className={KEYWORD}>export default function </Token>,
      <Token key="2" className={FN}>Anil</Token>,
      <Token key="3" className={DIM}>() {"{"}</Token>,
    ],
    [
      <Token key="1" className={KEYWORD}>{"  const "}</Token>,
      <Token key="2" className={TEXT}>stack</Token>,
      <Token key="3" className={DIM}> = {"{"}</Token>,
    ],
    ...[
      frontend.length && categoryLine("frontend", frontend),
      backend.length && categoryLine("backend", backend),
      database.length && categoryLine("database", database),
    ].filter(Boolean),
    [<Token key="1" className={DIM}>{"  };"}</Token>],
    [],
    [<Token key="1" className={KEYWORD}>{"  return "}</Token>, <Token key="2" className={DIM}>(</Token>],
    [<Token key="1" className={DIM}>{"    <"}</Token>, <Token key="2" className={TAG}>Portfolio</Token>],
    [
      <Token key="1" className={DIM}>{"      "}</Token>,
      <Token key="2" className={ATTR}>role</Token>,
      <Token key="3" className={DIM}>=</Token>,
      <Token key="4" className={STRING}>"Full-Stack"</Token>,
    ],
    [
      <Token key="1" className={DIM}>{"      "}</Token>,
      <Token key="2" className={ATTR}>stack</Token>,
      <Token key="3" className={DIM}>{"={"}</Token>,
      <Token key="4" className={TEXT}>stack</Token>,
      <Token key="5" className={DIM}>{"}"}</Token>,
    ],
    [<Token key="1" className={DIM}>{"    />"}</Token>],
    [<Token key="1" className={DIM}>{"  );"}</Token>],
    [<Token key="1" className={DIM}>{"}"}</Token>],
  ];
}

export default function HeroVisual() {
  const { skills } = usePortfolio();
  const stack = groupSkills(skills);
  const lines = buildLines(stack);

  const cardRef = useRef(null);
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(event) {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="relative flex justify-center lg:justify-end">
      {/* HALO PRINCIPAL */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-20 rounded-full bg-gradient-to-br from-[var(--accent-soft)] via-[var(--surface)] to-[var(--background)] blur-3xl"
      />

      {/* CARTE — fenêtre de code */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-[520px]"
        style={{ perspective: 1200 }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="overflow-hidden rounded-[40px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)]"
        >
          {/* Barre de fenêtre */}
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-6 py-4">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />

            <span className="mx-auto font-mono text-xs text-[var(--text-muted)]">
              portfolio.jsx
            </span>
          </div>

          {/* Code */}
          <div className="overflow-x-auto whitespace-pre px-6 py-7 font-mono text-[13px] leading-7 sm:text-sm">
            {lines.map((tokens, i) => (
              <div key={i} className="flex gap-4">
                <span className="w-4 shrink-0 select-none text-right text-[var(--text-muted)]">
                  {i + 1}
                </span>
                <span>{tokens.length ? tokens : " "}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
