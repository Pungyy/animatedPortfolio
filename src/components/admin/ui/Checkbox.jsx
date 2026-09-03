export default function Checkbox({
  label,
  name,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        name={name}
        checked={!!checked}
        onChange={onChange}
        className="h-4 w-4 rounded-md border-[var(--border)] bg-[var(--surface-muted)] accent-[var(--accent)]"
      />

      <span className="text-sm text-[var(--text-secondary)]">
        {label}
      </span>
    </label>
  );
}
