"use client";

import { useSiteSettings } from "../lib/useSiteSettings";

export default function WhyChooseUs() {
  const { settings, hydrated } = useSiteSettings();
  const cfg = hydrated ? settings.whyChooseUs : null;

  if (!cfg?.enabled) return null;

  return (
    <section className="py-14 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Why Choose Us</h2>
        <p className="mt-1 text-sm text-slate-600">
          Simple, transparent, and fast.
        </p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cfg.features.map((f, i) => (
            <div key={i} className="rounded-2xl border bg-white p-5">
              <div className="text-2xl">{f.icon}</div>
              <div className="mt-3 font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}