import { brandIdentities } from "@/lib/brands";
import { getSystem, profile, systems } from "@/lib/content";
import { ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Design system case study by David Poninski";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return systems.map((system) => ({ id: system.id }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const system = getSystem((await params).id) ?? systems[0];
  const brand = brandIdentities[system.id];

  return renderOgCard({
    kicker: `${system.org} · ${system.years}`,
    title: `${system.name}`,
    accentLine: "design system.",
    footer: `${profile.name} · poninski.com`,
    colors: {
      background: brand.primary,
      text: "#FFFFFF",
      muted: "#E6E6E6",
      accent: brand.accent,
      cell: "rgba(255,255,255,0.18)",
      cellActive: brand.accent,
      cellStrong: "#FFFFFF",
    },
  });
}
