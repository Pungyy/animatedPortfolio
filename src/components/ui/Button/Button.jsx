import clsx from "clsx";


const variants = {

  primary:
    `
      bg-[var(--text-primary)]
      text-[var(--background)]

      hover:opacity-90
    `,


  secondary:
    `
      bg-[var(--surface-muted)]
      text-[var(--text-primary)]

      border
      border-[var(--border)]

      hover:opacity-80
    `,


  ghost:
    `
      bg-transparent

      text-[var(--text-primary)]

      hover:bg-[var(--surface-muted)]
    `,

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

        `
          inline-flex
          items-center
          justify-center

          rounded-full

          px-6
          py-3

          text-sm
          font-medium

          transition-all
          duration-300

          focus:outline-none

          focus:ring-2
          focus:ring-[var(--accent)]

          cursor-pointer
        `,


        variants[variant],

        className

      )}

      {...props}

    >

      {children}

    </button>

  );

}