import { motion } from "framer-motion";
import {
  ExternalLink,
} from "lucide-react";

import {
  FaGithub,
} from "react-icons/fa";

import TechnologyIcon from "../../ui/TechnologyIcon";


export default function ProjectCard({
  project,
}) {


  return (

    <motion.article

      initial={{
        opacity: 0,
        y: 30,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
        margin: "-80px",
      }}

      transition={{
        duration: 0.5,
      }}


      className="
        group
        overflow-hidden
        rounded-[28px]
        border
        border-neutral-200
        bg-white
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)]
      "

    >


      {/* IMAGE */}

      <div
        className="
          relative
          aspect-[16/9]
          overflow-hidden
          bg-neutral-100
        "
      >

        {
          project.cover_image ? (

            <img

              src={project.cover_image}

              alt={project.title}

              className="
                h-full
                w-full
                object-cover
                transition
                duration-700
                group-hover:scale-110
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
            from-black/20
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
          space-y-5
          p-6
        "
      >


        <div>

          <h3
            className="
              text-xl
              font-semibold
              tracking-tight
              text-neutral-900
            "
          >

            {project.title}

          </h3>



          <p
            className="
              mt-3
              line-clamp-3
              text-sm
              leading-relaxed
              text-neutral-500
            "
          >

            {project.short_description}

          </p>


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
                  (tech) => (

                    <span

                      key={tech.id}

                      className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-3
                        py-1
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
                        size={13}
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
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-neutral-100
                  text-neutral-700
                  transition
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
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-neutral-100
                  text-neutral-700
                  transition
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