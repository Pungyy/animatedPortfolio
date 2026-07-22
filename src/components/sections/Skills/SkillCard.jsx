import {
  motion,
} from "framer-motion";


import TechnologyIcon from "../../ui/TechnologyIcon";




export default function SkillCard({
  skill,
  index,
}) {


  return (

    <motion.article


      initial={{
        opacity:0,
        y:40,
      }}


      whileInView={{
        opacity:1,
        y:0,
      }}


      viewport={{
        once:true,
        margin:"-100px",
      }}


      transition={{
        duration:.6,
        delay:index * .08,
      }}




      className="
        group

        rounded-[32px]

        border
        border-[var(--border)]

        bg-[var(--surface)]

        p-8

        shadow-[var(--shadow-card)]

        transition

        hover:-translate-y-2
      "

    >







      <div

        className="
          flex
          items-center
          justify-between
        "

      >






        <div

          className="
            flex
            items-center
            gap-5
          "

        >






          <div

            className="
              flex

              h-14

              w-14

              items-center
              justify-center

              rounded-2xl

              bg-[var(--surface-muted)]

              transition

              duration-300

              group-hover:scale-110
            "

            style={{

              color: skill.color,

            }}

          >


            <TechnologyIcon

              name={skill.icon}

              size={28}

            />


          </div>









          <div>



            <h3

              className="
                text-xl

                font-semibold

                tracking-tight

                text-[var(--text-primary)]
              "

            >

              {skill.name}


            </h3>





            {
              skill.category && (

                <p

                  className="
                    mt-1

                    text-sm

                    text-[var(--text-secondary)]
                  "

                >

                  {skill.category}

                </p>

              )
            }



          </div>




        </div>




      </div>









      {
        skill.level && (

          <div

            className="
              mt-8
            "

          >





            <div

              className="
                mb-2

                flex

                justify-between

                text-sm

                text-[var(--text-secondary)]
              "

            >

              <span>
                Niveau
              </span>


              <span>
                {skill.level}
              </span>


            </div>








            <div

              className="
                h-2

                overflow-hidden

                rounded-full

                bg-[var(--surface-muted)]
              "

            >


              <motion.div


                initial={{
                  width:0,
                }}


                whileInView={{
                  width:`${skill.level}%`,
                }}


                viewport={{
                  once:true,
                }}


                transition={{
                  duration:1,
                  ease:"easeOut",
                }}



                className="
                  h-full

                  rounded-full
                "



                style={{

                  backgroundColor:
                    skill.color || "var(--text-primary)",

                }}


              />


            </div>



          </div>

        )
      }





    </motion.article>

  );

}