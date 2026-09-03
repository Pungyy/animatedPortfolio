import { useContext } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import PortfolioContext from "../../../contexts/PortfolioContext";

import Container from "../../ui/Container";
import Heading from "../../ui/Heading";

function initials(name = "") {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  const { testimonials } = useContext(PortfolioContext);

  if (!testimonials?.length) return null;

  const featured = testimonials.filter((t) => t.featured);
  const list = (featured.length ? featured : testimonials).slice(0, 6);

  return (
    <section
      id="testimonials"
      className="bg-[var(--background)] py-24 sm:py-40"
    >
      <Container>
        <Heading
          eyebrow="RECOMMANDATIONS"
          title="Ils ont travaillé avec moi."
          description="Quelques retours de personnes avec qui j'ai collaboré."
          align="center"
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex flex-col rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[var(--shadow-card)]"
            >
              <Quote
                size={22}
                className="text-[var(--text-muted)]"
              />

              {t.rating ? (
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className="fill-current text-amber-400"
                    />
                  ))}
                </div>
              ) : null}

              <blockquote className="mt-4 flex-1 text-sm leading-7 text-[var(--text-secondary)]">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                {t.avatar_url ? (
                  <img
                    src={t.avatar_url}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-muted)] text-xs font-semibold text-[var(--text-secondary)]">
                    {initials(t.name)}
                  </span>
                )}

                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[var(--text-primary)]">
                    {t.name}
                  </span>
                  <span className="block truncate text-xs text-[var(--text-muted)]">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
