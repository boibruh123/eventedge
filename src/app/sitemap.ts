import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://guesstheprice-alpha.vercel.app";
  const updated = new Date();

  return ["", "/terms", "/privacy", "/disclaimer", "/copyright"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: updated,
    changeFrequency: path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.4
  }));
}
