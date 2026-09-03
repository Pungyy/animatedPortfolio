import { Mail } from "lucide-react";

import ContactCard from "./ContactCard";
import EmptyState from "../ui/EmptyState";

export default function ContactList({ contacts = [], onView, onDelete }) {
  if (!contacts.length) {
    return (
      <EmptyState icon={Mail} title="Aucun message">
        Les messages envoyés depuis le formulaire de contact apparaîtront ici.
      </EmptyState>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
