export type Difficulty = "Easy" | "Medium" | "Hard" | "Insane";

export type GameItem = {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  source: string;
  difficulty: Difficulty;
};

export type AdPlacement = {
  id: string;
  placement: string;
  headline: string;
  body: string;
  cta: string;
  href: string;
  active: boolean;
};

export type LeaderboardEntry = {
  id: string;
  player_name: string;
  score: number;
  accuracy: number;
  mode: "daily" | "classic" | "multiplayer";
  created_at: string;
};

export type RoundResult = {
  item: GameItem;
  guess: number;
  accuracy: number;
  points: number;
};
