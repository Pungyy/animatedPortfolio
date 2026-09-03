import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Loader from "../components/ui/Loader";
import Seo from "../components/common/Seo";
import TechnologyIcon from "../components/ui/TechnologyIcon";
import GalleryViewer from "../components/gallery/GalleryViewer";

import { getProjectBySlug, getProjects } from "../services/projects.service";
import { trackAction } from "../services/analytics.service";

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: EASE },
};

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl">
      {children}
    </h2>
  );
}

export default function Project() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [siblings, setSiblings] = useState({ prev: null, next: null });
  const [status, setStatus] = useState("loading");
  const [viewerIndex, setViewerIndex] = useState(-1);

  // Reset quand on passe d'un projet à l'autre sans démonter la page.
  const [loadedSlug, setLoadedSlug] = useState(slug);
  if (loadedSlug !== slug) {
    setLoadedSlug(slug);
    setStatus("loading");
    setProject(null);
    setViewerIndex(-1);
  }

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const [data, list] = await Promise.all([
          getProjectBySlug(slug),
          getProjects().catch(() => []),
        ]);

        if (ignore) return;

        setProject(data);
        setStatus("ok");

        const published = (list || []).filter((p) => p.published);
        const i = published.findIndex((p) => p.slug === slug);
        setSiblings({
          prev: i > 0 ? published[i - 1] : null,
          next: i >= 0 && i < published.length - 1 ? published[i + 1] : null,
        });
      } catch (error) {
        console.error(error);
        if (!ignore) setStatus("notfound");
      }
    })();

    return () => {
      ignore = true;
    };
  }, [slug]);

  const meta = useMemo(() => {
    if (!project) return [];
    return [
      { label: "Année", value: project.year },
      { label: "Client", value: project.client },
      { label: "Rôle", value: project.role },
      { label: "Statut", value: project.status },
    ].filter((m) => m.value);
  }, [project]);

  if (status === "loading") return <Loader />;
  if (status === "notfound") return <Navigate to="/#projects" replace />;

  const gallery = project.gallery || [];
  const features = project.features || [];
  const technologies = project.technologies || [];
  const study = [
    { label: "Contexte", value: project.context },
    { label: "Ma contribution", value: project.contribution },
    { label: "Résultat", value: project.outcome },
  ].filter((s) => s.value);

  return (
    <MainLayout>
      <Seo
        title={project.title}
        description={project.short_description || undefined}
        image={project.cover_image || undefined}
        type="article"
      />

      <article className="bg-[var(--background)] pb-20 pt-24 sm:pb-24 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-5xl">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              <ArrowLeft size={15} />
              Projets
            </Link>

            {/* HEADER */}
            <motion.header
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-8 max-w-3xl"
            >
              {(project.category || project.year) && (
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {[project.category, project.year].filter(Boolean).join("  ·  ")}
                </p>
              )}

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {project.title}
              </h1>

              {project.short_description && (
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                  {project.short_description}
                </p>
              )}
            </motion.header>

            {/* SIDEBAR + CONTENT */}
            <div className="mt-10 grid gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-14">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                {(project.demo_url || project.github_url) && (
                  <div className="flex flex-wrap gap-2 lg:flex-col">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          trackAction("project_link_click", "demo", project.id)
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--text-primary)] px-4 py-2 text-sm font-medium text-[var(--background)] transition hover:opacity-85 lg:w-full"
                      >
                        Voir la démo
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() =>
                          trackAction("project_link_click", "github", project.id)
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)] lg:w-full"
                      >
                        <FaGithub size={14} />
                        Code source
                      </a>
                    )}
                  </div>
                )}

                {meta.length > 0 && (
                  <dl
                    className={
                      "space-y-2.5 text-sm" +
                      ((project.demo_url || project.github_url)
                        ? " mt-6 border-t border-[var(--border)] pt-5"
                        : "")
                    }
                  >
                    {meta.map((m) => (
                      <div
                        key={m.label}
                        className="flex items-baseline justify-between gap-4 lg:block"
                      >
                        <dt className="text-[var(--text-muted)]">{m.label}</dt>
                        <dd className="font-medium text-[var(--text-primary)] lg:mt-0.5">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </aside>

              {/* MAIN */}
              <div className="min-w-0 space-y-12">
                {project.cover_image && (
                  <motion.div
                    {...fadeUp}
                    className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]"
                  >
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </motion.div>
                )}

                {project.description && (
                  <motion.section {...fadeUp}>
                    <SectionTitle>Présentation</SectionTitle>
                    <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[var(--text-secondary)] sm:text-base">
                      {project.description}
                    </p>
                  </motion.section>
                )}

                {study.length > 0 && (
                  <motion.section {...fadeUp} className="space-y-6">
                    {study.map((s) => (
                      <div key={s.label}>
                        <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          {s.label}
                        </h3>
                        <p className="mt-2 whitespace-pre-line text-[15px] leading-7 text-[var(--text-secondary)]">
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </motion.section>
                )}

                {technologies.length > 0 && (
                  <motion.section {...fadeUp}>
                    <SectionTitle>Stack</SectionTitle>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech.id}
                          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-[var(--text-primary)]"
                          style={{
                            backgroundColor: `${tech.color}10`,
                            borderColor: `${tech.color}33`,
                          }}
                        >
                          <TechnologyIcon name={tech.icon} size={13} />
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </motion.section>
                )}

                {features.length > 0 && (
                  <motion.section {...fadeUp}>
                    <SectionTitle>Fonctionnalités</SectionTitle>
                    <ul className="mt-4 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                      {features.map((feature, i) => (
                        <li key={feature.id} className="flex gap-4 py-4">
                          <span className="w-5 shrink-0 pt-0.5 text-xs tabular-nums text-[var(--text-muted)]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="text-[15px] font-medium text-[var(--text-primary)]">
                              {feature.title}
                            </h3>
                            {feature.description && (
                              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                                {feature.description}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                )}
              </div>
            </div>

            {/* GALLERY */}
            {gallery.length > 0 && (
              <motion.section {...fadeUp} className="mt-16">
                <SectionTitle>Galerie</SectionTitle>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {gallery.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setViewerIndex(index)}
                      className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]"
                    >
                      <img
                        src={image.image_url}
                        alt={`${project.title} — aperçu ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* PREV / NEXT */}
            <nav className="mt-16 grid gap-3 border-t border-[var(--border)] pt-8 sm:grid-cols-2">
              {siblings.prev ? (
                <Link
                  to={`/project/${siblings.prev.slug}`}
                  className="rounded-xl border border-[var(--border)] p-4 transition hover:bg-[var(--surface-muted)]"
                >
                  <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <ArrowLeft size={12} /> Précédent
                  </span>
                  <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                    {siblings.prev.title}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/#projects"
                  className="rounded-xl border border-[var(--border)] p-4 transition hover:bg-[var(--surface-muted)]"
                >
                  <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <ArrowLeft size={12} /> Tous les projets
                  </span>
                  <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                    Retour à la liste
                  </span>
                </Link>
              )}

              {siblings.next && (
                <Link
                  to={`/project/${siblings.next.slug}`}
                  className="rounded-xl border border-[var(--border)] p-4 text-right transition hover:bg-[var(--surface-muted)] sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-1.5 text-xs text-[var(--text-muted)]">
                    Suivant <ArrowRight size={12} />
                  </span>
                  <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                    {siblings.next.title}
                  </span>
                </Link>
              )}
            </nav>
          </div>
        </Container>
      </article>

      <GalleryViewer
        open={viewerIndex >= 0}
        images={gallery}
        currentIndex={viewerIndex}
        setCurrentIndex={setViewerIndex}
        close={() => setViewerIndex(-1)}
      />
    </MainLayout>
  );
}
