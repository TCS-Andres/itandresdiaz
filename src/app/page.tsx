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
import { Contact } from "@/components/sections/contact";
import { site } from "@/lib/site";

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
    "Dental practice marketing",
    "Medical practice marketing",
    "AI implementation for healthcare practices",
    "Fractional CMO services",
    "Generative Engine Optimization",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
