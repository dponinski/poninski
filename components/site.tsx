"use client";

import { useState } from "react";
import { principles, systems } from "@/lib/content";
import { tokens } from "@/lib/tokens";
import { InspectProvider, useInspect } from "./inspect";
import { TokenField } from "./token-field";

const defaultSpecimen = {
  font: "--font-family-serif",
  size: "--font-size-h3",
  weight: "--font-weight-regular",
  spacing: "--spacing-sm",
  radius: "--radius-md",
};

const defaultColors = {
  text: "#0D0D0D",
  border: "#2A2A2A",
  surface: "#FFFFFF",
};

const colorRoles = [
  { key: "text", label: "Text", token: "--lab-text-color" },
  { key: "border", label: "Border", token: "--lab-border-color" },
  { key: "surface", label: "Surface", token: "--lab-surface-color" },
] as const;

const selectorGroups = [
  { label: "Font family", valueKey: "font", group: "fontFamily" },
  { label: "Type size", valueKey: "size", group: "fontSize" },
  { label: "Font weight", valueKey: "weight", group: "fontWeight" },
  { label: "Spacing", valueKey: "spacing", group: "spacing" },
  { label: "Corner radius", valueKey: "radius", group: "radius" },
] as const;

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
            tokens: [
              "--font-family-serif",
              "--font-family-mono",
              "--color-text-resting-stronger",
            ],
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
                  "--font-family-mono",
                  "--color-text-active-strong",
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
        <div className="hero__actions">
          <a className="button button--primary" href="#work">
            Explore selected work <span aria-hidden="true">↘</span>
          </a>
          <a className="button button--quiet" href="mailto:hello@poninski.com">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
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
                    "--font-family-serif",
                    "--font-family-mono",
                    "--color-text-resting-muted",
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
            aria-controls={`project-detail-${system.id}`}
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
            <div className="card__detail" id={`project-detail-${system.id}`}>
              {system.role}. {system.outcome}
            </div>
            <span className="card__toggle" aria-hidden="true">
              {open === system.id ? "− Close notes" : "+ Project notes"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function TokenLab() {
  const { inspect } = useInspect();
  const [picked, setPicked] = useState(defaultSpecimen);
  const [colors, setColors] = useState(defaultColors);
  const textContrast = getContrastRatio(colors.text, colors.surface);
  const borderContrast = getContrastRatio(colors.border, colors.surface);

  return (
    <section className="section section--lab shell" id="tokens">
      <div className="section__head">
        <div>
          <p className="kicker">A small, live system</p>
          <h2>Make it yours.</h2>
        </div>
        <p>
          Choose three semantic colors, then tune the supporting tokens. The
          component preview updates as you go.
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
            <div className="contrast-checker__item">
              <span className="contrast-checker__label">
                Text on surface · 4.5:1
              </span>
              <strong>
                {textContrast.toFixed(2)}:1 ·{" "}
                {textContrast >= 4.5 ? "Pass AA" : "Fails AA"}
              </strong>
            </div>
            <div className="contrast-checker__item">
              <span className="contrast-checker__label">
                Ghost button border · 3:1
              </span>
              <strong>
                {borderContrast.toFixed(2)}:1 ·{" "}
                {borderContrast >= 3 ? "Pass AA" : "Fails AA"}
              </strong>
            </div>
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
            <button
              type="button"
              className="reset-button"
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
              Reset to defaults
            </button>
          </div>
        </div>
        <aside
          className="specimen"
          style={
            {
              "--lab-text-color": colors.text,
              "--lab-border-color": colors.border,
              "--lab-surface-color": colors.surface,
              "--specimen-font": `var(${picked.font})`,
              "--specimen-size": `var(${picked.size})`,
              "--specimen-weight": `var(${picked.weight})`,
              "--specimen-spacing": `var(${picked.spacing})`,
              "--specimen-radius": `var(${picked.radius})`,
            } as React.CSSProperties
          }
        >
        <span className="specimen__label">Live token preview</span>
        <div className="specimen__content">
          <h3>Built to belong.</h3>
            <p>
            Three color tokens. One flexible component. Change the system,
            not the interface.
            </p>
          <span className="specimen__btn">Explore the system <span aria-hidden="true">↗</span></span>
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
                tokens: [
                  "--font-family-serif",
                  "--color-text-resting-strong",
                  "--radius-md",
                ],
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
    ["mailto:dponinski@icloud.com", "Email"],
  ] as const;

  return (
    <footer className="footer shell" id="contact">
      <div>
        <p className="kicker">Currently exploring</p>
        <h2>Design Systems roles.</h2>
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
                tokens: [
                  "--radius-full",
                  "--color-text-active-strong",
                  "--font-family-mono",
                ],
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
      <main>
        <Hero />
        <Work />
        <TokenLab />
        <Approach />
      </main>
      <Footer />
    </InspectProvider>
  );
}
