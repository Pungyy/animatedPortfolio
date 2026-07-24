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
        backdrop-blur-sm
      "

      onClick={onClose}

    >



      <div

        onClick={(e)=>
          e.stopPropagation()
        }

        className="
          w-full
          max-w-xl
          rounded-[32px]
          border
          border-zinc-800
          bg-zinc-950
          p-8
          shadow-2xl
        "

      >



        <div

          className="
            flex
            items-center
            justify-between
            mb-8
          "

        >


          <h2

            className="
              text-2xl
              font-semibold
              text-white
            "

          >

            Détails visite


          </h2>



          <button

            onClick={onClose}

            className="
              rounded-full
              bg-zinc-900
              px-4
              py-2
              text-zinc-400
              hover:text-white
            "

          >

            ✕


          </button>


        </div>








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


  );


}







function Info({

  title,

  value,

}){


  return (

    <div

      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        px-4
        py-3
      "

    >

      <p

        className="
          text-xs
          text-zinc-500
        "

      >

        {title}

      </p>


      <p

        className="
          mt-1
          text-sm
          font-medium
          text-white
        "

      >

        {value}

      </p>


    </div>

  );


}