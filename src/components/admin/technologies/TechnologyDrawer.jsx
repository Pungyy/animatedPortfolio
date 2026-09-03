import { useState } from "react";
import { toast } from "sonner";

import Drawer from "../ui/Drawer";
import DrawerFooter from "../ui/DrawerFooter";

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


  const buildForm = () =>
    technology
      ? { ...emptyTechnology, ...technology }
      : { ...emptyTechnology };

  const [form, setForm] = useState(buildForm);

  const [saving, setSaving] = useState(false);

  const [syncKey, setSyncKey] = useState({ technology, open });

  if (syncKey.technology !== technology || syncKey.open !== open) {
    setSyncKey({ technology, open });
    setForm(buildForm());
  }







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





      <DrawerFooter
        onCancel={onClose}
        onSubmit={handleSubmit}
        saving={saving}
      />



    </Drawer>

  );

}