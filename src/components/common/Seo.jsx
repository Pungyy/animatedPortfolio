import { useEffect } from "react";

import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "../../lib/site";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);

  if (!content) {
    if (el) el.remove();
    return;
  }

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  image,
  type = "website",
  noindex = false,
  jsonLd,
}) {
  const ldString = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${SITE_NAME}`
      : `${SITE_NAME} · ${SITE_TAGLINE}`;

    const url = window.location.origin + window.location.pathname;
    const img =
      image ||
      `${SITE_URL}/og-default.png`;

    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    upsertLink("canonical", url);

    let ld;
    if (ldString) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.text = ldString;
      document.head.appendChild(ld);
    }

    return () => {
      if (ld) ld.remove();
    };
  }, [title, description, image, type, noindex, ldString]);

  return null;
}
