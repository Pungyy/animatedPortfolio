import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Button from "../../components/admin/ui/Button";

import TechnologyList from "../../components/admin/technologies/TechnologyList";
import TechnologyDrawer from "../../components/admin/technologies/TechnologyDrawer";

import {
  getTechnologies,
  deleteTechnology,
} from "../../services/technologies.service";



export default function Technologies() {


  const [technologies, setTechnologies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedTechnology, setSelectedTechnology] =
    useState(null);






  useEffect(() => {

    loadTechnologies();

  }, []);







  async function loadTechnologies() {

    try {

      setLoading(true);


      const data =
        await getTechnologies();


      setTechnologies(data);



    } catch (error) {


      console.error(error);


      toast.error(
        "Impossible de charger les technologies."
      );


    } finally {


      setLoading(false);


    }

  }









  function handleCreate() {

    setSelectedTechnology(null);

    setDrawerOpen(true);

  }







  function handleEdit(technology) {

    setSelectedTechnology(
      technology
    );

    setDrawerOpen(true);

  }







  async function handleDelete(technology) {


    const confirmed = window.confirm(
      `Supprimer "${technology.name}" ?`
    );


    if (!confirmed) {
      return;
    }





    try {


      await deleteTechnology(
        technology.id
      );



      setTechnologies((prev) =>
        prev.filter(
          (item) =>
            item.id !== technology.id
        )
      );



      toast.success(
        "Technologie supprimée."
      );



    } catch (error) {


      console.error(error);


      toast.error(
        "Erreur lors de la suppression."
      );


    }

  }









  function handleSaved(technology) {


    setTechnologies((prev) => {


      const exists =
        prev.find(
          (item) =>
            item.id === technology.id
        );



      if (exists) {


        return prev.map(
          (item) =>
            item.id === technology.id
              ? technology
              : item
        );


      }




      return [
        ...prev,
        technology,
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

          title="Technologies"

          description="Gère les technologies utilisées dans tes projets."

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







      <TechnologyList

        technologies={technologies}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />








      <TechnologyDrawer


        open={drawerOpen}


        technology={selectedTechnology}


        onClose={() => {

          setDrawerOpen(false);

          setSelectedTechnology(null);

        }}



        onSaved={handleSaved}


      />



    </div>

  );

}