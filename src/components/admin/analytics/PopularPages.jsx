export default function PopularPages({

  pages = [],

}) {


  const max =
    pages.length
      ? pages[0].total
      : 0;






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

        Les pages les plus visitées.


      </p>









      <div

        className="
          mt-8
          space-y-6
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


          pages.map(
            (page,index)=>(


              <div

                key={page.page}

                className="
                  space-y-3
                "

              >





                <div

                  className="
                    flex
                    items-center
                    justify-between
                  "

                >




                  <div

                    className="
                      flex
                      items-center
                      gap-3
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









                <div

                  className="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-zinc-800
                  "

                >



                  <div

                    className="
                      h-full
                      rounded-full
                      bg-violet-600
                    "

                    style={{

                      width:
                        `${

                          (
                            page.total /
                            max

                          )
                          *
                          100

                        }%`

                    }}

                  />



                </div>





              </div>


            )

          )

        }



      </div>




    </div>


  );


}