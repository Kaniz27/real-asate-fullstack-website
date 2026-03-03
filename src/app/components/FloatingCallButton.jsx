"use client";

import { useSiteSettings } from "../lib/useSiteSettings";

export default function FloatingCallButton() {
  const { settings, hydrated } = useSiteSettings();
  const cfg = hydrated ? settings.callButton : null;

  if (!cfg?.enabled) return null;

  return (
    <a
      href={`tel:${cfg.phone}`}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
      aria-label="Call now"
    >
      📞 {cfg.label}
    </a>
  );
}