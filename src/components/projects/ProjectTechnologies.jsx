import {
  motion,
} from "framer-motion";


import TechnologyIcon from "../ui/TechnologyIcon";






export default function ProjectTechnologies({
  project,
}) {



  if (
    !project.technologies ||
    project.technologies.length === 0
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
        ease:[
          .22,
          1,
          .36,
          1
        ],
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

          Technologies


        </h2>




        <p

          className="
            mt-4

            text-lg

            text-[var(--text-secondary)]
          "

        >

          Les technologies utilisées pour concevoir ce projet.

        </p>


      </div>









      <div

        className="
          flex

          flex-wrap

          gap-4
        "

      >






        {
          project.technologies.map(
            (tech,index)=>(


              <motion.div



                key={tech.id}



                initial={{
                  opacity:0,
                  scale:.9,
                }}



                whileInView={{
                  opacity:1,
                  scale:1,
                }}



                viewport={{
                  once:true,
                }}



                transition={{
                  duration:.4,
                  delay:index * .05,
                }}



                className="
                  group

                  flex

                  items-center

                  gap-3

                  rounded-2xl

                  border

                  border-[var(--border)]

                  bg-[var(--surface)]

                  px-5

                  py-3

                  shadow-sm

                  transition-all

                  duration-300

                  hover:-translate-y-1

                  hover:shadow-[var(--shadow-card)]
                "



              >







                <div

                  className="
                    flex

                    h-9

                    w-9

                    items-center

                    justify-center

                    rounded-xl
                  "

                  style={{

                    backgroundColor:
                      `${tech.color}15`

                  }}

                >


                  <TechnologyIcon

                    name={tech.icon}

                    size={20}

                  />


                </div>








                <span

                  className="
                    text-sm

                    font-medium

                    text-[var(--text-primary)]
                  "

                >

                  {tech.name}


                </span>






              </motion.div>


            )

          )
        }






      </div>






    </motion.section>


  );

}