import {
  useEffect,
  useState,
} from "react";


import {
  Eye,
  Users,
  Activity,
} from "lucide-react";



import AnalyticsCard from "../../components/admin/analytics/AnalyticsCard";
import VisitsChart from "../../components/admin/analytics/VisitsChart";
import RecentVisits from "../../components/admin/analytics/RecentVisits";
import TopProjects from "../../components/admin/analytics/TopProjects";
import PopularPages from "../../components/admin/analytics/PopularPages";
import BrowserStats from "../../components/admin/analytics/BrowserStats";



import {
  getAnalytics,
} from "../../services/analytics.service";









export default function Analytics() {


  const [
    total,
    setTotal,
  ] = useState(0);



  const [
    today,
    setToday,
  ] = useState(0);



  const [
    uniqueVisitors,
    setUniqueVisitors,
  ] = useState(0);



  const [
    recent,
    setRecent,
  ] = useState([]);



  const [
    projects,
    setProjects,
  ] = useState([]);



  const [
    pages,
    setPages,
  ] = useState([]);



  const [
    browsers,
    setBrowsers,
  ] = useState([]);









  useEffect(()=>{


    async function loadAnalytics(){


      try{


        const data =
          await getAnalytics();





        setTotal(
          data.total
        );



        setToday(
          data.today
        );



        setRecent(
          data.visits
        );



        setProjects(
          data.projects
        );





        // visiteurs uniques

        const visitors =
          new Set(

            data.visits

              .map(
                visit =>
                  visit.visitor_id
              )

              .filter(Boolean)

          );



        setUniqueVisitors(
          visitors.size
        );







        // pages populaires

        const pagesCount = {};



        data.visits.forEach(
          visit => {


            const page =
              visit.page || "/";



            pagesCount[page] =
              (pagesCount[page] || 0) + 1;


          }
        );



        setPages(

          Object.entries(
            pagesCount
          )

          .map(
            ([page,total])=>({

              page,

              total,

            })
          )

          .sort(
            (a,b)=>
              b.total-a.total
          )

          .slice(0,5)

        );







        // navigateurs

        const browserCount = {};



        data.visits.forEach(
          visit=>{


            const browser =
              visit.browser || "Autre";



            browserCount[browser] =
              (browserCount[browser] || 0)+1;


          }
        );



        setBrowsers(

          Object.entries(
            browserCount
          )

          .map(
            ([name,total])=>({

              name,

              total,

            })
          )

        );





      }
      catch(error){


        console.error(
          "Analytics loading error:",
          error
        );


      }



    }





    loadAnalytics();



  },[]);













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





        <div

          className="
            mb-10
          "

        >

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
            grid
            gap-6
            md:grid-cols-3
          "

        >


          <AnalyticsCard

            title="Visites totales"

            value={total}

            icon={Eye}

          />




          <AnalyticsCard

            title="Aujourd'hui"

            value={today}

            icon={Activity}

          />




          <AnalyticsCard

            title="Visiteurs uniques"

            value={uniqueVisitors}

            icon={Users}

          />


        </div>









        <div className="mt-8">

          <VisitsChart

            visits={recent}

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

            visits={recent}

          />



          <TopProjects

            projects={projects}

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

            pages={pages}

          />



          <BrowserStats

            browsers={browsers}

          />


        </div>






      </div>


    </main>


  );


}