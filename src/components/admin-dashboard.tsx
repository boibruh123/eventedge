"use client";

import Image from "next/image";
import type { ReactElement, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  ExternalLink,
  Megaphone,
  Pencil,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Users
} from "lucide-react";
import { defaultAds } from "@/lib/ads";
import { CONTENT_KEYS } from "@/lib/content-store";
import { categories } from "@/lib/items";
import { formatCurrency } from "@/lib/scoring";
import type { AdPlacement, Difficulty, GameItem } from "@/lib/types";

const blankItem: GameItem = {
  id: "",
  image: "",
  title: "",
  category: categories[0] ?? "Electronics",
  price: 0,
  source: "",
  difficulty: "Easy"
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AdminDashboard({ items }: { items: GameItem[] }) {
  const [catalog, setCatalog] = useState(items);
  const [ads, setAds] = useState(defaultAds);
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [form, setForm] = useState<GameItem>(items[0] ?? blankItem);
  const [savedMessage, setSavedMessage] = useState("");
  const selectedAdCount = ads.filter((ad) => ad.active).length;

  const selectedItem = useMemo(
    () => catalog.find((item) => item.id === selectedId) ?? catalog[0],
    [catalog, selectedId]
  );

  useEffect(() => {
    const savedItems = window.localStorage.getItem(CONTENT_KEYS.items);
    const savedAds = window.localStorage.getItem(CONTENT_KEYS.ads);
    if (savedItems) {
      const parsed = JSON.parse(savedItems) as GameItem[];
      setCatalog(parsed);
      setSelectedId(parsed[0]?.id ?? "");
      setForm(parsed[0] ?? blankItem);
    }
    if (savedAds) setAds(JSON.parse(savedAds) as AdPlacement[]);
  }, []);

  useEffect(() => {
    if (selectedItem) setForm(selectedItem);
  }, [selectedItem]);

  async function publishItems(nextItems: GameItem[]) {
    setCatalog(nextItems);
    window.localStorage.setItem(CONTENT_KEYS.items, JSON.stringify(nextItems));
    window.dispatchEvent(new Event(CONTENT_KEYS.event));
    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: nextItems })
    }).catch(() => null);
    setSavedMessage("Player link updated with latest items.");
  }

  async function publishAds(nextAds: AdPlacement[]) {
    setAds(nextAds);
    window.localStorage.setItem(CONTENT_KEYS.ads, JSON.stringify(nextAds));
    window.dispatchEvent(new Event(CONTENT_KEYS.event));
    await fetch("/api/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ads: nextAds })
    }).catch(() => null);
    setSavedMessage("Player link updated with latest ads.");
  }

  function saveItem() {
    const item = {
      ...form,
      id: form.id || slugify(form.title) || `item-${Date.now()}`,
      price: Number(form.price)
    };
    const exists = catalog.some((entry) => entry.id === item.id);
    const nextItems = exists
      ? catalog.map((entry) => (entry.id === item.id ? item : entry))
      : [item, ...catalog];
    setSelectedId(item.id);
    publishItems(nextItems);
  }

  function newItem() {
    setSelectedId("");
    setForm({ ...blankItem, id: `item-${Date.now()}` });
  }

  function deleteItem(id: string) {
    const nextItems = catalog.filter((item) => item.id !== id);
    setSelectedId(nextItems[0]?.id ?? "");
    setForm(nextItems[0] ?? blankItem);
    publishItems(nextItems);
  }

  function updateAd(id: string, patch: Partial<AdPlacement>) {
    const nextAds = ads.map((ad) => (ad.id === id ? { ...ad, ...patch } : ad));
    publishAds(nextAds);
  }

  return (
    <main className="min-h-screen bg-night px-5 py-6 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <a href="/" className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
              Player site
            </a>
            <h1 className="text-4xl font-black">GuessThePrice Admin</h1>
            <p className="mt-2 text-slate-400">Edit items and ads. Saves update the player link automatically for this site.</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
              <a href="/terms" className="hover:text-primary">Terms</a>
              <a href="/privacy" className="hover:text-primary">Privacy</a>
              <a href="/disclaimer" className="hover:text-primary">Disclaimer</a>
              <a href="/copyright" className="hover:text-primary">Copyright</a>
            </div>
          </div>
          <a href="/" className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-primary px-4 font-black text-night">
            <ExternalLink className="h-4 w-4" />
            Open Player Link
          </a>
        </header>

        {savedMessage && (
          <div className="mb-5 rounded-[8px] border border-primary/30 bg-primary/10 p-3 text-sm font-bold text-primary">
            {savedMessage}
          </div>
        )}

        <section className="mb-5 grid gap-4 md:grid-cols-4">
          <Stat icon={<BarChart3 />} label="Daily active users" value="1,284" />
          <Stat icon={<Users />} label="Games completed" value="4,920" />
          <Stat icon={<Sparkles />} label="Live items" value={String(catalog.length)} />
          <Stat icon={<Megaphone />} label="Active ads" value={String(selectedAdCount)} />
        </section>

        <section className="grid gap-5 xl:grid-cols-[420px_1fr]">
          <div className="space-y-5">
            <div className="glass rounded-[8px] p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-primary">Item editor</p>
                  <h2 className="text-2xl font-black">{selectedId ? "Edit item" : "Create item"}</h2>
                </div>
                <button onClick={newItem} className="grid h-10 w-10 place-items-center rounded-[8px] bg-white/10" aria-label="New item">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <Field label="Item title">
                  <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="admin-input" placeholder="Exact item title" />
                </Field>
                <Field label="Exact photo URL">
                  <input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} className="admin-input" placeholder="https://..." />
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Category">
                    <input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="admin-input" list="categories" />
                  </Field>
                  <Field label="Difficulty">
                    <select value={form.difficulty} onChange={(event) => setForm({ ...form, difficulty: event.target.value as Difficulty })} className="admin-input">
                      {["Easy", "Medium", "Hard", "Insane"].map((difficulty) => (
                        <option key={difficulty}>{difficulty}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <datalist id="categories">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
                <Field label="Verified price">
                  <input value={form.price || ""} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} className="admin-input" inputMode="numeric" placeholder="999" />
                </Field>
                <Field label="Price source URL">
                  <input value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value })} className="admin-input" placeholder="https://..." />
                </Field>
                <button onClick={saveItem} className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-primary px-5 py-4 font-black text-night">
                  <Save className="h-4 w-4" />
                  Save Item
                </button>
              </div>
            </div>

            <div className="glass rounded-[8px] p-5">
              <p className="text-sm font-bold text-primary">Ad manager</p>
              <h2 className="mb-4 text-2xl font-black">Ad slots</h2>
              <div className="space-y-4">
                {ads.map((ad) => (
                  <div key={ad.id} className="rounded-[8px] border border-white/10 bg-white/5 p-3">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="font-bold">{ad.placement}</p>
                      <label className="flex items-center gap-2 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={ad.active}
                          onChange={(event) => updateAd(ad.id, { active: event.target.checked })}
                        />
                        Active
                      </label>
                    </div>
                    <input value={ad.headline} onChange={(event) => updateAd(ad.id, { headline: event.target.value })} className="admin-input mb-2" placeholder="Headline" />
                    <textarea value={ad.body} onChange={(event) => updateAd(ad.id, { body: event.target.value })} className="admin-input mb-2 min-h-20 py-3" placeholder="Ad copy" />
                    <div className="grid gap-2 sm:grid-cols-2">
                      <input value={ad.cta} onChange={(event) => updateAd(ad.id, { cta: event.target.value })} className="admin-input" placeholder="CTA" />
                      <input value={ad.href} onChange={(event) => updateAd(ad.id, { href: event.target.value })} className="admin-input" placeholder="Link" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-[8px] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-primary">Operations</p>
                <h2 className="text-3xl font-black">Item database</h2>
              </div>
              <Pencil className="h-8 w-8 text-accent" />
            </div>
            <div className="overflow-hidden rounded-[8px] border border-white/10">
              {catalog.map((item) => (
                <div key={item.id} className="grid gap-4 border-b border-white/10 p-4 last:border-b-0 sm:grid-cols-[72px_1fr_auto] sm:items-center">
                  <button onClick={() => setSelectedId(item.id)} className="relative h-16 w-20 overflow-hidden rounded-[8px] bg-white/10" aria-label={`Edit ${item.title}`}>
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                  </button>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.category} · {item.difficulty} · {formatCurrency(item.price)}</p>
                    <a href={item.source} target="_blank" rel="noreferrer" className="text-sm font-bold text-primary">
                      Verify price source
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedId(item.id)} className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/10 text-slate-300" aria-label={`Edit ${item.title}`}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteItem(item.id)} className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/10 text-slate-300" aria-label={`Delete ${item.title}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function Stat({ icon, label, value }: { icon: ReactElement; label: string; value: string }) {
  return (
    <div className="glass rounded-[8px] p-4">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10 text-primary">{icon}</div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-mono text-3xl font-black">{value}</p>
    </div>
  );
}
