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

          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-navy-400">
            <p>
              I run {site.company} out of {site.location}, working as a fractional CMO and AI
              specialist for practices that want to grow without building a marketing department.
            </p>
            <p>
              Health and wellness is personal to me. Your marketing is not selling a product. It
              is asking someone to trust you with their body, their sleep, or their family. That
              deserves more than a template.
            </p>
          </div>

          <blockquote className="mt-8 rounded-2xl border-l-[3px] border-orange bg-cream p-6">
            <p className="font-display text-lg font-semibold leading-snug text-navy">
              &ldquo;Marketing is an investment, not an expense.&rdquo;
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-navy-400">
              Your practice is an airplane. Overhead is the body, marketing and sales are the
              engines. Spending on the body makes it heavier. Spending on the engines makes it
              go farther.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
