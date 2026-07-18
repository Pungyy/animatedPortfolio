import { useEffect, useState } from "react";
import { toast } from "sonner";

import Drawer from "../ui/Drawer";
import Button from "../ui/Button";

import ExperienceForm from "./ExperienceForm";

import {
  createExperience,
  updateExperience,
} from "../../../services/experiences.service";



const emptyExperience = {

  company: "",

  position: "",

  location: "",

  description: "",

  start_date: "",

  end_date: "",

  current_job: false,

  display_order: 0,

};








export default function ExperienceDrawer({
  open,
  experience,
  onClose,
  onSaved,
}) {


  const [form, setForm] = useState({
    ...emptyExperience,
  });


  const [saving, setSaving] = useState(false);









  useEffect(() => {


    if (experience) {


      setForm({

        ...emptyExperience,

        ...experience,

      });



    } else {


      setForm({

        ...emptyExperience,

      });


    }


  }, [experience, open]);









  function handleChange(e) {


    const {
      name,
      value,
      type,
      checked,
    } = e.target;



    setForm((prev) => ({


      ...prev,


      [name]:

        type === "checkbox"

          ? checked


          :

        name === "display_order"

          ? Number(value)


          :

        value,


    }));


  }









  async function handleSubmit() {


    if (!form.company.trim()) {


      toast.error(
        "L'entreprise est obligatoire."
      );


      return;

    }





    if (!form.position.trim()) {


      toast.error(
        "Le poste est obligatoire."
      );


      return;

    }








    try {


      setSaving(true);



      let result;





      if (form.id) {



        result =
          await updateExperience(
            form
          );



        toast.success(
          "Expérience modifiée."
        );




      } else {



        result =
          await createExperience(
            form
          );



        toast.success(
          "Expérience créée."
        );


      }








      onSaved(result);


      onClose();




    } catch(error) {



      console.error(
        "EXPERIENCE SAVE ERROR:",
        error
      );



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

          ? "Modifier l'expérience"

          :

          "Nouvelle expérience"

      }

      onClose={onClose}

    >





      <ExperienceForm

        experience={form}

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

              :

              "Enregistrer"

          }


        </Button>





      </div>





    </Drawer>


  );

}