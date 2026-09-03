import { useEffect, useState } from "react";
import { toast } from "sonner";

import Spinner from "../../components/admin/ui/Spinner";
import ProjectToolbar from "../../components/admin/projects/ProjectToolbar";
import ProjectList from "../../components/admin/projects/ProjectList";
import ProjectDrawer from "../../components/admin/projects/ProjectDrawer";

import { getTechnologies } from "../../services/technologies.service";
import { getProjects, deleteProject } from "../../services/projects.service";

const EMPTY_PROJECT = {
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
  technologies: [],
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getProjects();
        if (!ignore) setProjects(data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger les projets.");
      } finally {
        if (!ignore) setLoading(false);
      }

      try {
        const data = await getTechnologies();
        if (!ignore) setTechnologies(data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger les technologies.");
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  function handleCreate() {
    setSelectedProject({ ...EMPTY_PROJECT });
    setDrawerOpen(true);
  }

  function handleEdit(project) {
    setSelectedProject({
      ...project,
      technologies: project.technologies || [],
    });
    setDrawerOpen(true);
  }

  async function handleDelete(project) {
    if (!window.confirm(`Supprimer "${project.title}" ?`)) return;

    try {
      await deleteProject(project.id);
      setProjects((prev) => prev.filter((item) => item.id !== project.id));
      toast.success("Projet supprimé.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression.");
    }
  }

  function handleSaved(project) {
    setProjects((prev) =>
      prev.some((item) => item.id === project.id)
        ? prev.map((item) => (item.id === project.id ? project : item))
        : [...prev, project]
    );
  }

  return (
    <div className="space-y-6">
      <ProjectToolbar onCreate={handleCreate} />

      {loading ? (
        <Spinner />
      ) : (
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ProjectDrawer
        open={drawerOpen}
        project={selectedProject}
        technologies={technologies}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedProject(null);
        }}
        onSaved={handleSaved}
      />
    </div>
  );
}
