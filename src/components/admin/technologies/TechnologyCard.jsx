import TechnologyIcon from "../../ui/TechnologyIcon";
import CardActions from "../ui/CardActions";

export default function TechnologyCard({ technology, onEdit, onDelete }) {
  const color = technology.color || "var(--text-primary)";

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)]"
            style={{ color }}
          >
            <TechnologyIcon name={technology.icon} size={20} />
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
              {technology.name}
            </p>
            <p className="truncate text-xs text-[var(--text-muted)]">
              {technology.icon}
            </p>
          </div>
        </div>

        <span
          className="h-4 w-4 shrink-0 rounded-full ring-1 ring-inset ring-[var(--border)]"
          style={{ backgroundColor: technology.color }}
        />
      </div>

      <CardActions
        onEdit={() => onEdit(technology)}
        onDelete={() => onDelete(technology)}
      />
    </div>
  );
}
