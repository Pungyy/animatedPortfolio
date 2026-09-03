import { MessageSquareQuote, Pencil, Trash2, Star } from "lucide-react";

import EmptyState from "../ui/EmptyState";

export default function TestimonialList({ testimonials = [], onEdit, onDelete }) {
  if (!testimonials.length) {
    return (
      <EmptyState icon={MessageSquareQuote} title="Aucun témoignage">
        Ajoute les retours de personnes avec qui tu as travaillé.
      </EmptyState>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      {testimonials.map((t, i) => (
        <div
          key={t.id}
          className={
            "flex items-start gap-4 px-5 py-4 transition hover:bg-[var(--surface-muted)] " +
            (i > 0 ? "border-t border-[var(--border)]" : "")
          }
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {t.name}
              </p>
              {t.rating ? (
                <span className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={11} className="fill-current" />
                  ))}
                </span>
              ) : null}
              {t.featured && (
                <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                  En avant
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {[t.role, t.company].filter(Boolean).join(" · ") || "—"}
            </p>
            <p className="mt-1 line-clamp-2 text-sm text-[var(--text-secondary)]">
              {t.quote}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEdit(t)}
            className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--background)] hover:text-[var(--text-primary)]"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(t)}
            className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
