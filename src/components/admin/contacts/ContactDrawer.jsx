import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import Drawer from "../ui/Drawer";
import Button from "../ui/Button";

import {
  updateContact,
} from "../../../services/contacts.service";



export default function ContactDrawer({
  open,
  contact,
  onClose,
  onUpdated,
}) {


  const [current, setCurrent] = useState(() => contact ?? null);

  const [saving, setSaving] = useState(false);

  const [syncKey, setSyncKey] = useState({ contact, open });

  const markedRef = useRef(null);

  if (syncKey.contact !== contact || syncKey.open !== open) {
    setSyncKey({ contact, open });
    setCurrent(contact ?? null);
  }


  useEffect(() => {

    if (!contact || contact.read || markedRef.current === contact.id) {
      return;
    }

    markedRef.current = contact.id;

    let ignore = false;

    (async () => {
      try {
        const updated = await updateContact({
          ...contact,
          read: true,
        });

        if (!ignore) {
          setCurrent(updated);
          onUpdated(updated);
        }

      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      ignore = true;
    };

  }, [contact, open, onUpdated]);









  async function handleToggleRead() {


    if (!current) return;



    try {


      setSaving(true);



      const updated = await updateContact({

        ...current,

        read: !current.read,

      });



      setCurrent(updated);



      onUpdated(updated);



      toast.success(
        updated.read
          ? "Message marqué comme lu."
          : "Message marqué comme non lu."
      );



    } catch(error) {


      console.error(error);



      toast.error(
        "Erreur modification."
      );



    } finally {


      setSaving(false);


    }


  }







  if (!current) {

    return null;

  }







  return (

    <Drawer

      open={open}

      title="Message reçu"

      onClose={onClose}

    >



      <div
        className="
          space-y-6
        "
      >



        <div>

          <p className="text-sm text-[var(--text-muted)]">
            Nom
          </p>


          <p className="mt-1 text-[var(--text-primary)]">
            {current.name}
          </p>

        </div>







        <div>

          <p className="text-sm text-[var(--text-muted)]">
            Email
          </p>


          <p className="mt-1 text-[var(--text-primary)]">
            {current.email}
          </p>

        </div>







        {current.subject && (

          <div>

            <p className="text-sm text-[var(--text-muted)]">
              Sujet
            </p>


            <p className="mt-1 text-[var(--text-primary)]">
              {current.subject}
            </p>


          </div>

        )}








        <div>

          <p className="text-sm text-[var(--text-muted)]">
            Message
          </p>


          <div
            className="
              mt-2
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
              text-sm
              leading-relaxed
              text-[var(--text-secondary)]
            "
          >

            {current.message}

          </div>


        </div>








        <div
          className="
            flex
            justify-end
            gap-3
            pt-5
          "
        >



          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>






          <Button

            onClick={handleToggleRead}

            disabled={saving}

          >

            {

              current.read

                ? "Marquer non lu"

                :

                "Marquer lu"

            }


          </Button>



        </div>



      </div>



    </Drawer>

  );

}