import {
  Mail,
  Trash2,
  Eye,
} from "lucide-react";



export default function ContactCard({
  contact,
  onView,
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



      <div
        className="
          flex
          items-start
          justify-between
        "
      >



        <div>


          <h3
            className="
              font-semibold
              text-white
            "
          >

            {contact.name}

          </h3>



          <p
            className="
              mt-1
              flex
              items-center
              gap-2
              text-sm
              text-zinc-400
            "
          >

            <Mail size={14}/>

            {contact.email}

          </p>


        </div>





        {!contact.read && (

          <span

            className="
              rounded-full
              bg-violet-600/20
              px-3
              py-1
              text-xs
              text-violet-400
            "

          >

            Nouveau

          </span>

        )}



      </div>







      {contact.subject && (

        <p

          className="
            mt-5
            text-sm
            font-medium
            text-zinc-200
          "

        >

          {contact.subject}

        </p>

      )}







      <p

        className="
          mt-3
          line-clamp-3
          text-sm
          text-zinc-400
        "

      >

        {contact.message}

      </p>







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

          onClick={() => onView(contact)}

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

          <Eye size={16}/>

          Voir

        </button>






        <button

          onClick={() => onDelete(contact)}

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