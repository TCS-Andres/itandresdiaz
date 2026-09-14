import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Gap } from "@/components/sections/gap";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { MasterBrain } from "@/components/sections/master-brain";
import { Paths } from "@/components/sections/paths";
import { Process } from "@/components/sections/process";
import { Guide } from "@/components/sections/guide";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { MobileCta } from "@/components/mobile-cta";
import { faqs, site } from "@/lib/site";

/** Person + ProfessionalService markup so search and AI engines can read the page. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name}, ${site.company}`,
  description: site.metaDescription,
  url: site.url,
  email: site.email,
  areaServed: "United States",
  founder: {
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: site.email,
    sameAs: [site.social.linkedin, site.social.instagram, site.website],
  },
  address: { "@type": "PostalAddress", addressRegion: "FL", addressCountry: "US" },
  knowsAbout: [
    "Marketing strategy",
    "AI implementation for small and mid sized business",
    "Fractional CMO services",
    "Marketing automation",
    "Generative Engine Optimization",
  ],
};

/** The FAQ section as structured data, so search and AI answers can quote it directly. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteNav />
      <main id="main">
        <Hero />
        <Marquee />
        <Gap />
        <About />
        <Services />
        <MasterBrain />
        <Paths />
        <Process />
        <Guide />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCta />
    </>
  );
}
