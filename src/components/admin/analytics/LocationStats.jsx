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
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-8
        shadow-[var(--shadow-card)]
      "

    >



      <h2

        className="
          text-xl
          font-semibold
          text-[var(--text-primary)]
        "

      >

        Localisations


      </h2>



      <p

        className="
          mt-1
          text-sm
          text-[var(--text-muted)]
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
                text-[var(--text-muted)]
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
                border-[var(--border)]
                bg-[var(--background)]
                px-5
                py-4
              "

            >



              <span

                className="
                  font-medium
                  text-[var(--text-primary)]
                "

              >

                {location.name}


              </span>





              <span

                className="
                  text-sm
                  text-[var(--text-secondary)]
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