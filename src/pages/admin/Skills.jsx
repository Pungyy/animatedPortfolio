import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Button from "../../components/admin/ui/Button";
import Spinner from "../../components/admin/ui/Spinner";

import SkillList from "../../components/admin/skills/SkillList";
import SkillDrawer from "../../components/admin/skills/SkillDrawer";

import { getSkills, deleteSkill } from "../../services/skills.service";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getSkills();
        if (!ignore) setSkills(data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger les compétences.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  function handleCreate() {
    setSelectedSkill(null);
    setDrawerOpen(true);
  }

  function handleEdit(skill) {
    setSelectedSkill(skill);
    setDrawerOpen(true);
  }

  async function handleDelete(skill) {
    if (!window.confirm(`Supprimer "${skill.name}" ?`)) return;

    try {
      await deleteSkill(skill.id);
      setSkills((prev) => prev.filter((item) => item.id !== skill.id));
      toast.success("Compétence supprimée.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression.");
    }
  }

  function handleSaved(skill) {
    setSkills((prev) =>
      prev.some((item) => item.id === skill.id)
        ? prev.map((item) => (item.id === skill.id ? skill : item))
        : [...prev, skill]
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Compétences"
        description="Gère tes compétences et leurs niveaux."
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
        <SkillList
          skills={skills}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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
