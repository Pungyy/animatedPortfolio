import Container from "../../ui/Container";
import Heading from "../../ui/Heading";

import TechMarquee from "./TechMarquee";



export default function Skills() {


  return (

    <section

      id="skills"

      className="
        py-24 sm:py-40
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


      </Container>




      <div className="mt-20">

        <TechMarquee />

      </div>


    </section>

  );

}
