export default function BrowserStats({

  browsers = [],

}) {


  return (


    <div

      className="
        rounded-[32px]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-8
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

        Navigateurs


      </h2>





      <p

        className="
          mt-1
          text-sm
          text-[var(--text-primary)]0
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
                text-[var(--text-primary)]0
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
                border-[var(--border)]
                bg-[var(--background)]
                px-5
                py-4
              "

            >



              <p

                className="
                  font-medium
                  text-[var(--text-primary)]
                "

              >

                {browser.name}


              </p>






              <span

                className="
                  text-sm
                  text-[var(--text-secondary)]
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