import { GlowBorder } from "@/components/glow-border";
import { CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { pillars, sections } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="section bg-cream">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-orange-600">{sections.services.eyebrow}</p>
          <h2 className="headline mt-4">{sections.services.title}</h2>
          <p className="lede mt-5">{sections.services.lede}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 110}>
              <article className="card group relative flex h-full flex-col hover:-translate-y-1.5 hover:shadow-elevated">
                <GlowBorder />
                <p className="font-display text-4xl font-bold text-navy-100 transition-colors duration-300 group-hover:text-orange/50">
                  {pillar.number}
                </p>
                <h3 className="mt-4 text-2xl">{pillar.title}</h3>
                <p className="mt-1.5 font-display text-sm font-semibold text-orange-600">
                  {pillar.tagline}
                </p>
                {/* flex-1 pushes the divider to a shared baseline across all three cards */}
                <p className="mt-4 flex-1 leading-relaxed text-navy-400">{pillar.body}</p>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug text-navy-400">
                      <CheckIcon className="mt-[3px] h-3.5 w-3.5 shrink-0 text-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
