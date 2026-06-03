import { GuessThePriceApp } from "@/components/guess-the-price-app";
import { fallbackItems } from "@/lib/items";
import type { LeaderboardEntry } from "@/lib/types";

const leaderboard: LeaderboardEntry[] = [
  { id: "1", player_name: "Maya", score: 7650, accuracy: 91.2, mode: "daily", created_at: "2026-06-03" },
  { id: "2", player_name: "Theo", score: 7100, accuracy: 87.9, mode: "daily", created_at: "2026-06-03" },
  { id: "3", player_name: "Sneh", score: 6750, accuracy: 84.1, mode: "daily", created_at: "2026-06-03" },
  { id: "4", player_name: "Guest 482", score: 5900, accuracy: 78.5, mode: "daily", created_at: "2026-06-02" }
];

export default function Home() {
  return <GuessThePriceApp items={fallbackItems} leaderboard={leaderboard} />;
}
