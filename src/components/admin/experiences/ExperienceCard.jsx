import { Calendar, MapPin } from "lucide-react";
import CardActions from "../ui/CardActions";

export default function ExperienceCard({ experience, onEdit, onDelete }) {
  const isCurrent = experience.current || experience.current_job;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {experience.role || experience.position}
          </p>
          <p className="mt-0.5 text-sm text-[var(--accent)]">
            {experience.company}
          </p>
        </div>

        {isCurrent && (
          <span className="shrink-0 rounded-full bg-[var(--success)]/12 px-2.5 py-0.5 text-xs font-medium text-[var(--success)]">
            Actuel
          </span>
        )}
      </div>

      <div className="mt-4 space-y-1.5 text-xs text-[var(--text-secondary)]">
        {experience.location && (
          <p className="flex items-center gap-1.5">
            <MapPin size={13} />
            {experience.location}
          </p>
        )}
        <p className="flex items-center gap-1.5">
          <Calendar size={13} />
          {experience.start_date} — {isCurrent ? "Aujourd'hui" : experience.end_date}
        </p>
      </div>

      {experience.description && (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          {experience.description}
        </p>
      )}

      <CardActions
        onEdit={() => onEdit(experience)}
        onDelete={() => onDelete(experience)}
      />
    </div>
  );
}
