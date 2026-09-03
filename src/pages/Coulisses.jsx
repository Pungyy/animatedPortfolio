import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";

import Seo from "../components/common/Seo";
import { getPublicStats } from "../services/stats.service";
import useAnalytics from "../hooks/useAnalytics";

function formatDuration(seconds = 0) {
  if (!seconds) return "—";
  if (seconds < 60) return `${seconds} s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s ? `${m} min ${s} s` : `${m} min`;
}

function formatNumber(n = 0) {
  return new Intl.NumberFormat("fr-FR").format(n);
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
        { value: formatNumber(stats.visitors), label: "Visiteurs uniques" },
        { value: formatNumber(stats.page_views), label: "Pages vues" },
        { value: formatNumber(stats.countries), label: "Pays touchés" },
        { value: formatDuration(stats.avg_duration), label: "Durée moyenne d'une visite" },
        { value: stats.top_project || "—", label: "Projet le plus consulté" },
        { value: stats.top_country || "—", label: "D'où viennent les visites" },
        { value: formatNumber(stats.technologies), label: "Technologies maîtrisées" },
        { value: formatNumber(stats.cv_downloads), label: "Téléchargements du CV" },
      ]
    : [];

  return (
    <MainLayout>
      <Seo
        title="Coulisses"
        description="L'analytics maison de ce portfolio, en lecture seule  sans Google Analytics, sans cookie tiers."
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
            <div className="mx-auto mt-20 grid max-w-4xl gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {(cards.length ? cards : Array.from({ length: 8 })).map((card, i) => (
                <motion.div
                  key={card?.label ?? i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="text-center"
                >
                  <p className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                    {card ? card.value : "—"}
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {card ? card.label : " "}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          <p className="mx-auto mt-24 max-w-xl text-center text-sm leading-7 text-[var(--text-muted)]">
            Construit avec React, Vite, Tailwind CSS et Supabase. Le tableau de
            bord d'administration, le suivi des visites et cette page tournent
            sur la même base de code.
          </p>
        </Container>
      </section>
    </MainLayout>
  );
}
