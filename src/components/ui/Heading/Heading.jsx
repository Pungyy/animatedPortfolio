import clsx from "clsx";


export default function Heading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {


  return (

    <div

      className={clsx(

        "max-w-4xl",

        align === "center" && "mx-auto text-center",

        align === "left" && "text-left",

        className

      )}

    >



      {
        eyebrow && (

          <p

            className="
              mb-4

              text-sm

              font-medium

              uppercase

              tracking-[0.3em]

              text-[var(--text-secondary)]
            "

          >

            {eyebrow}


          </p>

        )
      }







      <h2

        className="
          text-4xl

          font-semibold

          leading-tight

          tracking-tight

          text-[var(--text-primary)]

          sm:text-5xl

          lg:text-6xl
        "

      >

        {title}


      </h2>







      {
        description && (

          <p

            className={clsx(

              `
                mt-8

                max-w-2xl

                text-lg

                leading-8

                text-[var(--text-secondary)]
              `,


              align === "center" && "mx-auto"

            )}

          >

            {description}


          </p>

        )
      }



    </div>

  );

}