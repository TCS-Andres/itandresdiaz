import { FaqList } from "@/components/faq-list";
import { MailIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { faqs, site } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="section bg-white">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-orange-600">Questions</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            What owners usually ask first.
          </h2>
          <p className="lede mt-5">
            Straight answers before you reach out. If yours is not here, just ask me.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              Ask me directly
            </a>
            <a href={`mailto:${site.email}`} className="btn-ghost-light w-full sm:w-auto">
              <MailIcon className="h-4 w-4" />
              Send an email
            </a>
          </div>
        </Reveal>

        <FaqList items={faqs} />
      </div>
    </section>
  );
}
