import Image from "next/image";
import { GuideForm } from "@/components/guide-form";
import { Reveal } from "@/components/reveal";
import { guide } from "@/lib/site";

export function Guide() {
  return (
    <section id="guide" className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-10 h-[600px] w-[600px] rounded-full opacity-[0.20] blur-3xl"
        style={{ background: "radial-gradient(circle,#2B69D8 0%,transparent 68%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle,#F28D3D 0%,transparent 68%)" }}
      />

      {/*
        Source order is cover, pitch and form, then the pull quote, so on a phone
        the form arrives right after the pitch. On desktop the quote tucks under
        the cover in the left column.
      */}
      <div className="container relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <Reveal className="mx-auto w-full max-w-[240px] sm:max-w-[300px] lg:col-start-1 lg:row-start-1 lg:mt-4 lg:max-w-[360px]">
          <div className="group relative [perspective:1400px]">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[26px] bg-brand-gradient opacity-25 blur-xl transition-opacity duration-500 group-hover:opacity-40"
            />
            <Image
              src="/guide-cover.jpg"
              alt="Cover of The Complete Guide to Marketing Channels"
              width={850}
              height={1100}
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 360px"
              className="relative rounded-xl border border-white/12 shadow-elevated transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:[transform:rotateY(10deg)_rotateX(3deg)] lg:group-hover:[transform:rotateY(0deg)_rotateX(0deg)]"
            />
          </div>
        </Reveal>

        <Reveal delay={90} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <p className="eyebrow text-orange">{guide.eyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
            {guide.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{guide.lede}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {guide.facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-white/20 px-3.5 py-1.5 font-display text-[13px] font-semibold text-white/80"
              >
                {fact}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.05] p-6">
            <GuideForm />
          </div>

          <p className="eyebrow mt-8 text-white/40">What is inside</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {guide.categories.map((category) => (
              <li
                key={category}
                className="flex items-center gap-2 text-[14px] leading-snug text-white/60"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70"
                  aria-hidden="true"
                />
                {category}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140} className="lg:col-start-1 lg:row-start-2">
          <blockquote className="border-l-[3px] border-orange pl-5">
            <p className="font-display text-lg font-semibold leading-snug text-white">
              &ldquo;{guide.pullQuote}&rdquo;
            </p>
            <p className="mt-2.5 text-[15px] leading-relaxed text-white/65">{guide.pullBody}</p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
