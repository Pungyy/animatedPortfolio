import {
  Pencil,
  Trash2,
} from "lucide-react";

import TechnologyIcon from "../../ui/TechnologyIcon";



export default function SkillCard({
  skill,
  onEdit,
  onDelete,
}) {


  return (

    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-5
        transition
        hover:border-zinc-700
      "
    >


      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >


        <div
          className="
            flex
            items-center
            gap-3
          "
        >


          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
            "

            style={{
              backgroundColor:
                `${skill.color || "#ffffff"}20`,

              color:
                 skill.color || "#ffffff",
            }}
          >

            <TechnologyIcon
              name={skill.icon}
              size={20}
            />

          </div>





          <div>

            <h3
              className="
                font-semibold
                text-white
              "
            >
              {skill.name}
            </h3>


            <p
              className="
                text-xs
                text-zinc-500
              "
            >
              {skill.category}
            </p>


          </div>


        </div>





        <span
          className="
            text-sm
            font-medium
          "

          style={{
            color: skill.color,
          }}
        >

          {skill.level}%

        </span>


      </div>








      {/* PROGRESS BAR */}

      <div
        className="
          mt-5
          h-2
          overflow-hidden
          rounded-full
          bg-zinc-800
      "
      >

        <div

          className="
            h-full
            rounded-full
            transition-all
          "

          style={{
            width: `${skill.level}%`,
            backgroundColor: skill.color,
          }}

        />


      </div>








      {/* ACTIONS */}

      <div
        className="
          mt-5
          flex
          justify-end
          gap-3
          border-t
          border-zinc-800
          pt-4
        "
      >


        <button

          onClick={() => onEdit(skill)}

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

          onClick={() => onDelete(skill)}

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

  );

}