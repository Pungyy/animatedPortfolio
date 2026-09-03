const BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 " +
  "text-sm font-medium transition select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90",
  secondary:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] " +
    "hover:bg-[var(--surface-muted)]",
  ghost:
    "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] " +
    "hover:text-[var(--text-primary)]",
  danger:
    "bg-[var(--danger)] text-[var(--danger-foreground)] hover:opacity-90",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
