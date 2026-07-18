import {
  motion,
} from "framer-motion";

import Container from "../../ui/Container";
import Button from "../../ui/Button";

import usePortfolio from "../../../hooks/usePortfolio";


const navigation = [
  {
    label:"About",
    href:"#about",
  },
  {
    label:"Experience",
    href:"#experience",
  },
  {
    label:"Skills",
    href:"#skills",
  },
  {
    label:"Projects",
    href:"#projects",
  },
  {
    label:"Contact",
    href:"#contact",
  },
];



export default function Navbar() {


  const {
    settings,
  } = usePortfolio();




  return (

    <motion.header


      initial={{
        opacity:0,
        y:-20,
      }}


      animate={{
        opacity:1,
        y:0,
      }}


      transition={{
        duration:.6,
      }}



      className="
        fixed
        inset-x-0
        top-5
        z-50
      "

    >



      <Container
        className="
          flex
          justify-center
        "
      >



        <nav


          className="
            flex
            h-16
            w-full
            max-w-5xl
            items-center
            justify-between
            rounded-full
            border
            border-neutral-200/70
            bg-white/75
            px-6
            shadow-[0_15px_50px_rgba(0,0,0,.08)]
            backdrop-blur-xl
          "


        >




          {/* LOGO */}


          <a

            href="/"

            className="
              text-lg
              font-semibold
              tracking-tight
              text-neutral-950
            "

          >

            {
              settings?.first_name
                ? `${settings.first_name.charAt(0)}${settings.last_name?.charAt(0) || ""}.`
                : "IA."
            }


          </a>








          {/* NAVIGATION */}


          <ul

            className="
              hidden
              items-center
              gap-8
              lg:flex
            "

          >


            {
              navigation.map(
                (item)=>(

                  <li
                    key={item.label}
                  >

                    <a

                      href={item.href}

                      className="
                        text-sm
                        font-medium
                        text-neutral-500
                        transition
                        hover:text-black
                      "

                    >

                      {item.label}


                    </a>


                  </li>

                )
              )
            }


          </ul>








          {/* CV */}


          {
            settings?.cv_url && (

              <a

                href={settings.cv_url}

                target="_blank"

                rel="noreferrer"

              >

                <Button

                  className="
                    hidden
                    lg:inline-flex
                  "

                >

                  Télécharger mon CV


                </Button>


              </a>

            )
          }




        </nav>



      </Container>



    </motion.header>

  );

} 