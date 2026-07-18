import {
  motion,
} from "framer-motion";


import {
  MapPin,
  Mail,
  Phone,
} from "lucide-react";


import usePortfolio from "../../../hooks/usePortfolio";



export default function AboutCard() {


  const {
    settings,
  } = usePortfolio();




  return (

    <motion.div


      initial={{
        opacity:0,
        scale:.96,
      }}


      whileInView={{
        opacity:1,
        scale:1,
      }}


      viewport={{
        once:true,
      }}


      transition={{
        duration:.8,
      }}



      className="
        relative
      "

    >




      {/* IMAGE */}

      <div

        className="
          overflow-hidden
          rounded-[48px]
          border
          border-neutral-200
          bg-neutral-100
          shadow-[0_40px_100px_rgba(0,0,0,.12)]
        "

      >


        {
          settings.profile_image ? (

            <img

              src={settings.profile_image}

              alt="Profil"

              className="
                aspect-[4/5]
                w-full
                object-cover
              "

            />

          )

          :

          (

            <div

              className="
                aspect-[4/5]
                flex
                items-center
                justify-center
                text-neutral-400
              "

            >

              Ajouter une photo


            </div>

          )

        }


      </div>







      {/* FLOAT CARD */}

      <motion.div


        animate={{
          y:[
            0,
            -8,
            0,
          ],
        }}


        transition={{
          duration:5,
          repeat:Infinity,
          ease:"easeInOut",
        }}



        className="
          absolute
          -bottom-10
          -left-10
          rounded-[32px]
          border
          border-neutral-200
          bg-white/90
          p-7
          backdrop-blur-xl
          shadow-[0_25px_80px_rgba(0,0,0,.12)]
        "


      >



        <div

          className="
            space-y-5
            text-sm
            text-neutral-500
          "

        >



          {
            settings.location && (

              <div

                className="
                  flex
                  items-center
                  gap-3
                "

              >

                <MapPin size={17}/>

                {settings.location}

              </div>

            )
          }





          {
            settings.email && (

              <div

                className="
                  flex
                  items-center
                  gap-3
                "

              >

                <Mail size={17}/>

                {settings.email}

              </div>

            )
          }





          {
            settings.phone && (

              <div

                className="
                  flex
                  items-center
                  gap-3
                "

              >

                <Phone size={17}/>

                {settings.phone}

              </div>

            )
          }



        </div>


      </motion.div>




    </motion.div>

  );

}