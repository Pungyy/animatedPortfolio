import usePortfolio from "../../../hooks/usePortfolio";

import Container from "../../ui/Container";
import Heading from "../../ui/Heading";
import AnimatedSection from "../../ui/AnimatedSection";

import AboutCard from "./AboutCard";
import TechStack from "./TechStack";

export default function About() {
  const { settings, loading } = usePortfolio();

  if (loading || !settings) {
    return (
      <section className="bg-[var(--background)] py-28 sm:py-40">
        <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-3xl bg-[var(--surface-muted)]" />
      </section>
    );
  }

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[var(--background)] py-28 sm:py-40"
    >
      <Container>
        <AnimatedSection>
          <Heading
            eyebrow="À PROPOS"
            title={settings.about_title || "Créer des expériences numériques."}
            description="Mon parcours, ma vision et les technologies qui m'accompagnent."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-16 grid items-center gap-14 sm:mt-28 lg:grid-cols-2 lg:gap-20">
          {/* TEXTE */}
          <AnimatedSection>
            <div>
              <h3 className="text-4xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] sm:text-5xl">
                Développer.
                <br />
                Imaginer.
                <br />
                Construire.
              </h3>

              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:mt-8 sm:text-lg sm:leading-9">
                {settings.about_description || settings.hero_description}
              </p>

              <div className="mt-10 sm:mt-12">
                <TechStack />
              </div>
            </div>
          </AnimatedSection>

          {/* CARTE */}
          <AnimatedSection>
            <AboutCard />
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
