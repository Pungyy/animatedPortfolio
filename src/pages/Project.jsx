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
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: EASE },
};

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
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

      <article className="bg-[var(--background)] pb-24 pt-28 sm:pb-32 sm:pt-36">
        <Container>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            <ArrowLeft size={15} />
            Projets
          </Link>

          {/* HERO */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10 max-w-3xl"
          >
            {(project.category || project.year) && (
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--text-secondary)]">
                {[project.category, project.year].filter(Boolean).join("   ·   ")}
              </p>
            )}

            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-6xl">
              {project.title}
            </h1>

            {project.short_description && (
              <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
                {project.short_description}
              </p>
            )}

            {(project.demo_url || project.github_url) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackAction("project_link_click", "demo", project.id)
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition hover:opacity-85"
                  >
                    Voir la démo
                    <ArrowUpRight size={16} />
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
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
                  >
                    <FaGithub size={15} />
                    Code source
                  </a>
                )}
              </div>
            )}
          </motion.header>

          {/* COVER */}
          {project.cover_image && (
            <motion.div
              {...fadeUp}
              className="mt-12 overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface-muted)] sm:mt-16 sm:rounded-[32px]"
            >
              <img
                src={project.cover_image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
              />
            </motion.div>
          )}

          {/* META */}
          {meta.length > 0 && (
            <motion.div
              {...fadeUp}
              className="mt-12 overflow-hidden rounded-[20px] border border-[var(--border)] sm:mt-16"
            >
              <dl className="grid grid-cols-2 gap-px bg-[var(--border)] md:grid-cols-4">
                {meta.map((m) => (
                  <div key={m.label} className="bg-[var(--surface)] p-5 sm:p-6">
                    <dt className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                      {m.label}
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-[var(--text-primary)] sm:text-base">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}

          {/* BODY */}
          <div className="mt-16 max-w-3xl space-y-16 sm:mt-24 sm:space-y-20">
            {project.description && (
              <motion.section {...fadeUp}>
                <SectionTitle>Présentation</SectionTitle>
                <p className="mt-5 whitespace-pre-line text-lg leading-8 text-[var(--text-secondary)]">
                  {project.description}
                </p>
              </motion.section>
            )}

            {study.length > 0 && (
              <motion.section {...fadeUp} className="space-y-8">
                {study.map((s) => (
                  <div
                    key={s.label}
                    className="border-t border-[var(--border)] pt-6"
                  >
                    <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                      {s.label}
                    </h3>
                    <p className="mt-3 whitespace-pre-line text-base leading-7 text-[var(--text-secondary)]">
                      {s.value}
                    </p>
                  </div>
                ))}
              </motion.section>
            )}

            {technologies.length > 0 && (
              <motion.section {...fadeUp}>
                <SectionTitle>Stack</SectionTitle>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {technologies.map((tech) => (
                    <span
                      key={tech.id}
                      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium text-[var(--text-primary)]"
                      style={{
                        backgroundColor: `${tech.color}10`,
                        borderColor: `${tech.color}33`,
                      }}
                    >
                      <TechnologyIcon name={tech.icon} size={15} />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {features.length > 0 && (
              <motion.section {...fadeUp}>
                <SectionTitle>Fonctionnalités</SectionTitle>
                <ul className="mt-8 border-t border-[var(--border)]">
                  {features.map((feature, i) => (
                    <li
                      key={feature.id}
                      className="flex gap-5 border-b border-[var(--border)] py-6"
                    >
                      <span className="shrink-0 pt-0.5 text-sm tabular-nums text-[var(--text-muted)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-base font-medium text-[var(--text-primary)]">
                          {feature.title}
                        </h3>
                        {feature.description && (
                          <p className="mt-1.5 text-sm leading-7 text-[var(--text-secondary)]">
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

          {/* GALLERY */}
          {gallery.length > 0 && (
            <motion.section {...fadeUp} className="mt-20 sm:mt-28">
              <SectionTitle>Galerie</SectionTitle>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setViewerIndex(index)}
                    className="group relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface-muted)]"
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
          <nav className="mt-20 grid gap-4 border-t border-[var(--border)] pt-10 sm:mt-28 sm:grid-cols-2">
            {siblings.prev ? (
              <Link
                to={`/project/${siblings.prev.slug}`}
                className="rounded-2xl border border-[var(--border)] p-5 transition hover:bg-[var(--surface-muted)]"
              >
                <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <ArrowLeft size={13} /> Projet précédent
                </span>
                <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                  {siblings.prev.title}
                </span>
              </Link>
            ) : (
              <Link
                to="/#projects"
                className="rounded-2xl border border-[var(--border)] p-5 transition hover:bg-[var(--surface-muted)]"
              >
                <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <ArrowLeft size={13} /> Tous les projets
                </span>
                <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                  Retour à la liste
                </span>
              </Link>
            )}

            {siblings.next && (
              <Link
                to={`/project/${siblings.next.slug}`}
                className="rounded-2xl border border-[var(--border)] p-5 text-right transition hover:bg-[var(--surface-muted)] sm:col-start-2"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs text-[var(--text-muted)]">
                  Projet suivant <ArrowRight size={13} />
                </span>
                <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                  {siblings.next.title}
                </span>
              </Link>
            )}
          </nav>
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
