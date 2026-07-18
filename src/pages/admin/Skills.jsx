import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Button from "../../components/admin/ui/Button";

import SkillList from "../../components/admin/skills/SkillList";
import SkillDrawer from "../../components/admin/skills/SkillDrawer";

import {
  getSkills,
  deleteSkill,
} from "../../services/skills.service";



export default function Skills() {


  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedSkill, setSelectedSkill] =
    useState(null);







  useEffect(() => {

    loadSkills();

  }, []);








  async function loadSkills() {

    try {

      setLoading(true);


      const data =
        await getSkills();


      setSkills(data);

    } catch (error) {


      console.error(error);


      toast.error(
        "Impossible de charger les compétences."
      );


    } finally {

      setLoading(false);

    }

  }








  function handleCreate() {

    setSelectedSkill(null);

    setDrawerOpen(true);

  }








  function handleEdit(skill) {

    setSelectedSkill(skill);

    setDrawerOpen(true);

  }








  async function handleDelete(skill) {


    const confirmed = window.confirm(
      `Supprimer "${skill.name}" ?`
    );


    if (!confirmed) {
      return;
    }





    try {


      await deleteSkill(
        skill.id
      );



      setSkills((prev) =>
        prev.filter(
          (item) =>
            item.id !== skill.id
        )
      );



      toast.success(
        "Compétence supprimée."
      );



    } catch (error) {


      console.error(error);


      toast.error(
        "Erreur lors de la suppression."
      );


    }

  }









  function handleSaved(skill) {


    setSkills((prev) => {


      const exists =
        prev.find(
          (item) =>
            item.id === skill.id
        );



      if (exists) {


        return prev.map(
          (item) =>
            item.id === skill.id
              ? skill
              : item
        );


      }





      return [
        ...prev,
        skill,
      ];


    });


  }








  if (loading) {

    return (

      <div className="text-zinc-400">

        Chargement...

      </div>

    );

  }








  return (

    <div
      className="
        space-y-8
      "
    >





      <div
        className="
          flex
          items-center
          justify-between
        "
      >



        <SectionTitle

          title="Skills"

          description="Gère tes compétences et leurs niveaux."

        />





        <Button

          onClick={handleCreate}

        >

          <span
            className="
              flex
              items-center
              gap-2
            "
          >

            <Plus size={18}/>

            Nouvelle

          </span>


        </Button>


      </div>








      <SkillList

        skills={skills}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />








      <SkillDrawer

        open={drawerOpen}

        skill={selectedSkill}

        onClose={() => {

          setDrawerOpen(false);

          setSelectedSkill(null);

        }}


        onSaved={handleSaved}

      />



    </div>

  );

}