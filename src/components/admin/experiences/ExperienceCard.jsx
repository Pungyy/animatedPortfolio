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
              text-white
            "
          >

            {experience.role}

          </h3>



          <p
            className="
              mt-1
              text-violet-400
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
              text-green-400
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
          text-zinc-400
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
            text-zinc-400
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
            bg-zinc-800
            px-3
            py-1
            text-xs
            text-zinc-300
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
          border-zinc-800
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
            bg-zinc-800
            px-4
            py-2
            text-sm
            text-white
            hover:bg-zinc-700
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
            bg-red-600/20
            px-4
            py-2
            text-sm
            text-red-400
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