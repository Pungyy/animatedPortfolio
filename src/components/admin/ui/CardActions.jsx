import { Pencil, Trash2 } from "lucide-react";

const BTN =
  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition";

export default function CardActions({
  onEdit,
  onDelete,
  editLabel = "Modifier",
  editIcon: EditIcon = Pencil,
}) {
  return (
    <div className="mt-4 flex items-center justify-end gap-1 border-t border-[var(--border)] pt-3">
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className={`${BTN} text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]`}
        >
          <EditIcon size={14} />
          {editLabel}
        </button>
      )}

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className={`${BTN} text-[var(--text-secondary)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]`}
        >
          <Trash2 size={14} />
          Supprimer
        </button>
      )}
    </div>
  );
}
