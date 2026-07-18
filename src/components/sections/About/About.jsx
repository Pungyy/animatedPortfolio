import Container from "../../ui/Container";
import Heading from "../../ui/Heading";
import AboutCard from "./AboutCard";
import TechStack from "./TechStack";

export default function About() {
  return (
    <section
      id="about"
      className="py-32 bg-neutral-50"
    >
      <Container>
        <Heading
          eyebrow="À propos"
          title="Construire des produits utiles avec une attention particulière aux détails."
          description="Je développe des applications web modernes, performantes et maintenables, en accordant autant d'importance à l'expérience utilisateur qu'à la qualité du code."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-[420px_1fr]">
          <AboutCard />
          <TechStack />
        </div>
      </Container>
    </section>
  );
}