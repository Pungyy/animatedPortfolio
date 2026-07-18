import { useEffect, useState } from "react";
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


  const [current, setCurrent] = useState(null);

  const [saving, setSaving] = useState(false);








  useEffect(() => {


    if (contact) {


      setCurrent(contact);



      if (!contact.read) {

        markAsRead(contact);

      }


    } else {


      setCurrent(null);


    }


  }, [contact, open]);









  async function markAsRead(item) {


    try {


      const updated = await updateContact({

        ...item,

        read: true,

      });



      setCurrent(updated);



      onUpdated(updated);



    } catch(error) {


      console.error(error);


    }


  }









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

          <p className="text-sm text-zinc-500">
            Nom
          </p>


          <p className="mt-1 text-white">
            {current.name}
          </p>

        </div>







        <div>

          <p className="text-sm text-zinc-500">
            Email
          </p>


          <p className="mt-1 text-white">
            {current.email}
          </p>

        </div>







        {current.subject && (

          <div>

            <p className="text-sm text-zinc-500">
              Sujet
            </p>


            <p className="mt-1 text-white">
              {current.subject}
            </p>


          </div>

        )}








        <div>

          <p className="text-sm text-zinc-500">
            Message
          </p>


          <div
            className="
              mt-2
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              p-4
              text-sm
              leading-relaxed
              text-zinc-300
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



          <button

            onClick={onClose}

            className="
              rounded-xl
              border
              border-zinc-700
              px-5
              py-3
              text-zinc-300
              transition
              hover:bg-zinc-800
            "

          >

            Fermer

          </button>






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