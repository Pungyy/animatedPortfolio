import {
  motion,
} from "framer-motion";


export default function Loader() {


  const letters = "IBRAHIM".split("");



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
        bg-white
      "


    >





      {/* HALO */}


      <motion.div


        initial={{
          scale:.6,
          opacity:0,
        }}


        animate={{
          scale:1.3,
          opacity:1,
        }}


        transition={{
          duration:2,
          ease:"easeOut",
        }}



        className="
          absolute
          h-[350px]
          w-[350px]
          rounded-full
          bg-neutral-100
          blur-3xl
        "

      />









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
            text-neutral-950
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
            text-neutral-400
          "


        >

          Full-Stack Developer


        </motion.p>




      </div>



    </motion.div>


  );

}