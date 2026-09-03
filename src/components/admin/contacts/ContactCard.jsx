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
        border-[var(--border)]
        bg-[var(--surface)]
        p-5
        transition
        hover:border-[var(--border)]
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
              text-[var(--text-primary)]
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
              text-[var(--text-secondary)]
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
              bg-[var(--accent-soft)]
              px-3
              py-1
              text-xs
              text-[var(--accent)]
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
            text-[var(--text-primary)]
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
          text-[var(--text-secondary)]
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
          border-[var(--border)]
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
            bg-[var(--surface-muted)]
            px-4
            py-2
            text-sm
            text-[var(--text-primary)]
            transition
            hover:bg-[var(--surface-muted)]
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