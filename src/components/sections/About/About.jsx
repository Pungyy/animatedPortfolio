import usePortfolio from "../../../hooks/usePortfolio";

import Heading from "../../ui/Heading";
import AnimatedSection from "../../ui/AnimatedSection";

import AboutCard from "./AboutCard";
import TechStack from "./TechStack";



export default function About() {


  const {
    settings,
    loading,
  } = usePortfolio();




  if (loading || !settings) {
    return null;
  }





  return (

    <section

      id="about"

      className="
        relative
        overflow-hidden
        py-40
        bg-[var(--background)]
      "

    >



      <div

        className="
          mx-auto
          max-w-7xl
          px-6
        "

      >





        <AnimatedSection>


          <Heading

            eyebrow="À PROPOS"

            title={
              settings.about_title ||
              "Créer des expériences numériques."
            }


            description="
              Mon parcours, ma vision et les
              technologies qui m'accompagnent.
            "


            align="center"

          />


        </AnimatedSection>








        <div

          className="
            mt-32
            grid
            items-center
            gap-24
            lg:grid-cols-2
          "

        >





          {/* TEXTE */}


          <AnimatedSection>


            <div>


              <h3

                className="
                  text-5xl
                  font-semibold
                  leading-tight
                  tracking-tight

                  text-[var(--text-primary)]
                "

              >

                Développer.
                <br />

                Imaginer.
                <br />

                Construire.


              </h3>






              <p

                className="
                  mt-8
                  max-w-xl
                  text-lg
                  leading-9

                  text-[var(--text-secondary)]
                "

              >

                {
                  settings.about_description ||
                  settings.hero_description
                }


              </p>








              <div

                className="
                  mt-12
                "

              >

                <TechStack />


              </div>


            </div>


          </AnimatedSection>









          {/* CARTE */}


          <AnimatedSection>


            <AboutCard />


          </AnimatedSection>





        </div>


      </div>


    </section>

  );

}