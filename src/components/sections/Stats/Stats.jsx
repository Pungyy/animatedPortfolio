import Container from "../../ui/Container";
import Heading from "../../ui/Heading";
import StatCard from "./StatCard";

const stats = [
  {
    value: "20+",
    label: "Projets réalisés",
  },
  {
    value: "3+",
    label: "Années de développement",
  },
  {
    value: "10+",
    label: "Technologies utilisées",
  },
  {
    value: "100%",
    label: "Motivation",
  },
];

export default function Stats() {
  return (
    <section className="py-32">
      <Container>
        <Heading
          align="center"
          eyebrow="Quelques chiffres"
          title="Des résultats concrets."
          description="Chaque projet est une occasion d'apprendre, d'améliorer mes compétences et de proposer une meilleure expérience utilisateur."
        />

        <div className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}