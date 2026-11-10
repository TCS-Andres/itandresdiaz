"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 2700;
const EXIT_MS = 340;

type Outcome = { text: string; service: string };

/**
 * "I help you" over a rotating result, with a small tag naming the service
 * that gets it. Each letter blurs in on its own short delay while the old line
 * blurs out. Adapted from wensity's Text Cycle on 21st.dev, rebuilt with CSS
 * animations instead of framer-motion.
 *
 * The server renders the first result, so the line reads correctly before
 * scripts load. Screen readers hear the whole list once instead of a phrase
 * changing under them every few seconds. With reduced motion it holds on the
 * first result.
 */
export function OutcomeCycle({ lead, outcomes }: { lead: string; outcomes: Outcome[] }) {
  const [{ index, leaving }, setCycle] = useState<{ index: number; leaving: number | null }>({
    index: 0,
    leaving: null,
  });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (outcomes.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);

    const timer = window.setInterval(() => {
      setCycle((c) => ({ index: (c.index + 1) % outcomes.length, leaving: c.index }));
    }, HOLD_MS);
    return () => window.clearInterval(timer);
  }, [outcomes.length]);

  // Drop the outgoing line once its exit animation has played.
  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setCycle((c) => ({ ...c, leaving: null })), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  const current = outcomes[index];

  return (
    <div className="font-display">
      <p className="text-[19px] font-bold tracking-tighter text-white/85">
        {lead}
        <span className="sr-only"> {outcomes.map((o) => `${o.text} (${o.service})`).join(" ")}</span>
      </p>

      <p aria-hidden="true" className="relative mt-0.5 text-[27px] font-bold leading-tight tracking-tighter text-orange">
        {/* Holds the line's height while the phrases swap on top of it. */}
        <span className="invisible whitespace-nowrap">{current.text}</span>
        {leaving !== null && <Chars key={`out-${leaving}`} text={outcomes[leaving].text} mode="out" />}
        <Chars key={`in-${index}`} text={current.text} mode={animate ? "in" : "static"} />
      </p>

      <p aria-hidden="true" className="mt-2 flex justify-center">
        <span
          key={index}
          className={`inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/75 ring-1 ring-white/15 ${
            animate ? "cycle-in" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          {current.service}
        </span>
      </p>
    </div>
  );
}

function Chars({ text, mode }: { text: string; mode: "in" | "out" | "static" }) {
  return (
    <span className="absolute inset-0 whitespace-nowrap text-center">
      {mode === "static"
        ? text
        : Array.from(text).map((char, i) => (
            <span
              key={i}
              className={mode === "in" ? "cycle-in" : "cycle-out"}
              style={{ animationDelay: `${i * (mode === "in" ? 22 : 12)}ms` }}
            >
              {char === " " ? " " : char}
            </span>
          ))}
    </span>
  );
}
