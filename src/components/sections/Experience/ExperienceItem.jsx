import {
  motion,
} from "framer-motion";


import {
  MapPin,
} from "lucide-react";


import {
  formatDate,
} from "../../../utils/formatDate";





export default function ExperienceItem({
  experience,
  index,
}) {


  const left = index % 2 === 0;



  return (

    <motion.article


      initial={{
        opacity:0,
        y:70,
        filter:"blur(8px)",
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
        duration:0.8,
        ease:"easeOut",
      }}



      className="
        relative
        grid
        items-center
        md:grid-cols-2
        md:gap-24
      "

    >






      {/* POINT CENTRAL */}


      <motion.div


        initial={{
          scale:0,
        }}


        whileInView={{
          scale:1,
        }}


        viewport={{
          once:true,
        }}



        transition={{
          duration:.5,
        }}



        className="
          absolute
          left-1/2
          top-10

          hidden

          h-4
          w-4

          -translate-x-1/2

          rounded-full

          bg-[var(--text-primary)]

          ring-8

          ring-[var(--background)]

          shadow-[0_0_25px_rgba(0,0,0,.35)]

          md:block
        "


      />







      <div

        className={
          left
          ? "order-1"
          : "order-2"
        }

      >

        {
          left && (

            <Content
              experience={experience}
            />

          )
        }


      </div>







      <div

        className={
          left
          ? "order-2"
          : "order-1"
        }

      >

        {
          !left && (

            <Content
              experience={experience}
            />

          )
        }


      </div>



    </motion.article>

  );

}









function Content({
  experience,
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

        max-w-md

        rounded-[32px]

        border

        border-[var(--border)]

        bg-[var(--surface)]/70

        p-8

        backdrop-blur-xl

        shadow-[var(--shadow-card)]

        transition

        hover:-translate-y-1
      "


    >





      <p

        className="
          text-xs

          font-semibold

          uppercase

          tracking-[0.25em]

          text-[var(--text-secondary)]

          opacity-70
        "

      >

        {formatDate(experience.start_date)}

        {" — "}

        {
          experience.end_date
          ?
          formatDate(experience.end_date)
          :
          "Aujourd'hui"
        }


      </p>









      <h3

        className="
          mt-6

          text-4xl

          font-semibold

          tracking-tight

          text-[var(--text-primary)]
        "

      >

        {experience.company}


      </h3>









      {
        experience.role && (

          <p

            className="
              mt-3

              text-lg

              text-[var(--text-secondary)]
            "

          >

            {experience.role}


          </p>

        )
      }









      {
        experience.description && (

          <p

            className="
              mt-6

              text-sm

              leading-relaxed

              text-[var(--text-secondary)]
            "

          >

            {experience.description}


          </p>

        )
      }









      {
        experience.location && (

          <div

            className="
              mt-8

              flex

              items-center

              gap-2

              text-sm

              text-[var(--text-secondary)]
            "

          >

            <MapPin size={16}/>

            {experience.location}


          </div>

        )
      }






    </motion.div>

  );

}