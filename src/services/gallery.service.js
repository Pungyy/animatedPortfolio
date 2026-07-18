import { supabase } from "../lib/supabase";



/**
 * Récupérer les images d'un projet
 */
export async function getProjectGallery(projectId) {

  const {
    data,
    error,
  } = await supabase

    .from("project_gallery")

    .select("*")

    .eq(
      "project_id",
      projectId
    )

    .order(
      "display_order",
      {
        ascending: true,
      }
    );



  if (error) {
    throw error;
  }



  return data;

}







/**
 * Ajouter une image dans la galerie
 */
export async function createGalleryImage(image) {

  const {
    data,
    error,
  } = await supabase

    .from("project_gallery")

    .insert(image)

    .select()

    .single();



  if (error) {
    throw error;
  }



  return data;

}







/**
 * Supprimer une image de la galerie
 */
export async function deleteGalleryImage(id) {

  const {
    error,
  } = await supabase

    .from("project_gallery")

    .delete()

    .eq(
      "id",
      id
    );



  if (error) {
    throw error;
  }

}