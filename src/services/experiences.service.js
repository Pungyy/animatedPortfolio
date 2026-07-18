import { supabase } from "../lib/supabase";



/**
 * Récupérer toutes les expériences
 */
export async function getExperiences() {

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", {
      ascending: true,
    });



  if (error) {
    throw error;
  }



  return data;

}





/**
 * Créer une expérience
 */
export async function createExperience(experience) {

  const { data, error } = await supabase
    .from("experiences")
    .insert(experience)
    .select()
    .single();



  if (error) {
    throw error;
  }



  return data;

}





/**
 * Modifier une expérience
 */
export async function updateExperience(experience) {

  const { data, error } = await supabase
    .from("experiences")
    .update({

      company: experience.company,

      role: experience.role,

      location: experience.location,

      description: experience.description,

      start_date: experience.start_date,

      end_date: experience.end_date,

      current: experience.current,

      type: experience.type,

      display_order:
        experience.display_order,

    })
    .eq(
      "id",
      experience.id
    )
    .select()
    .single();



  if (error) {
    throw error;
  }



  return data;

}





/**
 * Supprimer une expérience
 */
export async function deleteExperience(id) {

  const { error } = await supabase
    .from("experiences")
    .delete()
    .eq(
      "id",
      id
    );



  if (error) {
    throw error;
  }

}