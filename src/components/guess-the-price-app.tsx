"use client";

import Image from "next/image";
import type { ReactElement, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  BadgeDollarSign,
  BarChart3,
  CalendarDays,
  Car,
  Crown,
  Gamepad2,
  Gauge,
  LogIn,
  Pencil,
  Play,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Video,
  Wand2
} from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase";
import { categories, getDailyItems } from "@/lib/items";
import { formatCurrency, formatPercent, scoreGuess } from "@/lib/scoring";
import type { GameItem, LeaderboardEntry, RoundResult } from "@/lib/types";

type View = "home" | "play" | "leaderboard" | "admin" | "rooms";

type Props = {
  items: GameItem[];
  leaderboard: LeaderboardEntry[];
};

export function GuessThePriceApp({ items, leaderboard }: Props) {
  const dailyItems = useMemo(() => getDailyItems(new Date(), items), [items]);
  const [view, setView] = useState<View>("home");
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [player, setPlayer] = useState("Guest");
  const [roomCode, setRoomCode] = useState("PRICE-4821");
  const current = dailyItems[round];
  const latest = results[results.length - 1];
  const finalScore = results.reduce((sum, result) => sum + result.points, 0);
  const averageAccuracy = results.length
    ? results.reduce((sum, result) => sum + result.accuracy, 0) / results.length
    : 0;
  const finished = round >= dailyItems.length;

  function startGame() {
    setRound(0);
    setGuess("");
    setRevealed(false);
    setResults([]);
    setView("play");
  }

  function submitGuess() {
    if (!current || revealed) return;
    const numericGuess = Number(guess.replace(/,/g, ""));
    const { accuracy, points } = scoreGuess(current.price, numericGuess);
    setResults((previous) => [...previous, { item: current, guess: numericGuess, accuracy, points }]);
    setRevealed(true);
  }

  function nextRound() {
    setGuess("");
    setRevealed(false);
    setRound((value) => value + 1);
  }

  async function loginWithGoogle() {
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setPlayer("Guest Pro");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-night text-white">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5">
        <button
          className="flex items-center gap-3 text-left"
          onClick={() => setView("home")}
          aria-label="Go to home"
        >
          <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-primary text-night shadow-glow">
            <BadgeDollarSign className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-lg font-black leading-tight">GuessThePrice</span>
            <span className="block text-xs text-slate-400">Daily market-price game</span>
          </span>
        </button>
        <nav className="hidden items-center gap-2 md:flex">
          <NavButton active={view === "play"} onClick={startGame} icon={<Gamepad2 />}>
            Play
          </NavButton>
          <NavButton active={view === "leaderboard"} onClick={() => setView("leaderboard")} icon={<Trophy />}>
            Leaders
          </NavButton>
          <NavButton active={view === "rooms"} onClick={() => setView("rooms")} icon={<Users />}>
            Rooms
          </NavButton>
          <NavButton active={view === "admin"} onClick={() => setView("admin")} icon={<ShieldCheck />}>
            Admin
          </NavButton>
        </nav>
        <button
          onClick={loginWithGoogle}
          className="flex h-11 items-center gap-2 rounded-[8px] border border-white/10 bg-white/10 px-4 text-sm font-bold text-white transition hover:border-primary/50 hover:bg-primary/10"
        >
          <LogIn className="h-4 w-4" />
          {player}
        </button>
      </header>

      {view === "home" && (
        <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-8 px-5 pb-12 pt-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-[8px] border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-bold text-primary">
              <CalendarDays className="h-4 w-4" />
              Same 10 items for everyone today
            </div>
            <h1 className="text-balance text-5xl font-black tracking-normal sm:text-6xl lg:text-7xl">
              Guess real prices. Beat the market. Climb the board.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              A polished MVP for price-guessing rounds across houses, cars, watches, sneakers, trading
              cards, electronics, collectibles, and more. Every item carries a price reference so the
              game feels fair.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={startGame}
                className="flex h-14 items-center gap-3 rounded-[8px] bg-primary px-6 text-base font-black text-night shadow-glow transition hover:scale-[1.02]"
              >
                <Play className="h-5 w-5 fill-current" />
                Play Daily Challenge
              </button>
              <button
                onClick={() => setView("rooms")}
                className="flex h-14 items-center gap-3 rounded-[8px] border border-white/10 bg-white/10 px-6 text-base font-bold text-white transition hover:border-secondary/70 hover:bg-secondary/15"
              >
                <Users className="h-5 w-5" />
                Create Room
              </button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Metric icon={<Gauge />} label="10 rounds" value="Fast play" />
              <Metric icon={<Crown />} label="Top score" value="10,000" />
              <Metric icon={<Sparkles />} label="Sources" value="Verified" />
            </div>
          </div>
          <div className="glass relative overflow-hidden rounded-[8px] p-4 shadow-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
              <Image
                src={dailyItems[0].image}
                alt={dailyItems[0].title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/75 to-transparent p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  <Car className="h-4 w-4" />
                  Today&apos;s opener
                </div>
                <h2 className="text-3xl font-black">{dailyItems[0].title}</h2>
                <div className="mt-4 flex items-center justify-between rounded-[8px] bg-white/10 p-3">
                  <span className="text-sm text-slate-300">Your guess</span>
                  <span className="font-mono text-xl font-black text-accent">$?</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {view === "play" && (
        <section className="mx-auto w-full max-w-7xl px-5 pb-12">
          {finished ? (
            <FinalScore
              score={finalScore}
              accuracy={averageAccuracy}
              results={results}
              onReplay={startGame}
              onLeaderboard={() => setView("leaderboard")}
            />
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
              <div className="glass overflow-hidden rounded-[8px]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-primary">Round {round + 1} of 10</p>
                    <h2 className="text-2xl font-black">{current.title}</h2>
                  </div>
                  <span className="rounded-[8px] bg-secondary/25 px-3 py-2 text-sm font-bold text-purple-100">
                    {current.difficulty}
                  </span>
                </div>
                <div className="relative aspect-[16/10] min-h-[360px] overflow-hidden">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 70vw, 100vw"
                  />
                  <div className="absolute left-4 top-4 rounded-[8px] bg-night/100 px-3 py-2 text-sm font-bold">
                    {current.category}
                  </div>
                </div>
              </div>

              <aside className="glass rounded-[8px] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Current score</p>
                    <p className="font-mono text-4xl font-black text-primary">{finalScore}</p>
                  </div>
                  <Trophy className="h-10 w-10 text-accent" />
                </div>

                {!revealed ? (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-300" htmlFor="guess">
                      Enter market price
                    </label>
                    <div className="flex h-16 items-center rounded-[8px] border border-white/10 bg-white/10 px-4 focus-within:border-primary">
                      <span className="text-2xl font-black text-slate-400">$</span>
                      <input
                        id="guess"
                        inputMode="numeric"
                        className="price-input h-full w-full bg-transparent px-3 text-3xl font-black outline-none"
                        value={guess}
                        onChange={(event) => setGuess(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") submitGuess();
                        }}
                        placeholder="0"
                      />
                    </div>
                    <button
                      onClick={submitGuess}
                      className="flex h-14 w-full items-center justify-center gap-2 rounded-[8px] bg-primary px-5 py-4 font-black text-night transition hover:scale-[1.01]"
                    >
                      Submit Guess
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Reveal label="Actual price" value={formatCurrency(current.price)} tone="primary" />
                    <Reveal label="Your guess" value={formatCurrency(latest.guess || 0)} />
                    <Reveal label="Accuracy" value={formatPercent(latest.accuracy)} />
                    <Reveal label="Points earned" value={`+${latest.points}`} tone="accent" />
                    <a
                      href={current.source}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-[8px] border border-white/10 p-3 text-sm text-slate-300 transition hover:border-primary/50 hover:text-white"
                    >
                      Price reference source
                    </a>
                    <button
                      onClick={nextRound}
                      className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-accent px-5 py-4 font-black text-white transition hover:scale-[1.01]"
                    >
                      {round === 9 ? "See Final Score" : "Next Item"}
                    </button>
                  </div>
                )}

                <div className="mt-6 rounded-[8px] border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-300">
                    <Video className="h-4 w-4 text-accent" />
                    Rewarded video placeholder
                  </div>
                  <p className="text-sm leading-6 text-slate-400">
                    Future ad slot: earn one hint or one double-points round.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </section>
      )}

      {view === "leaderboard" && <Leaderboard leaderboard={leaderboard} />}
      {view === "rooms" && <Rooms roomCode={roomCode} setRoomCode={setRoomCode} />}
      {view === "admin" && <Admin items={items} />}
    </main>
  );
}

function NavButton({
  active,
  onClick,
  icon,
  children
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactElement;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-11 items-center gap-2 rounded-[8px] px-4 text-sm font-bold transition ${
        active ? "bg-primary text-night" : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function Metric({ icon, label, value }: { icon: ReactElement; label: string; value: string }) {
  return (
    <div className="glass rounded-[8px] p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[8px] bg-white/10 text-primary">
        {icon}
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-xl font-black">{value}</p>
    </div>
  );
}

function Reveal({ label, value, tone }: { label: string; value: string; tone?: "primary" | "accent" }) {
  return (
    <div className="flex items-center justify-between rounded-[8px] bg-white/10 p-4">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`font-mono text-xl font-black ${tone === "primary" ? "text-primary" : ""} ${tone === "accent" ? "text-accent" : ""}`}>
        {value}
      </span>
    </div>
  );
}

function FinalScore({
  score,
  accuracy,
  results,
  onReplay,
  onLeaderboard
}: {
  score: number;
  accuracy: number;
  results: RoundResult[];
  onReplay: () => void;
  onLeaderboard: () => void;
}) {
  return (
    <div className="glass mx-auto max-w-5xl rounded-[8px] p-5 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="mb-5 grid h-16 w-16 place-items-center rounded-[8px] bg-primary text-night">
            <Trophy className="h-9 w-9" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Daily complete</p>
          <h2 className="mt-2 text-5xl font-black">{score} points</h2>
          <p className="mt-3 text-slate-300">Average accuracy: {formatPercent(accuracy)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onReplay} className="flex items-center gap-2 rounded-[8px] bg-primary px-5 py-3 font-black text-night">
              <RefreshCw className="h-4 w-4" />
              Replay
            </button>
            <button onClick={onLeaderboard} className="flex items-center gap-2 rounded-[8px] border border-white/10 px-5 py-3 font-bold">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={result.item.id} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-[8px] bg-white/5 p-3">
              <span className="font-mono text-sm text-slate-500">{index + 1}</span>
              <div>
                <p className="font-bold">{result.item.title}</p>
                <p className="text-sm text-slate-400">{formatCurrency(result.item.price)} actual</p>
              </div>
              <span className="font-mono font-black text-primary">+{result.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Leaderboard({ leaderboard }: { leaderboard: LeaderboardEntry[] }) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 pb-12 lg:grid-cols-[1fr_340px]">
      <div className="glass rounded-[8px] p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">Global leaderboard</p>
            <h2 className="text-3xl font-black">Top players</h2>
          </div>
          <BarChart3 className="h-9 w-9 text-accent" />
        </div>
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <div key={entry.id} className="grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-3 rounded-[8px] bg-white/5 p-4">
              <span className="font-mono text-lg font-black text-primary">#{index + 1}</span>
              <span className="font-bold">{entry.player_name}</span>
              <span className="hidden text-sm text-slate-400 sm:block">{formatPercent(entry.accuracy)}</span>
              <span className="font-mono text-lg font-black">{entry.score}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <BoardCard title="Weekly" value="31,420" detail="Total points this week" />
        <BoardCard title="Monthly" value="128,900" detail="Total points this month" />
        <BoardCard title="Featured Daily" value="Sponsor slot" detail="Placeholder for paid challenge placement" />
      </div>
    </section>
  );
}

function BoardCard({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="glass rounded-[8px] p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
}

function Rooms({ roomCode, setRoomCode }: { roomCode: string; setRoomCode: (value: string) => void }) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 pb-12 lg:grid-cols-[420px_1fr]">
      <div className="glass rounded-[8px] p-5">
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-[8px] bg-secondary text-white">
          <Users className="h-7 w-7" />
        </div>
        <h2 className="text-3xl font-black">Private rooms</h2>
        <p className="mt-3 leading-7 text-slate-300">Invite friends, play the same item set, and sync scores live through Supabase Realtime when keys are configured.</p>
        <label className="mt-6 block text-sm font-bold text-slate-300" htmlFor="room">
          Room code
        </label>
        <input
          id="room"
          value={roomCode}
          onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
          className="mt-2 h-14 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 font-mono text-xl font-black outline-none focus:border-primary"
        />
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-[8px] bg-primary px-5 py-4 font-black text-night">
          <Plus className="h-4 w-4" />
          Create Room
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {["You", "Invite 1", "Invite 2"].map((name, index) => (
          <div key={name} className="glass rounded-[8px] p-5">
            <p className="text-sm text-slate-400">Player {index + 1}</p>
            <p className="mt-2 text-2xl font-black">{name}</p>
            <p className="mt-5 font-mono text-4xl font-black text-primary">{index === 0 ? "0" : "--"}</p>
            <p className="mt-2 text-sm text-slate-400">Live score</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Admin({ items }: { items: GameItem[] }) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 pb-12 lg:grid-cols-[360px_1fr]">
      <div className="glass rounded-[8px] p-5">
        <div className="mb-5 flex items-center gap-3">
          <Wand2 className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm font-bold text-primary">AI content engine</p>
            <h2 className="text-2xl font-black">Generate item</h2>
          </div>
        </div>
        <div className="space-y-3">
          <input className="h-12 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 outline-none focus:border-primary" placeholder="Item title" />
          <select className="h-12 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 outline-none focus:border-primary">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <input className="h-12 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 outline-none focus:border-primary" placeholder="Verified price" />
          <input className="h-12 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 outline-none focus:border-primary" placeholder="Source URL" />
          <button className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-primary px-5 py-4 font-black text-night">
            <Sparkles className="h-4 w-4" />
            Save Draft Item
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
          {items.slice(0, 8).map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-white/10 p-4 last:border-b-0">
              <div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-slate-400">{item.category} · {item.difficulty}</p>
              </div>
              <span className="hidden font-mono font-black text-primary sm:block">{formatCurrency(item.price)}</span>
              <button className="rounded-[8px] border border-white/10 px-3 py-2 text-sm font-bold text-slate-300">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
