import { useEffect, useState } from "react";
import { toast } from "sonner";

import ProjectToolbar from "../../components/admin/projects/ProjectToolbar";
import ProjectList from "../../components/admin/projects/ProjectList";
import ProjectDrawer from "../../components/admin/projects/ProjectDrawer";

import { getTechnologies } from "../../services/technologies.service";

import {
  getProjects,
  deleteProject,
} from "../../services/projects.service";


export default function Projects() {

  const [projects, setProjects] = useState([]);

  const [technologies, setTechnologies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedProject, setSelectedProject] =
    useState(null);



  useEffect(() => {

    loadProjects();

    loadTechnologies();

  }, []);




  async function loadProjects() {

    try {

      setLoading(true);

      const data = await getProjects();

      setProjects(data);


    } catch (error) {

      console.error(error);

      toast.error(
        "Impossible de charger les projets."
      );


    } finally {

      setLoading(false);

    }

  }





  async function loadTechnologies() {

    try {

      const data = await getTechnologies();

      setTechnologies(data);


    } catch (error) {

      console.error(error);

      toast.error(
        "Impossible de charger les technologies."
      );

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

      technologies: [],

    });


    setDrawerOpen(true);

  }







  function handleEdit(project) {

    setSelectedProject({

      ...project,

      technologies:
        project.technologies || [],

    });


    setDrawerOpen(true);

  }







  async function handleDelete(project) {

    const confirmed = window.confirm(
      `Supprimer "${project.title}" ?`
    );


    if (!confirmed) return;



    try {


      await deleteProject(project.id);



      setProjects((prev) =>
        prev.filter(
          (item) =>
            item.id !== project.id
        )
      );



      toast.success(
        "Projet supprimé."
      );



    } catch (error) {


      console.error(error);


      toast.error(
        "Erreur lors de la suppression."
      );


    }

  }







  function handleSaved(project) {


    setProjects((prev) => {


      const exists = prev.find(
        (item) =>
          item.id === project.id
      );



      if (exists) {


        return prev.map((item) =>
          item.id === project.id
            ? project
            : item
        );


      }



      return [
        ...prev,
        project,
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

    <div className="space-y-8">


      <ProjectToolbar
        onCreate={handleCreate}
      />



      <ProjectList

        projects={projects}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />



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