import { useEffect } from "react";

import {
  endSession,
} from "../services/analytics.service";


export default function useAnalyticsSession(){


  useEffect(()=>{


    function handleVisibility(){


      if(
        document.visibilityState === "hidden"
      ){

        endSession();

      }


    }




    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );





    return ()=>{


      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );


    };


  },[]);


}