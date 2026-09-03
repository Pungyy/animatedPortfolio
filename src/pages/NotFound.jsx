import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import useAnalytics from "../hooks/useAnalytics";

export default function NotFound() {
  useAnalytics("/404");

  return (
    <MainLayout>
      <section className="flex min-h-[75vh] items-center bg-[var(--background)] py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-lg text-center"
          >
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--text-secondary)]">
              Erreur 404
            </p>

            <h1 className="mt-6 text-6xl font-semibold leading-none tracking-tight text-[var(--text-primary)] sm:text-7xl">
              Page introuvable
            </h1>

            <p className="mt-6 text-lg leading-8 text-[var(--text-secondary)]">
              Le lien que tu as suivi est cassé, ou la page a été déplacée.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/">
                <Button>Retour à l'accueil</Button>
              </Link>

              <Link to="/blog">
                <Button variant="secondary">Voir le blog</Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </MainLayout>
  );
}
