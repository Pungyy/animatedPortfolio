export default function VisitDetailsModal({

  visit,

  onClose,

}) {


  if(!visit)
    return null;







  function formatDuration(seconds = 0){


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
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        px-4
        py-6
        backdrop-blur-sm
      "


      onClick={onClose}

    >







      <div


        onClick={(e)=>
          e.stopPropagation()
        }


        className="
          flex
          max-h-[90vh]
          w-full
          max-w-xl
          flex-col
          overflow-hidden
          rounded-[32px]
          border
          border-[var(--border)]
          bg-[var(--background)]
          shadow-2xl
        "


      >








        {/* HEADER */}


        <div

          className="
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-[var(--border)]
            px-5
            py-5
            sm:px-8
          "

        >



          <div>


            <h2

              className="
                text-xl
                font-semibold
                text-[var(--text-primary)]
                sm:text-2xl
              "

            >

              Détails visite


            </h2>



            <p

              className="
                mt-1
                text-sm
                text-[var(--text-primary)]0
              "

            >

              Informations de session


            </p>


          </div>







          <button


            onClick={onClose}


            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[var(--surface)]
              text-[var(--text-secondary)]
              transition
              hover:bg-[var(--surface-muted)]
              hover:text-[var(--text-primary)]
            "


          >

            ✕


          </button>





        </div>









        {/* CONTENT */}


        <div

          className="
            overflow-y-auto
            p-5
            sm:p-8
          "

        >



          <div

            className="
              grid
              gap-4
              sm:grid-cols-2
            "

          >







            <Info

              title="Page"

              value={
                visit.page || "/"
              }

            />





            <Info

              title="Date"

              value={

                new Date(
                  visit.created_at
                )

                .toLocaleString(
                  "fr-FR"
                )

              }

            />







            <Info

              title="Localisation"

              value={

                visit.city

                  ?

                  `${visit.country} - ${visit.city}`

                  :

                  "Inconnue"

              }

            />







            <Info

              title="Appareil"

              value={
                visit.device || "-"
              }

            />







            <Info

              title="Navigateur"

              value={
                visit.browser || "-"
              }

            />







            <Info

              title="Système"

              value={
                visit.os || "-"
              }

            />







            <Info

              title="Résolution"

              value={

                visit.screen_width

                ?

                `${visit.screen_width} × ${visit.screen_height}`

                :

                "-"

              }

            />







            <Info

              title="Durée"

              value={

                formatDuration(
                  visit.duration
                )

              }

            />







            <Info

              title="Source"

              value={
                visit.referrer || "Direct"
              }

            />






          </div>





        </div>








      </div>





    </div>


  );


}









function Info({

  title,

  value,

}){


  return (


    <div


      className="
        min-w-0
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        px-4
        py-3
        transition
        hover:border-[var(--accent)]
      "


    >





      <p

        className="
          text-xs
          text-[var(--text-primary)]0
        "

      >

        {title}


      </p>







      <p

        className="
          mt-1
          truncate
          text-sm
          font-medium
          text-[var(--text-primary)]
        "

      >

        {value}


      </p>





    </div>


  );


}