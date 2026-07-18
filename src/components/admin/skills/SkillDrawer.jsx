import { useEffect, useState } from "react";
import { toast } from "sonner";

import Drawer from "../ui/Drawer";
import Button from "../ui/Button";

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


  const [form, setForm] = useState(emptySkill);

  const [saving, setSaving] = useState(false);





  useEffect(() => {

    if (skill) {

      setForm({
        ...emptySkill,
        ...skill,
      });

    } else {

      setForm({
        ...emptySkill,
      });

    }

  }, [skill, open]);







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