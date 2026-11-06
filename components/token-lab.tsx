"use client";

import { useState } from "react";
import { tokens } from "@/lib/tokens";
import { useInspect } from "./inspect";

const defaultSpecimen = {
  font: "--font-family-serif",
  size: "--font-size-h3",
  weight: "--font-weight-regular",
  spacing: "--spacing-sm",
};

const defaultColors = {
  text: "#0D0D0D",
  border: "#2A2A2A",
  surface: "#FFFFFF",
};

const ON_LIGHT = "#0D0D0D";
const ON_DARK = "#FFFFFF";

const colorRoles = [
  { key: "text", label: "Text", token: "--lab-text-color" },
  { key: "border", label: "Border", token: "--lab-border-color" },
  { key: "surface", label: "Surface", token: "--lab-surface-color" },
] as const;

const selectorGroups = [
  { label: "Font family", valueKey: "font", group: "fontFamily", type: "fontFamily" },
  { label: "Type size", valueKey: "size", group: "fontSize", type: "dimension" },
  { label: "Font weight", valueKey: "weight", group: "fontWeight", type: "fontWeight" },
  { label: "Spacing", valueKey: "spacing", group: "spacing", type: "dimension" },
] as const;

type Specimen = typeof defaultSpecimen;
type Colors = typeof defaultColors;

function getContrastRatio(foreground: string, background: string) {
  const luminance = (hex: string) => {
    const channels = [1, 3, 5].map((offset) => {
      const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    });

    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };

  const values = [luminance(foreground), luminance(background)].sort(
    (first, second) => second - first,
  );
  return (values[0] + 0.05) / (values[1] + 0.05);
}

/** `--font-size-h3` → `{font.size.h3}` (DTCG alias syntax). */
function toAlias(cssVar: string) {
  return `{${cssVar.replace(/^--/, "").split("-").join(".")}}`;
}

function exportCss(colors: Colors, onBorder: string, picked: Specimen) {
  return [
    ":root {",
    "  /* Semantic colors */",
    `  --lab-text-color: ${colors.text.toUpperCase()};`,
    `  --lab-border-color: ${colors.border.toUpperCase()};`,
    `  --lab-surface-color: ${colors.surface.toUpperCase()};`,
    `  --lab-on-border-color: ${onBorder};`,
    "",
    "  /* Component tokens → primitives */",
    `  --specimen-font: var(${picked.font});`,
    `  --specimen-size: var(${picked.size});`,
    `  --specimen-weight: var(${picked.weight});`,
    `  --specimen-spacing: var(${picked.spacing});`,
    "  --specimen-radius: var(--radius-md);",
    "}",
  ].join("\n");
}

function exportJson(colors: Colors, onBorder: string, picked: Specimen) {
  const color = (value: string) => ({ $type: "color", $value: value.toUpperCase() });
  const specimen = Object.fromEntries(
    selectorGroups.map(({ valueKey, type }) => [
      valueKey,
      { $type: type, $value: toAlias(picked[valueKey]) },
    ]),
  );

  return JSON.stringify(
    {
      lab: {
        text: color(colors.text),
        border: color(colors.border),
        surface: color(colors.surface),
        "on-border": color(onBorder),
      },
      specimen: {
        ...specimen,
        radius: { $type: "dimension", $value: "{radius.md}" },
      },
    },
    null,
    2,
  );
}

function ContrastResult({
  label,
  ratio,
  minimum,
}: {
  label: string;
  ratio: number;
  minimum: number;
}) {
  return (
    <div className="contrast-checker__item">
      <span className="contrast-checker__label">
        {label} · {minimum}:1
      </span>
      <strong>
        {ratio.toFixed(2)}:1 · {ratio >= minimum ? "Pass AA" : "Fails AA"}
      </strong>
    </div>
  );
}

