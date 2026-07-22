import {
  motion,
} from "framer-motion";



const infos = [
  {
    label: "Année",
    key: "year",
  },
  {
    label: "Client",
    key: "client",
  },
  {
    label: "Statut",
    key: "status",
  },
  {
    label: "Catégorie",
    key: "category",
  },
];





export default function ProjectInfo({
  project,
}) {



  const filteredInfos =
    infos.filter(
      (item) =>
        project[item.key]
    );






  return (


    <motion.section


      initial={{
        opacity:0,
        y:30,
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
        duration:.7,
        ease:[
          .22,
          1,
          .36,
          1
        ],
      }}



      className="
        mt-24
      "


    >





      <div

        className="
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-4
        "

      >





        {
          filteredInfos.map(
            (info)=>(


              <div


                key={info.key}


                className="
                  group

                  rounded-[32px]

                  border

                  border-[var(--border)]

                  bg-[var(--surface)]

                  p-8

                  transition-all

                  duration-500

                  hover:-translate-y-1

                  hover:shadow-[var(--shadow-card)]
                "


              >






                <p

                  className="
                    text-xs

                    font-medium

                    uppercase

                    tracking-[0.35em]

                    text-[var(--text-secondary)]
                  "

                >

                  {info.label}


                </p>








                <p

                  className="
                    mt-5

                    text-xl

                    font-semibold

                    tracking-tight

                    text-[var(--text-primary)]
                  "

                >

                  {project[info.key]}


                </p>






              </div>


            )


          )
        }






      </div>





    </motion.section>


  );

}