export const systems = [
  {
    id: "skyline",
    name: "Skyline",
    org: "Trepp",
    years: "2024 —",
    role: "UX Manager",
    summary:
      "Owned the system end to end — Figma libraries and design tokens through a versioned component package engineering imports across four products.",
    outcome:
      "40+ components, AI-assisted design-to-code, no dedicated systems engineering staff.",
  },
  {
    id: "ethos",
    name: "Ethos",
    org: "TIAA",
    years: "2022 — 2024",
    role: "Sr. UX Designer",
    summary:
      "Drove full adoption across 4–5 B2B product lines and wired design tokens into the shared component library so design and code stayed one source of truth.",
    outcome: "Adopted by every design and engineering team on those products."
  },
  {
    id: "ember",
    name: "Ember",
    org: "Solo Stove",
    years: "2021 — 2022",
    role: "Lead UX Designer",
    summary:
      "Led UX for US and European retail during a headless migration, and built Ember to unify the brand’s commerce experience across regions.",
    outcome: "One system for two continents and a new architecture."
  },
  {
    id: "momentum",
    name: "Momentum",
    org: "GM Financial",
    years: "2018 — 2021",
    role: "UX Manager",
    summary:
      "Scaled Momentum from UI kits to framework-level engineering while managing a team of eight designers across B2C, B2B, and international products.",
    outcome: "Adoption across ~6 engineering teams."
  },
] as const;

export const principles = [
  {
    title: "Tokens first",
    body: "Color, type, and radius are contracts — not decoration. If it isn’t a token, it isn’t in the product.",
  },
  {
    title: "No handoff gap",
    body: "Figma libraries, tokens, and production APIs are the same system. Engineers import a package. Designers don’t throw files over a wall.",
  },
  {
    title: "Adopted or it doesn’t exist",
    body: "A system that ships and isn’t used is a styleguide. Governance, mentoring, and component APIs are the work.",
  },
];
