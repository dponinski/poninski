export type TokenGroup =
  | "textColor"
  | "borderColor"
  | "surfaceColor"
  | "fontFamily"
  | "fontSize"
  | "fontWeight"
  | "spacing"
  | "radius";

export type Token = {
  name: string;
  cssVar: string;
  group: TokenGroup;
  preview: "swatch" | "type" | "size" | "spacing" | "radius";
};

const colorSteps = ["subtle", "muted", "strong", "stronger"] as const;
const colorStates = ["resting", "active"] as const;

function colorTokens(kind: "text" | "border" | "surface"): Token[] {
  const group = `${kind}Color` as TokenGroup;

  return [
    {
      name: `${kind} / inverse`,
      cssVar: `--color-${kind}-inverse`,
      group,
      preview: "swatch",
    },
    ...colorStates.flatMap((state) =>
      colorSteps.map((step) => ({
        name: `${kind} / ${state} / ${step}`,
        cssVar: `--color-${kind}-${state}-${step}`,
        group,
        preview: "swatch" as const,
      })),
    ),
  ];
}

export const tokens: Token[] = [
  ...colorTokens("text"),
  ...colorTokens("border"),
  ...colorTokens("surface"),
  {
    name: "Sans",
    cssVar: "--font-family-sans",
    group: "fontFamily",
    preview: "type",
  },
  {
    name: "Serif",
    cssVar: "--font-family-serif",
    group: "fontFamily",
    preview: "type",
  },
  {
    name: "Mono",
    cssVar: "--font-family-mono",
    group: "fontFamily",
    preview: "type",
  },
  ...[
    ["Small", "--font-size-small"],
    ["Base", "--font-size-base"],
    ["H6", "--font-size-h6"],
    ["H5", "--font-size-h5"],
    ["H4", "--font-size-h4"],
    ["H3", "--font-size-h3"],
    ["H2", "--font-size-h2"],
    ["H1", "--font-size-h1"],
  ].map(([name, cssVar]) => ({
    name,
    cssVar,
    group: "fontSize" as const,
    preview: "size" as const,
  })),
  ...[
    ["Regular", "--font-weight-regular"],
    ["Semibold", "--font-weight-semibold"],
    ["Bold", "--font-weight-bold"],
    ["Black", "--font-weight-black"],
  ].map(([name, cssVar]) => ({
    name,
    cssVar,
    group: "fontWeight" as const,
    preview: "type" as const,
  })),
  ...[
    ["XS", "--spacing-xs"],
    ["SM", "--spacing-sm"],
    ["Base", "--spacing-base"],
    ["LG", "--spacing-lg"],
    ["XL", "--spacing-xl"],
  ].map(([name, cssVar]) => ({
    name,
    cssVar,
    group: "spacing" as const,
    preview: "spacing" as const,
  })),
  ...[
    ["XS", "--radius-xs"],
    ["SM", "--radius-sm"],
    ["MD", "--radius-md"],
    ["LG", "--radius-lg"],
    ["XL", "--radius-xl"],
    ["Full", "--radius-full"],
  ].map(([name, cssVar]) => ({
    name: `Radius ${name}`,
    cssVar,
    group: "radius" as const,
    preview: "radius" as const,
  })),
];

export const tokenIndex = Object.fromEntries(
  tokens.map((token) => [token.cssVar, token]),
);
