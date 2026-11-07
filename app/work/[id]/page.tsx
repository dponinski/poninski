import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inspectable } from "@/components/inspectable";
import { PageShell } from "@/components/site-chrome";
import { brandIdentities } from "@/lib/brands";
import { getSystem, profile, systems } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return systems.map((system) => ({ id: system.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const system = getSystem((await params).id);
  if (!system) return {};

  const title = `${system.name} — ${system.org} · ${profile.name}`;
  return {
    title,
    description: system.summary,
    alternates: { canonical: `/work/${system.id}` },
    openGraph: { title, description: system.summary, url: `/work/${system.id}` },
    twitter: { card: "summary_large_image", title, description: system.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const system = getSystem((await params).id);
  if (!system) notFound();

  const brand = brandIdentities[system.id];
  const { caseStudy } = system;
  const index = systems.findIndex((item) => item.id === system.id);
  const previous = systems[(index - 1 + systems.length) % systems.length];
  const next = systems[(index + 1) % systems.length];

  const facts = [
    ["Organization", system.org],
    ["Role", system.role],
    ["Years", system.years],
    ["Products", caseStudy.products.join(", ")],
  ] as const;

  return (
    <PageShell>
      <article
        className="study"
        style={
          {
            "--brand-primary": brand.primary,
            "--brand-accent": brand.accent,
          } as React.CSSProperties
        }
      >
        <header className="study__hero">
          <div className="shell">
            <a className="study__back" href="/#work">
              ← All systems
            </a>
            <p className="study__kicker">Design system · {system.org}</p>
            <h1>{system.name}</h1>
            <p className="study__summary">{system.summary}</p>
          </div>
        </header>

        <div className="shell">
          <dl className="study__facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <section className="study__section" aria-labelledby="challenge">
            <h2 id="challenge">The challenge</h2>
            <p>{caseStudy.challenge}</p>
          </section>

          <section className="study__section" aria-labelledby="approach">
            <h2 id="approach">Approach</h2>
            <ol className="study__steps">
              {caseStudy.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          {caseStudy.media.length > 0 && (
            <section className="study__media" aria-label="Screens">
              {caseStudy.media.map((item) => (
                <figure key={item.src}>
                  {/* Static export of designer-supplied screenshots. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                  />
                  {item.caption && <figcaption>{item.caption}</figcaption>}
                </figure>
              ))}
            </section>
          )}

          <section className="study__section" aria-labelledby="adoption">
            <h2 id="adoption">Adoption</h2>
            <p>{caseStudy.adoption}</p>
          </section>

          <section className="study__section" aria-labelledby="results">
            <h2 id="results">Results</h2>
            <ul className="study__results">
              {caseStudy.results.map((result) => (
                <Inspectable
                  key={result}
                  as="li"
                  label={`${system.name} result`}
                  tokens={[`--brand-accent: ${brand.accent}`, "--font-family-serif"]}
                >
                  {result}
                </Inspectable>
              ))}
            </ul>
          </section>

          <nav className="study__pager" aria-label="More systems">
            <a href={`/work/${previous.id}`}>
              <span>Previous</span>
              {previous.name} · {previous.org}
            </a>
            <a href={`/work/${next.id}`}>
              <span>Next</span>
              {next.name} · {next.org}
            </a>
          </nav>
        </div>
      </article>
    </PageShell>
  );
}
