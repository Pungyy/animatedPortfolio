import { writeFileSync, mkdirSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const SITE = process.env.VITE_SITE_URL || "https://ianil.fr";
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function esc(s = "") {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let items = [];

if (url && key) {
  try {
    const sb = createClient(url, key);
    const { data } = await sb
      .from("posts")
      .select("title, slug, excerpt, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(30);
    items = data || [];
  } catch (e) {
    console.warn("rss: supabase fetch failed —", e.message);
  }
}

const entries = items
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.published_at || Date.now()).toUTCString()}</pubDate>
      <description>${esc(p.excerpt || "")}</description>
    </item>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Ibrahim Anil — Blog</title>
    <link>${SITE}/blog</link>
    <description>Notes techniques : dev, produit, outillage.</description>
    <language>fr</language>
${entries}
  </channel>
</rss>
`;

mkdirSync("public", { recursive: true });
writeFileSync("public/rss.xml", xml);
console.log(`rss: ${items.length} items -> public/rss.xml`);
