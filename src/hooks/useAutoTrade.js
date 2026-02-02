import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "autoTradeSettings";
const DEFAULT_SETTINGS = {
  enabled: true,
  trend: "rising",
};

export const getAutoTradeSettings = () => {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const setAutoTradeSettings = (nextSettings) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings));
};

export const useAutoTrade = () => {
  const [settings, setSettings] = useState(getAutoTradeSettings());

  const updateSettings = useCallback((partial) => {
    const next = { ...settings, ...partial };
    setSettings(next);
    setAutoTradeSettings(next);
  }, [settings]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        setSettings(getAutoTradeSettings());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isFrozen = settings.enabled && settings.trend === "falling";

  return {
    settings,
    updateSettings,
    isFrozen,
  };
};
