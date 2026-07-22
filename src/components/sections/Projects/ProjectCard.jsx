import {
  motion,
} from "framer-motion";


import {
  ExternalLink,
} from "lucide-react";


import {
  FaGithub,
} from "react-icons/fa";


import {
  Link,
} from "react-router-dom";


import TechnologyIcon from "../../ui/TechnologyIcon";





export default function ProjectCard({
  project,
  index,
}) {


  return (

    <motion.article


      initial={{
        opacity:0,
        y:50,
        filter:"blur(12px)",
      }}


      whileInView={{
        opacity:1,
        y:0,
        filter:"blur(0px)",
      }}


      viewport={{
        once:true,
        margin:"-100px",
      }}


      transition={{
        duration:.7,
        delay:index * .12,
        ease:[
          .22,
          1,
          .36,
          1,
        ],
      }}



      className="
        group

        overflow-hidden

        rounded-[36px]

        border
        border-[var(--border)]

        bg-[var(--surface)]

        shadow-[var(--shadow-card)]

        transition-all

        duration-500

        hover:-translate-y-3
      "


    >





      <Link

        to={`/project/${project.slug}`}

        className="block"

      >








        {/* IMAGE */}



        <div

          className="
            relative

            aspect-[16/10]

            overflow-hidden

            bg-[var(--surface-muted)]
          "

        >



          {
            project.cover_image ? (


              <motion.img


                src={project.cover_image}

                alt={project.title}


                whileHover={{
                  scale:1.08,
                }}


                transition={{
                  duration:.7,
                }}



                className="
                  h-full
                  w-full
                  object-cover
                "


              />


            )

            :

            (

              <div

                className="
                  flex
                  h-full
                  items-center
                  justify-center

                  text-sm

                  text-[var(--text-secondary)]
                "

              >

                Aucune image


              </div>


            )
          }







          <div

            className="
              absolute

              inset-0

              bg-gradient-to-t

              from-black/30

              via-transparent

              opacity-0

              transition

              duration-500

              group-hover:opacity-100
            "

          />




        </div>












        {/* CONTENT */}



        <div

          className="
            space-y-7

            p-8
          "

        >





          <div>


            <h3

              className="
                text-2xl

                font-semibold

                tracking-tight

                text-[var(--text-primary)]
              "

            >

              {project.title}


            </h3>







            {
              project.short_description && (

                <p

                  className="
                    mt-4

                    line-clamp-3

                    text-sm

                    leading-7

                    text-[var(--text-secondary)]
                  "

                >

                  {project.short_description}


                </p>

              )
            }


          </div>









          {/* TECHNOLOGIES */}



          {
            project.technologies?.length > 0 && (


              <div

                className="
                  flex

                  flex-wrap

                  gap-2
                "

              >



                {
                  project.technologies.map(

                    (tech)=>(


                      <span


                        key={tech.id}


                        className="
                          flex

                          items-center

                          gap-2

                          rounded-full

                          border

                          px-3

                          py-1.5

                          text-xs

                          font-medium
                        "



                        style={{


                          backgroundColor:
                            `${tech.color}12`,


                          borderColor:
                            `${tech.color}40`,


                          color:
                            tech.color,


                        }}



                      >



                        <TechnologyIcon

                          name={tech.icon}

                          size={14}

                        />



                        {tech.name}



                      </span>


                    )

                  )
                }



              </div>

            )
          }





        </div>





      </Link>









      {/* ACTIONS */}



      <div

        className="
          flex

          gap-3

          px-8

          pb-8
        "

      >






        {
          project.github_url && (


            <a


              href={project.github_url}


              target="_blank"


              rel="noreferrer"


              onClick={(e)=>e.stopPropagation()}



              className="
                flex

                h-11

                w-11

                items-center

                justify-center


                rounded-full


                bg-[var(--surface-muted)]


                text-[var(--text-secondary)]


                transition


                duration-300


                hover:bg-[var(--text-primary)]


                hover:text-[var(--background)]
              "


            >


              <FaGithub size={18}/>



            </a>


          )
        }








        {
          project.demo_url && (


            <a


              href={project.demo_url}


              target="_blank"


              rel="noreferrer"


              onClick={(e)=>e.stopPropagation()}



              className="
                flex

                h-11

                w-11

                items-center

                justify-center


                rounded-full


                bg-[var(--surface-muted)]


                text-[var(--text-secondary)]


                transition


                duration-300


                hover:bg-[var(--text-primary)]


                hover:text-[var(--background)]
              "


            >


              <ExternalLink size={18}/>



            </a>


          )
        }





      </div>





    </motion.article>

  );

}