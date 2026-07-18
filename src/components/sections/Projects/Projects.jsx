import { useContext } from "react";

import PortfolioContext from "../../../contexts/PortfolioContext";

import Heading from "../../ui/Heading";
import ProjectCard from "./ProjectCard";


export default function Projects() {

  const {
    projects,
    loading,
  } = useContext(PortfolioContext);



  return (
    <section
      id="projects"
      className="
        mx-auto
        max-w-7xl
        px-6
        py-32
      "
    >

      <Heading
        eyebrow="Portfolio"
        title="Des projets qui prennent vie."
        description="
          Découvrez mes réalisations, mes expérimentations
          et les technologies utilisées.
        "
        align="center"
      />



      {
        loading ? (

          <div className="mt-20 text-center text-neutral-400">
            Chargement...
          </div>

        ) : (

          <div
            className="
              mt-20
              grid
              gap-10
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {
              projects
                .filter(
                  project => project.published
                )
                .map(project => (

                  <ProjectCard
                    key={project.id}
                    project={project}
                  />

                ))
            }

          </div>

        )
      }


    </section>
  );
}