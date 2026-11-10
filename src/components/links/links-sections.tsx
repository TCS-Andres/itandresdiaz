import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { CalendlyButton } from "@/components/calendly-button";
import { GuideForm } from "@/components/guide-form";
import {
  ArrowRightIcon,
  BotIcon,
  CalendarIcon,
  CameraIcon,
  CheckIcon,
  FacebookIcon,
  GlobeIcon,
  HandshakeIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  HeartIcon,
  MegaphoneIcon,
  MonitorIcon,
  PaletteIcon,
  SearchIcon,
  SparklesIcon,
  TargetIcon,
  UserPlusIcon,
} from "@/components/icons";
import { CopyEmailButton } from "@/components/links/copy-email";
import { CountUp } from "@/components/links/count-up";
import { Aurora, BorderBeam, ShimmerLayers } from "@/components/links/effects";
import { CardLede, LinkCard } from "@/components/links/link-card";
import { AgentStack } from "@/components/links/agent-stack";
import { OutcomeCycle } from "@/components/links/outcome-cycle";
import { links } from "@/lib/links";
import { industries, paths, site } from "@/lib/site";
import { CONTACT_CARD_PATH } from "@/lib/summit";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

/** Wraps the guide form, so the floating button knows to step aside from it. */
export const GUIDE_FORM_ID = "guide-form";

const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  email: MailIcon,
  website: GlobeIcon,
};

const ITEM_ICONS: Record<string, IconType> = {
  search: SearchIcon,
  sparkles: SparklesIcon,
  megaphone: MegaphoneIcon,
  check: CheckIcon,
};


/*
 * Portrait that breaks out of its circle: the cutout is clipped to the circle
 * below its center line and left unclipped above it, so the head rises out of
 * the top. Change RING to resize it; everything else follows.
 */
const RING = 196; // circle diameter, px
const PHOTO_W = Math.round(RING * 1.394); // the photo is wider than the circle so the head can rise out of it
const PHOTO_H = Math.round((PHOTO_W * 860) / 920); // keeps the 920x860 cutout's shape
const NUDGE = Math.round(RING * 0.068); // the face sits right of the photo's center
const PHOTO_LEFT = (RING - PHOTO_W) / 2 - NUDGE;
const CX = RING / 2 - PHOTO_LEFT; // circle center, in photo coordinates
const CY = PHOTO_H - RING / 2;
const R = RING / 2;
const BREAKOUT_CLIP = `path("M${CX - R},0 H${CX + R} V${CY} A${R},${R} 0 0 1 ${CX - R},${CY} Z")`;

function BreakoutPortrait() {
  return (
    <div className="relative" style={{ width: RING, height: RING }}>
      <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-orange/25 blur-3xl" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,#FCDF09_0%,#F28D3D_45%,#2B69D8_100%)] shadow-[0_0_0_6px_rgba(255,255,255,0.08),0_18px_40px_rgba(0,0,0,0.35)]" />
      <Image
        src="/links/andres-cutout.png"
        alt={site.name}
        width={920}
        height={860}
        priority
        sizes={`${PHOTO_W}px`}
        className="absolute max-w-none"
        style={{
          width: PHOTO_W,
          height: PHOTO_H,
          left: PHOTO_LEFT,
          top: RING - PHOTO_H,
          clipPath: BREAKOUT_CLIP,
        }}
      />
    </div>
  );
}

