import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Baskerville } from "next/font/google";
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

export const metadata: Metadata = {
  title: "David Poninski — Design Systems",
  description:
    "Portfolio of David Poninski, a design systems leader who takes tokens from Figma to production code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
