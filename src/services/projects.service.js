import { supabase } from "../lib/supabase";

/**
 * Récupérer tous les projets
 */
export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;

  return data;
}

/**
 * Récupérer un projet
 */
export async function getProject(id) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

/**
 * Créer un projet
 */
export async function createProject(project) {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Modifier un projet
 */
export async function updateProject(project) {
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", project.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Supprimer un projet
 */
export async function deleteProject(id) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}