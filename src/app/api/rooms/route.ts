import { NextResponse } from "next/server";
import { getDailyItems } from "@/lib/items";

export async function POST() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const code = `PRICE-${Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("")}`;
  const items = getDailyItems();

  return NextResponse.json({
    room: {
      code,
      status: "waiting",
      title: "Daily Challenge",
      deckCategory: "Daily Challenge",
      maxPlayers: 6,
      itemIds: items.map((item) => item.id),
      items,
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      realtime: "Enable Supabase Realtime on multiplayer_rooms and game_sessions for live score sync."
    }
  });
}
