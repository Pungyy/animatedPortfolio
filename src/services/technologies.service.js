import { supabase } from "../lib/supabase";



/**
 * Récupérer toutes les technologies
 */
export async function getTechnologies() {

  const { data, error } = await supabase
    .from("technologies")
    .select("*")
    .order("name", {
      ascending: true,
    });



  if (error) {
    throw error;
  }



  return data;

}






/**
 * Créer une technologie
 */
export async function createTechnology(
  technology
) {

  const { data, error } = await supabase
    .from("technologies")
    .insert(technology)
    .select()
    .single();



  if (error) {
    throw error;
  }



  return data;

}






/**
 * Modifier une technologie
 */
export async function updateTechnology(
  technology
) {

  const { data, error } = await supabase
    .from("technologies")
    .update({
      name: technology.name,
      icon: technology.icon,
      color: technology.color,
    })
    .eq(
      "id",
      technology.id
    )
    .select()
    .single();



  if (error) {
    throw error;
  }



  return data;

}







/**
 * Supprimer une technologie
 */
export async function deleteTechnology(
  id
) {


  const { error } = await supabase
    .from("technologies")
    .delete()
    .eq(
      "id",
      id
    );



  if (error) {
    throw error;
  }

}