import {
  motion,
} from "framer-motion";





export default function VisitsChart({

  visits = [],

}) {


  const data =
    visits
      .slice()
      .reverse()
      .slice(0,7);






  return (


    <div

      className="
        rounded-[32px]
        border
        border-zinc-800
        bg-zinc-900
        p-8
        shadow-lg
        shadow-black/20
      "

    >





      <h2

        className="
          text-xl
          font-semibold
          text-white
        "

      >

        Activité récente


      </h2>





      <p

        className="
          mt-1
          text-sm
          text-zinc-500
        "

      >

        Dernières visites enregistrées.


      </p>









      {
        data.length === 0 ? (


          <div

            className="
              mt-10
              flex
              h-40
              items-center
              justify-center
              text-zinc-500
            "

          >

            Pas encore de données.


          </div>


        )


        :


        (


          <div

            className="
              mt-10
              flex
              h-48
              items-end
              gap-3
            "

          >



            {
              data.map(
                (visit,index)=>(


                  <motion.div

                    key={visit.id}


                    initial={{
                      height:0,
                    }}


                    animate={{
                      height:
                        `${30 + index * 10}%`,
                    }}


                    transition={{
                      duration:.5,
                      delay:index * .05,
                    }}


                    className="
                      flex-1
                      rounded-t-2xl
                      bg-violet-600
                    "

                  />

                )

              )
            }



          </div>


        )

      }







      {
        data.length > 0 && (


          <div

            className="
              mt-6
              grid
              grid-cols-7
              gap-2
              text-center
              text-xs
              text-zinc-500
            "

          >


            {
              data.map(
                (visit,index)=>(


                  <span

                    key={index}

                  >

                    {
                      new Date(
                        visit.created_at
                      )
                      .toLocaleDateString(
                        "fr-FR",
                        {
                          day:"2-digit",
                          month:"short",
                        }
                      )
                    }


                  </span>


                )
              )
            }


          </div>


        )
      }



    </div>


  );


}