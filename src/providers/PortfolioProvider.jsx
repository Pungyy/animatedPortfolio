import { useEffect, useState } from "react";

import PortfolioContext from "../contexts/PortfolioContext";

import { getSettings } from "../services/settings.service";
import { getProjects } from "../services/projects.service";

export default function PortfolioProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const [settingsData, projectsData] = await Promise.all([
          getSettings(),
          getProjects(),
        ]);

        setSettings(settingsData);
        setProjects(projectsData);
      } catch (err) {
        console.error(err);
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
    loading,
    error,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}