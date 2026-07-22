import {
  motion,
} from "framer-motion";


import usePortfolio from "../../../hooks/usePortfolio";

import TechnologyIcon from "../../ui/TechnologyIcon";

import heroImage from "../../../assets/hero/developer-setup.png";



export default function HeroVisual() {


  const {
    skills,
  } = usePortfolio();




  const featuredSkills = skills?.slice(0,4) || [];





  return (

    <div

      className="
        relative
        flex
        justify-center
        lg:justify-end
      "

    >





      {/* HALO PRINCIPAL */}


      <motion.div

        animate={{

          scale:[
            1,
            1.08,
            1,
          ],

          opacity:[
            .35,
            .5,
            .35,
          ],

        }}


        transition={{

          duration:6,

          repeat:Infinity,

          ease:"easeInOut",

        }}



        className="
          absolute
          -inset-20
          rounded-full

          bg-gradient-to-br

          from-[var(--surface-muted)]

          via-[var(--surface)]

          to-[var(--background)]

          blur-3xl
        "

      />









      {/* CARTE */}


      <motion.div


        initial={{
          opacity:0,
          y:40,
        }}


        animate={{
          opacity:1,
          y:0,
        }}


        transition={{
          duration:.8,
        }}



        className="
          relative
          w-full
          max-w-[520px]
        "


      >






        <motion.div


          animate={{

            y:[
              0,
              -12,
              0,
            ],

          }}



          transition={{

            duration:5,

            repeat:Infinity,

            ease:"easeInOut",

          }}





          className="
            relative
            overflow-hidden
            rounded-[48px]

            border

            border-[var(--border)]

            bg-[var(--surface)]

            shadow-[var(--shadow-card)]
          "


        >





          <div

            className="
              aspect-[4/5]

              bg-[var(--surface-muted)]
            "

          >


            <img

              src={heroImage}

              alt="Developer workspace"

              className="
                h-full
                w-full
                object-cover
              "

            />


          </div>







          {/* REFLET */}


          <div

            className="
              absolute
              inset-0

              bg-gradient-to-tr

              from-white/20

              via-transparent

              to-transparent

              pointer-events-none

              dark:from-white/5
            "

          />


        </motion.div>









        {/* BADGES */}



        {
          featuredSkills.map(
            (skill,index)=>(


              <motion.div


                key={skill.id}


                animate={{

                  y:[
                    0,
                    -8,
                    0,
                  ],

                }}



                transition={{

                  duration:
                    3 + index,

                  repeat:Infinity,

                  ease:"easeInOut",

                }}



                className={`

                  absolute

                  flex
                  items-center
                  gap-2

                  rounded-full

                  border

                  bg-[var(--surface)]/90

                  px-4
                  py-2

                  text-sm
                  font-medium

                  shadow-lg

                  backdrop-blur


                  ${
                    index === 0
                    ? "-left-6 top-10"
                    :
                    index === 1
                    ? "-right-6 top-28"
                    :
                    index === 2
                    ? "-left-5 bottom-24"
                    :
                    "right-0 bottom-10"
                  }

                `}



                style={{

                  borderColor:
                    `${skill.color}50`,

                  color:
                    skill.color,

                }}



              >



                {
                  skill.icon && (

                    <TechnologyIcon

                      name={skill.icon}

                      size={14}

                    />

                  )
                }



                {skill.name}


              </motion.div>


            )
          )
        }







      </motion.div>





    </div>


  );

}