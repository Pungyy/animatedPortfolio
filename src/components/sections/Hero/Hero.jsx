import Container from "../../ui/Container";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] pt-28 sm:pt-36">
      {/* Background blur */}
      <div
        className="
          pointer-events-none absolute left-1/2 top-20 h-[400px] w-[400px]
          -translate-x-1/2 rounded-full bg-[var(--surface-muted)] opacity-70
          blur-3xl dark:opacity-40 sm:h-[500px] sm:w-[500px]
        "
      />

      <Container>
        <div className="relative grid items-center gap-14 py-16 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-2 lg:gap-20 lg:py-0">
          <HeroContent />
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
