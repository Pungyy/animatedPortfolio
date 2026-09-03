import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { formatDate } from "../../../utils/formatDate";

function Content({ experience }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="
        group mx-auto w-full max-w-md rounded-[32px] border border-[var(--border)]
        bg-[var(--surface)]/70 p-6 shadow-[var(--shadow-card)] backdrop-blur-xl
        transition hover:-translate-y-1 sm:p-8 md:mx-0
      "
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)] opacity-70">
        {formatDate(experience.start_date)}
        {" — "}
        {experience.end_date ? formatDate(experience.end_date) : "Aujourd'hui"}
      </p>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:mt-6 sm:text-3xl">
        {experience.company}
      </h3>

      {experience.role && (
        <p className="mt-2 text-base text-[var(--text-secondary)] sm:mt-3 sm:text-lg">
          {experience.role}
        </p>
      )}

      {experience.description && (
        <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-6">
          {experience.description}
        </p>
      )}

      {experience.location && (
        <div className="mt-6 flex items-center gap-2 text-sm text-[var(--text-secondary)] sm:mt-8">
          <MapPin size={16} />
          {experience.location}
        </div>
      )}
    </motion.div>
  );
}

export default function ExperienceItem({ experience, index }) {
  const left = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 70, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex flex-col md:grid md:grid-cols-2 md:items-center md:gap-16"
    >
      {/* point central (desktop) */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          absolute left-1/2 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full
          bg-[var(--text-primary)] ring-8 ring-[var(--background)]
          shadow-[0_0_25px_rgba(0,0,0,.35)] md:block
        "
      />

      <div
        className={
          left
            ? "md:col-start-1 md:flex md:justify-end"
            : "md:col-start-2 md:flex md:justify-start"
        }
      >
        <Content experience={experience} />
      </div>
    </motion.article>
  );
}
