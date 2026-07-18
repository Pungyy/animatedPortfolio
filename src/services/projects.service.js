import { supabase } from "../lib/supabase";



/**
 * Récupérer tous les projets
 */
export async function getProjects() {

  const { data: projects, error: projectsError } =
    await supabase
      .from("projects")
      .select("*")
      .order("display_order", {
        ascending: true,
      });



  if (projectsError) {
    throw projectsError;
  }



  const { data: relations, error: relationsError } =
    await supabase
      .from("project_technologies")
      .select(`
        project_id,
        technology_id,
        technologies (
          id,
          name,
          icon,
          color
        )
      `);



  if (relationsError) {
    throw relationsError;
  }

  return projects.map((project) => ({

    ...project,

    technologies:
      relations
        .filter(
          (relation) =>
            relation.project_id === project.id
        )
        .map(
          (relation) =>
            relation.technologies
        ),

  }));

}







/**
 * Récupérer un projet
 */
export async function getProject(id) {


  const { data: project, error } =
    await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();



  if (error) {
    throw error;
  }



  const { data: relations, error: relationsError } =
    await supabase
      .from("project_technologies")
      .select(`
        technology_id,
        technologies (
          id,
          name,
          icon,
          color
        )
      `)
      .eq("project_id", id);



  if (relationsError) {
    throw relationsError;
  }

  

  return {

    ...project,

    technologies:
      relations.map(
        (relation) =>
          relation.technologies
      ),

  };

}








/**
 * Créer un projet
 */
export async function createProject(project) {


  const { data, error } =
    await supabase
      .from("projects")
      .insert(project)
      .select()
      .single();



  if (error) {
    throw error;
  }



  return data;

}








/**
 * Modifier un projet
 */
export async function updateProject(project) {


  const { data, error } =
    await supabase
      .from("projects")
      .update(project)
      .eq("id", project.id)
      .select()
      .single();



  if (error) {
    throw error;
  }



  return data;

}








/**
 * Supprimer un projet
 */
export async function deleteProject(id) {


  const { error } =
    await supabase
      .from("projects")
      .delete()
      .eq("id", id);



  if (error) {
    throw error;
  }

}