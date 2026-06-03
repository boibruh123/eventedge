import { NextResponse } from "next/server";
import { defaultAds } from "@/lib/ads";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET() {
  const supabase = getServiceSupabase();

  if (!supabase) {
    return NextResponse.json({ ads: defaultAds, source: "fallback" });
  }

  const { data, error } = await supabase.from("ads").select("*").order("placement", { ascending: true });

  if (error) {
    return NextResponse.json({ ads: defaultAds, source: "fallback", error: error.message });
  }

  return NextResponse.json({ ads: data, source: "supabase" });
}

export async function POST(request: Request) {
  const supabase = getServiceSupabase();
  const body = await request.json();
  const ads = Array.isArray(body.ads) ? body.ads : [body];

  if (!supabase) {
    return NextResponse.json({ ads, source: "localOnly" }, { status: 202 });
  }

  const { data, error } = await supabase.from("ads").upsert(ads, { onConflict: "id" }).select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ads: data, source: "supabase" });
}
