import { supabase } from "../lib/supabase";



/**
 * Récupérer les statistiques du dashboard
 */
export async function getDashboardStats() {


  const [
    projects,
    experiences,
    skills,
    contacts,
  ] = await Promise.all([


    supabase
      .from("projects")
      .select("id", {
        count: "exact",
        head: true,
      }),



    supabase
      .from("experiences")
      .select("id", {
        count: "exact",
        head: true,
      }),



    supabase
      .from("skills")
      .select("id", {
        count: "exact",
        head: true,
      }),



    supabase
      .from("contacts")
      .select("id", {
        count: "exact",
        head: true,
      }),


  ]);




  return {

    projects:
      projects.count ?? 0,


    experiences:
      experiences.count ?? 0,


    skills:
      skills.count ?? 0,


    contacts:
      contacts.count ?? 0,

  };


}








/**
 * Récupérer les derniers projets
 */
export async function getRecentProjects() {


  const {
    data,
    error,
  } = await supabase

    .from("projects")

    .select(`
      id,
      title,
      short_description,
      year,
      cover_image
    `)

    .order("created_at", {
      ascending: false,
    })

    .limit(5);



  if (error) {

    throw error;

  }



  return data;


}








/**
 * Récupérer les derniers contacts
 */
export async function getRecentContacts() {


  const {
    data,
    error,
  } = await supabase

    .from("contacts")

    .select(`
      id,
      name,
      email,
      subject,
      message,
      read,
      created_at
    `)

    .order("created_at", {
      ascending: false,
    })

    .limit(5);



  if (error) {

    throw error;

  }



  return data;


}