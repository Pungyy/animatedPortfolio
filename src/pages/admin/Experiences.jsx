import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Button from "../../components/admin/ui/Button";
import Spinner from "../../components/admin/ui/Spinner";

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
  const [selectedExperience, setSelectedExperience] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getExperiences();
        if (!ignore) setExperiences(data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger les expériences.");
      } finally {
        if (!ignore) setLoading(false);
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
    setSelectedExperience(experience);
    setDrawerOpen(true);
  }

  async function handleDelete(experience) {
    const label = experience.role || experience.position;
    if (!window.confirm(`Supprimer "${label}" chez ${experience.company} ?`)) {
      return;
    }

    try {
      await deleteExperience(experience.id);
      setExperiences((prev) =>
        prev.filter((item) => item.id !== experience.id)
      );
      toast.success("Expérience supprimée.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression.");
    }
  }

  function handleSaved(experience) {
    setExperiences((prev) =>
      prev.some((item) => item.id === experience.id)
        ? prev.map((item) => (item.id === experience.id ? experience : item))
        : [...prev, experience]
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Expériences"
        description="Gère ton parcours professionnel."
        actions={
          <Button onClick={handleCreate}>
            <Plus size={16} />
            Nouvelle
          </Button>
        }
      />

      {loading ? (
        <Spinner />
      ) : (
        <ExperienceList
          experiences={experiences}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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
