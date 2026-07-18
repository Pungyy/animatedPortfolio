import Container from "../../ui/Container";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-36">
      <Container>
        <div className="grid min-h-[calc(100vh-9rem)] items-center gap-20 lg:grid-cols-2">
          <HeroContent />
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}