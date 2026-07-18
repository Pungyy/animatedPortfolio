import {
  motion,
} from "framer-motion";


import Button from "../../ui/Button";

import usePortfolio from "../../../hooks/usePortfolio";



export default function HeroContent() {


  const {
    settings,
    loading,
  } = usePortfolio();



  if (loading || !settings) {
    return null;
  }



  return (

    <motion.div


      initial={{
        opacity:0,
        y:40,
      }}


      animate={{
        opacity:1,
        y:0,
      }}


      transition={{
        duration:0.8,
        ease:"easeOut",
      }}



      className="
        max-w-2xl
      "


    >



      <p

        className="
          mb-6
          text-sm
          font-medium
          uppercase
          tracking-[0.4em]
          text-neutral-400
        "

      >

        Portfolio


      </p>






      <h1

        className="
          text-6xl
          font-semibold
          leading-[0.95]
          tracking-tight
          text-neutral-950
          md:text-7xl
          xl:text-8xl
        "

      >

        {settings.hero_title}


      </h1>







      {
        settings.hero_subtitle && (

          <h2

            className="
              mt-6
              text-3xl
              font-medium
              tracking-tight
              text-neutral-600
            "

          >

            {settings.hero_subtitle}


          </h2>

        )
      }








      {
        settings.hero_description && (

          <p

            className="
              mt-8
              max-w-xl
              text-xl
              leading-9
              text-neutral-500
            "

          >

            {settings.hero_description}


          </p>

        )
      }








      <div

        className="
          mt-12
          flex
          flex-wrap
          gap-4
        "

      >


        <a href="#projects">

          <Button>

            Voir mes projets

          </Button>

        </a>




        <a href="#contact">

          <Button variant="secondary">

            Me contacter

          </Button>

        </a>



      </div>



    </motion.div>

  );

}