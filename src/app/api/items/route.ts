import { NextResponse } from "next/server";
import { fallbackItems } from "@/lib/items";
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

  return NextResponse.json({ items: data, source: "supabase" });
}

export async function POST(request: Request) {
  const supabase = getServiceSupabase();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role key is not configured." }, { status: 503 });
  }

  const body = await request.json();
  const { data, error } = await supabase.from("items").insert(body).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ item: data }, { status: 201 });
}
