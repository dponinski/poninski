import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Baskerville } from "next/font/google";
import { profile } from "@/lib/content";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--next-font-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--next-font-mono",
});

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--next-font-serif",
});

const description =
  "Portfolio of David Poninski, a design systems leader who takes tokens from Figma to production code.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: "David Poninski — Design Systems Leader",
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: "David Poninski — Design Systems Leader",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "David Poninski — Design Systems Leader",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      // The theme script may set data-theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
