import { profile } from "@/lib/content";
import { ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "David Poninski — Design Systems Leader. Systems that engineering adopts.";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  // Mirrors tokens.css primitives; ImageResponse can't read CSS variables.
  return renderOgCard({
    kicker: `${profile.name} · ${profile.title}`,
    title: "Systems that",
    accentLine: "engineering adopts.",
    footer: "poninski.com",
    colors: {
      background: "#F2F2F2",
      text: "#0D0D0D",
      muted: "#474747",
      accent: "#006572",
      cell: "#D5D5D5",
      cellActive: "#72D8E5",
      cellStrong: "#00B2CB",
    },
  });
}
