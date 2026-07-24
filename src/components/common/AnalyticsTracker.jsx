import {
  useLocation,
} from "react-router-dom";


import {
  useEffect,
} from "react";


import {
  trackEvent,
} from "../../services/analytics.service";




export default function AnalyticsTracker(){


  const location =
    useLocation();




  useEffect(()=>{


    trackEvent({

      event_type:
        "page_view",

      page:
        location.pathname,

    });



  },[
    location.pathname
  ]);



  return null;

}