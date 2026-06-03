"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { ArrowLeft, BarChart3, ExternalLink, Pencil, Plus, Sparkles, Trash2, Users, Wand2 } from "lucide-react";
import { categories } from "@/lib/items";
import { formatCurrency } from "@/lib/scoring";
import type { GameItem } from "@/lib/types";

export function AdminDashboard({ items }: { items: GameItem[] }) {
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
            <p className="mt-2 text-slate-400">Manage game items, ad placements, daily challenges, and leaderboard health.</p>
          </div>
          <a
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-primary px-4 font-black text-night"
          >
            <ExternalLink className="h-4 w-4" />
            Open Player Link
          </a>
        </header>

        <section className="mb-5 grid gap-4 md:grid-cols-4">
          <Stat icon={<BarChart3 />} label="Daily active users" value="1,284" />
          <Stat icon={<Users />} label="Games completed" value="4,920" />
          <Stat icon={<Sparkles />} label="Live items" value={String(items.length)} />
          <Stat icon={<Pencil />} label="Ad slots" value="6" />
        </section>

        <section className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <div className="glass rounded-[8px] p-5">
            <div className="mb-5 flex items-center gap-3">
              <Wand2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-bold text-primary">Content engine</p>
                <h2 className="text-2xl font-black">Create item</h2>
              </div>
            </div>
            <div className="space-y-3">
              <input className="h-12 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 outline-none focus:border-primary" placeholder="Exact item title" />
              <input className="h-12 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 outline-none focus:border-primary" placeholder="Exact photo URL" />
              <select className="h-12 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 outline-none focus:border-primary">
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <input className="h-12 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 outline-none focus:border-primary" placeholder="Verified price" />
              <input className="h-12 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 outline-none focus:border-primary" placeholder="Price source URL" />
              <button className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-primary px-5 py-4 font-black text-night">
                <Plus className="h-4 w-4" />
                Add Item
              </button>
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
              {items.map((item) => (
                <div key={item.id} className="grid gap-4 border-b border-white/10 p-4 last:border-b-0 sm:grid-cols-[72px_1fr_auto] sm:items-center">
                  <div className="relative h-16 w-20 overflow-hidden rounded-[8px] bg-white/10">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.category} · {item.difficulty} · {formatCurrency(item.price)}</p>
                    <a href={item.source} target="_blank" rel="noreferrer" className="text-sm font-bold text-primary">
                      Verify price source
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <button className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/10 text-slate-300" aria-label={`Edit ${item.title}`}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/10 text-slate-300" aria-label={`Delete ${item.title}`}>
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

function Stat({ icon, label, value }: { icon: ReactElement; label: string; value: string }) {
  return (
    <div className="glass rounded-[8px] p-4">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10 text-primary">{icon}</div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-mono text-3xl font-black">{value}</p>
    </div>
  );
}
