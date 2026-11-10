import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * The icon chip in each card's header takes its card's color. Every light card
 * is white; the last card is navy so the page ends on the brand's darkest note.
 */
export const TONES = {
  orange: "bg-orange-50 text-orange-600 ring-orange/25",
  gold: "bg-[#FFF8C2] text-navy ring-gold/70",
  blue: "bg-[#E6EEFC] text-sky ring-sky/25",
  navy: "bg-white/10 text-orange ring-white/15",
} as const;

export type Tone = keyof typeof TONES;

export type CardTitle = { before: string; ink: string; after: string };

/**
 * The card every section of /links sits in: an icon chip and small eyebrow,
 * then a headline whose key phrase gets an orange underline that draws in once
 * the card scrolls into view. `decor` sits behind the content (an aurora, a
 * border beam).
 */
export function LinkCard({
  id,
  icon,
  tone,
  eyebrow,
  title,
  decor,
  children,
}: {
  id: string;
  icon: ReactNode;
  tone: Tone;
  eyebrow: string;
  title: CardTitle;
  decor?: ReactNode;
  children: ReactNode;
}) {
  const dark = tone === "navy";

  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Reveal>
        <div
          className={`relative overflow-hidden rounded-[28px] p-5 ${
            dark ? "bg-navy text-white shadow-elevated" : "bg-white text-navy shadow-soft ring-1 ring-line/80"
          }`}
        >
          {decor}
          <div className="relative">
            <div className="flex items-center gap-2.5">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 ${TONES[tone]}`}>{icon}</span>
              <p className={`eyebrow text-[10.5px] leading-snug ${dark ? "text-white/55" : "text-navy-300"}`}>{eyebrow}</p>
            </div>

            <h2 id={`${id}-title`} className="mt-3.5 text-[29px] leading-[1.08]">
              {title.before}
              <span className="ink-reveal">{title.ink}</span>
              {title.after}
            </h2>

            {children}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** The supporting line under a card headline, its opening phrase in bold. */
export function CardLede({ strong, rest }: { strong: string; rest: string }) {
  return (
    <p className="mt-2.5 text-[15px] leading-relaxed text-navy-400">
      <strong className="font-semibold text-navy">{strong}</strong>
      {rest}
    </p>
  );
}
