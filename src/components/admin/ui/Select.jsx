export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Sélectionner...",
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

      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className={
          "w-full rounded-xl border border-[var(--border)] " +
          "bg-[var(--surface-muted)] px-4 py-2.5 text-sm text-[var(--text-primary)] " +
          "outline-none transition " +
          "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 " +
          className
        }
        {...props}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
