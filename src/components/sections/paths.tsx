import { GlowBorder } from "@/components/glow-border";
import { InterestLink } from "@/components/interest-link";
import { Reveal } from "@/components/reveal";
import { paths } from "@/lib/site";

export function Paths() {
  return (
    <section className="section bg-white">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-orange-600">Ways to work together</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Start where it makes sense for your business.
          </h2>
          <p className="lede mt-5">
            No single package everyone gets pushed into. What we build depends on where you are.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {paths.map((path, i) => (
            <Reveal key={path.title} delay={i * 110}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                  path.featured
                    ? "border-orange bg-navy text-white shadow-elevated"
                    : "border-line bg-cream shadow-soft hover:shadow-elevated"
                }`}
              >
                <GlowBorder />
                {path.featured && (
                  <p className="eyebrow mb-4 inline-flex w-fit rounded-full bg-orange px-3 py-1.5 text-navy">
                    Most common
                  </p>
                )}
                <h3 className={`text-2xl ${path.featured ? "text-white" : ""}`}>{path.title}</h3>
                <p
                  className={`mt-1.5 font-display text-sm font-semibold ${
                    path.featured ? "text-orange" : "text-orange-600"
                  }`}
                >
                  {path.subtitle}
                </p>
                <p
                  className={`mt-4 flex-1 leading-relaxed ${
                    path.featured ? "text-white/70" : "text-navy-400"
                  }`}
                >
                  {path.body}
                </p>
                <p
                  className={`mt-6 border-t pt-5 font-display text-[15px] font-semibold leading-snug ${
                    path.featured ? "border-white/15 text-white/85" : "border-line text-navy"
                  }`}
                >
                  {path.best}
                </p>
                <InterestLink
                  interest={path.interest}
                  className={`group/link mt-4 inline-flex min-h-[44px] w-fit items-center gap-2 font-display text-[15px] font-bold ${
                    path.featured ? "text-orange" : "text-orange-600"
                  }`}
                >
                  Talk about this option
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-1">
                    &rarr;
                  </span>
                </InterestLink>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mx-auto mt-12 max-w-xl text-center leading-relaxed text-navy-400">
            We scope it together, and you see the full investment before you commit to anything.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
