import clsx from "clsx";

const variants = {
  neutral: "bg-neutral-100 text-neutral-700 border-neutral-200",
  dark: "bg-neutral-900 text-white border-neutral-800",
  accent: "bg-blue-600 text-white border-blue-600",
};

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}