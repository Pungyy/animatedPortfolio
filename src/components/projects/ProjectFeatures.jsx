import {
  motion,
} from "framer-motion";







export default function ProjectFeatures({
  project,
}) {



  if (
    !project.features ||
    project.features.length === 0
  ) {

    return null;

  }









  return (


    <motion.section


      initial={{
        opacity:0,
        y:40,
      }}


      whileInView={{
        opacity:1,
        y:0,
      }}


      viewport={{
        once:true,
        margin:"-100px",
      }}


      transition={{
        duration:.7,
      }}



    >







      <div

        className="
          mb-10
        "

      >



        <h2

          className="
            text-4xl

            font-semibold

            tracking-tight

            text-[var(--text-primary)]
          "

        >

          Fonctionnalités


        </h2>







        <p

          className="
            mt-4

            max-w-2xl

            text-lg

            leading-8

            text-[var(--text-secondary)]
          "

        >

          Les fonctionnalités principales développées
          pour donner vie à ce projet.


        </p>



      </div>









      <div

        className="
          grid

          gap-6

          md:grid-cols-2
        "

      >






        {
          project.features.map(

            (feature,index)=>(


              <motion.article



                key={feature.id}



                initial={{
                  opacity:0,
                  y:30,
                }}



                whileInView={{
                  opacity:1,
                  y:0,
                }}



                viewport={{
                  once:true,
                }}



                transition={{
                  duration:.5,
                  delay:index * .1,
                }}



                whileHover={{
                  y:-6,
                }}



                className="
                  group

                  relative

                  overflow-hidden

                  rounded-[36px]

                  border

                  border-[var(--border)]

                  bg-[var(--surface)]

                  p-8

                  transition-all

                  duration-500

                  hover:shadow-[var(--shadow-card)]
                "


              >







                {/* HALO */}



                <div

                  className="
                    pointer-events-none

                    absolute

                    -right-16

                    -top-16

                    h-40

                    w-40

                    rounded-full

                    bg-[var(--surface-muted)]

                    blur-3xl

                    transition

                    duration-500

                    group-hover:scale-150
                  "

                />









                <div

                  className="
                    relative
                  "

                >








                  <div

                    className="
                      flex

                      h-14

                      w-14

                      items-center

                      justify-center

                      rounded-2xl

                      bg-[var(--text-primary)]

                      text-xl

                      text-[var(--background)]
                    "

                  >

                    {String(index + 1).padStart(2,"0")}


                  </div>









                  <h3

                    className="
                      mt-8

                      text-2xl

                      font-semibold

                      tracking-tight

                      text-[var(--text-primary)]
                    "

                  >

                    {feature.title}


                  </h3>









                  <p

                    className="
                      mt-4

                      text-sm

                      leading-7

                      text-[var(--text-secondary)]
                    "

                  >

                    Une fonctionnalité pensée et développée
                    pour améliorer l'expérience utilisateur.


                  </p>







                </div>






              </motion.article>


            )

          )
        }







      </div>






    </motion.section>


  );

}