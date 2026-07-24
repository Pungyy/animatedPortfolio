import {
  useEffect,
  useState,
} from "react";


import Router from "./router";


import Loader from "./components/ui/Loader";


import PageTracker from "./components/analytics/PageTracker";


import {
  updateSessionDuration,
  endSession,
} from "./services/analytics.service";





export default function App(){


  const [
    loading,
    setLoading,
  ] = useState(true);






  useEffect(()=>{


    const timer = setTimeout(()=>{

      setLoading(false);

    },1500);







    const interval = setInterval(()=>{


      updateSessionDuration();


    },10000);








    const handleExit = ()=>{


      endSession();


    };





    const handleVisibility = ()=>{


      if(
        document.visibilityState === "hidden"
      ){

        updateSessionDuration();

      }


    };







    window.addEventListener(
      "pagehide",
      handleExit
    );



    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );







    return ()=>{


      clearTimeout(
        timer
      );


      clearInterval(
        interval
      );



      window.removeEventListener(
        "pagehide",
        handleExit
      );



      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );


    };


  },[]);







  if(loading){

    return <Loader />;

  }







  return (

    <>

      <PageTracker />

      <Router />

    </>

  );


}