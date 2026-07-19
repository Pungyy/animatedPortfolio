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
          border-neutral-200
          bg-white
          px-8
          py-16
          text-center
          shadow-[0_30px_100px_rgba(0,0,0,.08)]
          md:px-16
        "

      >





        <h2

          className="
            text-4xl
            font-semibold
            tracking-tight
            text-neutral-950
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
            text-neutral-500
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
                  bg-neutral-950
                  px-8
                  py-4
                  text-sm
                  font-medium
                  text-white
                  shadow-[0_15px_40px_rgba(0,0,0,.15)]
                  transition
                  hover:bg-neutral-800
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
                  border-neutral-200
                  bg-white
                  px-8
                  py-4
                  text-sm
                  font-medium
                  text-neutral-900
                  shadow-sm
                  transition
                  hover:bg-neutral-100
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