export default function LocationStats({

  locations = {},

}) {


  const data =

    Object.entries(locations)

      .map(
        ([name,total])=>({

          name,

          total,

        })
      )

      .sort(
        (a,b)=>
          b.total - a.total
      )

      .slice(0,5);







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

        Localisations


      </h2>



      <p

        className="
          mt-1
          text-sm
          text-zinc-500
        "

      >

        Origine des visiteurs.


      </p>








      <div

        className="
          mt-6
          space-y-4
        "

      >


        {
          data.length === 0 ? (


            <p

              className="
                text-sm
                text-zinc-500
              "

            >

              Pas encore de données.


            </p>


          )


          :


          data.map(location => (


            <div

              key={location.name}

              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-950
                px-5
                py-4
              "

            >



              <span

                className="
                  font-medium
                  text-white
                "

              >

                {location.name}


              </span>





              <span

                className="
                  text-sm
                  text-zinc-400
                "

              >

                {location.total} visiteurs


              </span>



            </div>


          ))

        }


      </div>




    </div>


  );


}