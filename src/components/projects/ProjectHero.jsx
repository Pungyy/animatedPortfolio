import {
  motion,
} from "framer-motion";



export default function ProjectHero({
  project,
}) {


  return (

    <section

      className="
        pt-24
        pb-20
        bg-[var(--background)]
      "

    >






      <motion.div


        initial={{
          opacity:0,
          y:30,
        }}


        animate={{
          opacity:1,
          y:0,
        }}


        transition={{
          duration:.8,
          ease:[
            .22,
            1,
            .36,
            1
          ],
        }}



        className="
          mx-auto
          max-w-5xl
          text-center
        "


      >







        {
          project.category && (

            <span


              className="
                inline-flex

                items-center

                rounded-full

                border

                border-[var(--border)]

                bg-[var(--surface)]

                px-5

                py-2

                text-xs

                font-medium

                uppercase

                tracking-[0.3em]

                text-[var(--text-secondary)]

                shadow-sm
              "


            >


              {project.category}



            </span>


          )
        }









        <h1


          className="
            mt-10

            text-6xl

            font-semibold

            tracking-[-0.06em]

            text-[var(--text-primary)]

            sm:text-7xl

            lg:text-8xl
          "


        >


          {project.title}



        </h1>









        {
          project.short_description && (

            <p


              className="
                mx-auto

                mt-8

                max-w-2xl

                text-xl

                leading-9

                text-[var(--text-secondary)]
              "


            >


              {project.short_description}



            </p>


          )
        }







      </motion.div>












      {
        project.cover_image && (


          <motion.div



            initial={{
              opacity:0,
              scale:.96,
              y:40,
            }}



            animate={{
              opacity:1,
              scale:1,
              y:0,
            }}



            transition={{
              duration:1,
              delay:.15,
              ease:[
                .22,
                1,
                .36,
                1
              ],
            }}



            className="
              relative

              mx-auto

              mt-20

              max-w-6xl
            "


          >









            {/* HALO */}



            <div


              className="
                absolute

                inset-0

                -z-10

                rounded-[60px]

                bg-[var(--surface-muted)]

                blur-3xl
              "


            />









            {/* IMAGE CARD */}



            <div


              className="
                overflow-hidden

                rounded-[48px]

                border

                border-[var(--border)]

                bg-[var(--surface)]

                p-3

                shadow-[var(--shadow-card)]
              "


            >






              <img


                src={project.cover_image}


                alt={project.title}



                className="
                  aspect-[16/9]

                  w-full

                  rounded-[38px]

                  object-cover
                "


              />






            </div>








          </motion.div>


        )
      }







    </section>

  );

}