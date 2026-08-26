import type { Metadata, Viewport } from "next";
import { Quicksand, DM_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.metaTitle,
  description: site.metaDescription,
  keywords: [
    "dental marketing",
    "medical practice marketing",
    "healthcare AI implementation",
    "fractional CMO healthcare",
    "AI voice agent dental",
    "med spa marketing",
    "wellness clinic marketing",
  ],
  authors: [{ name: site.name, url: site.website }],
  openGraph: {
    type: "website",
    url: site.url,
    title: site.metaTitle,
    description: site.metaDescription,
    siteName: `${site.name} | ${site.company}`,
    images: [{ url: "/andres-portrait.jpg", width: 960, height: 1200, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.metaTitle,
    description: site.metaDescription,
    images: ["/andres-portrait.jpg"],
  },
  icons: { icon: "/logo-mark.png", apple: "/logo-mark.png" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1C192A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {/*
          Sections start hidden so they can fade in on scroll, which depends on
          a script. If scripting is off, nothing would ever reveal them, so this
          override restores every section to visible.
        */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
