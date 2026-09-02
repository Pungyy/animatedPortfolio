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
        <span className="block font-medium text-white">
          {label}
        </span>

        {description && (
          <span className="mt-1 block text-sm text-zinc-400">
            {description}
          </span>
        )}
      </span>

      <span className="relative mt-0.5 inline-block h-6 w-11 shrink-0">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />

        <span className="absolute inset-0 rounded-full bg-zinc-700 transition-colors peer-checked:bg-emerald-500" />

        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
