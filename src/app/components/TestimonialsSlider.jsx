"use client";

import { useEffect, useState } from "react";
import { useSiteSettings } from "../lib/useSiteSettings";

export default function TestimonialsSlider() {
  const { settings, hydrated } = useSiteSettings();
  const cfg = hydrated ? settings.testimonials : null;

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!cfg?.enabled || (cfg.items?.length || 0) <= 1) return;
    const t = setInterval(() => {
      setIdx((v) => (v + 1) % cfg.items.length);
    }, 4500);
    return () => clearInterval(t);
  }, [cfg?.enabled, cfg?.items?.length]);

  if (!cfg?.enabled) return null;

  const item = cfg.items[idx];

  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <p className="mt-1 text-sm text-slate-600">What our clients say.</p>

        <div className="mt-7 rounded-2xl border bg-white p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-lg font-semibold">{item.name}</div>
              <div className="mt-1 text-sm text-slate-600">
                {"★".repeat(item.rating)}{" "}
                <span className="text-slate-300">
                  {"★".repeat(Math.max(0, 5 - item.rating))}
                </span>
              </div>
              <p className="mt-4 text-slate-700">{item.comment}</p>
            </div>

            <div className="hidden sm:flex gap-2">
              {cfg.items.map((_, i) => (
                <button
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-slate-900" : "bg-slate-300"}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() => setIdx((v) => (v - 1 + cfg.items.length) % cfg.items.length)}
              className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Prev
            </button>
            <button
              onClick={() => setIdx((v) => (v + 1) % cfg.items.length)}
              className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}