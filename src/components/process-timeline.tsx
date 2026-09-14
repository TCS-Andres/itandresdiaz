"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/reveal";

type Step = { step: string; title: string; body: string };

/**
 * Numbered steps joined by a rule that fills in as the visitor scrolls, and
 * each step lights up as the fill reaches it. The scroll-linked beam comes
 * from Aceternity's Timeline on 21st.dev, reshaped for three short steps:
 * a row on desktop, a vertical track on phones.
 *
 * Scroll progress lives in one CSS variable (--p) written straight to the DOM,
 * so scrolling never re-renders React. Only crossing a step changes state.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(0);
  const last = steps.length - 1;

  useEffect(() => {
    const list = ref.current;
    if (!list) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      list.style.setProperty("--p", "1");
      setLit(steps.length);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = list.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts filling when the list enters the lower fifth of the screen and
      // finishes as its end reaches the middle.
      const start = vh * 0.8;
      const end = vh * 0.5;
      const p = Math.min(1, Math.max(0, (start - top) / (height + start - end)));
      list.style.setProperty("--p", p.toFixed(4));
      setLit(last === 0 ? steps.length : Math.floor(p * last + 0.02) + 1);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [last, steps.length]);

  return (
    <ol
      ref={ref}
      className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6"
      style={{ "--p": 0 } as CSSProperties}
    >
      {steps.map((item, i) => {
        const isLit = i < lit;
        return (
          <Reveal
            as="li"
            key={item.step}
            delay={i * 110}
            className="relative grid grid-cols-[44px_1fr] gap-5 lg:flex lg:flex-col lg:gap-6"
          >
            {/* Connector to the next step: down on phones, across on desktop. */}
            {i < last && (
              <span
                aria-hidden="true"
                className="absolute left-[21px] top-[52px] h-[calc(100%-28px)] w-[2px] overflow-hidden rounded-full bg-line lg:left-[52px] lg:top-[21px] lg:h-[2px] lg:w-[calc(100%-36px)]"
              >
                <span
                  className="absolute inset-0 origin-top bg-orange lg:origin-left lg:bg-warm-gradient [transform:scaleY(var(--fill))] lg:[transform:scaleX(var(--fill))]"
                  style={{ "--fill": `clamp(0, calc(var(--p) * ${last} - ${i}), 1)` } as CSSProperties}
                />
              </span>
            )}

            <span
              className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition-[background-color,color,box-shadow] duration-500 ${
                isLit
                  ? "bg-orange text-navy shadow-[0_0_0_6px_rgba(242,141,61,0.16)]"
                  : "bg-navy text-orange"
              }`}
            >
              {item.step}
            </span>

            <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-soft transition-colors duration-500 lg:h-auto lg:flex-1">
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-navy-400">{item.body}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
