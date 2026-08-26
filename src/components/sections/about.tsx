import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

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
          <p className="eyebrow text-orange-600">Who you would be working with</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
            I am the strategist, not the sales rep who hands you off.
          </h2>

          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-navy-400">
            <p>
              My name is Andres Diaz and I run {site.company} out of {site.location}. I serve as a
              fractional CMO, marketing specialist, and AI specialist for businesses ranging from
              local practices to multi million dollar companies, with a real focus on health and
              wellness.
            </p>
            <p>
              Health and wellness is not a vertical I picked off a list. It is personal to me, and
              it means I understand something that generic agencies miss: your marketing is not
              selling a product. It is asking someone to trust you with their body, their sleep,
              their smile, or their family. That deserves more care than a template and a
              posting schedule.
            </p>
            <p>
              What you get with me is the brain and the muscle together. I bring the strategy
              myself, my team executes across every channel, and we build AI systems into the
              operation so the work keeps running when everyone goes home. You are not handed to
              an account manager after the first call.
            </p>
          </div>

          <blockquote className="mt-8 rounded-2xl border-l-[3px] border-orange bg-cream p-6">
            <p className="font-display text-lg font-semibold leading-snug text-navy">
              &ldquo;Marketing is an investment, not an expense.&rdquo;
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-navy-400">
              Think of your practice as an airplane. Your overhead is the body, your services are
              the wings, and your marketing and sales are the engines. Money spent on overhead
              makes the plane heavier. Money spent on the engines makes it go farther. Most
              practices are trying to fly on one weak engine.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