export function TokenLab() {
  const { inspect } = useInspect();
  const [picked, setPicked] = useState(defaultSpecimen);
  const [colors, setColors] = useState(defaultColors);
  const [format, setFormat] = useState<"css" | "json">("css");
  const [copied, setCopied] = useState(false);

  const textContrast = getContrastRatio(colors.text, colors.surface);
  const borderContrast = getContrastRatio(colors.border, colors.surface);
  // The hover state fills the button with the border color, so pick
  // whichever label color reads best on it.
  const onDarkContrast = getContrastRatio(ON_DARK, colors.border);
  const onLightContrast = getContrastRatio(ON_LIGHT, colors.border);
  const onBorder = onDarkContrast >= onLightContrast ? ON_DARK : ON_LIGHT;
  const hoverContrast = Math.max(onDarkContrast, onLightContrast);

  const hasChanges =
    colors.text !== defaultColors.text ||
    colors.border !== defaultColors.border ||
    colors.surface !== defaultColors.surface ||
    picked.font !== defaultSpecimen.font ||
    picked.size !== defaultSpecimen.size ||
    picked.weight !== defaultSpecimen.weight ||
    picked.spacing !== defaultSpecimen.spacing;

  const labVars = {
    "--lab-text-color": colors.text,
    "--lab-border-color": colors.border,
    "--lab-surface-color": colors.surface,
    "--lab-on-border-color": onBorder,
  } as React.CSSProperties;

  const exported =
    format === "css"
      ? exportCss(colors, onBorder, picked)
      : exportJson(colors, onBorder, picked);

  return (
    <section className="section section--lab shell" id="tokens">
      <div className="section__head">
        <div>
          <p className="kicker">A small, live system</p>
          <h2>Make it yours.</h2>
        </div>
        <p>
          Choose three semantic colors, then tune the supporting tokens. The
          component preview updates as you go, and the tokens export as CSS or
          JSON.
        </p>
      </div>
      <div className="lab">
        <div className="lab-controls">
          <div
            className="color-controls"
            role="group"
            aria-label="Custom semantic colors"
          >
            {colorRoles.map(({ key, label, token }) => (
              <label className="color-control" key={key}>
                <span className="color-control__label">{label}</span>
                <span className="color-control__input">
                  <input
                    type="color"
                    value={colors[key]}
                    aria-label={`${label} color`}
                    onChange={(event) => {
                      setColors((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }));
                      inspect({ label: `${label} color`, tokens: [token] });
                    }}
                  />
                  <code>{colors[key].toUpperCase()}</code>
                </span>
                <small>{token}</small>
              </label>
            ))}
          </div>
          <div
            className="contrast-checker"
            role="group"
            aria-label="WCAG AA contrast results"
          >
            <p className="contrast-checker__title">Contrast check</p>
            <ContrastResult
              label="Text on surface"
              ratio={textContrast}
              minimum={4.5}
            />
            <ContrastResult
              label="Button border"
              ratio={borderContrast}
              minimum={3}
            />
            <ContrastResult
              label="Hover label"
              ratio={hoverContrast}
              minimum={4.5}
            />
          </div>
          <div className="select-controls">
            {selectorGroups.map(({ label, valueKey, group }) => {
              const choices = tokens.filter((token) => token.group === group);
              return (
                <label className="select-control" key={valueKey}>
                  <span>{label}</span>
                  <select
                    value={picked[valueKey]}
                    onChange={(event) => {
                      const cssVar = event.target.value;
                      setPicked((current) => ({
                        ...current,
                        [valueKey]: cssVar,
                      }));
                      inspect({ label, tokens: [cssVar] });
                    }}
                    onMouseEnter={() =>
                      inspect({ label, tokens: [picked[valueKey]] })
                    }
                  >
                    {choices.map((token) => (
                      <option key={token.cssVar} value={token.cssVar}>
                        {token.name}
                      </option>
                    ))}
                  </select>
                </label>
              );
            })}
          </div>
        </div>
        <aside
          className="specimen"
          style={
            {
              ...labVars,
              "--specimen-font": `var(${picked.font})`,
              "--specimen-size": `var(${picked.size})`,
              "--specimen-weight": `var(${picked.weight})`,
              "--specimen-spacing": `var(${picked.spacing})`,
              "--specimen-radius": "var(--radius-md)",
            } as React.CSSProperties
          }
        >
          <div className="specimen__top">
            <span className="specimen__label">Live token preview</span>
            {hasChanges && (
              <button
                type="button"
                className="reset-button reset-button--changed"
                onClick={() => {
                  setColors(defaultColors);
                  setPicked(defaultSpecimen);
                  inspect({
                    label: "Default tokens",
                    tokens: [
                      "--color-text-resting-stronger",
                      "--color-border-resting-stronger",
                      "--color-surface-inverse",
                    ],
                  });
                }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="reset-button__icon"
                  fill="none"
                >
                  <path
                    d="M3 12a9 9 0 1 0 2.64-6.36L3 8"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                  />
                  <path
                    d="M3 3v5h5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                  />
                </svg>
                Reset
              </button>
            )}
          </div>
          <div className="specimen__content">
            <h3>Built to belong.</h3>
            <p>
              Three color tokens. One flexible component. Change the system,
              not the interface.
            </p>
            <span className="specimen__btn">
              Explore the system <span aria-hidden="true">↗</span>
            </span>
          </div>
        </aside>
      </div>
      <div className="token-export">
        <div className="token-export__bar">
          <div className="token-export__tabs" role="group" aria-label="Export format">
            {(["css", "json"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={format === option}
                onClick={() => {
                  setFormat(option);
                  setCopied(false);
                }}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="token-export__copy"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(exported);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? "Copied" : `Copy ${format.toUpperCase()}`}
          </button>
          <span className="visually-hidden" aria-live="polite">
            {copied ? `${format.toUpperCase()} tokens copied to clipboard` : ""}
          </span>
        </div>
        <pre className="token-export__code" tabIndex={0} aria-label={`Tokens as ${format.toUpperCase()}`}>
          <code>{exported}</code>
        </pre>
      </div>
    </section>
  );
}
