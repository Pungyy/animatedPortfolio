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
        border-[var(--border)]

        bg-[var(--surface)]

        p-10

        text-center

        shadow-[var(--shadow-card)]

        transition

        hover:-translate-y-1
      "


    >





      <p

        className="
          text-5xl
          font-semibold
          tracking-tight

          text-[var(--text-primary)]
        "

      >

        {value}


      </p>








      <p

        className="
          mt-4

          text-sm

          font-medium

          text-[var(--text-secondary)]
        "

      >

        {label}


      </p>



    </motion.div>


  );

}