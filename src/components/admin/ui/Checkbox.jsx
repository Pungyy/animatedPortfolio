export default function Checkbox({
  label,
  name,
  checked,
  onChange,
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 rounded border-zinc-700 bg-zinc-800 accent-violet-600"
      />

      <span className="text-zinc-300">
        {label}
      </span>
    </label>
  );
}