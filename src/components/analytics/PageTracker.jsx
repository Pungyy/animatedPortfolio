import {
  useLocation,
} from "react-router-dom";


import useAnalytics from "../../hooks/useAnalytics";

import useProjectAnalytics from "../../hooks/useProjectAnalytics";





export default function PageTracker(){


  const location =
    useLocation();



  const path =
    location.pathname;





  const isAdmin =
    path.startsWith("/admin");






  let slug = null;



  if(
    path.startsWith("/project/")
  ){

    slug =
      path.split("/")[2];

  }






  const projectId =
    useProjectAnalytics(
      isAdmin ? null : slug
    );







  useAnalytics(

    isAdmin
      ?
      null
      :
      path,

    projectId

  );







  return null;


}