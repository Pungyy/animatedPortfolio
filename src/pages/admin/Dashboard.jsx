import {
  FolderKanban,
  Briefcase,
  Wrench,
  Mail,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
  getRecentProjects,
  getRecentContacts,
} from "../../services/dashboard.service";




export default function Dashboard() {


  const [stats, setStats] = useState({

    projects: 0,

    experiences: 0,

    skills: 0,

    contacts: 0,

  });



  const [recentProjects, setRecentProjects] =
    useState([]);



  const [recentContacts, setRecentContacts] =
    useState([]);



  const [loading, setLoading] =
    useState(true);








  useEffect(() => {


    async function loadDashboard() {


      try {


        const [
          statsData,
          projectsData,
          contactsData,
        ] = await Promise.all([

          getDashboardStats(),

          getRecentProjects(),

          getRecentContacts(),

        ]);



        setStats(statsData);


        setRecentProjects(projectsData);


        setRecentContacts(contactsData);



      } catch(error) {


        console.error(
          "Dashboard error :",
          error
        );



      } finally {


        setLoading(false);


      }


    }



    loadDashboard();



  }, []);








  const cards = [

    {
      title: "Projets",
      value: stats.projects,
      icon: FolderKanban,
    },


    {
      title: "Expériences",
      value: stats.experiences,
      icon: Briefcase,
    },


    {
      title: "Compétences",
      value: stats.skills,
      icon: Wrench,
    },


    {
      title: "Messages",
      value: stats.contacts,
      icon: Mail,
    },


  ];








  return (

    <div>


      <div className="mb-10">


        <h1
          className="
            text-4xl
            font-bold
            text-white
          "
        >

          Dashboard

        </h1>



        <p
          className="
            mt-2
            text-zinc-400
          "
        >

          Bienvenue sur ton Portfolio CMS.

        </p>


      </div>








      {/* STATS */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >


        {cards.map((card) => {


          const Icon = card.icon;



          return (

            <div
              key={card.title}
              className="
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
                transition
                hover:border-violet-500/40
              "
            >


              <div
                className="
                  mb-6
                  flex
                  items-center
                  justify-between
                "
              >


                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-600/20
                    text-violet-400
                  "
                >

                  <Icon size={26}/>

                </div>



                <span
                  className="
                    text-4xl
                    font-bold
                    text-white
                  "
                >

                  {
                    loading
                      ? "-"
                      : card.value
                  }

                </span>


              </div>



              <h2
                className="
                  text-zinc-400
                "
              >

                {card.title}

              </h2>


            </div>

          );


        })}


      </div>









      {/* PROJETS */}

      <div
        className="
          mt-10
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-6
        "
      >

        <h2
          className="
            mb-6
            text-xl
            font-semibold
            text-white
          "
        >

          Derniers projets

        </h2>




        <div className="space-y-4">


          {
            recentProjects.length === 0 ? (

              <p className="text-zinc-500">
                Aucun projet.
              </p>


            ) : (


              recentProjects.map((project) => (

                <div
                  key={project.id}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    bg-zinc-800/50
                    p-4
                  "
                >

                  <div>

                    <h3
                      className="
                        font-medium
                        text-white
                      "
                    >
                      {project.title}
                    </h3>


                    <p
                      className="
                        text-sm
                        text-zinc-400
                      "
                    >
                      {project.short_description}
                    </p>

                  </div>



                  <span
                    className="
                      rounded-full
                      bg-violet-600/20
                      px-3
                      py-1
                      text-sm
                      text-violet-400
                    "
                  >
                    {project.year}
                  </span>


                </div>

              ))

            )

          }


        </div>


      </div>









      {/* CONTACTS */}

      <div
        className="
          mt-10
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-6
        "
      >

        <h2
          className="
            mb-6
            text-xl
            font-semibold
            text-white
          "
        >

          Derniers messages

        </h2>





        <div className="space-y-4">


          {
            recentContacts.length === 0 ? (

              <p className="text-zinc-500">
                Aucun message.
              </p>


            ) : (


              recentContacts.map((contact) => (


                <div
                  key={contact.id}
                  className="
                    rounded-xl
                    bg-zinc-800/50
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <h3
                      className="
                        font-medium
                        text-white
                      "
                    >

                      {contact.name}

                    </h3>


                    {
                      !contact.read && (

                        <span
                          className="
                            rounded-full
                            bg-violet-600/20
                            px-3
                            py-1
                            text-xs
                            text-violet-400
                          "
                        >
                          Nouveau
                        </span>

                      )
                    }

                  </div>




                  <p
                    className="
                      mt-2
                      text-sm
                      text-zinc-400
                    "
                  >

                    {contact.subject || "Sans sujet"}

                  </p>



                  <p
                    className="
                      mt-2
                      line-clamp-2
                      text-sm
                      text-zinc-500
                    "
                  >

                    {contact.message}

                  </p>


                </div>


              ))


            )

          }


        </div>


      </div>




    </div>

  );

}