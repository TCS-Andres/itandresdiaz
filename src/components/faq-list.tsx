"use client";

import { useId, useState } from "react";
import { PlusIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";

type Faq = { q: string; a: string };

/**
 * Question cards that open in place, adapted from Hirael's FAQ Accordion Reveal
 * on 21st.dev (MIT). Built on a plain button and region instead of Radix, and
 * animated with a 0fr to 1fr grid row so the height never has to be measured.
 * Several can be open at once, so a visitor can compare answers.
 */
export function FaqList({ items }: { items: Faq[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const toggle = (index: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <Reveal key={item.q} delay={i * 60}>
            <div
              className={`rounded-2xl border transition-[border-color,background-color,box-shadow] duration-300 ${
                isOpen
                  ? "border-orange/40 bg-white shadow-soft"
                  : "border-line bg-white/60 hover:border-navy/20 hover:bg-white"
              }`}
            >
              <h3 className="text-base font-bold tracking-normal md:text-[17px]">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="flex min-h-[60px] w-full items-center justify-between gap-6 rounded-2xl px-5 py-4 text-left md:px-6"
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300 ${
                      isOpen ? "rotate-45 bg-orange text-navy" : "bg-navy-100 text-navy"
                    }`}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 pr-16 leading-relaxed text-navy-400 md:px-6 md:pr-20">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
