import { Reveal } from "@/components/reveal";
import { processSteps, values } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="section bg-cream">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-orange-600">How it works</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Three steps. The first one is just a conversation.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {processSteps.map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 110}>
              <div className="relative h-full rounded-2xl border border-line bg-white p-7 shadow-soft">
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-orange">
                    {item.step}
                  </span>
                  <h3 className="text-xl">{item.title}</h3>
                </div>
                <p className="mt-5 leading-relaxed text-navy-400">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20">
          <Reveal>
            <p className="eyebrow text-orange-600">How I operate</p>
          </Reveal>

          <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70}>
                <div className="border-t-2 border-orange/70 pt-4">
                  <h3 className="text-[17px] leading-snug">{value.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-navy-400">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
