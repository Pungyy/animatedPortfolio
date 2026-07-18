import clsx from "clsx";

const variants = {
  primary:
    "bg-neutral-950 text-white hover:bg-neutral-800",
  secondary:
    "bg-neutral-100 text-neutral-950 hover:bg-neutral-200",
  ghost:
    "bg-transparent text-neutral-950 hover:bg-neutral-100",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-neutral-400",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}