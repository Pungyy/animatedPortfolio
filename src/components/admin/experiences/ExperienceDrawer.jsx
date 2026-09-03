import { useState } from "react";
import { toast } from "sonner";

import Drawer from "../ui/Drawer";
import DrawerFooter from "../ui/DrawerFooter";

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


  const buildForm = () =>
    experience
      ? { ...emptyExperience, ...experience }
      : { ...emptyExperience };

  const [form, setForm] = useState(buildForm);

  const [saving, setSaving] = useState(false);

  const [syncKey, setSyncKey] = useState({ experience, open });

  if (syncKey.experience !== experience || syncKey.open !== open) {
    setSyncKey({ experience, open });
    setForm(buildForm());
  }









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









      <DrawerFooter
        onCancel={onClose}
        onSubmit={handleSubmit}
        saving={saving}
      />





    </Drawer>


  );

}