import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { sections } from "@/lib/site";

const about = sections.about;

export function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="container grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-[380px]">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full bg-brand-gradient opacity-15 blur-2xl"
            />
            <Image
              src="/andres-headshot.png"
              alt="Andres Diaz"
              width={620}
              height={620}
              sizes="(max-width: 1024px) 70vw, 380px"
              className="relative h-auto w-full"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={80}>
          <p className="eyebrow text-orange-600">{about.eyebrow}</p>
          <h2 className="headline mt-4">{about.title}</h2>

          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-navy-400">
            {about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <blockquote className="mt-8 rounded-2xl border-l-[3px] border-orange bg-cream p-6">
            <p className="font-display text-lg font-semibold leading-snug text-navy">
              &ldquo;{about.quote}&rdquo;
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-navy-400">{about.quoteBody}</p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
