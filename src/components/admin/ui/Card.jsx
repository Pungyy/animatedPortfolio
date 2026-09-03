export default function Card({
  title,
  description,
  actions,
  children,
  className = "",
  bodyClassName = "",
}) {
  const hasHeader = title || description || actions;

  return (
    <section
      className={
        "rounded-2xl border border-[var(--border)] bg-[var(--surface)] " +
        "p-6 shadow-[var(--shadow-card)] " +
        className
      }
    >
      {hasHeader && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}

      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
