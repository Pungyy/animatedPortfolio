import {
  Pencil,
  Trash2,
} from "lucide-react";

import TechnologyIcon from "../../ui/TechnologyIcon";



export default function TechnologyCard({
  technology,
  onEdit,
  onDelete,
}) {


  return (

    <div
      className="
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-5
        transition
        hover:border-[var(--border)]
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
                `${technology.color}20`,

              color:
                technology.color,
            }}
          >

            <TechnologyIcon
              name={technology.icon}
              size={20}
            />

          </div>




          <div>

            <h3
              className="
                font-semibold
                text-[var(--text-primary)]
              "
            >
              {technology.name}
            </h3>


            <p
              className="
                text-xs
                text-[var(--text-primary)]0
              "
            >
              {technology.icon}
            </p>


          </div>


        </div>





        <div
          className="
            h-5
            w-5
            rounded-full
          "

          style={{
            backgroundColor:
              technology.color,
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
          border-[var(--border)]
          pt-4
        "
      >


        <button

          onClick={() => onEdit(technology)}

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

          onClick={() => onDelete(technology)}

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
            hover:opacity-90/30
          "

        >

          <Trash2 size={16}/>

          Supprimer

        </button>


      </div>



    </div>

  );

}