"use client";

import Link from "next/link";
import { useState } from "react";
import { useSiteSettings } from "../lib/useSiteSettings";

export default function Navbar() {
  const { settings, hydrated } = useSiteSettings();
  const [open, setOpen] = useState(false);

  const brand = hydrated ? settings.navbar.brand : "Brand";
  const links = hydrated ? settings.navbar.links : [];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-blue tracking-tight">
          {brand}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
          >
            Admin
          </Link>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}