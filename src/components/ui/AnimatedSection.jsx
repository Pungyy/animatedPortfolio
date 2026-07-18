import {
  motion,
} from "framer-motion";


export default function AnimatedSection({
  children,
  className = "",
}) {


  return (

    <motion.div


      initial={{
        opacity:0,
        y:40,
        filter:"blur(12px)",
      }}


      whileInView={{
        opacity:1,
        y:0,
        filter:"blur(0px)",
      }}


      viewport={{
        once:true,
        margin:"-120px",
      }}


      transition={{
        duration:.8,
        ease:[
          0.22,
          1,
          0.36,
          1,
        ],
      }}


      className={className}


    >

      {children}


    </motion.div>

  );

}