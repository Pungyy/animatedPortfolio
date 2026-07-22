export default function RecentVisits({

  visits = [],

}) {


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

        Dernières visites


      </h2>





      <p

        className="
          mt-1
          text-sm
          text-zinc-500
        "

      >

        Les derniers visiteurs enregistrés.


      </p>









      <div

        className="
          mt-6
          space-y-4
        "

      >



        {
          visits.length === 0 ? (


            <p

              className="
                text-sm
                text-zinc-500
              "

            >

              Aucune visite enregistrée.


            </p>


          )


          :


          visits.map((visit)=>(


            <div

              key={visit.id}

              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-950
                p-4
              "

            >





              <div>


                <p

                  className="
                    font-medium
                    text-white
                  "

                >

                  {
                    visit.page || "/"
                  }


                </p>





                <p

                  className="
                    mt-1
                    text-sm
                    text-zinc-500
                  "

                >

                  {
                    visit.browser || "Inconnu"
                  }

                  {" · "}

                  {
                    visit.device || "Inconnu"
                  }


                </p>



              </div>









              <p

                className="
                  text-xs
                  text-zinc-500
                "

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


              </p>





            </div>


          ))

        }



      </div>





    </div>


  );


}