"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 2400;
const EXIT_MS = 340;

/**
 * Cycles through words, each letter blurring in on its own short delay while
 * the old word blurs out above it. Adapted from wensity's Text Cycle on
 * 21st.dev, rebuilt with CSS animations instead of framer-motion.
 *
 * The server renders the first word, so the line reads correctly before
 * scripts load. Screen readers hear the whole list once instead of a word
 * changing under them every couple of seconds. With reduced motion it holds on
 * the first word.
 */
export function WordCycle({ words, className = "" }: { words: string[]; className?: string }) {
  const [{ index, leaving }, setCycle] = useState<{ index: number; leaving: number | null }>({
    index: 0,
    leaving: null,
  });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);

    const timer = window.setInterval(() => {
      setCycle((c) => ({ index: (c.index + 1) % words.length, leaving: c.index }));
    }, HOLD_MS);
    return () => window.clearInterval(timer);
  }, [words.length]);

  // Drop the outgoing word once its exit animation has played.
  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setCycle((c) => ({ ...c, leaving: null })), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  // The longest word holds the width, so the line doesn't jump as words change.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`relative inline-block text-left align-bottom ${className}`}>
      <span className="sr-only">{words.join(" ")}</span>
      <span className="invisible" aria-hidden="true">
        {longest}
      </span>
      {leaving !== null && <Word key={`out-${leaving}`} text={words[leaving]} mode="out" />}
      <Word key={`in-${index}`} text={words[index]} mode={animate ? "in" : "static"} />
    </span>
  );
}

function Word({ text, mode }: { text: string; mode: "in" | "out" | "static" }) {
  return (
    <span className="absolute inset-0 whitespace-nowrap" aria-hidden="true">
      {mode === "static"
        ? text
        : Array.from(text).map((char, i) => (
            <span
              key={i}
              className={mode === "in" ? "cycle-in" : "cycle-out"}
              style={{ animationDelay: `${i * (mode === "in" ? 32 : 18)}ms` }}
            >
              {char}
            </span>
          ))}
    </span>
  );
}
