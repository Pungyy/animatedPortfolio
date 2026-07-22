import {
  useState,
} from "react";


import {
  motion,
  AnimatePresence,
} from "framer-motion";


import {
  Menu,
  X,
} from "lucide-react";


import Container from "../../ui/Container";
import Button from "../../ui/Button";

import ThemeToggle from "../../ThemeToggle";

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



  const [
    open,
    setOpen,
  ] = useState(false);




  function closeMenu(){

    setOpen(false);

  }






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


      <Container>


        <nav

          className="
            mx-auto
            flex
            h-16
            max-w-5xl
            items-center
            justify-between
            rounded-full

            border
            border-[var(--border)]

            bg-[var(--surface)]/75

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
              text-[var(--text-primary)]
            "

          >

            {
              settings?.first_name
                ?
                `${settings.first_name.charAt(0)}${settings.last_name?.charAt(0) || ""}.`
                :
                "IA."
            }


          </a>







          {/* DESKTOP NAV */}


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

                  <li key={item.label}>

                    <a

                      href={item.href}

                      className="
                        text-sm
                        font-medium

                        text-[var(--text-secondary)]

                        transition

                        hover:text-[var(--text-primary)]
                      "

                    >

                      {item.label}

                    </a>


                  </li>

                )
              )
            }


          </ul>






          {/* ACTIONS DESKTOP */}


          <div

            className="
              hidden
              items-center
              gap-3
              lg:flex
            "

          >

            <ThemeToggle />


            {
              settings?.cv_url && (

                <a

                  href={settings.cv_url}

                  target="_blank"

                  rel="noreferrer"

                >

                  <Button>

                    Télécharger mon CV

                  </Button>


                </a>

              )
            }


          </div>









          {/* MOBILE ACTIONS */}


          <div

            className="
              flex
              items-center
              gap-2
              lg:hidden
            "

          >

            <ThemeToggle />



            <button

              onClick={()=>setOpen(!open)}

              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-full

                border
                border-[var(--border)]

                text-[var(--text-primary)]
              "

            >

              {
                open
                ?
                <X size={20}/>
                :
                <Menu size={20}/>
              }


            </button>


          </div>




        </nav>











        {/* MOBILE MENU */}


        <AnimatePresence>


          {
            open && (


              <motion.div


                initial={{
                  opacity:0,
                  y:-15,
                  scale:.95,
                }}


                animate={{
                  opacity:1,
                  y:0,
                  scale:1,
                }}


                exit={{
                  opacity:0,
                  y:-15,
                  scale:.95,
                }}


                transition={{
                  duration:.25,
                }}



                className="
                  mt-4

                  rounded-[32px]

                  border
                  border-[var(--border)]

                  bg-[var(--surface)]/90

                  p-6

                  shadow-[0_20px_60px_rgba(0,0,0,.12)]

                  backdrop-blur-xl

                  lg:hidden
                "


              >




                <ul

                  className="
                    flex
                    flex-col
                    gap-5
                  "

                >

                  {
                    navigation.map(
                      (item)=>(


                        <li key={item.label}>


                          <a

                            href={item.href}

                            onClick={closeMenu}

                            className="
                              block

                              text-lg

                              font-medium

                              text-[var(--text-secondary)]

                              transition

                              hover:text-[var(--text-primary)]
                            "

                          >

                            {item.label}


                          </a>


                        </li>


                      )
                    )
                  }


                </ul>







                {
                  settings?.cv_url && (


                    <a

                      href={settings.cv_url}

                      target="_blank"

                      rel="noreferrer"

                      className="mt-6 block"

                    >

                      <Button

                        className="
                          w-full
                        "

                      >

                        Télécharger mon CV


                      </Button>


                    </a>


                  )
                }




              </motion.div>


            )
          }


        </AnimatePresence>



      </Container>


    </motion.header>


  );

}