import {
  motion,
} from "framer-motion";


export default function StatCard({
  value,
  label,
}) {


  return (

    <motion.div


      whileHover={{
        y:-8,
      }}


      transition={{
        duration:.3,
      }}



      className="
        group
        rounded-[32px]
        border
        border-neutral-200
        bg-white
        p-10
        text-center
        shadow-[0_20px_60px_rgba(0,0,0,0.05)]
        transition
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)]
      "


    >



      <p

        className="
          text-5xl
          font-semibold
          tracking-tight
          text-neutral-950
        "

      >

        {value}


      </p>





      <p

        className="
          mt-4
          text-sm
          font-medium
          text-neutral-500
        "

      >

        {label}


      </p>



    </motion.div>


  );

}