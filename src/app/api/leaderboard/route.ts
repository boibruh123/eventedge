import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

const fallbackLeaderboard = [
  { id: "1", player_name: "Maya", score: 7650, accuracy: 91.2, mode: "daily", created_at: "2026-06-03" },
  { id: "2", player_name: "Theo", score: 7100, accuracy: 87.9, mode: "daily", created_at: "2026-06-03" },
  { id: "3", player_name: "Sneh", score: 6750, accuracy: 84.1, mode: "daily", created_at: "2026-06-03" }
];

export async function GET() {
  const supabase = getServiceSupabase();

  if (!supabase) {
    return NextResponse.json({ leaderboard: fallbackLeaderboard, source: "fallback" });
  }

  const { data, error } = await supabase
    .from("leaderboards")
    .select("*")
    .order("score", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ leaderboard: fallbackLeaderboard, source: "fallback", error: error.message });
  }

  return NextResponse.json({ leaderboard: data, source: "supabase" });
}

export async function POST(request: Request) {
  const supabase = getServiceSupabase();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role key is not configured." }, { status: 503 });
  }

  const body = await request.json();
  const { data, error } = await supabase.from("leaderboards").insert(body).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ entry: data }, { status: 201 });
}
