import { Reveal } from "@/components/reveal";
import { pillars } from "@/lib/site";

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[5px] h-3.5 w-3.5 shrink-0 text-orange"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Services() {
  return (
    <section id="services" className="section bg-cream">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-orange-600">What I do</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Three disciplines, built to work as one.
          </h2>
          <p className="lede mt-5">
            Most businesses hire these separately and end up with three vendors who never
            talk to each other. I bring them together.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 110}>
              <article className="card group relative flex h-full flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-elevated">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-warm-gradient transition-transform duration-500 group-hover:scale-x-100"
                />
                <p className="font-display text-4xl font-bold text-navy-100 transition-colors group-hover:text-orange/40">
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
                      <Check />
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
