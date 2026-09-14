import Image from "next/image";
import { CheckIcon } from "@/components/icons";
import { hero, site } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy pt-[72px] text-white">
      {/* Faint dot grid, fading out toward the edges, for depth behind the copy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_35%_45%,#000_20%,transparent_75%)]"
      />
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
            <span className="relative mt-[5px] flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
            </span>
            {hero.eyebrow}
          </p>

          {/*
            The mission line underlines itself in order: know, trust, do business.
            The text is static and fully readable the whole time; only the rule animates.
          */}
          <h1 className="mt-7 text-[2.6rem] leading-[1.08] sm:text-5xl lg:text-[3.9rem]">
            Get more people to{" "}
            <span className="ink whitespace-nowrap [animation-delay:250ms]">know you</span>,{" "}
            <span className="ink whitespace-nowrap [animation-delay:900ms]">trust you</span>, and{" "}
            <span className="ink [animation-delay:1550ms]">do business with you</span>.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            {hero.lede}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-primary group w-full sm:w-auto">
              Let us talk about your business
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a href="#guide" className="btn-ghost-dark w-full sm:w-auto">
              Get the free marketing guide
            </a>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {hero.proof.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange/15 text-orange">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
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
              <p className="font-display text-lg font-bold text-white">{site.name}</p>
              <p className="mt-1 text-sm leading-snug text-white/65">{site.role}</p>
              <p className="mt-0.5 text-sm font-medium text-orange">{site.company}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
