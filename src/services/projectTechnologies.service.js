import { supabase } from "../lib/supabase";


export async function getProjectTechnologies(projectId) {

  const { data, error } = await supabase
    .from("project_technologies")
    .select("technology_id")
    .eq("project_id", projectId);


  if (error) {
    throw error;
  }


  return data.map(
    (item) => item.technology_id
  );

}




export async function syncProjectTechnologies(
  projectId,
  technologyIds = []
) {


  // supprimer les anciennes relations

  const { error: deleteError } =
    await supabase
      .from("project_technologies")
      .delete()
      .eq(
        "project_id",
        projectId
      );


  if (deleteError) {
    throw deleteError;
  }



  // aucune technologie

  if (!technologyIds.length) {
    return;
  }



  const rows = technologyIds.map(
    (technologyId) => ({
      project_id: projectId,
      technology_id: technologyId,
    })
  );



  const { error: insertError } =
    await supabase
      .from("project_technologies")
      .insert(rows);



  if (insertError) {
    throw insertError;
  }

}