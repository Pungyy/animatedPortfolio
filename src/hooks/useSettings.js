import { useEffect, useState } from "react";
import { getSettings } from "../services/settings.service";

export default function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return {
    settings,
    loading,
    error,
  };
}