import { writeFileSync, mkdirSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const SITE = process.env.VITE_SITE_URL || "https://ianil.fr";
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const routes = new Set(["/", "/blog", "/coulisses"]);

if (url && key) {
  try {
    const sb = createClient(url, key);
    const [{ data: projects }, { data: posts }] = await Promise.all([
      sb.from("projects").select("slug").eq("published", true),
      sb.from("posts").select("slug").eq("status", "published"),
    ]);
    (projects || []).forEach((p) => p.slug && routes.add(`/project/${p.slug}`));
    (posts || []).forEach((p) => p.slug && routes.add(`/blog/${p.slug}`));
  } catch (e) {
    console.warn("sitemap: supabase fetch failed —", e.message);
  }
}

const body = [...routes]
  .map((r) => `  <url><loc>${SITE}${r}</loc></url>`)
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

mkdirSync("public", { recursive: true });
writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap: ${routes.size} urls -> public/sitemap.xml`);
