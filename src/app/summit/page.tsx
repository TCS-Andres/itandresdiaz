import type { Metadata } from "next";
import { MobileCta } from "@/components/mobile-cta";
import { SummitHeader } from "@/components/summit/summit-header";
import {
  SummitBook,
  SummitHero,
  SummitSession,
  SummitStayInTouch,
  SummitTeam,
} from "@/components/summit/sections";
import { site } from "@/lib/site";
import { CONTACT_CARD_PATH, summit } from "@/lib/summit";

export const metadata: Metadata = {
  title: summit.metaTitle,
  description: summit.metaDescription,
  alternates: { canonical: "/summit" },
  // An event offer for the people in the room, not something to rank in search.
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: `${site.url}/summit`,
    title: summit.metaTitle,
    description: summit.metaDescription,
    siteName: `${site.name} | ${site.company}`,
    images: [{ url: "/andres-portrait.jpg", width: 960, height: 1200, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: summit.metaTitle,
    description: summit.metaDescription,
    images: ["/andres-portrait.jpg"],
  },
};

const HIDE_NOTHING: string[] = [];

export default function SummitPage() {
  return (
    <>
      <SummitHeader />
      <main id="main">
        <SummitHero />
        <SummitSession />
        <SummitTeam />
        <SummitBook />
        <SummitStayInTouch />
      </main>
      <MobileCta
        primary={{ href: "#book", label: summit.hero.primaryCta }}
        secondary={{ href: CONTACT_CARD_PATH, label: "Save contact" }}
        startAfter="summit-top"
        hideWhileVisible={HIDE_NOTHING}
        stopAt="book"
      />
    </>
  );
}
