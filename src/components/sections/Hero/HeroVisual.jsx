import {
  motion,
} from "framer-motion";


import Badge from "../../ui/Badge";

import usePortfolio from "../../../hooks/usePortfolio";



export default function HeroVisual() {


  const {
    settings,
  } = usePortfolio();




  return (

    <motion.div


      initial={{
        opacity:0,
        scale:0.95,
      }}


      animate={{
        opacity:1,
        scale:1,
      }}


      transition={{
        duration:1,
        ease:"easeOut",
      }}



      className="
        flex
        justify-center
        lg:justify-end
      "


    >





      <div

        className="
          relative
          w-full
          max-w-[520px]
        "

      >




        {/* Image */}

        <motion.div


          whileHover={{
            scale:1.02,
          }}


          transition={{
            duration:0.4,
          }}



          className="
            overflow-hidden
            rounded-[48px]
            border
            border-neutral-200
            bg-neutral-100
            shadow-[0_40px_100px_rgba(0,0,0,0.12)]
          "

        >


          {
            settings?.profile_image ? (

              <img

                src={settings.profile_image}

                alt="Profil"

                className="
                  aspect-[4/5]
                  h-full
                  w-full
                  object-cover
                "

              />

            ) : (

              <div

                className="
                  aspect-[4/5]
                "

              />

            )
          }



        </motion.div>







        {/* Floating badges */}



        <FloatingBadge

          text="React"

          className="
            -left-6
            top-12
          "

          delay={0}

        />



        <FloatingBadge

          text="Supabase"

          className="
            -right-6
            top-32
          "

          delay={1}

        />



        <FloatingBadge

          text="Laravel"

          className="
            -left-4
            bottom-24
          "

          delay={2}

        />



        <FloatingBadge

          text="TypeScript"

          className="
            right-0
            bottom-12
          "

          delay={3}

        />





      </div>



    </motion.div>

  );

}








function FloatingBadge({
  text,
  className,
  delay,
}) {


  return (

    <motion.div


      animate={{
        y:[
          0,
          -10,
          0,
        ],
      }}



      transition={{

        duration:4,

        repeat:Infinity,

        delay,

      }}



      className={`
        absolute
        ${className}
      `}


    >

      <Badge>

        {text}

      </Badge>


    </motion.div>

  );

}