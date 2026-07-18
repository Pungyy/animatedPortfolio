import {
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";

import {
  FaGithub,
} from "react-icons/fa";

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
        border-zinc-800
        bg-zinc-900
        transition
        hover:border-zinc-700
      "
    >


      {/* IMAGE */}

      <div
        className="
          relative
          h-52
          overflow-hidden
          bg-zinc-800
        "
      >

        {project.cover_image ? (

          <img
            src={project.cover_image}
            alt={project.title}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-300
              hover:scale-105
            "
          />

        ) : (

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-zinc-500
            "
          >
            Pas d'image
          </div>

        )}



        {project.featured && (

          <span
            className="
              absolute
              left-4
              top-4
              rounded-full
              bg-violet-600
              px-3
              py-1
              text-xs
              font-medium
              text-white
            "
          >
            Featured
          </span>

        )}

      </div>





      {/* CONTENT */}

      <div
        className="
          space-y-5
          p-5
        "
      >



        <div>

          <h3
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            {project.title}
          </h3>


          <p
            className="
              mt-2
              line-clamp-3
              text-sm
              text-zinc-400
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

          {project.category && (

            <span
              className="
                rounded-full
                bg-zinc-800
                px-3
                py-1
                text-xs
                text-zinc-300
              "
            >
              {project.category}
            </span>

          )}



          {project.status && (

            <span
              className="
                rounded-full
                bg-zinc-800
                px-3
                py-1
                text-xs
                text-zinc-300
              "
            >
              {project.status}
            </span>

          )}



          {project.year && (

            <span
              className="
                rounded-full
                bg-zinc-800
                px-3
                py-1
                text-xs
                text-zinc-300
              "
            >
              {project.year}
            </span>

          )}

        </div>






        {/* TECHNOLOGIES */}

        {project.technologies?.length > 0 && (

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            {project.technologies.map((tech) => (

              <span

                key={tech.id}

                className="
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                "

                style={{
                  backgroundColor: `${tech.color}20`,
                  color: tech.color,
                  border: `1px solid ${tech.color}50`,
                }}

              >

                <div className="flex items-center gap-2">

                    <TechnologyIcon
                        name={tech.icon}
                        size={14}
                    />

                    {tech.name}

                </div>

              </span>

            ))}

          </div>

        )}







        {/* LINKS */}

        <div
          className="
            flex
            gap-3
          "
        >

          {project.github_url && (

            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="
                rounded-lg
                bg-zinc-800
                p-2
                text-zinc-300
                transition
                hover:bg-zinc-700
              "
            >

              <FaGithub size={18}/>

            </a>

          )}






          {project.demo_url && (

            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="
                rounded-lg
                bg-zinc-800
                p-2
                text-zinc-300
                transition
                hover:bg-zinc-700
              "
            >

              <ExternalLink size={18}/>

            </a>

          )}

        </div>







        {/* ACTIONS */}

        <div
          className="
            flex
            justify-end
            gap-3
            border-t
            border-zinc-800
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
              bg-zinc-800
              px-4
              py-2
              text-sm
              text-white
              transition
              hover:bg-zinc-700
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
              bg-red-600/20
              px-4
              py-2
              text-sm
              text-red-400
              transition
              hover:bg-red-600/30
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