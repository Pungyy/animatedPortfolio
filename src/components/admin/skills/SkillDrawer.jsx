import { useState } from "react";
import { toast } from "sonner";

import Drawer from "../ui/Drawer";
import DrawerFooter from "../ui/DrawerFooter";

import SkillForm from "./SkillForm";

import {
  createSkill,
  updateSkill,
} from "../../../services/skills.service";


const emptySkill = {
  name: "",
  category: "",
  level: 0,
  icon: "",
  color: "#ffffff",
  display_order: 0,
};



export default function SkillDrawer({
  open,
  skill,
  onClose,
  onSaved,
}) {


  const buildForm = () =>
    skill
      ? { ...emptySkill, ...skill }
      : { ...emptySkill };

  const [form, setForm] = useState(buildForm);

  const [saving, setSaving] = useState(false);

  const [syncKey, setSyncKey] = useState({ skill, open });

  if (syncKey.skill !== skill || syncKey.open !== open) {
    setSyncKey({ skill, open });
    setForm(buildForm());
  }







  function handleChange(e) {

    const {
      name,
      value,
    } = e.target;


    setForm((prev) => ({
      ...prev,
      [name]:

        name === "level" ||
        name === "display_order"

          ? Number(value)

          : value,
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


      let saved;



      if (form.id) {


        saved = await updateSkill(form);


        toast.success(
          "Compétence modifiée."
        );


      } else {


        saved = await createSkill(form);


        toast.success(
          "Compétence créée."
        );

      }






      if (saved) {

        onSaved(saved);

      }


      onClose();




    } catch(error) {


      console.error(
        "SAVE SKILL ERROR:",
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
          ? "Modifier la compétence"
          : "Nouvelle compétence"
      }

      onClose={onClose}

    >



      <SkillForm

        skill={form}

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