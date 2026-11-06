import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = "David Poninski — Design Systems Leader. Systems that engineering adopts.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors tokens.css primitives; ImageResponse can't read CSS variables.
const color = {
  surface: "#F2F2F2",
  text: "#0D0D0D",
  muted: "#474747",
  accent: "#006572",
  cellResting: "#D5D5D5",
  cellActive: "#72D8E5",
  cellActiveStrong: "#00B2CB",
};

const active = new Set(["2-3", "3-3", "3-2", "2-2", "3-4", "4-3"]);
const strong = new Set(["3-3"]);

export default function OpengraphImage() {
  const rows = Array.from({ length: 7 }, (_, row) => row);
  const cols = Array.from({ length: 6 }, (_, col) => col);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "72px 80px",
          background: color.surface,
          color: color.text,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: color.muted,
              marginBottom: 28,
            }}
          >
            {`${profile.name} · ${profile.title}`}
          </div>
          <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -2 }}>
            Systems that
          </div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: color.accent,
              fontStyle: "italic",
            }}
          >
            engineering adopts.
          </div>
          <div style={{ fontSize: 28, color: color.muted, marginTop: 36 }}>
            poninski.com
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map((row) => (
            <div key={row} style={{ display: "flex", gap: 10 }}>
              {cols.map((col) => {
                const key = `${row}-${col}`;
                return (
                  <div
                    key={key}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 8,
                      background: strong.has(key)
                        ? color.cellActiveStrong
                        : active.has(key)
                          ? color.cellActive
                          : color.cellResting,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