export function LinksHero() {
  const { hero, social } = links;

  return (
    <header
      id="links-top"
      className="relative mt-4 overflow-hidden rounded-[32px] bg-navy text-center text-white shadow-elevated"
    >
      <Aurora />
      {/* A dot grid over the aurora, fading out toward the bottom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]"
      />

      <div className="relative px-5 pt-5">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11.5px] font-medium text-white/80 ring-1 ring-white/15 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
          {hero.status}
        </p>

        {/* The top margin leaves room for the head rising out of the circle. */}
        <div className="mx-auto mt-[54px] w-fit">
          <BreakoutPortrait />
        </div>

        <h1 className="mt-5 text-[2.9rem] leading-none tracking-tightest">{hero.name}</h1>
        <p className="mt-2 text-[13.5px] font-medium text-white/60">{hero.role}</p>
        <div className="mt-4">
          <OutcomeCycle lead={hero.lead} outcomes={hero.outcomes} />
        </div>

        <CalendlyButton className="shimmer mx-auto mt-5 flex w-full max-w-[300px] items-center justify-center gap-2 rounded-full py-3.5 font-display text-[15px] font-bold text-navy transition-transform duration-200 [--bg:#F28D3D] [--shimmer-color:#FFFFFF] hover:-translate-y-0.5 active:scale-[0.98]">
          <ShimmerLayers />
          <CalendarIcon className="h-[18px] w-[18px]" />
          {hero.cta}
          <ArrowRightIcon className="h-4 w-4" />
        </CalendlyButton>

        <ul className="mt-5 flex justify-center gap-2.5">
          {social
            .filter((s) => s.href)
            .map((s) => {
              const Icon = SOCIAL_ICONS[s.key];
              const external = s.href.startsWith("http");
              return (
                <li key={s.key}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    title={s.label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-navy"
                  >
                    <Icon className="h-[19px] w-[19px]" />
                  </a>
                </li>
              );
            })}
        </ul>
      </div>

      {/* Who I work with, scrolling along the bottom edge of the panel. */}
      <div className="relative mt-6 border-t border-white/10 bg-white/[0.04] py-3" aria-label="Industries I work with">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-6">
            {[...industries, ...industries].map((item, i) => (
              <li
                key={`${item}-${i}`}
                aria-hidden={i >= industries.length}
                className="flex shrink-0 items-center gap-6 text-[12.5px] font-medium text-white/55"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-orange" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export function CallCard() {
  const c = links.call;

  return (
    <LinkCard
      id={c.id}
      tone="orange"
      icon={<CalendarIcon className="h-[18px] w-[18px]" />}
      eyebrow={c.eyebrow}
      title={c.title}
      decor={<BorderBeam />}
    >
      <CardLede strong={c.ledeStrong} rest={c.lede} />

      <ul className="mt-4 flex flex-wrap gap-2">
        {c.items.map((item) => {
          const Icon = ITEM_ICONS[item.icon];
          return (
            <li
              key={item.label}
              className="flex items-center gap-1.5 rounded-full bg-orange-50 py-1.5 pl-2 pr-3 text-[13px] font-semibold text-navy ring-1 ring-orange/20"
            >
              <Icon className="h-[14px] w-[14px] text-orange-600" />
              {item.label}
            </li>
          );
        })}
      </ul>

      {/* A chat bubble from me, rather than a pull quote. */}
      <figure className="mt-5 flex items-end gap-2.5">
        <Image
          src="/andres-contact.jpg"
          alt=""
          width={400}
          height={400}
          sizes="36px"
          className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white"
        />
        <div className="rounded-[20px] rounded-bl-md bg-navy px-4 py-3 text-white">
          <figcaption className="text-[11px] font-semibold text-orange">{site.name}</figcaption>
          <blockquote className="mt-0.5 text-[14.5px] leading-snug">{c.quote}</blockquote>
        </div>
      </figure>

      <CalendlyButton className="shimmer mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-display text-[15px] font-bold text-white transition-transform duration-200 [--bg:#1C192A] [--shimmer-color:#F28D3D] hover:-translate-y-0.5 active:scale-[0.98]">
        <ShimmerLayers />
        {c.cta}
        <ArrowRightIcon className="h-4 w-4" />
      </CalendlyButton>
      <p className="mx-auto mt-3 flex max-w-[30ch] items-start justify-center gap-1.5 text-center text-[12.5px] leading-snug text-navy-400">
        <CheckIcon className="mt-px h-3.5 w-3.5 shrink-0 text-orange-600" />
        {c.note}
      </p>
    </LinkCard>
  );
}

export function GuideCard() {
  const g = links.guide;

  return (
    <LinkCard
      id={g.id}
      tone="gold"
      icon={<SparklesIcon className="h-[18px] w-[18px]" />}
      eyebrow={g.eyebrow}
      title={g.title}
    >
      <CardLede strong={g.ledeStrong} rest={g.lede} />

      <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[linear-gradient(135deg,#FFFBE0,#FFF1E4)] p-3.5 ring-1 ring-gold/40">
        <Image
          src="/guide-cover.jpg"
          alt="Cover of The Complete Guide to Marketing Channels"
          width={850}
          height={1100}
          sizes="72px"
          className="h-auto w-[72px] shrink-0 -rotate-6 rounded-md shadow-elevated ring-2 ring-white"
        />
        <dl className="grid flex-1 grid-cols-3 gap-1 text-center">
          {g.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-[26px] font-bold leading-none tracking-tighter text-navy">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dd className="mt-1 text-[11.5px] font-medium text-navy-400" aria-hidden="true">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div id={GUIDE_FORM_ID} className="mt-4">
        <GuideForm variant="card" />
      </div>
    </LinkCard>
  );
}

export function AiCard() {
  const a = links.ai;

  return (
    <LinkCard
      id={a.id}
      tone="blue"
      icon={<BotIcon className="h-[18px] w-[18px]" />}
      eyebrow={a.eyebrow}
      title={a.title}
    >
      <CardLede strong={a.ledeStrong} rest={a.lede} />

      <div className="-mx-1 mt-4 rounded-[22px] bg-[linear-gradient(180deg,#EEF3FD,#FFFFFF)] px-1 pb-3 pt-2">
        <AgentStack agents={a.agents} hint={a.swipeHint} />
      </div>

      <p className="mt-3.5 text-[13px] leading-relaxed text-navy-400">{a.note}</p>

      <CalendlyButton className="btn mt-4 w-full bg-sky text-white shadow-soft hover:bg-sky-600">
        {a.cta}
        <ArrowRightIcon className="h-4 w-4" />
      </CalendlyButton>
    </LinkCard>
  );
}

const SERVICE_ICONS: Record<string, IconType> = {
  monitor: MonitorIcon,
  palette: PaletteIcon,
  search: SearchIcon,
  target: TargetIcon,
  heart: HeartIcon,
  camera: CameraIcon,
  mail: MailIcon,
};

/** A tiny landing page in a browser frame, drawn in CSS, for the website tile. */
function BrowserSketch() {
  return (
    <div aria-hidden="true" className="w-[118px] shrink-0 rotate-[4deg] rounded-xl bg-white p-2 shadow-elevated ring-1 ring-line">
      <div className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-orange" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="h-1.5 w-1.5 rounded-full bg-sky" />
      </div>
      <div className="mt-2 h-10 rounded-md bg-[linear-gradient(120deg,#1C192A,#4A4658)] p-1.5">
        <div className="h-1.5 w-3/4 rounded-sm bg-white/90" />
        <div className="mt-1 h-1 w-1/2 rounded-sm bg-white/40" />
        <div className="mt-1.5 h-2 w-8 rounded-full bg-orange" />
      </div>
      <div className="mt-1.5 grid grid-cols-3 gap-1">
        <div className="h-3 rounded-sm bg-cream ring-1 ring-line" />
        <div className="h-3 rounded-sm bg-cream ring-1 ring-line" />
        <div className="h-3 rounded-sm bg-cream ring-1 ring-line" />
      </div>
    </div>
  );
}

/** Overlapping brand-color swatches, for the brand development tile. */
function Swatches() {
  return (
    <div aria-hidden="true" className="flex items-center">
      {["bg-navy", "bg-orange", "bg-gold", "bg-sky"].map((color, i) => (
        <span key={color} className={`h-7 w-7 rounded-full ring-2 ring-white ${color} ${i ? "-ml-2" : ""}`} />
      ))}
      <span className="ml-1.5 font-display text-[17px] font-bold text-navy">Aa</span>
    </div>
  );
}

export function MarketingCard() {
  const m = links.marketing;

  return (
    <LinkCard
      id={m.id}
      tone="brand"
      icon={<MegaphoneIcon className="h-[18px] w-[18px]" />}
      eyebrow={m.eyebrow}
      title={m.title}
    >
      <CardLede strong={m.ledeStrong} rest={m.lede} />

      <ul className="mt-4 grid grid-cols-2 gap-2">
        {m.services.map((service) => {
          const Icon = SERVICE_ICONS[service.icon];
          const wide = service.visual === "browser";
          return (
            <li
              key={service.name}
              className={`rounded-2xl p-3.5 ring-1 ${
                wide
                  ? "col-span-2 flex items-center gap-3 bg-[linear-gradient(135deg,#FFF1E4,#FFFBE0)] ring-orange/20"
                  : "bg-cream/70 ring-line"
              }`}
            >
              <div className="min-w-0 flex-1">
                {service.visual === "swatches" ? (
                  <Swatches />
                ) : (
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-orange-600 shadow-soft ring-1 ring-line">
                    {Icon && <Icon className="h-4 w-4" />}
                  </span>
                )}
                <p className={`mt-2.5 font-display font-bold leading-tight ${wide ? "text-[17px]" : "text-[14px]"}`}>
                  {service.name}
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-navy-400">{service.result}</p>
              </div>
              {wide && <BrowserSketch />}
            </li>
          );
        })}
      </ul>

      <CalendlyButton className="btn-primary mt-4 w-full">
        {m.cta}
        <ArrowRightIcon className="h-4 w-4" />
      </CalendlyButton>
    </LinkCard>
  );
}

export function WorkCard() {
  const w = links.work;

  return (
    <LinkCard
      id={w.id}
      tone="navy"
      icon={<HandshakeIcon className="h-[18px] w-[18px]" />}
      eyebrow={w.eyebrow}
      title={w.title}
      decor={<Aurora />}
    >
      <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">
        {w.lede}
        <strong className="font-semibold text-gold">{w.ledeStrong}</strong>
      </p>

      <ol className="mt-4 grid gap-2">
        {paths.map((path, i) => (
          <li key={path.title} className="flex gap-3 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10 backdrop-blur-sm">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gold font-display text-[13px] font-bold text-navy">
              {i + 1}
            </span>
            <div>
              <p className="font-display text-[15px] font-bold leading-tight text-white">{path.title}</p>
              <p className="mt-1 text-[13px] leading-snug text-white/60">{path.best}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-2xl bg-white p-4 text-navy">
        <p className="eyebrow text-[10px] text-navy-300">{w.emailLabel}</p>
        <p className="mt-1 font-display text-[15px] font-bold leading-tight [overflow-wrap:anywhere]">{site.email}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href={`mailto:${site.email}`} className="btn bg-navy px-3 py-3 text-[14px] text-white hover:bg-navy-400">
            <MailIcon className="h-4 w-4" />
            {w.emailCta}
          </a>
          <CopyEmailButton
            email={site.email}
            label={w.copyCta}
            copiedLabel={w.copied}
            className="btn border border-line bg-cream px-3 py-3 text-[14px] text-navy hover:border-navy/30"
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <a href={CONTACT_CARD_PATH} className="btn-ghost-dark px-3 py-3 text-[13.5px]">
          <UserPlusIcon className="h-4 w-4" />
          {w.saveContact}
        </a>
        <a href="/" className="btn-ghost-dark px-3 py-3 text-[13.5px]">
          {w.fullSite}
        </a>
      </div>
    </LinkCard>
  );
}

export function LinksFooter() {
  const f = links.footer;

  return (
    <footer className="mt-8 flex flex-col items-center gap-2 text-center">
      <a
        href={f.handleHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-display text-[14px] font-bold text-navy hover:text-orange-600"
      >
        <Image
          src="/andres-contact.jpg"
          alt=""
          width={400}
          height={400}
          sizes="28px"
          className="h-7 w-7 rounded-full object-cover"
        />
        {f.handle}
      </a>
      <p className="text-[12px] text-navy-300">{f.signoff}</p>
    </footer>
  );
}
