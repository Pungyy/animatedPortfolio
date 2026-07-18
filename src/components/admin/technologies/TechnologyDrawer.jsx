import { useEffect, useState } from "react";
import { toast } from "sonner";

import Drawer from "../ui/Drawer";
import Button from "../ui/Button";

import TechnologyForm from "./TechnologyForm";

import {
  createTechnology,
  updateTechnology,
} from "../../../services/technologies.service";



const emptyTechnology = {
  name: "",
  icon: "",
  color: "#ffffff",
};




export default function TechnologyDrawer({
  open,
  technology,
  onClose,
  onSaved,
}) {


  const [form, setForm] = useState({
    ...emptyTechnology,
  });


  const [saving, setSaving] = useState(false);





  useEffect(() => {

    if (technology) {

      setForm({
        ...emptyTechnology,
        ...technology,
      });


    } else {

      setForm({
        ...emptyTechnology,
      });

    }


  }, [technology, open]);







  function handleChange(e) {

    const {
      name,
      value,
    } = e.target;


    setForm((prev) => ({

      ...prev,

      [name]: value,

    }));

  }







  async function handleSubmit() {


    if (!form.name.trim()) {

      toast.error(
        "Le nom est obligatoire."
      );

      return;

    }



    try {

      setSaving(true);


      let result;



      if (form.id) {


        result =
          await updateTechnology(
            form
          );


        toast.success(
          "Technologie modifiée."
        );



      } else {


        result =
          await createTechnology(
            form
          );


        toast.success(
          "Technologie créée."
        );


      }




      onSaved(result);


      onClose();




    } catch (error) {


      console.error(error);


      toast.error(
        "Erreur lors de l'enregistrement."
      );



    } finally {


      setSaving(false);


    }


  }







  return (

    <Drawer

      open={open}

      title={
        form.id
          ? "Modifier la technologie"
          : "Nouvelle technologie"
      }

      onClose={onClose}

    >



      <TechnologyForm

        technology={form}

        onChange={handleChange}

      />





      <div
        className="
          mt-10
          flex
          justify-end
          gap-4
        "
      >


        <button

          onClick={onClose}

          className="
            rounded-xl
            border
            border-zinc-700
            px-6
            py-3
            text-zinc-300
            transition
            hover:bg-zinc-800
          "

        >

          Annuler

        </button>





        <Button

          onClick={handleSubmit}

          disabled={saving}

        >

          {
            saving
              ? "Enregistrement..."
              : "Enregistrer"
          }

        </Button>


      </div>



    </Drawer>

  );

}