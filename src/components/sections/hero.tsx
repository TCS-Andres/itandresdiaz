import Image from "next/image";
import { hero, site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy pt-[72px] text-white">
      {/* Warm glow behind the portrait, cool glow top left. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[680px] w-[680px] rounded-full opacity-[0.22] blur-3xl"
        style={{ background: "radial-gradient(circle,#F28D3D 0%,transparent 68%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-40 h-[520px] w-[520px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle,#2B69D8 0%,transparent 68%)" }}
      />

      <div className="container relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-28">
        <div>
          <p className="eyebrow inline-flex items-start gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-orange">
            <span
              className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
              aria-hidden="true"
            />
            {hero.eyebrow}
          </p>

          <h1 className="mt-7 text-[2.6rem] leading-[1.06] sm:text-5xl lg:text-[3.9rem]">
            Get more patients to{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">know you</span>
              {/* Sits clear of the descenders so it reads as a rule, not a strikethrough. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 z-0 h-1.5 rounded-full bg-orange"
              />
            </span>
            , trust you, and choose you.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            {hero.lede}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              Let us talk about your practice
            </a>
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-dark w-full sm:w-auto"
            >
              Book a 30 minute call
            </a>
          </div>

          <p className="mt-6 text-sm text-white/45">
            Based in {site.location}. Working with practices nationwide.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          {/* Gradient frame behind the portrait */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[32px] bg-brand-gradient opacity-25 blur-xl"
          />
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-navy-600 shadow-elevated">
            <Image
              src="/andres-portrait.jpg"
              alt="Andres Diaz, founder of The Creative Strategist"
              width={960}
              height={1200}
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="h-auto w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy via-navy/70 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-lg font-bold text-white">Andres Diaz</p>
              <p className="mt-1 text-sm leading-snug text-white/65">{site.role}</p>
              <p className="mt-0.5 text-sm font-medium text-orange">{site.company}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
