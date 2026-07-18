import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Button from "../../components/admin/ui/Button";
import Drawer from "../../components/admin/ui/Drawer";

import ProjectList from "../../components/admin/projects/ProjectList";
import ProjectForm from "../../components/admin/projects/ProjectForm";

import {
  getProjects,
  deleteProject,
} from "../../services/projects.service";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger les projets.");
    } finally {
      setLoading(false);
    }
  }

  function handleCreate() {
    setSelectedProject({
      title: "",
      slug: "",
      short_description: "",
      description: "",
      cover_image: "",
      github_url: "",
      demo_url: "",
      featured: false,
      published: true,
      display_order: 0,
      year: new Date().getFullYear(),
      client: "",
      category: "",
      status: "",
    });

    setDrawerOpen(true);
  }

  function handleEdit(project) {
    setSelectedProject(project);
    setDrawerOpen(true);
  }

  async function handleDelete(project) {
    if (!window.confirm(`Supprimer "${project.title}" ?`)) return;

    try {
      await deleteProject(project.id);

      setProjects((prev) =>
        prev.filter((p) => p.id !== project.id)
      );

      toast.success("Projet supprimé.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression.");
    }
  }

  if (loading) {
    return <div className="text-zinc-400">Chargement...</div>;
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <SectionTitle
            title="Projects"
            description="Gère les projets affichés sur ton portfolio."
          />

          <Button onClick={handleCreate}>
            <span className="flex items-center gap-2">
              <Plus size={18} />
              Nouveau
            </span>
          </Button>
        </div>

        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Drawer
        open={drawerOpen}
        title={
          selectedProject?.id
            ? "Modifier le projet"
            : "Nouveau projet"
        }
        onClose={() => setDrawerOpen(false)}
      >
        {selectedProject && (
          <>
            <ProjectForm
              project={selectedProject}
              onChange={(e) => {
                const { name, value, type, checked } = e.target;

                setSelectedProject((prev) => ({
                  ...prev,
                  [name]:
                    type === "checkbox"
                      ? checked
                      : value,
                }));
              }}
            />

            <div className="mt-8 flex justify-end">
              <Button>
                Enregistrer
              </Button>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}