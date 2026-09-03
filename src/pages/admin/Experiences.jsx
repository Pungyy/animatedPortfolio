import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Button from "../../components/admin/ui/Button";

import ExperienceList from "../../components/admin/experiences/ExperienceList";
import ExperienceDrawer from "../../components/admin/experiences/ExperienceDrawer";

import {
  getExperiences,
  deleteExperience,
} from "../../services/experiences.service";




export default function Experiences() {


  const [experiences, setExperiences] = useState([]);

  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedExperience, setSelectedExperience] =
    useState(null);








  useEffect(() => {

    let ignore = false;

    (async () => {

      try {

        const data = await getExperiences();

        if (!ignore) {
          setExperiences(data);
        }

      } catch (error) {

        console.error(error);

        toast.error(
          "Impossible de charger les expériences."
        );

      } finally {

        if (!ignore) {
          setLoading(false);
        }

      }

    })();

    return () => {
      ignore = true;
    };

  }, []);
















  function handleCreate() {


    setSelectedExperience(null);

    setDrawerOpen(true);


  }









  function handleEdit(experience) {


    setSelectedExperience(
      experience
    );


    setDrawerOpen(true);


  }









  async function handleDelete(experience) {


    const confirmed = window.confirm(
      `Supprimer "${experience.role}" chez ${experience.company} ?`
    );


    if (!confirmed) {

      return;

    }






    try {



      await deleteExperience(
        experience.id
      );





      setExperiences((prev) =>

        prev.filter(
          (item) =>
            item.id !== experience.id
        )

      );





      toast.success(
        "Expérience supprimée."
      );




    } catch(error) {



      console.error(error);



      toast.error(
        "Erreur lors de la suppression."
      );



    }


  }









  function handleSaved(experience) {


    setExperiences((prev) => {



      const exists =
        prev.find(
          (item) =>
            item.id === experience.id
        );




      if (exists) {



        return prev.map(
          (item) =>

            item.id === experience.id

              ? experience

              : item
        );



      }






      return [

        ...prev,

        experience,

      ];



    });


  }









  if (loading) {


    return (

      <div
        className="
          text-[var(--text-secondary)]
        "
      >

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

          title="Experiences"

          description="Gère ton parcours professionnel."

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









      <ExperienceList

        experiences={experiences}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />









      <ExperienceDrawer


        open={drawerOpen}


        experience={selectedExperience}


        onClose={() => {


          setDrawerOpen(false);


          setSelectedExperience(null);


        }}



        onSaved={handleSaved}



      />




    </div>

  );

}