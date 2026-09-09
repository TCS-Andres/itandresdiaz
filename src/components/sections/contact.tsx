import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[560px] w-[560px] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(circle,#F28D3D 0%,transparent 68%)" }}
      />

      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-orange">Let us talk</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Tell me about your business.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            No pitch and no pressure. Just a conversation about where you are and whether I am
            the right person to help.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={110} className="flex flex-col gap-4">
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/12 bg-white/[0.05] p-6 transition-colors hover:border-orange/50 hover:bg-white/[0.08]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-orange text-navy">
                <CalendarIcon />
              </span>
              <p className="mt-4 font-display text-lg font-bold">Rather just talk?</p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/65">
                Grab 30 minutes on my calendar. Pick a time that works around your
                schedule.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-display text-[15px] font-bold text-orange">
                Open my calendar
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="group rounded-2xl border border-white/12 bg-white/[0.05] p-6 transition-colors hover:border-orange/50 hover:bg-white/[0.08]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-orange">
                <MailIcon />
              </span>
              <p className="mt-4 font-display text-lg font-bold">Email me directly</p>
              <p className="mt-2 break-words text-[15px] leading-relaxed text-white/65">
                {site.email}
              </p>
            </a>

            <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6">
              <p className="eyebrow text-white/45">Also here</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-4 py-2 font-display text-sm font-semibold transition-colors hover:border-orange hover:text-orange"
                >
                  LinkedIn
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-4 py-2 font-display text-sm font-semibold transition-colors hover:border-orange hover:text-orange"
                >
                  Instagram
                </a>
                <a
                  href={site.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-4 py-2 font-display text-sm font-semibold transition-colors hover:border-orange hover:text-orange"
                >
                  {site.company}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
