export default function EmptyState({ icon: Icon, title, children }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
      {Icon && (
        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--text-muted)]">
          <Icon size={20} />
        </span>
      )}

      {title && (
        <p className="text-sm font-medium text-[var(--text-primary)]">{title}</p>
      )}

      {children && (
        <p className="mt-1 max-w-sm text-sm text-[var(--text-secondary)]">
          {children}
        </p>
      )}
    </div>
  );
}
