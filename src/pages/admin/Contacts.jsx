import { useEffect, useState } from "react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";

import ContactList from "../../components/admin/contacts/ContactList";
import ContactDrawer from "../../components/admin/contacts/ContactDrawer";

import {
  getContacts,
  deleteContact,
} from "../../services/contacts.service";





export default function Contacts() {


  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedContact, setSelectedContact] =
    useState(null);









  useEffect(() => {

    loadContacts();

  }, []);









  async function loadContacts() {


    try {


      setLoading(true);


      const data =
        await getContacts();


      setContacts(data);



    } catch(error) {


      console.error(error);



      toast.error(
        "Impossible de charger les messages."
      );


    } finally {


      setLoading(false);


    }


  }









  function handleView(contact) {


    setSelectedContact(contact);

    setDrawerOpen(true);


  }









  async function handleDelete(contact) {


    const confirmed = window.confirm(
      "Supprimer ce message ?"
    );



    if (!confirmed) {

      return;

    }






    try {


      await deleteContact(
        contact.id
      );



      setContacts((prev) =>

        prev.filter(
          (item) =>
            item.id !== contact.id
        )

      );



      toast.success(
        "Message supprimé."
      );



    } catch(error) {


      console.error(error);



      toast.error(
        "Erreur suppression."
      );


    }


  }









  function handleUpdated(contact) {


    setContacts((prev) =>


      prev.map((item) =>


        item.id === contact.id

          ? contact

          : item


      )


    );


  }









  if (loading) {


    return (

      <div
        className="
          text-zinc-400
        "
      >

        Chargement...

      </div>

    );


  }









  return (

    <div
      className="
        space-y-8
      "
    >




      <SectionTitle

        title="Contacts"

        description="Gère les messages reçus depuis ton portfolio."

      />







      <ContactList

        contacts={contacts}

        onView={handleView}

        onDelete={handleDelete}

      />








      <ContactDrawer


        open={drawerOpen}


        contact={selectedContact}


        onClose={() => {


          setDrawerOpen(false);

          setSelectedContact(null);


        }}


        onUpdated={handleUpdated}


      />





    </div>

  );

}