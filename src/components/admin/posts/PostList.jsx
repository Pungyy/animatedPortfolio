import { FileText, Pencil, Trash2 } from "lucide-react";

import EmptyState from "../ui/EmptyState";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PostList({ posts = [], onEdit, onDelete }) {
  if (!posts.length) {
    return (
      <EmptyState icon={FileText} title="Aucun article">
        Rédige ta première note technique.
      </EmptyState>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      {posts.map((post, i) => (
        <div
          key={post.id}
          className={
            "flex items-center gap-4 px-5 py-4 transition hover:bg-[var(--surface-muted)] " +
            (i > 0 ? "border-t border-[var(--border)]" : "")
          }
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                {post.title}
              </p>
              <span
                className={
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium " +
                  (post.status === "published"
                    ? "bg-[var(--success)]/12 text-[var(--success)]"
                    : "bg-[var(--surface-muted)] text-[var(--text-muted)]")
                }
              >
                {post.status === "published" ? "Publié" : "Brouillon"}
              </span>
            </div>
            <p className="mt-0.5 truncate text-xs text-[var(--text-muted)]">
              /{post.slug} · {formatDate(post.published_at || post.updated_at)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEdit(post)}
            className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--background)] hover:text-[var(--text-primary)]"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(post)}
            className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
