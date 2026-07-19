import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import {
  FaGithub,
} from "react-icons/fa";


import {
  getProjectBySlug,
} from "../services/projects.service";


import TechnologyIcon from "../components/ui/TechnologyIcon";





export default function Project() {


  const {
    slug,
  } = useParams();



  const [project,setProject] = useState(null);

  const [loading,setLoading] = useState(true);






  useEffect(()=>{


    async function loadProject(){


      try {


        const data =
          await getProjectBySlug(slug);


        setProject(data);


      } catch(error){


        console.error(error);


      } finally {


        setLoading(false);


      }


    }



    loadProject();


  },[slug]);









  if(loading){


    return (

      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        text-neutral-400
      ">

        Chargement...

      </div>

    );

  }







  if(!project){


    return (

      <div className="
        flex
        min-h-screen
        items-center
        justify-center
      ">

        Projet introuvable.

      </div>

    );

  }








  return (

    <main
      className="
        overflow-hidden
        px-6
        pb-40
        pt-40
      "
    >


      <div
        className="
          mx-auto
          max-w-6xl
        "
      >






        {/* RETOUR */}


        <Link

          to="/#projects"

          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-neutral-500
            transition
            hover:text-black
          "

        >

          <ArrowLeft size={16}/>

          Retour aux projets

        </Link>








        {/* HERO */}



        <motion.section


          initial={{
            opacity:0,
            y:40,
          }}


          animate={{
            opacity:1,
            y:0,
          }}


          transition={{
            duration:.8,
          }}


          className="
            mt-16
          "

        >


          <p
            className="
              text-sm
              uppercase
              tracking-[0.35em]
              text-neutral-400
            "
          >

            {project.category}

          </p>





          <h1
            className="
              mt-6
              max-w-5xl
              text-6xl
              font-semibold
              tracking-tight
              text-neutral-950
              md:text-8xl
            "
          >

            {project.title}

          </h1>





          <p
            className="
              mt-8
              max-w-3xl
              text-xl
              leading-9
              text-neutral-500
            "
          >

            {project.short_description}

          </p>



        </motion.section>









        {/* IMAGE PRINCIPALE */}



        {
          project.cover_image && (

            <motion.img

              initial={{
                opacity:0,
                scale:.95,
              }}

              animate={{
                opacity:1,
                scale:1,
              }}

              transition={{
                duration:.8,
                delay:.2,
              }}


              src={project.cover_image}

              alt={project.title}


              className="
                mt-20
                w-full
                rounded-[40px]
                shadow-2xl
              "

            />

          )
        }









        {/* INFORMATIONS */}



        <div
          className="
            mt-24
            grid
            gap-10
            md:grid-cols-4
          "
        >

          <Info
            title="Année"
            value={project.year}
          />


          <Info
            title="Rôle"
            value={project.role}
          />


          <Info
            title="Client"
            value={project.client}
          />


          <Info
            title="Statut"
            value={project.status}
          />


        </div>









        {/* DESCRIPTION */}



        <section
          className="
            mt-32
            max-w-4xl
          "
        >


          <h2
            className="
              text-4xl
              font-semibold
            "
          >

            Présentation

          </h2>



          <p
            className="
              mt-8
              whitespace-pre-line
              text-lg
              leading-9
              text-neutral-600
            "
          >

            {project.description}

          </p>


        </section>









        {/* TECHNOLOGIES */}



        {
          project.technologies?.length > 0 && (

            <section className="mt-32">


              <h2
                className="
                  text-4xl
                  font-semibold
                "
              >

                Technologies

              </h2>



              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-3
                "
              >

                {
                  project.technologies.map(
                    tech=>(

                      <div
                        key={tech.id}

                        className="
                          flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          px-5
                          py-2
                          text-sm
                        "
                      >

                        <TechnologyIcon
                          name={tech.icon}
                          size={15}
                        />


                        {tech.name}


                      </div>

                    )
                  )
                }


              </div>


            </section>

          )
        }









        {/* FEATURES */}



        {
          project.features?.length > 0 && (


            <section
              className="
                mt-32
              "
            >


              <h2
                className="
                  text-4xl
                  font-semibold
                "
              >

                Fonctionnalités

              </h2>




              <div
                className="
                  mt-10
                  grid
                  gap-5
                  md:grid-cols-2
                "
              >

                {
                  project.features.map(
                    feature=>(


                      <div

                        key={feature.id}

                        className="
                          rounded-[28px]
                          border
                          border-neutral-200
                          p-6
                          text-neutral-700
                        "

                      >

                        {feature.title}

                      </div>


                    )
                  )
                }


              </div>



            </section>

          )
        }









        {/* GALERIE */}



        {
          project.gallery?.length > 0 && (

            <section
              className="
                mt-32
              "
            >


              <h2
                className="
                  text-4xl
                  font-semibold
                "
              >

                Galerie

              </h2>



              <div
                className="
                  mt-10
                  grid
                  gap-8
                  md:grid-cols-2
                "
              >

                {
                  project.gallery.map(
                    image=>(

                      <img

                        key={image.id}

                        src={image.image_url}

                        alt={project.title}

                        className="
                          rounded-[32px]
                          object-cover
                        "

                      />

                    )
                  )
                }


              </div>


            </section>

          )
        }









        {/* LIENS */}



        <div
          className="
            mt-32
            flex
            gap-4
          "
        >


          {
            project.github_url && (

              <a

                href={project.github_url}

                target="_blank"

                rel="noreferrer"

                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-black
                  px-6
                  py-3
                  text-white
                "

              >

                <FaGithub />

                Github

              </a>

            )
          }






          {
            project.demo_url && (

              <a

                href={project.demo_url}

                target="_blank"

                rel="noreferrer"

                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-6
                  py-3
                "

              >

                <ExternalLink size={18}/>

                Démo

              </a>

            )
          }


        </div>



      </div>


    </main>

  );

}








function Info({
  title,
  value,
}) {


  if(!value) return null;



  return (

    <div>

      <p
        className="
          text-sm
          uppercase
          tracking-widest
          text-neutral-400
        "
      >

        {title}

      </p>



      <p
        className="
          mt-3
          text-lg
          font-medium
        "
      >

        {value}

      </p>


    </div>

  );

}