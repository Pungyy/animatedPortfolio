import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Loader from "../components/ui/Loader";
import Markdown from "../components/blog/Markdown";
import Seo from "../components/common/Seo";
import ReadingProgress from "../components/blog/ReadingProgress";

import {
  getPostBySlug,
  getPublishedPosts,
} from "../services/posts.service";
import useAnalytics from "../hooks/useAnalytics";
import useScrollDepth from "../hooks/useScrollDepth";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  useAnalytics(`/blog/${slug}`);
  useScrollDepth(`/blog/${slug}`);

  const [post, setPost] = useState(null);
  const [siblings, setSiblings] = useState({ prev: null, next: null });
  const [status, setStatus] = useState("loading");
  const [trackedSlug, setTrackedSlug] = useState(slug);

  if (trackedSlug !== slug) {
    setTrackedSlug(slug);
    setStatus("loading");
    setPost(null);
  }

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const [data, list] = await Promise.all([
          getPostBySlug(slug),
          getPublishedPosts().catch(() => []),
        ]);

        if (ignore) return;

        setPost(data);
        setStatus("ok");

        const i = list.findIndex((p) => p.slug === slug);
        setSiblings({
          prev: i > 0 ? list[i - 1] : null,
          next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
        });
      } catch (error) {
        console.error(error);
        if (!ignore) setStatus("notfound");
      }
    })();

    return () => {
      ignore = true;
    };
  }, [slug]);

  if (status === "loading") return <Loader />;
  if (status === "notfound") return <Navigate to="/blog" replace />;

  return (
    <MainLayout>
      <ReadingProgress />

      <Seo
        title={post.title}
        description={post.excerpt || undefined}
        image={post.cover_image || undefined}
        type="article"
      />

      <article className="bg-[var(--background)] py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              <ArrowLeft size={15} />
              Tous les articles
            </Link>

            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10"
            >
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <span>{formatDate(post.published_at)}</span>
                {post.reading_time && (
                  <span>· {post.reading_time} min de lecture</span>
                )}
              </div>

              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] sm:text-5xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
              )}

              {post.tags?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.header>

            {post.cover_image && (
              <img loading="lazy" decoding="async"
                src={post.cover_image}
                alt={post.title}
                className="mt-10 w-full rounded-[28px] border border-[var(--border)]"
              />
            )}

            <div className="mt-12">
              <Markdown content={post.content} />
            </div>

            {(siblings.prev || siblings.next) && (
              <nav className="mt-16 grid gap-4 border-t border-[var(--border)] pt-10 sm:grid-cols-2">
                {siblings.prev ? (
                  <Link
                    to={`/blog/${siblings.prev.slug}`}
                    className="rounded-2xl border border-[var(--border)] p-5 transition hover:bg-[var(--surface-muted)]"
                  >
                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <ArrowLeft size={13} /> Article précédent
                    </span>
                    <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                      {siblings.prev.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}

                {siblings.next && (
                  <Link
                    to={`/blog/${siblings.next.slug}`}
                    className="rounded-2xl border border-[var(--border)] p-5 text-right transition hover:bg-[var(--surface-muted)] sm:col-start-2"
                  >
                    <span className="flex items-center justify-end gap-1.5 text-xs text-[var(--text-muted)]">
                      Article suivant <ArrowRight size={13} />
                    </span>
                    <span className="mt-1 block text-sm font-medium text-[var(--text-primary)]">
                      {siblings.next.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </Container>
      </article>
    </MainLayout>
  );
}
