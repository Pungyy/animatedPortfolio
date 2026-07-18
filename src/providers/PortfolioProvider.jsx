import { useEffect, useState } from "react";

import PortfolioContext from "../contexts/PortfolioContext";

import { getSettings } from "../services/settings.service";
import { getProjects } from "../services/projects.service";
import { getExperiences } from "../services/experiences.service";
import { getTechnologies } from "../services/technologies.service";
import { getSkills } from "../services/skills.service";



export default function PortfolioProvider({
  children,
}) {


  const [settings, setSettings] = useState(null);

  const [projects, setProjects] = useState([]);

  const [experiences, setExperiences] = useState([]);

  const [technologies, setTechnologies] = useState([]);

  const [skills, setSkills] = useState([]);


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
          skillsData,
        ] = await Promise.all([

          getSettings(),

          getProjects(),

          getExperiences(),

          getTechnologies(),

          getSkills()

        ]);




        setSettings(settingsData);

        setProjects(projectsData);

        setExperiences(experiencesData);

        setTechnologies(technologiesData);

        setSkills(skillsData);



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

    skills,

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