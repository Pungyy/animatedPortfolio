export default function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-[var(--text-secondary)]"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className={
          "w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] " +
          "px-4 py-2.5 text-sm text-[var(--text-primary)] " +
          "placeholder:text-[var(--text-muted)] outline-none transition " +
          "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 " +
          className
        }
        {...props}
      />

      {hint && (
        <p className="text-xs text-[var(--text-muted)]">{hint}</p>
      )}
    </div>
  );
}
