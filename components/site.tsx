"use client";

import { useMemo, useState } from "react";
import { principles, systems } from "@/lib/content";
import { tokens } from "@/lib/tokens";
import { InspectProvider, Inspector, useInspect } from "./inspect";
import { TokenField } from "./token-field";

const defaultSpecimen = {
  bg: "--color-resting-stronger",
  fg: "--color-resting-subtle",
  accent: "--color-active-muted",
  accentFg: "--color-active-stronger",
  font: "--font-serif",
  weight: "--font-weight-regular",
  radius: "--radius-md",
};

function Nav() {
  const { inspect, reset } = useInspect();
  const links = [
    ["#work", "Work"],
    ["#tokens", "Tokens"],
    ["#approach", "Approach"],
    ["#contact", "Contact"],
  ] as const;

  return (
    <header className="nav shell">
      <a
        href="#top"
        className="nav__mark"
        onMouseEnter={() =>
          inspect({
            label: "Wordmark",
            tokens: ["--font-serif", "--font-mono", "--color-resting-stronger"],
          })
        }
        onMouseLeave={reset}
      >
        David Poninski <span>DS / 16</span>
      </a>
      <nav className="nav__links" aria-label="Sections">
        {links.map(([href, label]) => (
          <a
            key={href}
            href={href}
            onMouseEnter={() =>
              inspect({
                label: `${label} link`,
                tokens: [
                  "--radius-full",
                  "--font-mono",
                  "--color-active-strong",
                ],
              })
            }
            onMouseLeave={reset}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const { inspect, reset } = useInspect();

  return (
    <section className="hero shell" id="top">
      <div>
        <p className="kicker">Design systems · Coppell, TX</p>
        <h1>
          Systems that
          <br />
          <em>engineering adopts.</em>
        </h1>
        <p className="lede">
          I take Figma libraries and design tokens all the way to production
          code. Four systems shipped. No handoff gap. No drift.
        </p>
        <div className="stats">
          {[
            ["4", "Systems owned"],
            ["13+", "Years in UX"],
            ["40+", "Skyline components"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="stat"
              onMouseEnter={() =>
                inspect({
                  label,
                  tokens: [
                    "--font-serif",
                    "--font-mono",
                    "--color-resting-muted",
                  ],
                })
              }
              onMouseLeave={reset}
            >
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <TokenField />
    </section>
  );
}

function Work() {
  const { inspect, reset } = useInspect();
  const [open, setOpen] = useState<string | null>("skyline");

  return (
    <section className="section shell" id="work">
      <div className="section__head">
        <h2>Libraries in the wild</h2>
        <p>
          Each system is a different org, a different stack, the same bet:
          tokens as the contract between design and code.
        </p>
      </div>
      <div className="work">
        {systems.map((system) => (
          <button
            key={system.id}
            type="button"
            className="card"
            aria-expanded={open === system.id}
            onClick={() =>
              setOpen((current) => (current === system.id ? null : system.id))
            }
            onMouseEnter={() =>
              inspect({
                label: `${system.name} / ${system.org}`,
                tokens: [...system.tokens],
              })
            }
            onMouseLeave={reset}
          >
            <div className="card__top">
              <span>{system.org}</span>
              <span>{system.years}</span>
            </div>
            <h3>{system.name}</h3>
            <p>{system.summary}</p>
            <div className="card__tokens">
              {system.tokens.map((token) => (
                <span className="chip" key={token}>
                  {token.replace("--", "")}
                </span>
              ))}
            </div>
            <div className="card__detail">
              {system.role}. {system.outcome}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function TokenLab() {
  const { inspect } = useInspect();
  const [picked, setPicked] = useState(defaultSpecimen);

  const groups = useMemo(
    () => ({
      color: tokens.filter((token) => token.group === "color"),
      font: tokens.filter((token) => token.group === "font"),
      weight: tokens.filter((token) => token.group === "weight"),
      radius: tokens.filter((token) => token.group === "radius"),
    }),
    [],
  );

  const apply = (cssVar: string, group: string) => {
    setPicked((current) => {
      if (group === "font") return { ...current, font: cssVar };
      if (group === "weight") return { ...current, weight: cssVar };
      if (group === "radius") return { ...current, radius: cssVar };
      if (cssVar.includes("resting-subtle") || cssVar.includes("resting-muted")) {
        return { ...current, fg: cssVar };
      }
      if (cssVar.includes("resting")) {
        return { ...current, bg: cssVar };
      }
      if (cssVar.includes("active-stronger") || cssVar.includes("active-strong")) {
        return { ...current, accentFg: cssVar };
      }
      return { ...current, accent: cssVar };
    });
    inspect({ label: "Specimen", tokens: [cssVar] });
  };

  return (
    <section className="section shell" id="tokens">
      <div className="section__head">
        <h2>A living token file</h2>
        <p>
          This site is painted only from the primitives in tokens.css. Click a
          value — the specimen on the right restyles in place.
        </p>
      </div>
      <div className="lab">
        <div className="token-grid">
          {(
            [
              ["Color", groups.color],
              ["Family", groups.font],
              ["Weight", groups.weight],
              ["Radius", groups.radius],
            ] as const
          ).map(([label, list]) => (
            <div key={label}>
              <p className="kicker">{label}</p>
              <div className="token-row">
                {list.map((token) => {
                  const selected = Object.values(picked).includes(token.cssVar);
                  return (
                    <button
                      key={token.cssVar}
                      type="button"
                      className={selected ? "token-btn is-on" : "token-btn"}
                      onClick={() => apply(token.cssVar, token.group)}
                      onMouseEnter={() =>
                        inspect({
                          label: token.name,
                          tokens: [token.cssVar],
                        })
                      }
                    >
                      {token.preview === "swatch" ? (
                        <span
                          className="swatch"
                          style={{ background: `var(${token.cssVar})` }}
                        />
                      ) : null}
                      {token.preview === "type" && token.group === "font" ? (
                        <span
                          className="type-chip"
                          style={{ fontFamily: `var(${token.cssVar})` }}
                        >
                          Ag
                        </span>
                      ) : null}
                      {token.preview === "type" && token.group === "weight" ? (
                        <span
                          className="type-chip"
                          style={{ fontWeight: `var(${token.cssVar})` }}
                        >
                          Ag
                        </span>
                      ) : null}
                      {token.preview === "radius" ? (
                        <span
                          className="radius-chip"
                          style={{
                            borderRadius: `var(${token.cssVar})`,
                            height: 48,
                          }}
                        />
                      ) : null}
                      <small>{token.cssVar.replace("--", "")}</small>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <aside
          className="specimen"
          style={
            {
              "--specimen-bg": `var(${picked.bg})`,
              "--specimen-fg": `var(${picked.fg})`,
              "--specimen-accent": `var(${picked.accent})`,
              "--specimen-accent-fg": `var(${picked.accentFg})`,
              "--specimen-font": `var(${picked.font})`,
              "--specimen-weight": `var(${picked.weight})`,
              "--specimen-radius": `var(${picked.radius})`,
            } as React.CSSProperties
          }
        >
          <span className="specimen__label">Component specimen</span>
          <div>
            <h3>Skyline Button</h3>
            <p>
              One component, seven tokens. Change the primitives and the API
              stays put — the surface restyles because it never knew hex.
            </p>
            <span className="specimen__btn">Import from package</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Approach() {
  const { inspect, reset } = useInspect();

  return (
    <section className="section shell" id="approach">
      <div className="section__head">
        <h2>How the work holds</h2>
        <p>
          Hands-on systems design and people leadership in the same seat —
          governance, mentoring, and still deep on token architecture.
        </p>
      </div>
      <div className="principles">
        {principles.map((principle) => (
          <article
            key={principle.title}
            onMouseEnter={() =>
              inspect({
                label: principle.title,
                tokens: ["--font-serif", "--color-resting-strong", "--radius-md"],
              })
            }
            onMouseLeave={reset}
          >
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const { inspect, reset } = useInspect();
  const links = [
    ["https://www.linkedin.com/in/dponinski", "LinkedIn"],
    ["https://dribbble.com/poninski", "Dribbble"],
    ["mailto:hello@poninski.com", "Email"],
  ] as const;

  return (
    <footer className="footer shell" id="contact">
      <div>
        <p className="kicker">Currently exploring</p>
        <h2>Design Systems Manager roles.</h2>
        <p>Remote. Tokens to production. Teams that want the system used.</p>
      </div>
      <div className="footer__links">
        {links.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="chip"
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            onMouseEnter={() =>
              inspect({
                label,
                tokens: ["--radius-full", "--color-active-strong", "--font-mono"],
              })
            }
            onMouseLeave={reset}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}

export function Site() {
  return (
    <InspectProvider>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Nav />
      <Hero />
      <Work />
      <TokenLab />
      <Approach />
      <Footer />
      <Inspector />
    </InspectProvider>
  );
}
