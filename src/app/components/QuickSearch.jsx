"use client";

import { useMemo, useState } from "react";
import { useSiteSettings } from "../lib/useSiteSettings";

export default function QuickSearch() {
  const { settings, hydrated } = useSiteSettings();
  const cfg = hydrated ? settings.quickSearch : null;

  const [form, setForm] = useState({
    location: "",
    type: "",
    price: "",
    status: "",
  });

  const locations = useMemo(() => cfg?.locations || [], [cfg]);
  const types = useMemo(() => cfg?.propertyTypes || [], [cfg]);
  const prices = useMemo(() => cfg?.priceRanges || [], [cfg]);
  const statuses = useMemo(() => cfg?.statuses || [], [cfg]);

  if (!cfg?.enabled) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    // এখানে চাইলে /properties এ querystring দিয়ে navigate করতে পারো
    alert(`Search:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <section className="-mt-16 relative z-10">
      <div className="mx-auto max-w-6xl px-4">
        <form
          onSubmit={onSubmit}
          className="grid gap-3 rounded-2xl border bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5"
        >
          <Select
            label="Location"
            value={form.location}
            onChange={(v) => setForm((s) => ({ ...s, location: v }))}
            options={locations}
          />
          <Select
            label="Property Type"
            value={form.type}
            onChange={(v) => setForm((s) => ({ ...s, type: v }))}
            options={types}
          />
          <Select
            label="Price Range"
            value={form.price}
            onChange={(v) => setForm((s) => ({ ...s, price: v }))}
            options={prices}
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(v) => setForm((s) => ({ ...s, status: v }))}
            options={statuses}
          />

          <div className="flex items-end">
            <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-xl border px-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}