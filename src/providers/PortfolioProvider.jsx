import { useEffect, useState } from "react";

import PortfolioContext from "../contexts/PortfolioContext";

import { getSettings } from "../services/settings.service";
import { getProjects } from "../services/projects.service";
import { getExperiences } from "../services/experiences.service";
import { getTechnologies } from "../services/technologies.service";



export default function PortfolioProvider({
  children,
}) {


  const [settings, setSettings] = useState(null);

  const [projects, setProjects] = useState([]);

  const [experiences, setExperiences] = useState([]);

  const [technologies, setTechnologies] = useState([]);



  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);




  useEffect(() => {


    async function loadPortfolio() {


      try {


        const [
          settingsData,
          projectsData,
          experiencesData,
          technologiesData,
        ] = await Promise.all([

          getSettings(),

          getProjects(),

          getExperiences(),

          getTechnologies(),

        ]);




        setSettings(settingsData);

        setProjects(projectsData);

        setExperiences(experiencesData);

        setTechnologies(technologiesData);



      } catch (err) {


        console.error(
          "Portfolio loading error :",
          err
        );


        setError(err);



      } finally {


        setLoading(false);


      }


    }



    loadPortfolio();


  }, []);






  const value = {

    settings,

    projects,

    experiences,

    technologies,

    loading,

    error,

  };






  return (

    <PortfolioContext.Provider
      value={value}
    >

      {children}

    </PortfolioContext.Provider>

  );

}