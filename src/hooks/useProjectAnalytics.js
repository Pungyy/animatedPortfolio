import {
  useEffect,
  useState
} from "react";


import {
  supabase
} from "../lib/supabase";



export default function useProjectAnalytics(
  slug
){

  const [
    projectId,
    setProjectId
  ] = useState(null);



  useEffect(()=>{


    if(!slug)
      return;


    async function loadProject(){


      const {
        data
      } =
      await supabase

      .from("projects")

      .select("id")

      .eq(
        "slug",
        slug
      )

      .single();



      if(data){

        setProjectId(
          data.id
        );

      }


    }


    loadProject();


  },[slug]);



  return projectId;

}