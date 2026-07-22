import {
  motion,
} from "framer-motion";


import {
  ExternalLink,
} from "lucide-react";


import {
  FaGithub,
} from "react-icons/fa";








export default function ProjectLinks({
  project,
}) {


  if (
    !project.github_url &&
    !project.demo_url
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



      className="
        mt-32
      "


    >







      <div


        className="
          overflow-hidden

          rounded-[48px]

          border

          border-[var(--border)]

          bg-[var(--surface)]

          px-8

          py-16

          text-center

          shadow-[var(--shadow-card)]

          md:px-16
        "


      >






        <h2


          className="
            text-4xl

            font-semibold

            tracking-tight

            text-[var(--text-primary)]

            md:text-5xl
          "


        >

          Voir le projet


        </h2>









        <p


          className="
            mx-auto

            mt-5

            max-w-xl

            text-lg

            leading-8

            text-[var(--text-secondary)]
          "


        >

          Découvrez le résultat final ou consultez
          le code source de cette réalisation.


        </p>









        <div


          className="
            mt-10

            flex

            flex-wrap

            justify-center

            gap-4
          "


        >









          {
            project.demo_url && (


              <motion.a



                href={project.demo_url}



                target="_blank"



                rel="noreferrer"




                whileHover={{
                  y:-4,
                  scale:1.02,
                }}



                transition={{
                  duration:.3,
                }}



                className="
                  inline-flex

                  items-center

                  gap-3

                  rounded-full

                  bg-[var(--text-primary)]

                  px-8

                  py-4

                  text-sm

                  font-medium

                  text-[var(--background)]

                  shadow-lg

                  transition

                  hover:opacity-80
                "


              >



                <ExternalLink size={18}/>



                Voir la démo



              </motion.a>


            )
          }









          {
            project.github_url && (


              <motion.a



                href={project.github_url}



                target="_blank"



                rel="noreferrer"




                whileHover={{
                  y:-4,
                  scale:1.02,
                }}



                transition={{
                  duration:.3,
                }}



                className="
                  inline-flex

                  items-center

                  gap-3

                  rounded-full

                  border

                  border-[var(--border)]

                  bg-[var(--surface)]

                  px-8

                  py-4

                  text-sm

                  font-medium

                  text-[var(--text-primary)]

                  shadow-sm

                  transition

                  hover:bg-[var(--surface-muted)]
                "


              >



                <FaGithub size={18}/>



                Code source



              </motion.a>


            )
          }






        </div>






      </div>






    </motion.section>


  );

}