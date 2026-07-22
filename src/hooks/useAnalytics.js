import {
  useEffect,
} from "react";


import {
  trackEvent,
} from "../services/analytics.service";






export default function useAnalytics(
  page,
  project_id = null
) {


  useEffect(() => {


    // Empêche les événements vides
    if (!page) return;



    trackEvent({

      event_type:
        "page_view",


      page,


      project_id,


    });



  }, [
    page,
    project_id,
  ]);


}