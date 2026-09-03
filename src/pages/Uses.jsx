import MainLayout from "../layouts/MainLayout";
import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import Seo from "../components/common/Seo";
import Markdown from "../components/blog/Markdown";
import Loader from "../components/ui/Loader";

import usePortfolio from "../hooks/usePortfolio";
import useAnalytics from "../hooks/useAnalytics";

export default function Uses() {
  useAnalytics("/uses");
  const { settings, loading } = usePortfolio();

  if (loading) return <Loader />;

  const content = settings?.uses_md?.trim();

  return (
    <MainLayout>
      <Seo
        title="Uses"
        description="Le matériel, l'éditeur et les outils que j'utilise au quotidien."
      />

      <section className="bg-[var(--background)] py-24 sm:py-40">
        <Container>
          <Heading
            eyebrow="SETUP"
            title="Ce que j'utilise."
            description="Matériel, éditeur, extensions, services — mon environnement de travail."
            align="center"
          />

          <div className="mx-auto mt-16 max-w-2xl sm:mt-24">
            {content ? (
              <Markdown content={content} />
            ) : (
              <p className="text-center text-[var(--text-secondary)]">
                Bientôt.
              </p>
            )}
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
