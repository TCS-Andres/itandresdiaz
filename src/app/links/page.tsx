import type { Metadata, Viewport } from "next";
import { CalendlyDialog } from "@/components/calendly-button";
import { FloatingCta } from "@/components/links/floating-cta";
import {
  AiCard,
  CallCard,
  GUIDE_FORM_ID,
  MarketingCard,
  GuideCard,
  LinksFooter,
  LinksHero,
  WorkCard,
} from "@/components/links/links-sections";
import { SectionTabs } from "@/components/links/section-tabs";
import { links } from "@/lib/links";
import { site } from "@/lib/site";

/**
 * The link-in-bio page: the one link on Instagram, Facebook, and every other
 * profile. A phone-sized column: a dark header with the main booking button,
 * a sticky tab bar, then one card per next step: call, AI, marketing, work,
 * guide.
 */
export const metadata: Metadata = {
  title: links.metaTitle,
  description: links.metaDescription,
  alternates: { canonical: "/links" },
  // A hub for people arriving from a profile. The home page is the one to rank.
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: `${site.url}/links`,
    title: links.metaTitle,
    description: links.metaDescription,
    siteName: `${site.name} | ${site.company}`,
    images: [{ url: "/andres-portrait.jpg", width: 960, height: 1200, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: links.metaTitle,
    description: links.metaDescription,
    images: ["/andres-portrait.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F3EF",
};

/** Calls and AI lead, then marketing; the free guide closes the page. Cards below follow the same order. */
const TABS = [links.call, links.ai, links.marketing, links.work, links.guide].map((card) => ({
  id: card.id,
  label: card.tab,
}));

export default function LinksPage() {
  return (
    <div className="links-page min-h-dvh overflow-x-clip">
      <main id="main" className="mx-auto max-w-[440px] px-4 pb-32">
        <LinksHero />

        <div className="mt-4">
          <SectionTabs tabs={TABS} />
          <div className="mt-4 grid gap-4">
            <CallCard />
            <AiCard />
            <MarketingCard />
            <WorkCard />
            <GuideCard />
          </div>
        </div>

        <LinksFooter />
      </main>

      <FloatingCta label={links.floatingCta} startAfter="links-top" hideWhileVisible={GUIDE_FORM_ID} />
      <CalendlyDialog />
    </div>
  );
}
