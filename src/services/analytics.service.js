import { supabase } from "../lib/supabase";


function getVisitorId(){


  let visitorId =
    localStorage.getItem(
      "visitor_id"
    );



  if(!visitorId){


    visitorId =
      crypto.randomUUID();



    localStorage.setItem(
      "visitor_id",
      visitorId
    );


  }



  return visitorId;

}







export async function trackEvent({

  event_type,

  page,

  project_id = null,

}) {


  try {


    const {
      error,
    } = await supabase

      .from("analytics_events")

      .insert({


        event_type,


        page,


        project_id,


        visitor_id:
          getVisitorId(),



        referrer:
          document.referrer || null,



        user_agent:
          navigator.userAgent,



        browser:
          getBrowser(),



        device:
          getDevice(),


      });





    if(error)
      throw error;



  } catch(error) {


    console.error(
      "Analytics tracking error:",
      error
    );


  }


}


export async function getAnalytics(){


  const {
    data: events,
    error,
  } = await supabase

    .from("analytics_events")

    .select("*")

    .order(
      "created_at",
      {
        ascending:false,
      }
    );





  if(error){

    console.error(
      "Analytics error:",
      error
    );

    throw error;

  }









  const projectIds = [

    ...new Set(

      events

        .map(
          event =>
            event.project_id
        )

        .filter(Boolean)

    )

  ];









  let projects = [];





  if(projectIds.length){


    const {
      data,
      error,
    } = await supabase


      .from("projects")


      .select(
        "id,title,slug"
      )


      .in(
        "id",
        projectIds
      );





    if(error)
      throw error;



    projects = data || [];

  }









  /*
    Ajout du nombre de vues
  */


  const projectsWithViews =

    projects.map(project => ({


      ...project,


      total:

        events.filter(

          event =>

            event.project_id === project.id

        ).length



    }))

    .sort(

      (a,b)=>

        b.total - a.total

    );












  const visits = events.map(

    event => ({


      ...event,


      project:

        projects.find(

          project =>

            project.id === event.project_id

        ) || null


    })

  );









  return {


    visits,


    total:
      events.length,



    today:


      events.filter(

        event =>

          new Date(
            event.created_at
          )
          .toDateString()

          ===

          new Date()
          .toDateString()

      ).length,




    projects:
      projectsWithViews,


  };


}

function getBrowser(){


  const ua =
    navigator.userAgent;



  if(
    ua.includes("Chrome")
  )
    return "Chrome";



  if(
    ua.includes("Firefox")
  )
    return "Firefox";



  if(
    ua.includes("Safari")
  )
    return "Safari";



  return "Autre";


}







function getDevice(){


  const width =
    window.innerWidth;



  if(width < 768)

    return "Mobile";



  if(width < 1200)

    return "Tablet";



  return "Desktop";


}