import {
  Pencil,
  Trash2,
  Calendar,
  MapPin,
} from "lucide-react";



export default function ExperienceCard({
  experience,
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
          items-start
          justify-between
          gap-4
        "
      >


        <div>


          <h3
            className="
              text-xl
              font-semibold
              text-[var(--text-primary)]
            "
          >

            {experience.role}

          </h3>



          <p
            className="
              mt-1
              text-[var(--accent)]
            "
          >

            {experience.company}

          </p>


        </div>




        {experience.current && (

          <span
            className="
              rounded-full
              bg-green-500/20
              px-3
              py-1
              text-xs
              text-[var(--success)]
            "
          >

            Actuel

          </span>

        )}


      </div>





      {/* INFOS */}

      <div
        className="
          mt-5
          space-y-2
          text-sm
          text-[var(--text-secondary)]
        "
      >


        {experience.location && (

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <MapPin size={15}/>

            {experience.location}

          </div>

        )}





        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Calendar size={15}/>


          {experience.start_date}


          {" - "}


          {
            experience.current
              ? "Aujourd'hui"
              : experience.end_date
          }


        </div>



      </div>






      {/* DESCRIPTION */}

      {experience.description && (

        <p
          className="
            mt-5
            text-sm
            leading-relaxed
            text-[var(--text-secondary)]
          "
        >

          {experience.description}

        </p>

      )}








      {/* TYPE */}

      {experience.type && (

        <span
          className="
            mt-5
            inline-block
            rounded-full
            bg-[var(--surface-muted)]
            px-3
            py-1
            text-xs
            text-[var(--text-secondary)]
          "
        >

          {experience.type}

        </span>

      )}







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

          onClick={() => onEdit(experience)}

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
            hover:bg-[var(--surface-muted)]
          "

        >

          <Pencil size={16}/>

          Modifier

        </button>





        <button

          onClick={() => onDelete(experience)}

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