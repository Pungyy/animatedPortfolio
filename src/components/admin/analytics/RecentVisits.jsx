import {
  useState,
} from "react";


import VisitDetailsModal from "./VisitDetailsModal";







export default function RecentVisits({

  visits = [],

}) {


  const [
    selectedVisit,
    setSelectedVisit,
  ] = useState(null);









  function formatDate(date){


    if(!date)
      return "-";



    return new Date(date)

      .toLocaleString(

        "fr-FR",

        {
          day:"2-digit",
          month:"short",
          hour:"2-digit",
          minute:"2-digit",
        }

      );


  }









  function formatDuration(seconds = 0){


    if(!seconds)
      return "0s";



    if(seconds < 60)

      return `${seconds}s`;



    const minutes =
      Math.floor(
        seconds / 60
      );



    const rest =
      seconds % 60;



    return `${minutes}min ${rest}s`;


  }









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

        Les dernières sessions enregistrées.


      </p>









      <div

        className="
          mt-6
          overflow-hidden
          rounded-3xl
          border
          border-zinc-800
        "

      >






        <div

          className="
            grid
            grid-cols-4
            bg-zinc-950
            px-5
            py-3
            text-xs
            font-medium
            text-zinc-500
          "

        >


          <span>
            Page
          </span>


          <span>
            Localisation
          </span>


          <span>
            Appareil
          </span>


          <span>
            Durée
          </span>


        </div>









        {
          visits.length === 0 ? (


            <p

              className="
                p-5
                text-sm
                text-zinc-500
              "

            >

              Aucune visite enregistrée.


            </p>


          )


          :


          visits

            .slice(
              0,
              10
            )

            .map((visit)=>(


              <div


                key={
                  visit.id
                }


                onClick={() =>
                  setSelectedVisit(
                    visit
                  )
                }


                className="
                  grid
                  grid-cols-4
                  items-center
                  border-t
                  border-zinc-800
                  px-5
                  py-4
                  cursor-pointer
                  transition
                  duration-300
                  hover:bg-zinc-800/40
                "


              >







                <div>


                  <p

                    className="
                      truncate
                      text-sm
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
                      text-xs
                      text-zinc-500
                    "

                  >

                    {
                      formatDate(
                        visit.created_at
                      )
                    }


                  </p>


                </div>









                <p

                  className="
                    truncate
                    text-sm
                    text-zinc-300
                  "

                >

                  {
                    visit.city

                    ?

                    `${visit.country} - ${visit.city}`

                    :

                    "Inconnue"
                  }


                </p>









                <p

                  className="
                    text-sm
                    text-zinc-300
                  "

                >

                  {
                    visit.device || "Desktop"
                  }


                </p>









                <p

                  className="
                    text-sm
                    font-semibold
                    text-violet-400
                  "

                >

                  {
                    formatDuration(
                      visit.duration
                    )
                  }


                </p>









              </div>


            ))


        }







      </div>









      <VisitDetailsModal

        visit={
          selectedVisit
        }


        onClose={() =>
          setSelectedVisit(
            null
          )
        }

      />







    </div>


  );


}