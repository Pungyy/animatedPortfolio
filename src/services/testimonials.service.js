import { supabase } from "../lib/supabase";

export async function getTestimonials() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

function toRow(t) {
  return {
    name: t.name?.trim() || "",
    role: t.role?.trim() || null,
    company: t.company?.trim() || null,
    avatar_url: t.avatar_url || null,
    quote: t.quote?.trim() || "",
    rating: t.rating ? Number(t.rating) : null,
    featured: !!t.featured,
    display_order: Number(t.display_order) || 0,
  };
}

export async function createTestimonial(t) {
  const { data, error } = await supabase
    .from("testimonials")
    .insert(toRow(t))
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTestimonial(id, t) {
  const { data, error } = await supabase
    .from("testimonials")
    .update(toRow(t))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id) {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}
