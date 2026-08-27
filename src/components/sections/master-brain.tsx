import { Reveal } from "@/components/reveal";
import { masterBrain } from "@/lib/site";

export function MasterBrain() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle,#2B69D8 0%,transparent 65%)" }}
      />

      <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-gold">{masterBrain.eyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
            {masterBrain.title}
          </h2>
          <p className="mt-6 font-display text-lg font-semibold leading-snug text-orange">
            {masterBrain.callout}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-5 text-[17px] leading-relaxed text-white/70">
            {masterBrain.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-9 rounded-2xl border border-white/12 bg-white/[0.05] p-6">
            <p className="eyebrow text-white/45">The Master Brain captures</p>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {masterBrain.captures.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug text-white/80">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
