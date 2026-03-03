"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { User, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [propOpen, setPropOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const propRef = useRef(null);
  const authRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (propRef.current && !propRef.current.contains(e.target)) setPropOpen(false);
      if (authRef.current && !authRef.current.contains(e.target)) setAuthOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  const propertyItems = useMemo(
    () => [
      { label: "Ready", href: "/properties?status=ready" },
      { label: "Completed", href: "/properties?status=completed" },
      { label: "Upcoming", href: "/properties?status=upcoming" },
      { label: "Ongoing", href: "/properties?status=ongoing" },
    ],
    []
  );

  // ✅ Put your logo in /public/logo.png
  const logoUrl = "/logo.png";

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-xl border bg-white shadow-sm">
            <Image src={logoUrl} alt="Logo" fill className="object-contain p-1" priority />
          </div>
          <span className="text-lg font-semibold text-black">Brand</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-black transition hover:text-blue-600"
            >
              {l.label}
            </Link>
          ))}

          {/* Properties Dropdown */}
          <div className="relative" ref={propRef}>
            <button
              type="button"
              onClick={() => {
                setPropOpen((s) => !s);
                setAuthOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-medium text-black hover:text-blue-600"
            >
              Properties <ChevronDown size={16} />
            </button>

            {propOpen && (
              <div className="absolute left-0 mt-3 w-52 rounded-xl border bg-white shadow-lg">
                <div className="p-2">
                  {propertyItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setPropOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-black hover:bg-gray-100 hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Auth Dropdown */}
          <div className="relative" ref={authRef}>
            <button
              type="button"
              onClick={() => {
                setAuthOpen((s) => !s);
                setPropOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-black px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              <User size={18} />
              Login
            </button>

            {authOpen && (
              <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-xl border bg-white shadow-lg">
                <Link
                  href="/signin"
                  onClick={() => setAuthOpen(false)}
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-blue-600"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setAuthOpen(false)}
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-blue-600"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          className="md:hidden rounded-lg border border-black px-3 py-2 text-sm text-black"
          onClick={() => setMobileOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col gap-2 px-4 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-black hover:bg-gray-100"
              >
                {l.label}
              </Link>
            ))}

            {/* Mobile Properties */}
            <div className="mt-2 rounded-lg border">
              <button
                type="button"
                className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium"
                onClick={() => setPropOpen((s) => !s)}
              >
                Properties <ChevronDown size={16} />
              </button>
              {propOpen && (
                <div className="px-2 pb-2">
                  {propertyItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setMobileOpen(false);
                        setPropOpen(false);
                      }}
                      className="block rounded-lg px-3 py-2 text-sm text-black hover:bg-gray-100"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Auth */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/signin"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-black px-3 py-2 text-center text-sm text-black hover:bg-black hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border px-3 py-2 text-center text-sm text-black hover:bg-gray-100"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}