import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Button from "../../components/admin/ui/Button";
import Spinner from "../../components/admin/ui/Spinner";

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
  const [selectedTechnology, setSelectedTechnology] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getTechnologies();
        if (!ignore) setTechnologies(data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger les technologies.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  function handleCreate() {
    setSelectedTechnology(null);
    setDrawerOpen(true);
  }

  function handleEdit(technology) {
    setSelectedTechnology(technology);
    setDrawerOpen(true);
  }

  async function handleDelete(technology) {
    if (!window.confirm(`Supprimer "${technology.name}" ?`)) return;

    try {
      await deleteTechnology(technology.id);
      setTechnologies((prev) =>
        prev.filter((item) => item.id !== technology.id)
      );
      toast.success("Technologie supprimée.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression.");
    }
  }

  function handleSaved(technology) {
    setTechnologies((prev) =>
      prev.some((item) => item.id === technology.id)
        ? prev.map((item) => (item.id === technology.id ? technology : item))
        : [...prev, technology]
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Technologies"
        description="Les technologies utilisées pour tagger tes projets."
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
        <TechnologyList
          technologies={technologies}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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
