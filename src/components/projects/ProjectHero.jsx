import { motion } from "framer-motion";



export default function ProjectHero({
  project,
}) {


  return (

    <section
      className="
        pt-24
        pb-20
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
                border-neutral-200
                bg-white
                px-5
                py-2
                text-xs
                font-medium
                uppercase
                tracking-[0.3em]
                text-neutral-500
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
            text-neutral-950
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
                text-neutral-500
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





            <div

              className="
                absolute
                inset-0
                -z-10
                rounded-[60px]
                bg-neutral-200/50
                blur-3xl
              "

            />







            <div

              className="
                overflow-hidden
                rounded-[48px]
                border
                border-neutral-200
                bg-white
                p-3
                shadow-[0_40px_120px_rgba(0,0,0,0.12)]
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