import { FaqList } from "@/components/faq-list";
import { MailIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { faqs, sections, site } from "@/lib/site";

const intro = sections.faq;

export function Faq() {
  return (
    <section id="faq" className="section bg-white">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-orange-600">{intro.eyebrow}</p>
          <h2 className="headline mt-4">{intro.title}</h2>
          <p className="lede mt-5">{intro.lede}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              {intro.primaryCta}
            </a>
            <a href={`mailto:${site.email}`} className="btn-ghost-light w-full sm:w-auto">
              <MailIcon className="h-4 w-4" />
              {intro.secondaryCta}
            </a>
          </div>
        </Reveal>

        <FaqList items={faqs} />
      </div>
    </section>
  );
}
