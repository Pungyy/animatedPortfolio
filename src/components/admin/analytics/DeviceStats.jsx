export default function DeviceStats({

  devices = {},

}) {


  const data =

    Object.entries(devices)

      .map(
        ([name,total])=>({

          name,

          total,

        })
      )

      .sort(
        (a,b)=>
          b.total - a.total
      );






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

        Appareils


      </h2>



      <p

        className="
          mt-1
          text-sm
          text-zinc-500
        "

      >

        Répartition des appareils utilisés.


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


          data.map(device => (


            <div

              key={device.name}

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

                {device.name}


              </span>





              <span

                className="
                  text-sm
                  text-zinc-400
                "

              >

                {device.total} sessions


              </span>



            </div>


          ))

        }


      </div>



    </div>

  );


}