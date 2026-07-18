import clsx from "clsx";

export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "rounded-[32px]",
        "border border-neutral-200",
        "bg-white",
        "p-8",
        "shadow-sm",
        "transition-all duration-500",
        "hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}