import { NextResponse } from "next/server";
import { fallbackItems, mergeWithDefaultDecks } from "@/lib/items";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getServiceSupabase();

  if (!supabase) {
    return NextResponse.json({ items: fallbackItems, source: "fallback" });
  }

  const { data, error } = await supabase.from("items").select("*").order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ items: fallbackItems, source: "fallback", error: error.message }, { status: 200 });
  }

  return NextResponse.json({ items: mergeWithDefaultDecks(data), source: "supabase" });
}

export async function POST(request: Request) {
  const supabase = getServiceSupabase();
  const body = await request.json();
  const items = Array.isArray(body.items) ? body.items : [body];

  if (!supabase) {
    return NextResponse.json({ items, source: "localOnly" }, { status: 202 });
  }

  const { data, error } = await supabase.from("items").upsert(items, { onConflict: "id" }).select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ items: data, source: "supabase" }, { status: 201 });
}
