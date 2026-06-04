"use client";

import Image from "next/image";
import type { ReactElement, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  BadgeDollarSign,
  BarChart3,
  CalendarDays,
  Car,
  Crown,
  Gamepad2,
  Gauge,
  LogIn,
  Megaphone,
  Play,
  Plus,
  Sparkles,
  Trophy,
  Users,
  Video
} from "lucide-react";
import { defaultAds } from "@/lib/ads";
import { CONTENT_KEYS } from "@/lib/content-store";
import { getDailyItems } from "@/lib/items";
import { formatCurrency, formatPercent, scoreGuess } from "@/lib/scoring";
import type { AdPlacement, GameItem, LeaderboardEntry, RoundResult } from "@/lib/types";

type View = "home" | "play" | "leaderboard" | "rooms";
type GameMode = "daily" | "multiplayer";
type RoomPlayer = {
  id: string;
  name: string;
  score: number;
};

type RoomState = {
  code: string;
  status: "waiting" | "playing" | "complete";
  players: RoomPlayer[];
};

type Props = {
  items: GameItem[];
  leaderboard: LeaderboardEntry[];
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function lockKey(date = todayKey()) {
  return `guesstheprice:daily:${date}`;
}

function leaderboardKey(date = todayKey()) {
  return `guesstheprice:leaderboard:${date}`;
}

function roomKey(code: string) {
  return `guesstheprice:room:${code.trim().toUpperCase()}`;
}

function makeRoomCode() {
  return `PRICE-${Math.floor(1000 + Math.random() * 9000)}`;
}

function roomChannel() {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) return null;
  return new BroadcastChannel("guesstheprice:rooms");
}

