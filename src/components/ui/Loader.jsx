import {
  motion,
} from "framer-motion";



export default function Loader() {


  const letters =
    "IBRAHIM".split("");




  return (


    <motion.div


      initial={{
        opacity:1,
      }}


      exit={{
        opacity:0,
      }}


      transition={{
        duration:.8,
      }}



      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[var(--background)]
      "


    >







      {/* HALO */}


      <motion.div



        initial={{
          scale:.6,
          opacity:0,
        }}



        animate={{
          scale:[
            1,
            1.3,
            1,
          ],

          opacity:[
            .2,
            .5,
            .2,
          ],
        }}



        transition={{
          duration:4,
          repeat:Infinity,
          ease:"easeInOut",
        }}



        className="
          absolute
          h-[350px]
          w-[350px]
          rounded-full
          bg-[var(--surface-muted)]
          blur-3xl
        "


      />









      {/* CONTENT */}


      <div

        className="
          relative
          text-center
        "

      >







        <div

          className="
            flex
            justify-center
            overflow-hidden
            text-6xl
            font-semibold
            tracking-[0.25em]
            text-[var(--text-primary)]
            md:text-8xl
          "

        >



          {
            letters.map(

              (letter,index)=>(


                <motion.span



                  key={index}



                  initial={{
                    opacity:0,
                    y:40,
                    filter:"blur(12px)",
                  }}



                  animate={{
                    opacity:1,
                    y:0,
                    filter:"blur(0px)",
                  }}



                  transition={{
                    duration:.8,
                    delay:index*.08,
                    ease:[
                      .22,
                      1,
                      .36,
                      1,
                    ],
                  }}



                >

                  {letter}


                </motion.span>


              )

            )
          }



        </div>









        <motion.p



          initial={{
            opacity:0,
            y:20,
          }}



          animate={{
            opacity:1,
            y:0,
          }}



          transition={{
            delay:.8,
            duration:.8,
          }}



          className="
            mt-6
            text-sm
            uppercase
            tracking-[0.5em]
            text-[var(--text-secondary)]
          "


        >

          Full-Stack Developer


        </motion.p>







        {/* BARRE DE CHARGEMENT */}


        <motion.div


          initial={{
            width:0,
          }}


          animate={{
            width:"180px",
          }}


          transition={{
            delay:1,
            duration:1.5,
            ease:"easeOut",
          }}



          className="
            mx-auto
            mt-10
            h-[2px]
            rounded-full
            bg-[var(--text-primary)]
          "


        />






      </div>





    </motion.div>


  );

}