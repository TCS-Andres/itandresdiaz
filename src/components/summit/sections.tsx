import Image from "next/image";
import { GlowBorder } from "@/components/glow-border";
import {
  ArrowRightIcon,
  CalendarIcon,
  InstagramIcon,
  LinkedInIcon,
  MegaphoneIcon,
  SearchIcon,
  SparklesIcon,
  UserPlusIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { ContactCard } from "@/components/summit/contact-card";
import { SummitLeadForm } from "@/components/summit/summit-lead-form";
import { site } from "@/lib/site";
import { CONTACT_CARD_PATH, summit } from "@/lib/summit";

/** Calendly's inline embed, without loading their widget script. */
const CALENDLY_EMBED = `${site.calendly}?embed_domain=${new URL(site.url).host}&embed_type=Inline&hide_gdpr_banner=1&primary_color=f28d3d`;

export function SummitHero() {
  const { hero } = summit;
  return (
    <section id="summit-top" className="relative overflow-hidden bg-navy pt-[72px] text-white">
      {/* The same office at dusk that closes the talk, so the page feels like the next slide. */}
      <Image
        src="/summit/dusk.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/85 to-navy lg:bg-gradient-to-r lg:from-navy lg:via-navy/75 lg:to-navy/10"
      />

      <div className="container relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28">
        <div>
          <p className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-navy/60 px-4 py-2 text-orange backdrop-blur-sm">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1 className="mt-7 text-[3rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
            {hero.before}
            <span className="ink [animation-delay:300ms]">{hero.ink}</span>
            {hero.after}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">{hero.lede}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#book" className="btn-primary group w-full sm:w-auto">
              {hero.primaryCta}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a href={CONTACT_CARD_PATH} className="btn-ghost-dark w-full bg-navy/40 sm:w-auto">
              <UserPlusIcon className="h-[18px] w-[18px]" />
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[420px] lg:ml-auto lg:mr-0">
          <ContactCard />
        </div>
      </div>
    </section>
  );
}

const SESSION_ICONS = [SearchIcon, SparklesIcon, MegaphoneIcon];

export function SummitSession() {
  const { session } = summit;
  return (
    <section className="section bg-cream">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-orange-600">{session.eyebrow}</p>
          <h2 className="headline mt-4">{session.title}</h2>
          <p className="lede mt-5">{session.lede}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {session.items.map((item, i) => {
            const Icon = SESSION_ICONS[i] ?? SparklesIcon;
            return (
              <Reveal key={item.title} delay={i * 100}>
                <article className="card group relative h-full hover:-translate-y-1 hover:shadow-elevated">
                  <GlowBorder />
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange/12 text-orange-600 transition-colors duration-300 group-hover:bg-orange group-hover:text-navy">
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <h3 className="mt-5 text-xl">{item.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-navy-400">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 font-display text-lg font-semibold text-navy md:text-xl">{session.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function SummitTeam() {
  const { team } = summit;
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle,#2B69D8 0%,transparent 65%)" }}
      />

      <div className="container relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold">{team.eyebrow}</p>
          <h2 className="headline mt-4">{team.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70 md:text-xl">{team.lede}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr]">
          <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <article className="relative flex h-full flex-col justify-between rounded-2xl border border-orange/50 bg-gradient-to-br from-navy-400/40 to-navy-600 p-7 shadow-elevated md:p-8">
              <GlowBorder />
              <div>
                <p className="eyebrow inline-flex rounded-full bg-orange px-3 py-1.5 text-navy">{team.jarvis.label}</p>
                <h3 className="mt-5 text-3xl leading-tight md:text-[2.1rem]">{team.jarvis.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-white/70">{team.jarvis.body}</p>
              </div>
              <Image
                src="/summit/roles/chief.png"
                alt=""
                width={200}
                height={200}
                className="mt-8 h-24 w-24 self-end md:h-28 md:w-28"
              />
            </article>
          </Reveal>

          {team.roles.map((role, i) => (
            <Reveal key={role.title} delay={(i + 1) * 80}>
              <article className="relative flex h-full items-start gap-4 rounded-2xl border border-white/12 bg-white/[0.05] p-5 transition-colors duration-300 hover:bg-white/[0.08]">
                <GlowBorder />
                <Image src={role.icon} alt="" width={200} height={200} className="h-14 w-14 shrink-0" />
                <div>
                  <h3 className="text-lg leading-snug">{role.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">{role.body}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal className="sm:col-span-2 lg:col-span-3" delay={200}>
            <a
              href="#book"
              className="group flex flex-col gap-4 rounded-2xl border-2 border-dashed border-white/25 p-6 transition-colors duration-300 hover:border-orange/70 sm:flex-row sm:items-center sm:justify-between md:px-8"
            >
              <div>
                <p className="eyebrow text-orange">{team.openRole.eyebrow}</p>
                <h3 className="mt-2 text-2xl">{team.openRole.title}</h3>
                <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-white/65">{team.openRole.body}</p>
              </div>
              <span className="btn-primary shrink-0 self-start sm:self-center">
                {summit.hero.primaryCta}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-10 font-display text-lg font-semibold text-white/85 md:text-xl">{team.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function SummitBook() {
  const { book } = summit;
  return (
    <section id="book" className="section bg-white">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-orange-600">{book.eyebrow}</p>
          <h2 className="headline mt-4">{book.title}</h2>
          <p className="lede mt-5">{book.lede}</p>
        </Reveal>

        {/*
          The calendar gets the full width: narrower than about 1000px, Calendly
          collapses to one column and scrolls inside its frame, which traps the wheel.
        */}
        <div className="mt-12">
          <Reveal>
            {/* Phones: Calendly's own page is easier to use than a frame inside a scrolling page. */}
            <div className="flex flex-col items-start rounded-2xl border border-line bg-cream p-6 md:hidden">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-orange text-navy">
                <CalendarIcon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-display text-xl font-bold">{book.mobileTitle}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-400">{book.mobileBody}</p>
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 w-full"
              >
                {book.calendarCta}
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="hidden overflow-hidden rounded-2xl border border-line bg-white shadow-soft md:block">
              <iframe
                src={CALENDLY_EMBED}
                title="Book a free 30-minute call with Andres Diaz"
                loading="lazy"
                className="h-[760px] w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={100} className="mx-auto mt-10 max-w-3xl">
            <SummitLeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function SummitStayInTouch() {
  const { stayInTouch } = summit;
  const pill =
    "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-5 py-2 font-display text-sm font-semibold transition-colors hover:border-orange hover:text-orange";
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-white md:py-20">
      <div className="container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="eyebrow text-orange">{stayInTouch.eyebrow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">{stayInTouch.title}</h2>
          <p className="mt-3 text-white/60">
            <a href={`mailto:${summit.links.email}`} className="underline-offset-4 hover:text-orange hover:underline">
              {summit.links.email}
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={CONTACT_CARD_PATH} className={pill}>
            <UserPlusIcon className="h-4 w-4" />
            {summit.hero.secondaryCta}
          </a>
          <a href={summit.links.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a href={summit.links.instagram} target="_blank" rel="noopener noreferrer" className={pill}>
            <InstagramIcon className="h-4 w-4" />
            Instagram
          </a>
          <a href="/" className={pill}>
            {stayInTouch.mainSiteCta}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="container mt-12 border-t border-white/10 pt-6 text-sm text-white/45">
        {stayInTouch.signoff}
      </div>
    </section>
  );
}
