import {
  motion,
} from "framer-motion";


import {
  ExternalLink,
} from "lucide-react";


import {
  FaGithub,
} from "react-icons/fa";


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

        border-neutral-200

        bg-white

        shadow-[0_20px_70px_rgba(0,0,0,.06)]

        transition-all

        duration-500

        hover:-translate-y-3

        hover:shadow-[0_40px_100px_rgba(0,0,0,.14)]

      "


    >







      {/* IMAGE */}


      <div

        className="

          relative

          aspect-[16/10]

          overflow-hidden

          bg-neutral-100

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



          ) : (


            <div

              className="

                flex

                h-full

                items-center

                justify-center

                text-sm

                text-neutral-400

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

              text-neutral-950

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

                  text-neutral-500

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









        {/* ACTIONS */}



        <div

          className="

            flex

            gap-3

            pt-2

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

                  h-11

                  w-11

                  items-center

                  justify-center

                  rounded-full

                  bg-neutral-100

                  text-neutral-700

                  transition

                  duration-300

                  hover:bg-black

                  hover:text-white

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



                className="

                  flex

                  h-11

                  w-11

                  items-center

                  justify-center

                  rounded-full

                  bg-neutral-100

                  text-neutral-700

                  transition

                  duration-300

                  hover:bg-black

                  hover:text-white

                "


              >


                <ExternalLink size={18}/>



              </a>


            )
          }





        </div>





      </div>




    </motion.article>


  );

}