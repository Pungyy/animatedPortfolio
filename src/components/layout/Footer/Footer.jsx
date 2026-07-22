import {
  motion,
} from "framer-motion";


import {
  Mail,
} from "lucide-react";


import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";


import usePortfolio from "../../../hooks/usePortfolio";





export default function Footer() {


  const {
    settings,
  } = usePortfolio();




  const year = new Date().getFullYear();





  return (


    <footer


      className="
        border-t

        border-[var(--border)]

        py-16

        bg-[var(--background)]
      "


    >






      <motion.div



        initial={{

          opacity:0,

          y:30,

        }}



        whileInView={{

          opacity:1,

          y:0,

        }}



        viewport={{

          once:true,

        }}



        className="
          mx-auto

          flex

          max-w-7xl

          flex-col

          gap-10

          px-6

          md:flex-row

          md:items-center

          md:justify-between
        "



      >







        {/* IDENTITE */}



        <div>



          <h3


            className="
              text-2xl

              font-semibold

              tracking-tight

              text-[var(--text-primary)]
            "


          >


            {
              settings?.first_name

              ?

              `${settings.first_name} ${settings.last_name || ""}`

              :

              "Portfolio"
            }


          </h3>







          <p


            className="
              mt-2

              text-sm

              text-[var(--text-secondary)]
            "


          >


            Développeur Full Stack


          </p>



        </div>









        {/* RESEAUX */}





        <div


          className="
            flex

            items-center

            gap-3
          "


        >







          {
            settings?.github_url && (



              <a



                href={settings.github_url}



                target="_blank"



                rel="noreferrer"




                className="
                  flex

                  h-11

                  w-11

                  items-center

                  justify-center


                  rounded-full


                  border

                  border-[var(--border)]


                  text-[var(--text-secondary)]


                  transition


                  hover:bg-[var(--text-primary)]


                  hover:text-[var(--background)]
                "


              >



                <FaGithub size={18}/>



              </a>



            )
          }









          {
            settings?.linkedin_url && (



              <a



                href={settings.linkedin_url}



                target="_blank"



                rel="noreferrer"




                className="
                  flex

                  h-11

                  w-11

                  items-center

                  justify-center


                  rounded-full


                  border

                  border-[var(--border)]


                  text-[var(--text-secondary)]


                  transition


                  hover:bg-[var(--text-primary)]


                  hover:text-[var(--background)]
                "


              >



                <FaLinkedin size={18}/>



              </a>



            )
          }









          {
            settings?.email && (



              <a



                href={`mailto:${settings.email}`}




                className="
                  flex

                  h-11

                  w-11

                  items-center

                  justify-center


                  rounded-full


                  border

                  border-[var(--border)]


                  text-[var(--text-secondary)]


                  transition


                  hover:bg-[var(--text-primary)]


                  hover:text-[var(--background)]
                "


              >



                <Mail size={18}/>



              </a>



            )
          }







        </div>







      </motion.div>









      <div


        className="
          mx-auto

          mt-12

          max-w-7xl

          px-6


          text-sm

          text-[var(--text-secondary)]

          opacity-70
        "


      >



        © {year} {settings?.first_name || "Portfolio"}.

        Tous droits réservés.



      </div>







    </footer>



  );

}