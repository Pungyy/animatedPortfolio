import { supabase } from "../lib/supabase";



/**
 * Synchroniser les fonctionnalités d'un projet
 */
export async function syncProjectFeatures(
  projectId,
  features = []
) {


  const {
    error: deleteError,
  } = await supabase

    .from("project_features")

    .delete()

    .eq(
      "project_id",
      projectId
    );



  if (deleteError) {

    throw deleteError;

  }






  const cleanFeatures = features.filter(

    (feature) =>

      feature.title?.trim()

  );






  if (!cleanFeatures.length) {

    return;

  }







  const rows = cleanFeatures.map(

    (feature,index)=>({

      project_id: projectId,

      title: feature.title.trim(),

      display_order:index,

    })

  );







  const {
    error: insertError,
  } = await supabase

    .from("project_features")

    .insert(rows);





  if (insertError) {

    throw insertError;

  }


}