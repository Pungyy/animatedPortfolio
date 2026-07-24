import {
  useEffect,
  useState,
} from "react";


import {
  Eye,
  Users,
  Activity,
  Clock,
  CalendarDays,
  Layers,
  ChevronDown,
} from "lucide-react";



import AnalyticsCard from "../../components/admin/analytics/AnalyticsCard";

import VisitsChart from "../../components/admin/analytics/VisitsChart";
import RecentVisits from "../../components/admin/analytics/RecentVisits";
import TopProjects from "../../components/admin/analytics/TopProjects";
import PopularPages from "../../components/admin/analytics/PopularPages";
import BrowserStats from "../../components/admin/analytics/BrowserStats";

import DeviceStats from "../../components/admin/analytics/DeviceStats";
import LocationStats from "../../components/admin/analytics/LocationStats";



import {
  getAnalyticsStats,
} from "../../services/analytics.service";








export default function Analytics() {


  const [
    stats,
    setStats,
  ] = useState(null);



  const [
    loading,
    setLoading,
  ] = useState(true);



  const [
    period,
    setPeriod,
  ] = useState("30d");



  const [
    openPeriod,
    setOpenPeriod,
  ] = useState(false);









  useEffect(() => {


    async function loadAnalytics(){


      try {


        setLoading(true);



        const data =
          await getAnalyticsStats(
            period
          );



        setStats(
          data
        );


      }


      catch(error){


        console.error(
          "Analytics loading error :",
          error
        );


      }


      finally {


        setLoading(false);


      }


    }




    loadAnalytics();



  },[
    period,
  ]);









  if(loading){


    return (

      <main

        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#050505]
          text-zinc-400
        "

      >

        Chargement analytics...


      </main>

    );


  }







  if(!stats)
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









  function getPeriodLabel(){


    switch(period){


      case "today":

        return "Aujourd'hui";


      case "7d":

        return "7 derniers jours";


      case "30d":

        return "30 derniers jours";


      case "all":

        return "Tout";


      default:

        return "30 derniers jours";


    }


  }









  const projects =

    Object.entries(
      stats.projects || {}
    )

    .map(
      ([title,total]) => ({

        title,

        total,

      })
    )

    .sort(
      (a,b)=>
        b.total - a.total
    )

    .slice(
      0,
      5
    );









  const pages =

    Object.entries(
      stats.pages || {}
    )

    .map(
      ([page,total]) => ({

        page,

        total,

      })
    )

    .sort(
      (a,b)=>
        b.total - a.total
    )

    .slice(
      0,
      5
    );









  const browsers =

    Object.entries(
      stats.browsers || {}
    )

    .map(
      ([name,total]) => ({

        name,

        total,

      })
    );









  return (


    <main

      className="
        min-h-screen
        bg-[#050505]
        p-8
        text-white
      "

    >



      <div

        className="
          mx-auto
          max-w-7xl
        "

      >









        <header

          className="
            mb-10
            flex
            items-start
            justify-between
            gap-6
          "

        >



          <div>


            <h1

              className="
                text-4xl
                font-bold
                tracking-tight
              "

            >

              Analytics


            </h1>





            <p

              className="
                mt-2
                text-zinc-400
              "

            >

              Analyse les performances de ton portfolio.


            </p>


          </div>








          <div

            className="
              relative
            "

          >



            <button

              onClick={() =>
                setOpenPeriod(
                  !openPeriod
                )
              }


              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-5
                py-3
                text-sm
                font-medium
                text-white
                transition
                duration-300
                hover:border-violet-500/50
                hover:bg-zinc-800
              "

            >


              <CalendarDays

                size={18}

                className="
                  text-violet-400
                "

              />



              <span>

                {getPeriodLabel()}

              </span>



              <ChevronDown

                size={16}

                className={`
                  text-zinc-400
                  transition
                  duration-300

                  ${
                    openPeriod
                      ?
                      "rotate-180"
                      :
                      ""
                  }
                `}

              />


            </button>







            {
              openPeriod && (


                <div

                  className="
                    absolute
                    right-0
                    z-50
                    mt-3
                    w-56
                    rounded-2xl
                    border
                    border-zinc-800
                    bg-zinc-950
                    p-2
                    shadow-xl
                    shadow-black/40
                  "

                >



                  {
                    [
                      {
                        label:"Aujourd'hui",
                        value:"today",
                      },

                      {
                        label:"7 derniers jours",
                        value:"7d",
                      },

                      {
                        label:"30 derniers jours",
                        value:"30d",
                      },

                      {
                        label:"Tout",
                        value:"all",
                      },

                    ]

                    .map(option => (


                      <button

                        key={
                          option.value
                        }


                        onClick={() => {


                          setPeriod(
                            option.value
                          );


                          setOpenPeriod(
                            false
                          );


                        }}


                        className={`
                          flex
                          w-full
                          rounded-xl
                          px-4
                          py-3
                          text-left
                          text-sm
                          transition
                          duration-200

                          ${
                            period === option.value

                              ?

                              "bg-violet-500/10 text-violet-400"

                              :

                              "text-zinc-300 hover:bg-zinc-800"
                          }
                        `}

                      >

                        {option.label}


                      </button>


                    ))

                  }



                </div>


              )

            }



          </div>






        </header>









        <section

          className="
            grid
            gap-6
            md:grid-cols-3
            xl:grid-cols-6
          "

        >



          <AnalyticsCard

            title="Visiteurs uniques"

            value={
              stats.visitors || 0
            }

            icon={Users}

          />





          <AnalyticsCard

            title="Visiteurs aujourd'hui"

            value={
              stats.visitorsToday || 0
            }

            icon={CalendarDays}

          />





          <AnalyticsCard

            title="Pages vues"

            value={
              stats.views || 0
            }

            icon={Eye}

          />





          <AnalyticsCard

            title="Sessions"

            value={
              stats.sessions || 0
            }

            icon={Activity}

          />





          <AnalyticsCard

            title="Pages / session"

            value={
              stats.pagesPerSession || 0
            }

            icon={Layers}

          />





          <AnalyticsCard

            title="Durée moyenne"

            value={
              formatDuration(
                stats.averageDuration
              )
            }

            icon={Clock}

          />



        </section>









        <div className="mt-8">


          <VisitsChart

            activity={
              stats.activity || []
            }

          />


        </div>









        <div

          className="
            mt-8
            grid
            gap-8
            lg:grid-cols-2
          "

        >



          <RecentVisits

            visits={
              stats.latestVisits || []
            }

          />





          <TopProjects

            projects={
              projects
            }

          />


        </div>









        <div

          className="
            mt-8
            grid
            gap-8
            lg:grid-cols-2
          "

        >



          <PopularPages

            pages={
              pages
            }

          />





          <BrowserStats

            browsers={
              browsers
            }

          />


        </div>









        <div

          className="
            mt-8
            grid
            gap-8
            lg:grid-cols-2
          "

        >



          <DeviceStats

            devices={
              stats.devices || {}
            }

          />





          <LocationStats

            locations={
              stats.locations || {}
            }

          />


        </div>






      </div>


    </main>


  );


}