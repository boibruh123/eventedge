import { NextResponse } from "next/server";
import { getDailyItems } from "@/lib/items";

export async function POST() {
  const code = `PRICE-${Math.floor(1000 + Math.random() * 9000)}`;

  return NextResponse.json({
    room: {
      code,
      status: "waiting",
      items: getDailyItems(),
      realtime: "Enable Supabase Realtime on multiplayer_rooms and game_sessions for live score sync."
    }
  });
}
