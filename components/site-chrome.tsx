import type { ReactNode } from "react";
import { profile } from "@/lib/content";
import { InspectProvider, Inspector } from "./inspect";
import { Inspectable } from "./inspectable";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  ["/#work", "Work"],
  ["/#tokens", "Lab"],
  ["/#approach", "Approach"],
  ["#contact", "Contact"],
] as const;

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a className="site-header__name" href="/">
          {profile.name}
        </a>
        <nav aria-label="Sections" className="site-header__nav">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="site-header__actions">
          <a className="site-header__resume" href={profile.resume} download>
            Résumé
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const links = [
    { href: profile.linkedin, label: "LinkedIn", external: true },
    { href: `mailto:${profile.email}`, label: "Email" },
    { href: profile.resume, label: "Résumé (PDF)", download: true },
  ];

  return (
    <footer className="footer shell" id="contact">
      <div>
        <p className="kicker">Currently exploring</p>
        <h2>Design Systems roles.</h2>
        <p>Remote. Tokens to production. Teams that want the system used.</p>
      </div>
      <div className="footer__links">
        {links.map(({ href, label, external, download }) => (
          <Inspectable
            as="a"
            key={href}
            href={href}
            className="chip"
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            download={download}
            label={label}
            tokens={[
              "--radius-full",
              "--color-text-active-strong",
              "--font-family-mono",
            ]}
          >
            {label}
          </Inspectable>
        ))}
      </div>
    </footer>
  );
}

/** Skip link, header, footer and token inspector shared by every page. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <InspectProvider>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <Inspector />
    </InspectProvider>
  );
}
