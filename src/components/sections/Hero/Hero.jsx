import Container from "../../ui/Container";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";


export default function Hero() {

  return (

    <section

      className="
        relative
        min-h-screen
        overflow-hidden
        pt-36
      "

    >


      {/* Background blur */}

      <div

        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-neutral-200/50
          blur-3xl
        "

      />



      <Container>

        <div

          className="
            relative
            grid
            min-h-[calc(100vh-9rem)]
            items-center
            gap-20
            lg:grid-cols-2
          "

        >

          <HeroContent />

          <HeroVisual />


        </div>


      </Container>


    </section>

  );

}