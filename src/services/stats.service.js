import { supabase } from "../lib/supabase";

/**
 * Agrégats publics (RPC security-definer) pour la page "/coulisses".
 * Ne renvoie aucune donnée nominative.
 */
export async function getPublicStats() {
  const { data, error } = await supabase.rpc("public_stats");

  if (error) {
    throw error;
  }

  return data;
}
