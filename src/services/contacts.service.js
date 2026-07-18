import { supabase } from "../lib/supabase";



/**
 * Récupérer tous les messages
 */
export async function getContacts() {


  const { data, error } = await supabase

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
 * Modifier un contact
 */
export async function updateContact(contact) {


  const { data, error } = await supabase

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


  const { error } = await supabase

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