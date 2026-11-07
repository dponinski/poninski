import { brandIdentities } from "@/lib/brands";
import { principles, profile, stats, systems } from "@/lib/content";
import { Inspectable } from "./inspectable";
import { PageShell } from "./site-chrome";
import { TokenField } from "./token-field";
import { TokenLab } from "./token-lab";

function Hero() {
  return (
    <section className="hero shell" id="top">
      <div>
        <p className="kicker">
          {profile.name} · {profile.title} · {profile.location}
        </p>
        <h1>
          Systems that
          <br />
          <em>engineering adopts.</em>
        </h1>
        <p className="hero__lede">
          I build token-driven design systems — Figma libraries through
          versioned component packages — and the governance that gets them
          adopted.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#work">
            Explore selected work
          </a>
          <a className="button button--quiet" href={profile.resume} download>
            Download résumé
          </a>
          <a className="button button--quiet" href={`mailto:${profile.email}`}>
            Get in touch
          </a>
        </div>
        <dl className="stats">
          {stats.map((stat) => (
            <Inspectable
              key={stat.label}
              className="stat"
              label={stat.label}
              tokens={["--font-family-serif", "--font-size-h5"]}
            >
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </Inspectable>
          ))}
        </dl>
      </div>
      <TokenField />
    </section>
  );
}

function Work() {
  return (
    <section className="section shell" id="work">
      <div className="section__head">
        <h2>Selected systems</h2>
        <p>
          Each system is a different org, a different stack, the same bet:
          tokens as the contract between design and code.
        </p>
      </div>
      <div className="work">
        {systems.map((system) => {
          const brand = brandIdentities[system.id];
          return (
            <Inspectable
              as="article"
              key={system.id}
              className={`card card--${system.id}`}
              style={
                {
                  "--brand-primary": brand.primary,
                  "--brand-accent": brand.accent,
                } as React.CSSProperties
              }
              label={`${system.name} / ${system.org}`}
              tokens={[
                `--brand-primary: ${brand.primary}`,
                `--brand-accent: ${brand.accent}`,
              ]}
            >
              <div className="card__top">
                <span>Design system</span>
                <span>{system.years}</span>
              </div>
              <div className="card__brand">
                <span className="card__brand-name">{system.org}</span>
              </div>
              <h3>
                {/* Stretched link: the whole card is clickable, one tab stop. */}
                <a className="card__link" href={`/work/${system.id}`}>
                  {system.name}
                  <span className="visually-hidden"> case study</span>
                </a>
              </h3>
              <p>{system.summary}</p>
              <div className="card__detail">
                {system.role}. {system.outcome}
              </div>
              <span className="card__cta" aria-hidden="true">
                Read the case study →
              </span>
            </Inspectable>
          );
        })}
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="section shell" id="approach">
      <div className="section__head">
        <h2>How I work</h2>
        <p>
          Hands-on systems design and people leadership in the same seat —
          governance, mentoring, and still deep on token architecture.
        </p>
      </div>
      <div className="principles">
        {principles.map((principle) => (
          <Inspectable
            as="article"
            key={principle.title}
            label={principle.title}
            tokens={[
              "--font-family-serif",
              "--color-text-resting-strong",
              "--radius-md",
            ]}
          >
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </Inspectable>
        ))}
      </div>
    </section>
  );
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: profile.url,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin],
  knowsAbout: ["Design systems", "Design tokens", "Component libraries", "UX design"],
};

export function Site() {
  return (
    <PageShell>
      <Hero />
      <Work />
      <TokenLab />
      <Approach />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </PageShell>
  );
}
