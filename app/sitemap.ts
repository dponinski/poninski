import type { MetadataRoute } from "next";
import { profile, systems } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.url, priority: 1 },
    ...systems.map((system) => ({
      url: `${profile.url}/work/${system.id}`,
      priority: 0.8,
    })),
  ];
}
