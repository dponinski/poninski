export type TokenGroup = "color" | "font" | "weight" | "radius";

export type Token = {
  name: string;
  cssVar: string;
  group: TokenGroup;
  preview: "swatch" | "type" | "radius";
};

export const tokens: Token[] = [
  {
    name: "Resting / Subtle",
    cssVar: "--color-resting-subtle",
    group: "color",
    preview: "swatch",
  },
  {
    name: "Resting / Muted",
    cssVar: "--color-resting-muted",
    group: "color",
    preview: "swatch",
  },
  {
    name: "Resting / Strong",
    cssVar: "--color-resting-strong",
    group: "color",
    preview: "swatch",
  },
  {
    name: "Resting / Stronger",
    cssVar: "--color-resting-stronger",
    group: "color",
    preview: "swatch",
  },
  {
    name: "Active / Subtle",
    cssVar: "--color-active-subtle",
    group: "color",
    preview: "swatch",
  },
  {
    name: "Active / Muted",
    cssVar: "--color-active-muted",
    group: "color",
    preview: "swatch",
  },
  {
    name: "Active / Strong",
    cssVar: "--color-active-strong",
    group: "color",
    preview: "swatch",
  },
  {
    name: "Active / Stronger",
    cssVar: "--color-active-stronger",
    group: "color",
    preview: "swatch",
  },
  {
    name: "Sans",
    cssVar: "--font-sans",
    group: "font",
    preview: "type",
  },
  {
    name: "Serif",
    cssVar: "--font-serif",
    group: "font",
    preview: "type",
  },
  {
    name: "Mono",
    cssVar: "--font-mono",
    group: "font",
    preview: "type",
  },
  {
    name: "Regular",
    cssVar: "--font-weight-regular",
    group: "weight",
    preview: "type",
  },
  {
    name: "Semibold",
    cssVar: "--font-weight-semibold",
    group: "weight",
    preview: "type",
  },
  {
    name: "Bold",
    cssVar: "--font-weight-bold",
    group: "weight",
    preview: "type",
  },
  {
    name: "Black",
    cssVar: "--font-weight-black",
    group: "weight",
    preview: "type",
  },
  {
    name: "Radius XS",
    cssVar: "--radius-xs",
    group: "radius",
    preview: "radius",
  },
  {
    name: "Radius SM",
    cssVar: "--radius-sm",
    group: "radius",
    preview: "radius",
  },
  {
    name: "Radius MD",
    cssVar: "--radius-md",
    group: "radius",
    preview: "radius",
  },
  {
    name: "Radius LG",
    cssVar: "--radius-lg",
    group: "radius",
    preview: "radius",
  },
  {
    name: "Radius XL",
    cssVar: "--radius-xl",
    group: "radius",
    preview: "radius",
  },
  {
    name: "Radius Full",
    cssVar: "--radius-full",
    group: "radius",
    preview: "radius",
  },
];

export const tokenIndex = Object.fromEntries(
  tokens.map((token) => [token.cssVar, token]),
);
