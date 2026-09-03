import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Home,
  Sparkles,
  Briefcase,
  FolderKanban,
  Mail,
  FileText,
  Activity,
  Wrench,
  Sun,
  Moon,
  Download,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import PortfolioContext from "../../contexts/PortfolioContext";
import ThemeContext from "../../contexts/ThemeContext";
import { trackAction } from "../../services/analytics.service";

function useHotkey(onOpen) {
  useEffect(() => {
    function handler(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpen]);
}

export default function CommandPalette() {
  const navigate = useNavigate();
  const { projects, settings } = useContext(PortfolioContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  useHotkey(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (to) => {
    setOpen(false);
    navigate(to);
  };

  const items = useMemo(() => {
    const base = [
      { icon: Home, label: "Accueil", run: () => go("/") },
      { icon: Sparkles, label: "À propos", run: () => go("/#about") },
      { icon: Briefcase, label: "Expérience", run: () => go("/#experience") },
      { icon: Wrench, label: "Compétences", run: () => go("/#skills") },
      { icon: FolderKanban, label: "Projets", run: () => go("/#projects") },
      { icon: Mail, label: "Contact", run: () => go("/#contact") },
      { icon: FileText, label: "Blog", run: () => go("/blog") },
      { icon: Activity, label: "Coulisses", run: () => go("/coulisses") },
      { icon: Wrench, label: "Uses / Setup", run: () => go("/uses") },
      {
        icon: theme === "dark" ? Sun : Moon,
        label: `Thème ${theme === "dark" ? "clair" : "sombre"}`,
        run: () => {
          toggleTheme();
          setOpen(false);
        },
      },
    ];

    if (settings?.cv_url) {
      base.push({
        icon: Download,
        label: "Télécharger le CV",
        run: () => {
          trackAction("cv_download");
          window.open(settings.cv_url, "_blank", "noreferrer");
          setOpen(false);
        },
      });
    }
    if (settings?.github_url) {
      base.push({
        icon: FaGithub,
        label: "GitHub",
        run: () => {
          window.open(settings.github_url, "_blank", "noreferrer");
          setOpen(false);
        },
      });
    }
    if (settings?.linkedin_url) {
      base.push({
        icon: FaLinkedin,
        label: "LinkedIn",
        run: () => {
          window.open(settings.linkedin_url, "_blank", "noreferrer");
          setOpen(false);
        },
      });
    }

    (projects || [])
      .filter((p) => p.published)
      .forEach((p) => {
        base.push({
          icon: FolderKanban,
          label: p.title,
          hint: "Projet",
          run: () => go(`/project/${p.slug}`),
        });
      });

    return base;
  }, [projects, settings, theme]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q));
  }, [items, query]);

  const [prevQuery, setPrevQuery] = useState(query);
  if (prevQuery !== query) {
    setPrevQuery(query);
    setActive(0);
  }

  function onKeyDown(e) {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
            role="dialog"
            aria-label="Recherche"
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
              <Search size={16} className="text-[var(--text-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Aller à… (sections, projets, actions)"
                className="w-full bg-transparent py-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
              <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-[var(--text-muted)]">
                  Aucun résultat.
                </li>
              )}

              {filtered.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={item.label + i}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => item.run()}
                      className={
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition " +
                        (i === active
                          ? "bg-[var(--surface-muted)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)]")
                      }
                    >
                      <Icon size={15} className="shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint && (
                        <span className="text-xs text-[var(--text-muted)]">
                          {item.hint}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
