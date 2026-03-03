"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_SETTINGS } from "./defaultSettings";

const KEY = "REAL_ESTATE_SITE_SETTINGS_v1";

export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  const api = useMemo(() => {
    const save = (next) => {
      setSettings(next);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
    };

    return {
      settings,
      hydrated,
      reset: () => save(DEFAULT_SETTINGS),
      update: (updater) => {
        const next = typeof updater === "function" ? updater(settings) : updater;
        save(next);
      },
    };
  }, [settings, hydrated]);

  return api;
}