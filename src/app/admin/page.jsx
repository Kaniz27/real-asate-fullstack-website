"use client";

import { useState } from "react";
import { useSiteSettings } from "../../lib/useSiteSettings";

export default function AdminPage() {
  const { settings, hydrated, update, reset } = useSiteSettings();
  const [newImage, setNewImage] = useState("");

  if (!hydrated) {
    return <div className="mx-auto max-w-3xl px-4 py-10">Loading settings…</div>;
  }

  const hero = settings.hero;

  const setHero = (patch) =>
    update((s) => ({ ...s, hero: { ...s.hero, ...patch } }));

  const setCall = (patch) =>
    update((s) => ({ ...s, callButton: { ...s.callButton, ...patch } }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={reset}
          className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Reset Default
        </button>
      </div>

      {/* HERO CONTROLS */}
      <section className="mt-8 rounded-2xl border bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Hero Controls</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={hero.enabled}
              onChange={(e) => setHero({ enabled: e.target.checked })}
            />
            Enable Hero
          </label>
        </div>

        <div className="mt-4 grid gap-4">
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Headline</span>
            <input
              value={hero.headline}
              onChange={(e) => setHero({ headline: e.target.value })}
              className="h-11 rounded-xl border px-3 text-sm"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Subtitle</span>
            <textarea
              value={hero.subtitle}
              onChange={(e) => setHero({ subtitle: e.target.value })}
              className="min-h-[90px] rounded-xl border px-3 py-2 text-sm"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">View Properties Button</div>
                <input
                  type="checkbox"
                  checked={hero.buttons.viewProperties.enabled}
                  onChange={(e) =>
                    setHero({
                      buttons: {
                        ...hero.buttons,
                        viewProperties: {
                          ...hero.buttons.viewProperties,
                          enabled: e.target.checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="mt-3 grid gap-2">
                <input
                  value={hero.buttons.viewProperties.label}
                  onChange={(e) =>
                    setHero({
                      buttons: {
                        ...hero.buttons,
                        viewProperties: {
                          ...hero.buttons.viewProperties,
                          label: e.target.value,
                        },
                      },
                    })
                  }
                  className="h-10 rounded-lg border px-3 text-sm"
                  placeholder="Label"
                />
                <input
                  value={hero.buttons.viewProperties.href}
                  onChange={(e) =>
                    setHero({
                      buttons: {
                        ...hero.buttons,
                        viewProperties: {
                          ...hero.buttons.viewProperties,
                          href: e.target.value,
                        },
                      },
                    })
                  }
                  className="h-10 rounded-lg border px-3 text-sm"
                  placeholder="Link (href)"
                />
              </div>
            </div>

            <div className="rounded-xl border p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Contact Now Button</div>
                <input
                  type="checkbox"
                  checked={hero.buttons.contactNow.enabled}
                  onChange={(e) =>
                    setHero({
                      buttons: {
                        ...hero.buttons,
                        contactNow: {
                          ...hero.buttons.contactNow,
                          enabled: e.target.checked,
                        },
                      },
                    })
                  }
                />
              </div>
              <div className="mt-3 grid gap-2">
                <input
                  value={hero.buttons.contactNow.label}
                  onChange={(e) =>
                    setHero({
                      buttons: {
                        ...hero.buttons,
                        contactNow: {
                          ...hero.buttons.contactNow,
                          label: e.target.value,
                        },
                      },
                    })
                  }
                  className="h-10 rounded-lg border px-3 text-sm"
                  placeholder="Label"
                />
                <input
                  value={hero.buttons.contactNow.href}
                  onChange={(e) =>
                    setHero({
                      buttons: {
                        ...hero.buttons,
                        contactNow: {
                          ...hero.buttons.contactNow,
                          href: e.target.value,
                        },
                      },
                    })
                  }
                  className="h-10 rounded-lg border px-3 text-sm"
                  placeholder="Link (href)"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-3">
            <div className="text-sm font-semibold">Hero Images</div>

            <div className="mt-3 flex gap-2">
              <input
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="h-10 flex-1 rounded-lg border px-3 text-sm"
                placeholder="Paste image URL (https://...)"
              />
              <button
                onClick={() => {
                  if (!newImage.trim()) return;
                  setHero({ images: [...hero.images, newImage.trim()] });
                  setNewImage("");
                }}
                className="rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white"
              >
                Add
              </button>
            </div>

            <div className="mt-3 grid gap-2">
              {hero.images.map((url, i) => (
                <div key={i} className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2">
                  <div className="truncate text-xs text-slate-700">{url}</div>
                  <button
                    onClick={() =>
                      setHero({ images: hero.images.filter((_, idx) => idx !== i) })
                    }
                    className="rounded-lg border px-3 py-1 text-xs font-semibold hover:bg-slate-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALL BUTTON CONTROLS */}
      <section className="mt-6 rounded-2xl border bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Call Button</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={settings.callButton.enabled}
              onChange={(e) => setCall({ enabled: e.target.checked })}
            />
            Enable
          </label>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Phone</span>
            <input
              value={settings.callButton.phone}
              onChange={(e) => setCall({ phone: e.target.value })}
              className="h-11 rounded-xl border px-3 text-sm"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-600">Label</span>
            <input
              value={settings.callButton.label}
              onChange={(e) => setCall({ label: e.target.value })}
              className="h-11 rounded-xl border px-3 text-sm"
            />
          </label>
        </div>
      </section>

      <p className="mt-6 text-sm text-slate-600">
        Note: এই Admin Panel এখন localStorage এ save হয়। Production এ DB/API দিলে multi-admin কাজ করবে।
      </p>
    </div>
  );
}