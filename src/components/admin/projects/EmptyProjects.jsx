export default function EmptyProjects() {
  return (
    <div
      className="
        flex
        min-h-60
        items-center
        justify-center
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        text-[var(--text-secondary)]
      "
    >
      Aucun projet disponible.
    </div>
  );
}