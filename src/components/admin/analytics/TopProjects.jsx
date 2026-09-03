export default function TopProjects({

  projects = [],

}) {


  const max =
    projects.length
      ? projects[0].total
      : 0;





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

        Projets populaires


      </h2>




      <p

        className="
          mt-1
          text-sm
          text-[var(--text-muted)]
        "

      >

        Les projets les plus consultés.


      </p>







      <div

        className="
          mt-8
          space-y-6
        "

      >


        {
          projects.length === 0 ? (


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


          projects.map(
            (project,index)=>(


              <div

                key={project.title}

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
                        bg-[var(--accent)]
                        text-sm
                        font-bold
                        text-[var(--accent-foreground)]
                      "

                    >

                      {index + 1}


                    </span>





                    <p

                      className="
                        font-medium
                        text-[var(--text-primary)]
                      "

                    >

                      {project.title}


                    </p>



                  </div>





                  <span

                    className="
                      text-sm
                      text-[var(--text-secondary)]
                    "

                  >

                    {project.total} vues


                  </span>



                </div>









                <div

                  className="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-[var(--surface-muted)]
                  "

                >


                  <div

                    className="
                      h-full
                      rounded-full
                      bg-[var(--accent)]
                    "

                    style={{

                      width:
                        `${

                          (
                            project.total /
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