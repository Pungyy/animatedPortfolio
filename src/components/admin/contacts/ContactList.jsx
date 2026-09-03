import ContactCard from "./ContactCard";



export default function ContactList({
  contacts = [],
  onView,
  onDelete,
}) {


  if (!contacts.length) {


    return (

      <div

        className="
          rounded-2xl
          border
          border-[var(--border)]
          bg-[var(--surface)]
          p-10
          text-center
          text-[var(--text-secondary)]
        "

      >

        Aucun message.

      </div>

    );


  }







  return (

    <div

      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "

    >


      {contacts.map((contact) => (


        <ContactCard

          key={contact.id}

          contact={contact}

          onView={onView}

          onDelete={onDelete}

        />


      ))}



    </div>

  );

}