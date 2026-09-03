import { useContext, useMemo, useState } from "react";

import PortfolioContext from "../../../contexts/PortfolioContext";

import Heading from "../../ui/Heading";
import ProjectCard from "./ProjectCard";

const ALL = "Tous";

export default function Projects() {
  const { projects, loading } = useContext(PortfolioContext);
  const [category, setCategory] = useState(ALL);

  const published = useMemo(
    () => (projects || []).filter((p) => p.published),
    [projects]
  );

  const categories = useMemo(() => {
    const set = new Set(published.map((p) => p.category).filter(Boolean));
    return [ALL, ...[...set].sort()];
  }, [published]);

  const visible =
    category === ALL
      ? published
      : published.filter((p) => p.category === category);

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl bg-[var(--background)] px-6 py-24 sm:py-40"
    >
      <Heading
        eyebrow="PORTFOLIO"
        title="Des projets qui prennent vie."
        description="Mes réalisations, mes expérimentations et les technologies utilisées."
        align="center"
      />

      {loading ? (
        <div className="mt-20 text-center text-[var(--text-secondary)]">
          Chargement...
        </div>
      ) : (
        <>
          {categories.length > 2 && (
            <div className="mt-14 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition " +
                    (category === c
                      ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--background)]"
                      : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]")
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <div className="mt-14 grid gap-8 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-16 text-center text-[var(--text-secondary)]">
              Aucun projet dans cette catégorie.
            </p>
          )}
        </>
      )}
    </section>
  );
}
