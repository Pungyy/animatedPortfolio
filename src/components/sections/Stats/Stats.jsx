import {
  motion,
} from "framer-motion";


import Container from "../../ui/Container";
import Heading from "../../ui/Heading";

import StatCard from "./StatCard";

import usePortfolio from "../../../hooks/usePortfolio";




export default function Stats() {


  const {
    projects,
    experiences,
    technologies,
    loading,
  } = usePortfolio();




  if (loading) {
    return null;
  }






  const stats = [

    {
      value: `${projects?.length || 0}+`,
      label: "Projets réalisés",
    },


    {
      value: `${experiences?.length || 0}+`,
      label: "Expériences professionnelles",
    },


    {
      value: `${technologies?.length || 0}+`,
      label: "Technologies maîtrisées",
    },


    {
      value: "100%",
      label: "Motivation",
    },


  ];






  return (

    <section

      className="
        relative
        overflow-hidden
        py-32
        bg-[var(--background)]
      "

    >



      <Container>


        <Heading

          align="center"

          eyebrow="Quelques chiffres"

          title="Des résultats concrets."

          description="
            Chaque projet est une occasion
            d'apprendre, de progresser et
            de créer de meilleures expériences.
          "

        />









        <div

          className="
            mt-20
            grid
            gap-6
            sm:grid-cols-2
            xl:grid-cols-4
          "

        >


          {
            stats.map(
              (stat,index)=>(

                <motion.div

                  key={stat.label}

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
                    delay:index * 0.1,
                    duration:.6,
                  }}

                >

                  <StatCard

                    value={stat.value}

                    label={stat.label}

                  />


                </motion.div>


              )
            )
          }


        </div>



      </Container>


    </section>

  );

}