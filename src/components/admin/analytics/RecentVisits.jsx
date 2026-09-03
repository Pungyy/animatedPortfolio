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
        border-[var(--border)]
        bg-[var(--surface)]
        p-5
        sm:p-8
        shadow-lg
        shadow-black/20
      "

    >





      <h2

        className="
          text-xl
          font-semibold
          text-[var(--text-primary)]
        "

      >

        Dernières visites


      </h2>





      <p

        className="
          mt-1
          text-sm
          text-[var(--text-primary)]0
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
          border-[var(--border)]
        "

      >








        {/* HEADER DESKTOP */}

        <div

          className="
            hidden
            md:grid
            grid-cols-4
            bg-[var(--background)]
            px-5
            py-3
            text-xs
            font-medium
            text-[var(--text-primary)]0
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
                text-[var(--text-primary)]0
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
                  cursor-pointer
                  border-t
                  border-[var(--border)]
                  px-5
                  py-4
                  transition
                  duration-300
                  hover:bg-[var(--surface-muted)]
                "

              >







                {/* DESKTOP */}


                <div

                  className="
                    hidden
                    md:grid
                    grid-cols-4
                    items-center
                    gap-4
                  "

                >



                  <div>


                    <p

                      className="
                        truncate
                        text-sm
                        font-medium
                        text-[var(--text-primary)]
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
                        text-[var(--text-primary)]0
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
                      text-[var(--text-secondary)]
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
                      text-[var(--text-secondary)]
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
                      text-[var(--accent)]
                    "

                  >

                    {
                      formatDuration(
                        visit.duration
                      )
                    }


                  </p>



                </div>









                {/* MOBILE */}


                <div

                  className="
                    space-y-4
                    md:hidden
                  "

                >



                  <div

                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "

                  >


                    <div>


                      <p

                        className="
                          text-sm
                          font-semibold
                          text-[var(--text-primary)]
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
                          text-[var(--text-primary)]0
                        "

                      >

                        {
                          formatDate(
                            visit.created_at
                          )
                        }


                      </p>


                    </div>





                    <span

                      className="
                        rounded-full
                        bg-[var(--accent-soft)]
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-[var(--accent)]
                      "

                    >

                      {
                        formatDuration(
                          visit.duration
                        )
                      }


                    </span>



                  </div>







                  <div

                    className="
                      grid
                      grid-cols-2
                      gap-3
                    "

                  >


                    <Info

                      label="Lieu"

                      value={
                        visit.city
                        ?
                        `${visit.country} - ${visit.city}`
                        :
                        "Inconnue"
                      }

                    />



                    <Info

                      label="Appareil"

                      value={
                        visit.device || "Desktop"
                      }

                    />


                  </div>



                </div>









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








function Info({

  label,

  value,

}){


  return (


    <div

      className="
        rounded-xl
        border
        border-[var(--border)]
        bg-[var(--background)]
        px-3
        py-2
      "

    >


      <p

        className="
          text-[11px]
          text-[var(--text-primary)]0
        "

      >

        {label}


      </p>



      <p

        className="
          mt-1
          truncate
          text-xs
          text-[var(--text-secondary)]
        "

      >

        {value}


      </p>



    </div>


  );


}