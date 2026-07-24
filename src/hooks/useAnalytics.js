import {
  useEffect,
  useRef,
} from "react";


import {
  trackEvent,
} from "../services/analytics.service";





export default function useAnalytics(
  page,
  project_id = null
) {


  const lastPage =
    useRef(null);






  useEffect(() => {


    if(!page)
      return;



    // évite le double appel React StrictMode
    if(lastPage.current === page)
      return;




    lastPage.current = page;






    trackEvent({

      event_type:
        "page_view",

      page,

      project_id,

    });





  },[
    page,
    project_id,
  ]);



}