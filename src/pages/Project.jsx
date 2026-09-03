import {
  useParams,
  Link,
} from "react-router-dom";


import {
  useEffect,
  useState,
} from "react";


import {
  ArrowLeft,
} from "lucide-react";


import {
  getProjectBySlug,
} from "../services/projects.service";

import Seo from "../components/common/Seo";



import ProjectHero from "../components/projects/ProjectHero";
import ProjectInfo from "../components/projects/ProjectInfo";
import ProjectTechnologies from "../components/projects/ProjectTechnologies";
import ProjectFeatures from "../components/projects/ProjectFeatures";
import ProjectGallery from "../components/gallery/ProjectGallery";
import ProjectLinks from "../components/projects/ProjectLinks";






export default function Project() {


  const {
    slug,
  } = useParams();




  const [
    project,
    setProject,
  ] = useState(null);




  const [
    loading,
    setLoading,
  ] = useState(true);






  useEffect(() => {


    async function loadProject(){


      try {


        const data =
          await getProjectBySlug(
            slug
          );



        setProject(data);



      } catch(error){


        console.error(
          error
        );



      } finally {


        setLoading(false);


      }


    }



    loadProject();



  },[
    slug
  ]);




  if(loading){


    return (

      <div

        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[var(--background)]
          text-[var(--text-secondary)]
        "

      >

        Chargement...


      </div>

    );


  }









  if(!project){


    return (

      <div

        className="
          flex
          min-h-screen
          flex-col
          items-center
          justify-center
          gap-5
          bg-[var(--background)]
          text-[var(--text-primary)]
        "

      >



        <h1

          className="
            text-4xl
            font-semibold
          "

        >

          Projet introuvable


        </h1>






        <Link

          to="/"

          className="
            rounded-full
            bg-[var(--text-primary)]
            px-6
            py-3
            text-[var(--background)]
          "

        >

          Retour


        </Link>


      </div>

    );


  }









  return (


    <main

      className="
        min-h-screen
        bg-[var(--background)]
        text-[var(--text-primary)]
      "

    >

      <Seo
        title={project.title}
        description={project.short_description || undefined}
        image={project.cover_image || undefined}
        type="article"
      />





      <div

        className="
          mx-auto
          max-w-7xl
          px-6
          py-10
          lg:px-12
        "

      >






        <Link


          to="/"



          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-[var(--text-secondary)]
            transition
            hover:text-[var(--text-primary)]
          "


        >

          <ArrowLeft size={16}/>


          Retour aux projets


        </Link>









        <ProjectHero

          project={project}

        />









        <ProjectInfo

          project={project}

        />









        <div

          className="
            mt-32
            space-y-32
          "

        >






          <section>


            <h2

              className="
                mb-6
                text-4xl
                font-semibold
                tracking-tight
                text-[var(--text-primary)]
              "

            >

              Présentation


            </h2>







            <p

              className="
                max-w-3xl
                text-lg
                leading-9
                text-[var(--text-secondary)]
              "

            >

              {project.description}


            </p>



          </section>


          {(project.context || project.contribution || project.outcome) && (
            <section className="grid gap-10 md:grid-cols-3">
              {[
                { label: "Contexte", value: project.context },
                { label: "Ma contribution", value: project.contribution },
                { label: "Résultat", value: project.outcome },
              ]
                .filter((x) => x.value)
                .map((x) => (
                  <div key={x.label}>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                      {x.label}
                    </h3>
                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--text-secondary)]">
                      {x.value}
                    </p>
                  </div>
                ))}
            </section>
          )}


          <ProjectTechnologies

            project={project}

          />









          <ProjectFeatures

            project={project}

          />









          <ProjectGallery

            project={project}

          />









          <ProjectLinks

            project={project}

          />





        </div>





      </div>





    </main>


  );


}