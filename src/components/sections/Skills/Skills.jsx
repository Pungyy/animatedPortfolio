import { useContext } from "react";

import PortfolioContext from "../../../contexts/PortfolioContext";

import Container from "../../ui/Container";
import Heading from "../../ui/Heading";

import SkillCard from "./SkillCard";



export default function Skills() {


  const {
    skills,
  } = useContext(PortfolioContext);




  return (

    <section

      id="skills"

      className="
        py-40
        bg-[var(--background)]
      "

    >

      <Container>


        <Heading

          eyebrow="COMPÉTENCES"

          title="Mes technologies."

          description="
            Les technologies que j'utilise
            pour créer des applications modernes,
            performantes et évolutives.
          "

          align="center"

        />






        <div

          className="
            mt-24
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "

        >


          {
            skills?.map(

              (skill,index)=>(

                <SkillCard

                  key={skill.id}

                  skill={skill}

                  index={index}

                />

              )

            )
          }


        </div>



      </Container>


    </section>

  );

}