export default function BrowserStats({

  browsers = [],

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

        Navigateurs


      </h2>





      <p

        className="
          mt-1
          text-sm
          text-zinc-500
        "

      >

        Répartition des navigateurs utilisés.


      </p>









      <div

        className="
          mt-6
          space-y-4
        "

      >



        {
          browsers.length === 0 ? (


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


          browsers.map((browser)=>(


            <div

              key={browser.name}

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



              <p

                className="
                  font-medium
                  text-white
                "

              >

                {browser.name}


              </p>






              <span

                className="
                  text-sm
                  text-zinc-400
                "

              >

                {browser.total} visites


              </span>




            </div>


          ))

        }



      </div>





    </div>


  );


}