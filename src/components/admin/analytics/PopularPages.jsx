export default function PopularPages({

  pages = [],

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

        Pages populaires


      </h2>





      <p

        className="
          mt-1
          text-sm
          text-zinc-500
        "

      >

        Les pages les plus consultées.


      </p>









      <div

        className="
          mt-6
          space-y-4
        "

      >



        {
          pages.length === 0 ? (


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


          pages.map((page,index)=>(


            <div

              key={page.page}

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





              <div

                className="
                  flex
                  items-center
                  gap-4
                "

              >



                <span

                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-violet-600
                    text-sm
                    font-bold
                    text-white
                  "

                >

                  {index + 1}


                </span>





                <p

                  className="
                    font-medium
                    text-white
                  "

                >

                  {page.page}


                </p>



              </div>







              <span

                className="
                  text-sm
                  text-zinc-400
                "

              >

                {page.total} vues


              </span>





            </div>


          ))

        }



      </div>





    </div>


  );


}