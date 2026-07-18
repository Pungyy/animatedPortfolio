import { useContext, useRef } from "react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import PortfolioContext from "../../../contexts/PortfolioContext";

import Heading from "../../ui/Heading";
import ExperienceItem from "./ExperienceItem";


export default function Experience() {


  const {
    experiences,
  } = useContext(PortfolioContext);



  const sectionRef = useRef(null);



  const {
    scrollYProgress,
  } = useScroll({

    target: sectionRef,

    offset: [
      "start 70%",
      "end 40%",
    ],

  });




  const lineHeight = useTransform(
    scrollYProgress,
    [0,1],
    ["0%","100%"]
  );



  return (

    <section

      ref={sectionRef}

      id="experience"

      className="
        relative
        overflow-hidden
        py-40
      "

    >



      <Heading

        eyebrow="PARCOURS"

        title="Mon expérience."

        description="
          Découvrez mon parcours professionnel
          et les expériences qui ont construit
          mon expertise.
        "

        align="center"

      />





      <div
        className="
          relative
          mx-auto
          mt-32
          max-w-6xl
        "
      >



        {/* ligne arrière */}

        <div

          className="
            absolute
            left-1/2
            top-0
            hidden
            h-full
            w-px
            -translate-x-1/2
            bg-neutral-200
            md:block
          "

        />




        {/* ligne animée */}

        <motion.div

          style={{
            height: lineHeight,
          }}

          className="
            absolute
            left-1/2
            top-0
            hidden
            w-[2px]
            -translate-x-1/2
            bg-gradient-to-b
            from-black
            via-neutral-700
            to-neutral-300
            shadow-[0_0_15px_rgba(0,0,0,0.25)]
            md:block
          "

        />







        <div
          className="
            space-y-36
          "
        >

          {
            experiences?.map(
              (
                experience,
                index
              ) => (

                <ExperienceItem

                  key={experience.id}

                  experience={experience}

                  index={index}

                />

              )
            )
          }


        </div>



      </div>



    </section>

  );

}