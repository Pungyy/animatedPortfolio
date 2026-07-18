import { supabase } from "../lib/supabase";

/**
 * Upload d'une image dans le bucket portfolio-projects
 */
export async function uploadImage(file, folder = "projects") {
  const extension = file.name.split(".").pop();

  const filename = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}.${extension}`;

  const { error } = await supabase.storage
    .from("portfolio-projects")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("portfolio-projects")
    .getPublicUrl(filename);

  return data.publicUrl;
}

/**
 * Supprime une image du bucket
 */
export async function deleteImage(imageUrl) {
  if (!imageUrl) return;

  const marker = "/storage/v1/object/public/portfolio-projects/";
  const index = imageUrl.indexOf(marker);

  if (index === -1) return;

  const path = imageUrl.substring(index + marker.length);

  const { error } = await supabase.storage
    .from("portfolio-projects")
    .remove([path]);

  if (error) {
    throw error;
  }
}