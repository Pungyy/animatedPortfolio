export default function AvailabilityBadge({
  label = "Disponible pour un poste",
  className = "",
}) {

  return (

    <span

      className={
        "inline-flex items-center gap-2 rounded-full border " +
        "border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 " +
        "text-xs font-medium tracking-wide text-[var(--text-secondary)] " +
        className
      }

    >

      <span className="relative flex h-2 w-2">

        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />

        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />

      </span>

      {label}

    </span>

  );

}
