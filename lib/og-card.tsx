import { ImageResponse } from "next/og";
import { loadSerifFonts } from "./og-fonts";

export const ogSize = { width: 1200, height: 630 };

type OgCardOptions = {
  kicker: string;
  title: string;
  accentLine: string;
  footer: string;
  colors: {
    background: string;
    text: string;
    muted: string;
    accent: string;
    cell: string;
    cellActive: string;
    cellStrong: string;
  };
};

const activeCells = new Set(["2-2", "2-3", "3-2", "3-4", "4-3"]);
const strongCell = "3-3";

/** Shared 1200×630 share card: serif headline beside the token grid motif. */
export async function renderOgCard({ kicker, title, accentLine, footer, colors }: OgCardOptions) {
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
          background: colors.background,
          color: colors.text,
          fontFamily: "Libre Baskerville",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 660 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: colors.muted,
              marginBottom: 32,
            }}
          >
            {kicker}
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.08, letterSpacing: -2 }}>{title}</div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.15,
              letterSpacing: -2,
              color: colors.accent,
              fontStyle: "italic",
            }}
          >
            {accentLine}
          </div>
          <div style={{ fontSize: 26, color: colors.muted, marginTop: 40 }}>{footer}</div>
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
                      background:
                        key === strongCell
                          ? colors.cellStrong
                          : activeCells.has(key)
                            ? colors.cellActive
                            : colors.cell,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadSerifFonts() },
  );
}
