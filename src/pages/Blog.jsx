import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";

import Seo from "../components/common/Seo";
import { getPublishedPosts } from "../services/posts.service";
import useAnalytics from "../hooks/useAnalytics";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  useAnalytics("/blog");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getPublishedPosts();
        if (!ignore) setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <MainLayout>
      <Seo
        title="Blog"
        description="Notes techniques : dev, produit, outillage. Ce que j'apprends en construisant des choses."
      />

      <section className="bg-[var(--background)] py-24 sm:py-40">
        <Container>
          <Heading
            eyebrow="BLOG"
            title="Notes & réflexions."
            description="Ce que j'apprends en construisant des choses — dev, produit, outillage."
            align="center"
          />

          {!loading && posts.length === 0 && (
            <p className="mt-20 text-center text-[var(--text-secondary)]">
              Aucun article pour le moment.
            </p>
          )}

          <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-2">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition hover:-translate-y-1"
                >
                  {post.cover_image && (
                    <div className="aspect-[16/9] overflow-hidden bg-[var(--surface-muted)]">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span>{formatDate(post.published_at)}</span>
                      {post.reading_time && (
                        <span>· {post.reading_time} min de lecture</span>
                      )}
                    </div>

                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-7 text-[var(--text-secondary)]">
                        {post.excerpt}
                      </p>
                    )}

                    {post.tags?.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
