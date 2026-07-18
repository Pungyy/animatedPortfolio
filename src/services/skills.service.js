import { supabase } from "../lib/supabase";



export async function getSkills() {

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", {
      ascending: true,
    });


  if (error) {
    throw error;
  }


  return data;

}




export async function createSkill(skill) {

  const { data, error } = await supabase
    .from("skills")
    .insert(skill)
    .select()
    .single();


  if (error) {
    throw error;
  }


  return data;

}





export async function updateSkill(skill) {

  const { data, error } = await supabase
    .from("skills")
    .update({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon,
      color: skill.color,
      display_order: skill.display_order,
    })
    .eq("id", skill.id)
    .select()
    .single();


  if (error) {
    throw error;
  }


  return data;

}





export async function deleteSkill(id) {

  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);


  if (error) {
    throw error;
  }

}