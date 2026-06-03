import { NextResponse } from "next/server";
import { getDailyItems } from "@/lib/items";

export async function GET() {
  return NextResponse.json({
    date: new Date().toISOString().slice(0, 10),
    items: getDailyItems()
  });
}
