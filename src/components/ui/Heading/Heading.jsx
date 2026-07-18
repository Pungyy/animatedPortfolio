import clsx from "clsx";

const variants = {
  light: {
    eyebrow: "text-neutral-500",
    title: "text-neutral-950",
    description: "text-neutral-600",
  },
  dark: {
    eyebrow: "text-neutral-400",
    title: "text-white",
    description: "text-neutral-300",
  },
};

export default function Heading({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "light",
  className = "",
}) {
  const colors = variants[variant];

  return (
    <div
      className={clsx(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            "mb-4 text-sm font-medium uppercase tracking-[0.3em]",
            colors.eyebrow
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={clsx(
          "text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl",
          colors.title
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={clsx(
            "mt-8 max-w-2xl text-lg leading-8",
            colors.description,
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}