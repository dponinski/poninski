export type SystemId = "skyline" | "ethos" | "ember" | "momentum";

export type CaseStudyMedia = {
  /** Path under /public, e.g. "/work/skyline/library.png". */
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  challenge: string;
  approach: string[];
  adoption: string;
  results: string[];
  /** Add sanitized screenshots here; figures render only when present. */
  media: CaseStudyMedia[];
};

export type DesignSystem = {
  id: SystemId;
  name: string;
  org: string;
  years: string;
  role: string;
  summary: string;
  outcome: string;
  caseStudy: CaseStudy;
};

// Case-study copy is a first draft written from the résumé and the existing
// site copy. Edit freely — nothing here is generated at runtime.
export const systems: DesignSystem[] = [
  {
    id: "skyline",
    name: "Skyline",
    org: "Trepp",
    years: "2024 — Present",
    role: "UX Manager",
    summary:
      "Owned the system end to end — Figma libraries and design tokens through a versioned component package engineering imports across four products.",
    outcome:
      "40+ components, AI-assisted design-to-code, no dedicated systems engineering staff.",
    caseStudy: {
      challenge:
        "Trepp’s four data products needed one consistent interface, but there was no dedicated design system engineering staff to build or maintain a shared library. A single front-end team had to be able to consume the system and ship with it.",
      approach: [
        "Own the system end to end: Figma libraries, design tokens, and production-ready component code in one pipeline.",
        "Ship it as a versioned component package that engineering imports directly, so updates arrive as releases rather than redlines.",
        "Pioneer an AI-assisted design-to-code workflow that turns system decisions into code without a dedicated systems team.",
        "Ground components in ongoing user research with customers across the product portfolio.",
      ],
      adoption:
        "Skyline is imported directly across all four Trepp products. Working alongside product teams across the portfolio keeps the system tied to real product needs instead of drifting into a parallel styleguide.",
      results: [
        "40+ components shipped as a versioned package.",
        "Consumed across all 4 Trepp products.",
        "Delivered by a single front-end team, without dedicated design system engineering staff.",
      ],
      media: [
        // { src: "/work/skyline/library.png", alt: "Skyline Figma library overview", caption: "…", width: 1600, height: 1000 },
      ],
    },
  },
  {
    id: "ethos",
    name: "Ethos",
    org: "TIAA",
    years: "2022 — 2024",
    role: "Sr. UX Designer",
    summary:
      "Drove full adoption across 4–5 B2B product lines and wired design tokens into the shared component library so design and code stayed one source of truth.",
    outcome: "Adopted by every design and engineering team on those products.",
    caseStudy: {
      challenge:
        "Ethos had to serve 4–5 B2B product lines, each supported by multiple delivery teams. Design files and shipped code could easily drift apart, and product-specific needs pulled against system-level consistency.",
      approach: [
        "Partner with development to integrate design tokens into the shared component library, making design and code a single source of truth.",
        "Design components and patterns that span product lines, balancing product-specific needs with system-level consistency.",
        "Treat adoption as the goal: support each product line’s teams until the system was the default way to build.",
      ],
      adoption:
        "Ethos reached full adoption by every design and engineering team across the 4–5 B2B product lines it served.",
      results: [
        "Adopted by every design and engineering team on those product lines.",
        "Design tokens wired into the shared component library.",
        "Shared components and patterns across multiple product lines.",
      ],
      media: [],
    },
  },
  {
    id: "ember",
    name: "Ember",
    org: "Solo Stove",
    years: "2021 — 2022",
    role: "Lead UX Designer",
    summary:
      "Led UX for US and European retail during a headless migration, and built Ember to unify the brand’s commerce experience across regions.",
    outcome: "One system for two continents and a new architecture.",
    caseStudy: {
      challenge:
        "Solo Stove was moving its US and European retail websites from a legacy platform to a headless architecture. Without a shared system, each region and each new front end risked diverging from the brand.",
      approach: [
        "Lead UX across the US and European retail sites through the platform migration.",
        "Create Ember to unify the brand’s e-commerce experience across regions.",
        "Maintain Ember as the migration progressed, so the new architecture launched on shared foundations.",
      ],
      adoption:
        "Ember gave both regions one set of foundations and components while the underlying platform changed.",
      results: [
        "One system across two continents.",
        "A unified e-commerce experience through a headless migration.",
      ],
      media: [],
    },
  },
  {
    id: "momentum",
    name: "Momentum",
    org: "GM Financial",
    years: "2018 — 2021",
    role: "UX Manager",
    summary:
      "Scaled Momentum from UI kits to framework-level engineering while managing a team of eight designers across B2C, B2B, and international products.",
    outcome: "Adoption across ~6 engineering teams.",
    caseStudy: {
      challenge:
        "Momentum started as UI kits. GM Financial’s B2C, B2B, and international products needed it to become something engineering could build on directly, while the design team itself was growing.",
      approach: [
        "Scale Momentum from UI kits to framework-level engineering.",
        "Manage and grow a team of 8 designers spanning B2C, B2B, and international products.",
        "Define UX frameworks, processes, and career growth plans that raised design maturity across the organization.",
      ],
      adoption:
        "Momentum was adopted across roughly six engineering teams, backed by the processes and team structure needed to keep it in use.",
      results: [
        "Adoption across ~6 engineering teams.",
        "A team of 8 designers managed and grown.",
        "Higher design maturity through shared frameworks and career growth plans.",
      ],
      media: [],
    },
  },
];

export function getSystem(id: string) {
  return systems.find((system) => system.id === id);
}

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

export const stats = [
  { value: "13+", label: "Years in UX" },
  { value: "4", label: "Systems shipped" },
  { value: "40+", label: "Components" },
  { value: "8", label: "Designers led" },
] as const;

export const profile = {
  name: "David Poninski",
  title: "Design Systems Leader",
  location: "Dallas–Fort Worth, TX (Remote)",
  email: "dponinski@icloud.com",
  linkedin: "https://www.linkedin.com/in/dponinski",
  resume: "/David_Poninski_Resume_2026.pdf",
  url: "https://www.poninski.com",
} as const;
