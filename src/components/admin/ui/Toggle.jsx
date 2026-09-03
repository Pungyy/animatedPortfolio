export default function Toggle({
  label,
  description,
  name,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-6">
      <span>
        <span className="block text-sm font-medium text-[var(--text-primary)]">
          {label}
        </span>

        {description && (
          <span className="mt-1 block text-sm text-[var(--text-secondary)]">
            {description}
          </span>
        )}
      </span>

      <span className="relative mt-0.5 inline-block h-6 w-11 shrink-0">
        <input
          type="checkbox"
          name={name}
          checked={!!checked}
          onChange={onChange}
          className="peer sr-only"
        />

        <span className="absolute inset-0 rounded-full bg-[var(--surface-muted)] ring-1 ring-inset ring-[var(--border)] transition-colors peer-checked:bg-[var(--success)] peer-checked:ring-[var(--success)]" />

        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
