"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSiteSettings } from "../lib/useSiteSettings";
import useApi from "../hooks/useApi";

export default function Hero() {
  const { publicGet, data, loading, error } = useApi();
  const { settings, hydrated } = useSiteSettings();

  // ✅ prevent multiple fetch (if publicGet reference changes)
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    publicGet("/hero");
  }, [publicGet]);

  // ✅ hero may be null before hydration; keep hooks consistent
  const hero = hydrated ? settings?.hero : null;

  // ✅ ALWAYS call hooks (no early return before this)
  const images = useMemo(() => hero?.images ?? [], [hero?.images]);
  const [idx, setIdx] = useState(0);

  // keep idx valid when images change
  useEffect(() => {
    if (idx >= images.length) setIdx(0);
  }, [images.length, idx]);

  // slider
  useEffect(() => {
    if (!hero?.enabled || images.length <= 1) return;

    const interval = Number(hero?.sliderIntervalMs) || 4000;

    const t = setInterval(() => {
      setIdx((v) => (v + 1) % images.length);
    }, interval);

    return () => clearInterval(t);
  }, [hero?.enabled, hero?.sliderIntervalMs, images.length]);

  const current = images.length ? images[idx] : null;

  const headline = data?.headline ?? hero?.headline ?? hero?.title ?? "";
  const subtitle = data?.subtitle ?? hero?.subtitle ?? "";

  // ✅ NOW it's safe to conditionally return (after all hooks)
  if (!hydrated) return null;
  if (!hero?.enabled) return null;

  return (
    <section className="relative">
      <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
        {current ? (
          <Image
            src={current}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-900" />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-4">
            <div className="max-w-2xl">
              {error ? (
                <p className="mb-3 text-sm text-white/80">
                  Failed to load hero content.
                </p>
              ) : null}

              <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
                {loading && !headline ? "Loading..." : headline}
              </h1>

              {subtitle ? (
                <p className="mt-4 text-base text-white/85 sm:text-lg">
                  {subtitle}
                </p>
              ) : null}

              <div className="mt-7 flex flex-wrap gap-3">
                {hero?.buttons?.viewProperties?.enabled && (
                  <Link
                    href={hero.buttons.viewProperties.href}
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-white/90"
                  >
                    {hero.buttons.viewProperties.label}
                  </Link>
                )}

                {hero?.buttons?.contactNow?.enabled && (
                  <Link
                    href={hero.buttons.contactNow.href}
                    className="rounded-xl border border-white/60 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    {hero.buttons.contactNow.label}
                  </Link>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-8 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIdx(i)}
                      className={`h-2.5 w-2.5 rounded-full ${
                        i === idx ? "bg-white" : "bg-white/40"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}