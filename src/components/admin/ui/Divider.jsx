export default function Divider({ title }) {
  return (
    <div className="border-t border-[var(--border)] pt-8">
      {title && (
        <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
          {title}
        </h3>
      )}
    </div>
  );
}
