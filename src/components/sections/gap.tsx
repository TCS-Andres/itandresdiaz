import { CalendarXIcon, EyeOffIcon, PhoneMissedIcon, SparklesIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { problems, sections } from "@/lib/site";

/** One icon per problem, in the same order as `problems` in site.ts. */
const ICONS = [PhoneMissedIcon, EyeOffIcon, CalendarXIcon, SparklesIcon];

export function Gap() {
  return (
    <section id="gap" className="section bg-cream">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-orange-600">{sections.gap.eyebrow}</p>
          <h2 className="headline mt-4">{sections.gap.title}</h2>
          <p className="lede mt-5">{sections.gap.lede}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {problems.map((problem, i) => {
            const Icon = ICONS[i] ?? SparklesIcon;
            return (
              <Reveal key={problem.title} delay={i * 90}>
                <article className="card group h-full hover:-translate-y-1 hover:border-orange/40 hover:shadow-elevated">
                  <div className="flex items-start gap-5">
                    <span
                      aria-hidden="true"
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange/12 text-orange-600 transition-colors duration-300 group-hover:bg-orange group-hover:text-navy"
                    >
                      <Icon className="h-[22px] w-[22px]" />
                    </span>
                    <div>
                      <h3 className="text-xl leading-snug">{problem.title}</h3>
                      <p className="mt-2.5 leading-relaxed text-navy-400">{problem.body}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <p className="mt-12 text-center font-display text-xl font-semibold text-navy-400 md:text-2xl">
            {sections.gap.closer}{" "}
            <span className="text-navy">{sections.gap.closerStrong}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