export function GuessThePriceApp({ items, leaderboard }: Props) {
  const date = todayKey();
  const [catalog, setCatalog] = useState(items);
  const [ads, setAds] = useState(defaultAds);
  const dailyItems = useMemo(() => getDailyItems(new Date(), catalog), [catalog]);
  const [view, setView] = useState<View>("home");
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [player, setPlayer] = useState("Guest");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dailyComplete, setDailyComplete] = useState(false);
  const [localLeaders, setLocalLeaders] = useState<LeaderboardEntry[]>([]);
  const [roomCode, setRoomCode] = useState("PRICE-4821");
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState<RoomState | null>(null);
  const [roomMessage, setRoomMessage] = useState("");
  const [roomPlayerId, setRoomPlayerId] = useState("");
  const [gameMode, setGameMode] = useState<GameMode>("daily");
  const gameItems = dailyItems;
  const current = gameItems[round];
  const latest = results[results.length - 1];
  const finalScore = results.reduce((sum, result) => sum + result.points, 0);
  const averageAccuracy = results.length
    ? results.reduce((sum, result) => sum + result.accuracy, 0) / results.length
    : 0;
  const finished = round >= gameItems.length;
  const board = [...localLeaders, ...leaderboard].sort((a, b) => b.score - a.score);

  const adByPlacement = (placement: string) =>
    ads.find((ad) => ad.placement === placement && ad.active) ??
    defaultAds.find((ad) => ad.placement === placement && ad.active);

  useEffect(() => {
    const savedLeaders = window.localStorage.getItem(leaderboardKey(date));
    if (savedLeaders) setLocalLeaders(JSON.parse(savedLeaders) as LeaderboardEntry[]);

    const saved = window.localStorage.getItem(lockKey(date));
    if (saved) {
      setDailyComplete(true);
      const parsed = JSON.parse(saved) as LeaderboardEntry;
      if (parsed.player_name !== "Pending") {
        setSubmitted(true);
        setPlayer(parsed.player_name);
      }
    }
  }, [date]);

  useEffect(() => {
    async function loadContent() {
      const savedItems = window.localStorage.getItem(CONTENT_KEYS.items);
      const savedAds = window.localStorage.getItem(CONTENT_KEYS.ads);

      if (savedItems) setCatalog(JSON.parse(savedItems) as GameItem[]);
      if (savedAds) setAds(JSON.parse(savedAds) as AdPlacement[]);

      const [itemsResponse, adsResponse] = await Promise.allSettled([fetch("/api/items"), fetch("/api/ads")]);

      if (itemsResponse.status === "fulfilled" && itemsResponse.value.ok && !savedItems) {
        const payload = await itemsResponse.value.json();
        if (Array.isArray(payload.items)) setCatalog(payload.items);
      }

      if (adsResponse.status === "fulfilled" && adsResponse.value.ok && !savedAds) {
        const payload = await adsResponse.value.json();
        if (Array.isArray(payload.ads)) setAds(payload.ads);
      }
    }

    function syncFromStorage(event?: StorageEvent) {
      if (event && event.key && event.key !== CONTENT_KEYS.items && event.key !== CONTENT_KEYS.ads) return;
      const savedItems = window.localStorage.getItem(CONTENT_KEYS.items);
      const savedAds = window.localStorage.getItem(CONTENT_KEYS.ads);
      if (savedItems) setCatalog(JSON.parse(savedItems) as GameItem[]);
      if (savedAds) setAds(JSON.parse(savedAds) as AdPlacement[]);
    }

    const contentHandler = () => syncFromStorage();
    loadContent();
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener(CONTENT_KEYS.event, contentHandler);
    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener(CONTENT_KEYS.event, contentHandler);
    };
  }, []);

  useEffect(() => {
    if (gameMode !== "daily" || !finished || dailyComplete || results.length !== gameItems.length) return;

    const pendingEntry: LeaderboardEntry = {
      id: `local-${date}`,
      player_name: "Pending",
      score: finalScore,
      accuracy: Number(averageAccuracy.toFixed(1)),
      mode: "daily",
      created_at: date
    };

    window.localStorage.setItem(lockKey(date), JSON.stringify(pendingEntry));
    setDailyComplete(true);
  }, [averageAccuracy, dailyComplete, date, finalScore, finished, gameItems.length, gameMode, results.length]);

  useEffect(() => {
    if (!room) return;
    const activeRoomKey = roomKey(room.code);
    const channel = roomChannel();

    function applyRoomUpdate(nextRoom: RoomState) {
      setRoom(nextRoom);
      if (nextRoom.status === "playing" && gameMode !== "multiplayer") {
        setRound(0);
        setGuess("");
        setRevealed(false);
        setResults([]);
        setSubmitted(false);
        setGameMode("multiplayer");
        setView("play");
        setRoomMessage(`Room ${nextRoom.code} started.`);
      }
    }

    function syncRoom(event?: StorageEvent) {
      if (event && event.key !== activeRoomKey) return;
      const saved = window.localStorage.getItem(activeRoomKey);
      if (saved) applyRoomUpdate(JSON.parse(saved) as RoomState);
    }

    function syncBroadcast(event: MessageEvent<RoomState>) {
      if (event.data && roomKey(event.data.code) === activeRoomKey) applyRoomUpdate(event.data);
    }

    const poll = window.setInterval(() => syncRoom(), 1500);
    window.addEventListener("storage", syncRoom);
    channel?.addEventListener("message", syncBroadcast);
    return () => {
      window.clearInterval(poll);
      window.removeEventListener("storage", syncRoom);
      channel?.removeEventListener("message", syncBroadcast);
      channel?.close();
    };
  }, [gameMode, room]);

  function publishRoom(nextRoom: RoomState) {
    setRoom(nextRoom);
    window.localStorage.setItem(roomKey(nextRoom.code), JSON.stringify(nextRoom));
    const channel = roomChannel();
    channel?.postMessage(nextRoom);
    channel?.close();
  }

  function startGame() {
    if (dailyComplete) {
      setView("leaderboard");
      return;
    }

    setRound(0);
    setGuess("");
    setRevealed(false);
    setResults([]);
    setSubmitted(false);
    setGameMode("daily");
    setView("play");
  }

  function submitGuess() {
    if (!current || revealed) return;
    const numericGuess = Number(guess.replace(/,/g, ""));
    const { accuracy, points } = scoreGuess(current.price, numericGuess);
    setResults((previous) => [...previous, { item: current, guess: numericGuess, accuracy, points }]);
    setRevealed(true);

    if (gameMode === "multiplayer" && room) {
      const nextRoom = {
        ...room,
        status: "playing" as const,
        players: room.players.map((roomPlayer, index) =>
          roomPlayer.id === roomPlayerId || (!roomPlayerId && index === 0)
            ? { ...roomPlayer, score: roomPlayer.score + points }
            : roomPlayer
        )
      };
      publishRoom(nextRoom);
    }
  }

  function nextRound() {
    setGuess("");
    setRevealed(false);
    setRound((value) => value + 1);
  }

  function saveLeaderboardName() {
    const cleanName = name.trim().slice(0, 24) || "Anonymous";
    const entry: LeaderboardEntry = {
      id: `${gameMode}-${date}-${Date.now()}`,
      player_name: cleanName,
      score: finalScore,
      accuracy: Number(averageAccuracy.toFixed(1)),
      mode: gameMode,
      created_at: date
    };
    const savedLeaders = window.localStorage.getItem(leaderboardKey(date));
    const previousLeaders = savedLeaders ? (JSON.parse(savedLeaders) as LeaderboardEntry[]) : [];
    const nextLeaders = [entry, ...previousLeaders].sort((a, b) => b.score - a.score);

    if (gameMode === "daily") window.localStorage.setItem(lockKey(date), JSON.stringify(entry));
    window.localStorage.setItem(leaderboardKey(date), JSON.stringify(nextLeaders));
    setLocalLeaders(nextLeaders);
    setPlayer(cleanName);
    if (gameMode === "multiplayer" && room) {
      const updatedRoom = {
        ...room,
        players: room.players.map((roomPlayer, index) =>
          roomPlayer.id === roomPlayerId || (!roomPlayerId && index === 0)
            ? { ...roomPlayer, name: cleanName, score: finalScore }
            : roomPlayer
        )
      };
      publishRoom(updatedRoom);
    }
    if (gameMode === "daily") setDailyComplete(true);
    setSubmitted(true);
  }

  function createRoom() {
    const cleanName = roomName.trim().slice(0, 24) || player || "Host";
    const code = makeRoomCode();
    const playerId = `host-${Date.now()}`;
    const nextRoom: RoomState = {
      code,
      status: "waiting",
      players: [{ id: playerId, name: cleanName, score: 0 }]
    };

    setRoomCode(code);
    setPlayer(cleanName);
    setRoomName(cleanName);
    setRoomPlayerId(playerId);
    setRoomMessage(`Room ${code} created. Share this code with up to 5 friends.`);
    publishRoom(nextRoom);
  }

  function joinRoom() {
    const code = roomCode.trim().toUpperCase();
    const cleanName = roomName.trim().slice(0, 24) || player || "Player";
    const saved = window.localStorage.getItem(roomKey(code));

    if (!saved) {
      setRoomMessage("No room found with that code in this browser. Create it first or check the code.");
      return;
    }

    const savedRoom = JSON.parse(saved) as RoomState;
    if (savedRoom.players.length >= 6 && !savedRoom.players.some((roomPlayer) => roomPlayer.name === cleanName)) {
      setRoomMessage("This room is full. Rooms can have a maximum of 6 players.");
      return;
    }

    const existingPlayer = savedRoom.players.find((roomPlayer) => roomPlayer.name === cleanName);
    const playerId = existingPlayer?.id ?? `player-${Date.now()}`;
    const nextRoom = existingPlayer
      ? savedRoom
      : { ...savedRoom, players: [...savedRoom.players, { id: playerId, name: cleanName, score: 0 }] };

    setPlayer(cleanName);
    setRoomName(cleanName);
    setRoomPlayerId(playerId);
    setRoomMessage(`Joined ${code}. ${nextRoom.players.length}/6 players are in.`);
    publishRoom(nextRoom);
  }

  function leaveRoom() {
    if (!room) return;
    const nextRoom = {
      ...room,
      players: room.players.filter((roomPlayer) => roomPlayer.id !== roomPlayerId)
    };
    publishRoom(nextRoom);
    setRoom(null);
    setRoomPlayerId("");
    setRoomMessage("Left the room.");
  }

  function startRoomGame() {
    if (!room) {
      setRoomMessage("Create or join a room before starting.");
      return;
    }

    if (room.players.length < 1) {
      setRoomMessage("A room needs at least one player to start.");
      return;
    }

    const nextRoom = { ...room, status: "playing" as const };
    publishRoom(nextRoom);
    setRound(0);
    setGuess("");
    setRevealed(false);
    setResults([]);
    setSubmitted(false);
    setGameMode("multiplayer");
    setView("play");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-night text-white">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5">
        <button className="flex items-center gap-3 text-left" onClick={() => setView("home")} aria-label="Go to home">
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
        </nav>
        <button className="flex h-11 items-center gap-2 rounded-[8px] border border-white/10 bg-white/10 px-4 text-sm font-bold text-white">
          <LogIn className="h-4 w-4" />
          {player}
        </button>
      </header>

      {view === "home" && (
        <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-8 px-5 pb-12 pt-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-[8px] border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-bold text-primary">
              <CalendarDays className="h-4 w-4" />
              {dailyComplete ? "Daily challenge complete" : "Same 10 items for everyone today"}
            </div>
            <h1 className="text-balance text-5xl font-black tracking-normal sm:text-6xl lg:text-7xl">
              Guess real prices. Beat the market. Climb the board.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              One daily run, ten verified-price items, and no second chances until tomorrow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={startGame}
                className={`flex h-14 items-center gap-3 rounded-[8px] px-6 text-base font-black shadow-glow transition ${
                  dailyComplete ? "bg-white/10 text-slate-300" : "bg-primary text-night hover:scale-[1.02]"
                }`}
              >
                <Play className="h-5 w-5 fill-current" />
                {dailyComplete ? "View Today's Board" : "Play Daily Challenge"}
              </button>
              <button
                onClick={() => setView("rooms")}
                className="flex h-14 items-center gap-3 rounded-[8px] border border-white/10 bg-white/10 px-6 text-base font-bold text-white transition hover:border-secondary/70 hover:bg-secondary/15"
              >
                <Users className="h-5 w-5" />
                Create Room
              </button>
            </div>
            {dailyComplete && (
              <p className="mt-4 max-w-xl rounded-[8px] border border-accent/30 bg-accent/10 p-3 text-sm font-bold text-orange-100">
                You already played today&apos;s challenge. Come back tomorrow for a fresh set.
              </p>
            )}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Metric icon={<Gauge />} label="10 rounds" value="Daily run" />
              <Metric icon={<Crown />} label="Top score" value="10,000" />
              <Metric icon={<Sparkles />} label="Sources" value="Verified" />
            </div>
            <div className="mt-5">
              <AdSlot label="Homepage banner ad" size="wide" ad={adByPlacement("Homepage banner ad")} />
            </div>
          </div>
          <div className="space-y-4">
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
                </div>
              </div>
            </div>
            <AdSlot label="Sponsored item placement" ad={adByPlacement("Sponsored item placement")} />
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
              submitted={submitted}
              name={name}
              setName={setName}
              onSubmit={saveLeaderboardName}
              onLeaderboard={() => setView("leaderboard")}
              postGameAd={adByPlacement("Post-game ad slot")}
              room={gameMode === "multiplayer" ? room : null}
            />
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
              <div className="glass overflow-hidden rounded-[8px]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-primary">
                      {gameMode === "multiplayer" ? `Room ${room?.code ?? ""}` : `Round ${round + 1} of 10`}
                    </p>
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
                  <div className="absolute left-4 top-4 rounded-[8px] bg-night px-3 py-2 text-sm font-bold">
                    {current.category}
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="glass rounded-[8px] p-5">
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
                        className="flex h-14 w-full items-center justify-center rounded-[8px] bg-primary px-5 py-4 font-black text-night transition hover:scale-[1.01]"
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
                        className="flex w-full items-center justify-center rounded-[8px] bg-accent px-5 py-4 font-black text-white transition hover:scale-[1.01]"
                      >
                        {round === 9 ? "Finish Challenge" : "Next Item"}
                      </button>
                    </div>
                  )}
                </div>
                <AdSlot label="Rewarded video ad slot" icon={<Video className="h-4 w-4 text-accent" />} ad={adByPlacement("Rewarded video ad slot")} />
                {gameMode === "multiplayer" && room && <RoomScoreboard room={room} />}
                <AdSlot label="Sidebar display ad" ad={adByPlacement("Sidebar display ad")} />
              </aside>
            </div>
          )}
        </section>
      )}

      {view === "leaderboard" && (
        <Leaderboard
          leaderboard={board}
          dailyComplete={dailyComplete}
          leaderboardAd={adByPlacement("Leaderboard top banner ad")}
        />
      )}
      {view === "rooms" && (
        <Rooms
          roomCode={roomCode}
          setRoomCode={setRoomCode}
          roomName={roomName}
          setRoomName={setRoomName}
          room={room}
          message={roomMessage}
          onCreate={createRoom}
          onJoin={joinRoom}
          onLeave={leaveRoom}
          onStart={startRoomGame}
        />
      )}
    </main>
  );
}

function NavButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: ReactElement; children: ReactNode }) {
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

function AdSlot({ label, size, icon, ad }: { label: string; size?: "wide"; icon?: ReactElement; ad?: AdPlacement }) {
  return (
    <div className={`rounded-[8px] border border-dashed border-white/20 bg-white/5 p-4 ${size === "wide" ? "min-h-24" : "min-h-32"}`}>
      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-300">
        {icon ?? <Megaphone className="h-4 w-4 text-accent" />}
        {label}
      </div>
      <p className="font-black text-white">{ad?.headline ?? "Ad placement"}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{ad?.body ?? "Reserved for future ad network, sponsor creative, or rewarded hint placement."}</p>
      {ad?.href && ad.href !== "#" && (
        <a href={ad.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-[8px] bg-white/10 px-3 py-2 text-sm font-bold text-primary">
          {ad.cta || "Open"}
        </a>
      )}
    </div>
  );
}

function FinalScore({
  score,
  accuracy,
  results,
  submitted,
  name,
  setName,
  onSubmit,
  onLeaderboard,
  postGameAd,
  room
}: {
  score: number;
  accuracy: number;
  results: RoundResult[];
  submitted: boolean;
  name: string;
  setName: (value: string) => void;
  onSubmit: () => void;
  onLeaderboard: () => void;
  postGameAd?: AdPlacement;
  room: RoomState | null;
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
          {!submitted ? (
            <div className="mt-6 rounded-[8px] border border-white/10 bg-white/5 p-4">
              <label className="block text-sm font-bold text-slate-300" htmlFor="leaderboard-name">
                Enter your leaderboard name
              </label>
              <input
                id="leaderboard-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={24}
                className="mt-3 h-12 w-full rounded-[8px] border border-white/10 bg-night px-4 font-bold outline-none focus:border-primary"
                placeholder="Your name"
              />
              <button onClick={onSubmit} className="mt-3 w-full rounded-[8px] bg-primary px-5 py-3 font-black text-night">
                Save Score
              </button>
            </div>
          ) : (
            <button onClick={onLeaderboard} className="mt-6 flex items-center gap-2 rounded-[8px] border border-white/10 px-5 py-3 font-bold">
              <Trophy className="h-4 w-4" />
              View Leaderboard
            </button>
          )}
          <div className="mt-5">
            <AdSlot label="Post-game ad slot" ad={postGameAd} />
          </div>
        </div>
        <div className="space-y-4">
          {room && <RoomScoreboard room={room} title="Final room scores" />}
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
    </div>
  );
}

function Leaderboard({
  leaderboard,
  dailyComplete,
  leaderboardAd
}: {
  leaderboard: LeaderboardEntry[];
  dailyComplete: boolean;
  leaderboardAd?: AdPlacement;
}) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 pb-12 lg:grid-cols-[1fr_340px]">
      <div className="glass rounded-[8px] p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">{dailyComplete ? "Your daily score is locked" : "Global leaderboard"}</p>
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
        <AdSlot label="Leaderboard top banner ad" ad={leaderboardAd} />
        <BoardCard title="Weekly" value="31,420" detail="Total points this week" />
        <BoardCard title="Monthly" value="128,900" detail="Total points this month" />
        <BoardCard title="Featured Daily" value="Sponsor slot" detail="Paid challenge placement placeholder" />
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

function RoomScoreboard({ room, title = "Live room scores" }: { room: RoomState; title?: string }) {
  const sortedPlayers = [...room.players].sort((a, b) => b.score - a.score);

  return (
    <div className="glass rounded-[8px] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-primary">{title}</p>
          <h3 className="text-2xl font-black">{room.code}</h3>
        </div>
        <span className="rounded-[8px] bg-white/10 px-3 py-2 text-sm font-bold text-slate-300">
          {room.players.length}/6
        </span>
      </div>
      <div className="space-y-2">
        {sortedPlayers.map((roomPlayer, index) => (
          <div key={roomPlayer.id} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-[8px] bg-white/5 p-3">
            <span className="font-mono text-sm text-slate-500">#{index + 1}</span>
            <span className="font-bold">{roomPlayer.name}</span>
            <span className="font-mono font-black text-primary">{roomPlayer.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Rooms({
  roomCode,
  setRoomCode,
  roomName,
  setRoomName,
  room,
  message,
  onCreate,
  onJoin,
  onLeave,
  onStart
}: {
  roomCode: string;
  setRoomCode: (value: string) => void;
  roomName: string;
  setRoomName: (value: string) => void;
  room: RoomState | null;
  message: string;
  onCreate: () => void;
  onJoin: () => void;
  onLeave: () => void;
  onStart: () => void;
}) {
  const seats = Array.from({ length: 6 }, (_, index) => room?.players[index] ?? null);
  const isFull = (room?.players.length ?? 0) >= 6;

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 pb-12 lg:grid-cols-[420px_1fr]">
      <div className="glass rounded-[8px] p-5">
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-[8px] bg-secondary text-white">
          <Users className="h-7 w-7" />
        </div>
        <h2 className="text-3xl font-black">Private rooms</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Create a private room, share the code, and play the same item set with up to 6 players.
        </p>
        <div className="mt-4 rounded-[8px] border border-primary/20 bg-primary/10 p-3 text-sm leading-6 text-slate-200">
          <p className="font-black text-primary">How it works</p>
          <p>Host creates a room, friends join with the code, host starts, everyone plays together.</p>
        </div>
        <label className="mt-6 block text-sm font-bold text-slate-300" htmlFor="room-name">
          Player name
        </label>
        <input
          id="room-name"
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
          className="mt-2 h-14 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 font-bold outline-none focus:border-primary"
          placeholder="Your name"
          maxLength={24}
        />
        <label className="mt-4 block text-sm font-bold text-slate-300" htmlFor="room">
          Room code
        </label>
        <input
          id="room"
          value={roomCode}
          onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
          className="mt-2 h-14 w-full rounded-[8px] border border-white/10 bg-white/10 px-4 font-mono text-xl font-black outline-none focus:border-primary"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-[8px] bg-primary px-5 py-4 font-black text-night">
            <Plus className="h-4 w-4" />
            Create
          </button>
          <button
            onClick={onJoin}
            disabled={isFull}
            className="flex items-center justify-center gap-2 rounded-[8px] border border-white/10 px-5 py-4 font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Join
          </button>
        </div>
        {message && <p className="mt-4 rounded-[8px] border border-white/10 bg-white/5 p-3 text-sm font-bold text-slate-300">{message}</p>}
        {room && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button onClick={onStart} className="rounded-[8px] bg-accent px-5 py-4 font-black text-white">
              Start Room Game
            </button>
            <button onClick={onLeave} className="rounded-[8px] border border-white/10 px-5 py-4 font-bold text-slate-300">
              Leave
            </button>
          </div>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {seats.map((roomPlayer, index) => (
          <div key={roomPlayer?.id ?? `seat-${index}`} className="glass rounded-[8px] p-5">
            <p className="text-sm text-slate-400">Player {index + 1}</p>
            <p className="mt-2 min-h-8 text-2xl font-black">{roomPlayer?.name ?? "Open seat"}</p>
            <p className="mt-5 font-mono text-4xl font-black text-primary">{roomPlayer ? roomPlayer.score : "--"}</p>
            <p className="mt-2 text-sm text-slate-400">{roomPlayer ? "Live score" : "Invite slot"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
