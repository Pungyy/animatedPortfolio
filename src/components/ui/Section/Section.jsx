import clsx from "clsx";

export default function Section({
  id,
  children,
  className = "",
  as: Component = "section",
}) {
  return (
    <Component
      id={id}
      className={clsx(
        "relative w-full overflow-hidden py-24 md:py-32 xl:py-40",
        className
      )}
    >
      {children}
    </Component>
  );
}