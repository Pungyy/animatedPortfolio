export default function Spinner({ label = "Chargement..." }) {
  return (
    <div className="flex items-center gap-3 py-10 text-sm text-[var(--text-secondary)]">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
      {label}
    </div>
  );
}
