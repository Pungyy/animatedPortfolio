export default function AnalyticsCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
      {Icon && (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon size={16} />
        </span>
      )}

      <p className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        {value}
      </p>
      <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{title}</p>
    </div>
  );
}
