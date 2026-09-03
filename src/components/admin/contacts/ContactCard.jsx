import { Mail, Eye } from "lucide-react";
import CardActions from "../ui/CardActions";

export default function ContactCard({ contact, onView, onDelete }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {contact.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-[var(--text-secondary)]">
            <Mail size={12} />
            {contact.email}
          </p>
        </div>

        {!contact.read && (
          <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
            Nouveau
          </span>
        )}
      </div>

      {contact.subject && (
        <p className="mt-4 text-sm font-medium text-[var(--text-primary)]">
          {contact.subject}
        </p>
      )}

      <p className="mt-2 line-clamp-3 text-sm text-[var(--text-secondary)]">
        {contact.message}
      </p>

      <CardActions
        onEdit={() => onView(contact)}
        onDelete={() => onDelete(contact)}
        editLabel="Voir"
        editIcon={Eye}
      />
    </div>
  );
}
