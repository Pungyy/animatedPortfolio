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
        border-neutral-200
        py-16
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
              text-neutral-950
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
              text-neutral-500
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
                  border-neutral-200
                  text-neutral-500
                  transition
                  hover:bg-black
                  hover:text-white
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
                  border-neutral-200
                  text-neutral-500
                  transition
                  hover:bg-black
                  hover:text-white
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
                  border-neutral-200
                  text-neutral-500
                  transition
                  hover:bg-black
                  hover:text-white
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
          text-neutral-400
        "

      >

        © {year} {settings?.first_name || "Portfolio"}.
        Tous droits réservés.

      </div>




    </footer>

  );

}