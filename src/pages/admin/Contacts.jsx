import { useEffect, useState } from "react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Spinner from "../../components/admin/ui/Spinner";

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
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getContacts();
        if (!ignore) setContacts(data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger les messages.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  function handleView(contact) {
    setSelectedContact(contact);
    setDrawerOpen(true);
  }

  async function handleDelete(contact) {
    if (!window.confirm("Supprimer ce message ?")) return;

    try {
      await deleteContact(contact.id);
      setContacts((prev) => prev.filter((item) => item.id !== contact.id));
      toast.success("Message supprimé.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur suppression.");
    }
  }

  function handleUpdated(contact) {
    setContacts((prev) =>
      prev.map((item) => (item.id === contact.id ? contact : item))
    );
  }

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Messages"
        description={
          unread > 0
            ? `${unread} message${unread > 1 ? "s" : ""} non lu${unread > 1 ? "s" : ""}.`
            : "Les messages reçus depuis ton portfolio."
        }
      />

      {loading ? (
        <Spinner />
      ) : (
        <ContactList
          contacts={contacts}
          onView={handleView}
          onDelete={handleDelete}
        />
      )}

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
