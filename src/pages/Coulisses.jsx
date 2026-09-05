import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Seo from "../components/common/Seo";

import Globe from "../components/coulisses/Globe";
import { getPublicStats } from "../services/stats.service";
import useAnalytics from "../hooks/useAnalytics";

function formatDuration(seconds = 0) {
  if (!seconds) return "—";
  if (seconds < 60) return `${seconds} s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s ? `${m} min ${s} s` : `${m} min`;
}

const nf = new Intl.NumberFormat("fr-FR");

function VisitsBars({ data = [] }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
      <p className="text-sm font-medium text-[var(--text-primary)]">
        Visites — 14 derniers jours
      </p>

      <div className="mt-6 flex h-32 items-end gap-1.5">
        {data.map((d) => (
          <div
            key={d.day}
            className="group relative h-full flex-1"
            title={`${d.day} · ${d.count}`}
          >
            <div
              className="absolute inset-x-0 bottom-0 rounded-t bg-[var(--accent)] transition-all"
              style={{ height: `${(d.count / max) * 100}%`, minHeight: 2 }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-between text-xs text-[var(--text-muted)]">
        <span>{data[0]?.day.slice(5)}</span>
        <span>{data[data.length - 1]?.day.slice(5)}</span>
      </div>
    </div>
  );
}

function CountryBars({ data = [] }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
      <p className="text-sm font-medium text-[var(--text-primary)]">
        D'où viennent les visites
      </p>

      <div className="mt-6 space-y-3">
        {data.map((d) => (
          <div key={d.country}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-[var(--text-secondary)]">{d.country}</span>
              <span className="tabular-nums text-[var(--text-muted)]">
                {d.count}
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
              <div
                className="h-full rounded-full bg-[var(--text-primary)]"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Coulisses() {
  useAnalytics("/coulisses");

  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getPublicStats();
        if (!ignore) setStats(data);
      } catch (err) {
        console.error(err);
        if (!ignore) setError(true);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const cards = stats
    ? [
        { value: nf.format(stats.visitors), label: "Visiteurs uniques" },
        { value: nf.format(stats.page_views), label: "Pages vues" },
        { value: nf.format(stats.countries), label: "Pays touchés" },
        {
          value: formatDuration(stats.avg_duration),
          label: "Durée moyenne d'une visite",
        },
        {
          value: stats.top_project || "—",
          label: "Projet le plus consulté",
          compact: true,
        },
        { value: nf.format(stats.cv_downloads), label: "Téléchargements du CV" },
        { value: nf.format(stats.technologies), label: "Technologies" },
        {
          value: nf.format(stats.projects_published),
          label: "Projets publiés",
        },
      ]
    : [];

  return (
    <MainLayout>
      <Seo
        title="Coulisses"
        description="L'analytics maison de ce portfolio, en lecture seule — sans Google Analytics, sans cookie tiers."
      />

      <section className="bg-[var(--background)] py-24 sm:py-40">
        <Container>
          <Heading
            eyebrow="COULISSES"
            title="Ce site s'observe lui-même."
            description="L'analytics de ce portfolio est fait maison — même stack, aucune dépendance à Google Analytics, aucun cookie tiers. Voici ce qu'il mesure."
            align="center"
          />

          {error ? (
            <p className="mt-20 text-center text-[var(--text-secondary)]">
              Les statistiques sont momentanément indisponibles.
            </p>
          ) : (
            <>
              {stats && stats.top_countries?.length > 0 && (
                <div className="mt-14 sm:mt-20">
                  <Globe countries={stats.top_countries} />
                  <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
                    Chaque point marque un pays d’où le site a été consulté. Glisse pour faire tourner.
                  </p>
                </div>
              )}

              <div className="mx-auto mt-16 grid max-w-4xl gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                {(cards.length ? cards : Array.from({ length: 8 })).map(
                  (card, i) => (
                    <motion.div
                      key={card?.label ?? i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      className="text-center"
                    >
                      <p
                        className={
                          card?.compact
                            ? "line-clamp-2 text-lg font-semibold leading-snug text-[var(--text-primary)] sm:text-xl"
                            : "text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl"
                        }
                      >
                        {card ? card.value : "—"}
                      </p>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        {card ? card.label : " "}
                      </p>
                    </motion.div>
                  )
                )}
              </div>

              {stats && (
                <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
                  <VisitsBars data={stats.visits_by_day} />
                  <CountryBars data={stats.top_countries} />
                </div>
              )}
            </>
          )}

          <p className="mx-auto mt-20 max-w-xl text-center text-sm leading-7 text-[var(--text-muted)]">
            Construit avec React, Vite, Tailwind CSS et Supabase. Le tableau de
            bord d'administration, le suivi des visites et cette page tournent
            sur la même base de code.
          </p>
        </Container>
      </section>
    </MainLayout>
  );
}
