import { supabase } from "../lib/supabase";

export async function getSettings() {
  const response = await supabase
    .from("settings")
    .select("*");

  console.log("SETTINGS RESPONSE :", response);

  if (response.error) {
    console.error("SETTINGS ERROR :", response.error);
    throw response.error;
  }

  return response.data[0];
}

export async function updateSettings(settings) {
  const response = await supabase
    .from("settings")
    .update(settings)
    .eq("id", settings.id)
    .select("*");

  if (response.error) {
    throw response.error;
  }

  return response.data[0];
}