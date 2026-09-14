import { ProcessTimeline } from "@/components/process-timeline";
import { Reveal } from "@/components/reveal";
import { processSteps, sections, values } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="section bg-cream">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-orange-600">{sections.process.eyebrow}</p>
          <h2 className="headline mt-4">{sections.process.title}</h2>
        </Reveal>

        <ProcessTimeline steps={processSteps} />

        <div className="mt-20">
          <Reveal>
            <p className="eyebrow text-orange-600">{sections.process.valuesEyebrow}</p>
          </Reveal>

          <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">
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
