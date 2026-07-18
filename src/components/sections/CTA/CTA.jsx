import {
  motion,
} from "framer-motion";


import {
  ArrowRight,
} from "lucide-react";


import usePortfolio from "../../../hooks/usePortfolio";


import Container from "../../ui/Container";
import Button from "../../ui/Button";



export default function CTA() {


  const {
    settings,
  } = usePortfolio();




  return (


    <section

      className="
        relative
        overflow-hidden
        py-40
      "

    >




      {/* HALO */}


      <div

        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-neutral-100
          blur-3xl
        "

      />






      <Container>


        <motion.div


          initial={{

            opacity:0,

            y:50,

            filter:"blur(10px)",

          }}



          whileInView={{

            opacity:1,

            y:0,

            filter:"blur(0px)",

          }}



          viewport={{

            once:true,

            margin:"-100px",

          }}



          transition={{

            duration:.8,

          }}



          className="
            relative
            mx-auto
            max-w-4xl
            text-center
          "


        >





          <p

            className="
              text-sm
              font-medium
              uppercase
              tracking-[0.35em]
              text-neutral-400
            "

          >

            Disponible pour collaborer


          </p>






          <h2

            className="
              mt-8
              text-5xl
              font-semibold
              leading-tight
              tracking-tight
              text-neutral-950
              md:text-7xl
            "

          >

            Créons quelque chose
            <br />

            d'exception.


          </h2>








          <p

            className="
              mx-auto
              mt-8
              max-w-2xl
              text-lg
              leading-8
              text-neutral-500
            "

          >

            Une idée de projet,
            une opportunité ou une collaboration ?
            Je serais ravi d'échanger avec vous.


          </p>







          <div

            className="
              mt-12
              flex
              flex-wrap
              justify-center
              gap-4
            "

          >





            <a

              href="#contact"

            >


              <Button

                className="
                  flex
                  items-center
                  gap-2
                "

              >

                Me contacter


                <ArrowRight size={18}/>


              </Button>


            </a>








            {
              settings?.cv_url && (


                <a

                  href={settings.cv_url}

                  target="_blank"

                  rel="noreferrer"

                >

                  <Button

                    variant="secondary"

                  >

                    Télécharger mon CV


                  </Button>


                </a>


              )
            }





          </div>






        </motion.div>


      </Container>


    </section>


  );

}