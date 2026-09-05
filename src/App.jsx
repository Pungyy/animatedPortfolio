import {
  useEffect,
  useState,
} from "react";


import { useLocation } from "react-router-dom";


import Router from "./router";


import Loader from "./components/ui/Loader";


import MusicPlayer from "./components/ui/MusicPlayer";


import PageTracker from "./components/analytics/PageTracker";


import ScrollManager from "./components/common/ScrollManager";


import RoutePrefetcher from "./components/common/RoutePrefetcher";


import {
  updateSessionDuration,
  endSession,
} from "./services/analytics.service";





export default function App(){


  const { pathname } = useLocation();

  const isAdmin =
    pathname.startsWith("/admin");


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

        endSession();

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

      <ScrollManager />

      <PageTracker />

      <RoutePrefetcher />

      <Router />

      {/* Monté une seule fois, hors du Router : la musique ne se coupe
          plus quand on navigue entre les pages. Masqué sur l'admin. */}
      {!isAdmin && <MusicPlayer />}

    </>

  );


}