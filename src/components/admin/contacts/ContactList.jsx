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
          border-zinc-800
          bg-zinc-900
          p-10
          text-center
          text-zinc-400
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