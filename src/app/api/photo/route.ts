import { NextRequest, NextResponse } from "next/server";

const COMMONS_ENDPOINT = "https://commons.wikimedia.org/w/api.php";
const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

function cleanSearchTerm(value: string) {
  return value
    .replace(/[^\w\s&'.+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

async function searchCommons(search: string) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "10",
    gsrsearch: search,
    prop: "imageinfo",
    iiprop: "url|mime|size",
    iiurlwidth: "1200",
    format: "json",
    origin: "*"
  });

  const response = await fetch(`${COMMONS_ENDPOINT}?${params.toString()}`, {
    next: { revalidate: 60 * 60 * 24 }
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    query?: {
      pages?: Record<
        string,
        {
          title?: string;
          imageinfo?: Array<{
            thumburl?: string;
            url?: string;
            mime?: string;
            width?: number;
            height?: number;
          }>;
        }
      >;
    };
  };

  const pages = Object.values(payload.query?.pages ?? {});
  const image = pages
    .flatMap((page) => page.imageinfo ?? [])
    .find((info) => info.mime?.startsWith("image/") && info.mime !== "image/svg+xml" && (info.thumburl || info.url));

  return image?.thumburl ?? image?.url ?? null;
}

async function searchGoogleImages(search: string) {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (!apiKey || !searchEngineId) return null;

  const params = new URLSearchParams({
    key: apiKey,
    cx: searchEngineId,
    q: search,
    searchType: "image",
    imgSize: "large",
    safe: "active",
    num: "5"
  });

  const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params.toString()}`, {
    next: { revalidate: 60 * 60 * 24 }
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    items?: Array<{
      link?: string;
      mime?: string;
      image?: {
        contextLink?: string;
      };
    }>;
  };

  const image = payload.items?.find((item) => item.link && (item.mime?.startsWith("image/") ?? true));
  return image?.link ?? null;
}

export async function GET(request: NextRequest) {
  const title = cleanSearchTerm(request.nextUrl.searchParams.get("title") ?? "");
  const category = cleanSearchTerm(request.nextUrl.searchParams.get("category") ?? "");
  const queries = [
    title,
    `${title} ${category}`,
    title.replace(/\b(combo|meal|pack|set|ticket|price|card|game)\b/gi, "").trim(),
    category
  ].filter(Boolean);

  for (const query of queries) {
    const imageUrl = (await searchGoogleImages(query)) ?? (await searchCommons(query));
    if (imageUrl) {
      return NextResponse.redirect(imageUrl, {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800"
        }
      });
    }
  }

  return NextResponse.redirect(FALLBACK_IMAGE, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
