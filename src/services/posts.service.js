import { supabase } from "../lib/supabase";

function slugify(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readingTime(content = "") {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/* ---------- public ---------- */

export async function getPublishedPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, tags, published_at, reading_time")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) throw error;
  return data;
}

/* ---------- admin ---------- */

export async function getAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
}

function toRow(post) {
  const status = post.status === "published" ? "published" : "draft";

  return {
    title: post.title?.trim() || "Sans titre",
    slug: post.slug?.trim() || slugify(post.title),
    excerpt: post.excerpt?.trim() || null,
    content: post.content || "",
    cover_image: post.cover_image || null,
    tags: Array.isArray(post.tags) ? post.tags : [],
    status,
    reading_time: readingTime(post.content),
    published_at:
      status === "published"
        ? post.published_at || new Date().toISOString()
        : null,
  };
}

export async function createPost(post) {
  const { data, error } = await supabase
    .from("posts")
    .insert(toRow(post))
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id, post) {
  const { data, error } = await supabase
    .from("posts")
    .update(toRow(post))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}

export { slugify };
