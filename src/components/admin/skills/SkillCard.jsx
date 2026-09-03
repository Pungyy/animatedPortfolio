import TechnologyIcon from "../../ui/TechnologyIcon";
import CardActions from "../ui/CardActions";

export default function SkillCard({ skill, onEdit, onDelete }) {
  const color = skill.color || "var(--text-primary)";

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)]"
            style={{ color }}
          >
            <TechnologyIcon name={skill.icon} size={20} />
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
              {skill.name}
            </p>
            {skill.category && (
              <p className="truncate text-xs text-[var(--text-muted)]">
                {skill.category}
              </p>
            )}
          </div>
        </div>

        <span className="shrink-0 text-sm font-medium tabular-nums text-[var(--text-secondary)]">
          {skill.level}
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--surface-muted)]">
        <div
          className="h-full rounded-full"
          style={{ width: `${skill.level || 0}%`, backgroundColor: color }}
        />
      </div>

      <CardActions
        onEdit={() => onEdit(skill)}
        onDelete={() => onDelete(skill)}
      />
    </div>
  );
}
