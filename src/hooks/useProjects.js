import { useCallback, useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projects.service";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProjects();

      setProjects(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const addProject = async (project) => {
    const created = await createProject(project);

    await loadProjects();

    return created;
  };

  const editProject = async (id, project) => {
    const updated = await updateProject(id, project);

    await loadProjects();

    return updated;
  };

  const removeProject = async (id) => {
    await deleteProject(id);

    await loadProjects();
  };

  return {
    projects,
    loading,
    error,

    loadProjects,

    addProject,
    editProject,
    removeProject,
  };
}