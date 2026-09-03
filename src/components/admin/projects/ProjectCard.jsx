import {
  Pencil,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import TechnologyIcon from "../../ui/TechnologyIcon";


export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {

  return (

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        transition
        hover:border-[var(--accent)]
      "
    >


      {/* IMAGE */}

      <div
        className="
          group
          relative
          h-52
          overflow-hidden
          bg-[var(--surface-muted)]
        "
      >

        {
          project.cover_image ?

          <img
            src={project.cover_image}
            alt={project.title}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-110
            "
          />

          :

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-sm
              text-[var(--text-primary)]0
            "
          >
            Pas d'image
          </div>

        }



        {/* OVERLAY */}

        {project.cover_image && (

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/40
              opacity-0
              transition
              group-hover:opacity-100
            "
          >

            <Eye
              className="text-[var(--text-primary)]"
              size={30}
            />

          </div>

        )}




        {
          project.featured && (

            <span
              className="
                absolute
                left-4
                top-4
                rounded-full
                bg-[var(--accent)]
                px-3
                py-1
                text-xs
                font-semibold
                text-[var(--accent-foreground)]
              "
            >
              ⭐ Featured
            </span>

          )
        }


      </div>





      {/* CONTENT */}

      <div
        className="
          space-y-5
          p-5
        "
      >



        <div>

          <div
            className="
              flex
              items-start
              justify-between
              gap-3
            "
          >

            <h3
              className="
                text-xl
                font-semibold
                text-[var(--text-primary)]
              "
            >
              {project.title}
            </h3>


            {
              project.published ?

              <Eye
                size={18}
                className="text-[var(--success)]"
              />

              :

              <EyeOff
                size={18}
                className="text-[var(--text-primary)]0"
              />

            }


          </div>



          <p
            className="
              mt-2
              line-clamp-3
              text-sm
              text-[var(--text-secondary)]
            "
          >
            {project.short_description}
          </p>


        </div>






        {/* INFOS */}

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >

          {
            project.category && (

              <span
                className="
                  rounded-full
                  bg-[var(--surface-muted)]
                  px-3
                  py-1
                  text-xs
                  text-[var(--text-secondary)]
                "
              >
                {project.category}
              </span>

            )
          }



          {
            project.status && (

              <span
                className="
                  rounded-full
                  bg-[var(--surface-muted)]
                  px-3
                  py-1
                  text-xs
                  text-[var(--text-secondary)]
                "
              >
                {project.status}
              </span>

            )
          }



          {
            project.year && (

              <span
                className="
                  rounded-full
                  bg-[var(--surface-muted)]
                  px-3
                  py-1
                  text-xs
                  text-[var(--text-secondary)]
                "
              >
                {project.year}
              </span>

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
                project.technologies.map((tech) => (

                  <span
                    key={tech.id}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                    "
                    style={{
                      backgroundColor:
                        `${tech.color}20`,
                      color:
                        tech.color,
                      border:
                        `1px solid ${tech.color}50`,
                    }}
                  >

                    <TechnologyIcon
                      name={tech.icon}
                      size={14}
                    />

                    {tech.name}

                  </span>

                ))
              }


            </div>

          )
        }








        {/* LINKS */}

        <div
          className="
            flex
            gap-3
          "
        >

          {
            project.github_url && (

              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="
                  rounded-lg
                  bg-[var(--surface-muted)]
                  p-2
                  text-[var(--text-secondary)]
                  hover:bg-[var(--surface-muted)]
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
                  rounded-lg
                  bg-[var(--surface-muted)]
                  p-2
                  text-[var(--text-secondary)]
                  hover:bg-[var(--surface-muted)]
                "
              >

                <ExternalLink size={18}/>

              </a>

            )
          }


        </div>







        {/* ACTIONS */}

        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-[var(--border)]
            pt-4
          "
        >

          <button
            onClick={() => onEdit(project)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-[var(--surface-muted)]
              px-4
              py-2
              text-sm
              text-[var(--text-primary)]
              transition
              hover:bg-[var(--surface-muted)]
            "
          >

            <Pencil size={16}/>

            Modifier

          </button>




          <button
            onClick={() => onDelete(project)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-[var(--danger-soft)]
              px-4
              py-2
              text-sm
              text-[var(--danger)]
              transition
              hover:opacity-90/20
            "
          >

            <Trash2 size={16}/>

            Supprimer

          </button>


        </div>


      </div>


    </div>

  );

}