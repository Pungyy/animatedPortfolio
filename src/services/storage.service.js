import { supabase } from "../lib/supabase";


const BUCKET = "portfolio-projects";



/**
 * Upload une image
 * folder = projects | profile | settings
 */
export async function uploadImage(
  file,
  folder = "projects"
) {


  const extension = file.name
    .split(".")
    .pop();



  const filename = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}.${extension}`;





  const {
    error,
  } = await supabase.storage

    .from(BUCKET)

    .upload(
      filename,
      file,
      {
        cacheControl:"3600",
        upsert:true,
      }
    );





  if(error){

    throw error;

  }





  const {
    data,
  } = supabase.storage

    .from(BUCKET)

    .getPublicUrl(filename);





  return data.publicUrl;

}







/**
 * Supprime une image
 */
export async function deleteImage(
  imageUrl
) {


  if(!imageUrl) return;



  const marker =
    `/storage/v1/object/public/${BUCKET}/`;



  const index =
    imageUrl.indexOf(marker);




  if(index === -1){

    return;

  }





  const path =
    imageUrl.substring(
      index + marker.length
    );





  const {
    error,
  } = await supabase.storage

    .from(BUCKET)

    .remove([
      path
    ]);





  if(error){

    throw error;

  }

}