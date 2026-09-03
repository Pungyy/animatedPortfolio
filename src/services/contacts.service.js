import { supabase } from "../lib/supabase";



/**
 * Récupérer tous les messages
 */
export async function getContacts() {

  const {
    data,
    error,
  } = await supabase

    .from("contacts")

    .select("*")

    .order("created_at", {
      ascending: false,
    });



  if (error) {

    throw error;

  }



  return data;

}







/**
 * Envoyer un message depuis le portfolio public
 */
export async function createContact(contact) {


  // Pas de `.select()` après l'insert : l'anon n'a pas le droit de relire
  // la table contacts (RLS). On vérifie seulement l'absence d'erreur.
  const {
    error,
  } = await supabase

    .from("contacts")

    .insert({

      name: contact.name,

      email: contact.email,

      message: contact.message,

      read: false,

    });





  if (error) {

    throw error;

  }

}







/**
 * Modifier le statut d'un message
 */
export async function updateContact(contact) {


  const {
    data,
    error,
  } = await supabase

    .from("contacts")

    .update({

      read: contact.read,

    })

    .eq(
      "id",
      contact.id
    )

    .select()

    .single();





  if (error) {

    throw error;

  }



  return data;

}







/**
 * Supprimer un message
 */
export async function deleteContact(id) {


  const {
    error,
  } = await supabase

    .from("contacts")

    .delete()

    .eq(
      "id",
      id
    );





  if (error) {

    throw error;

  }

}