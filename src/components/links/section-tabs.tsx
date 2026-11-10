"use client";

import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { BotIcon, CalendarIcon, HandshakeIcon, SparklesIcon } from "@/components/icons";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  call: CalendarIcon,
  guide: SparklesIcon,
  ai: BotIcon,
  work: HandshakeIcon,
};

type Tab = { id: string; label: string };

/**
 * A segmented bar that sticks to the top of the screen. A navy pill slides
 * under whichever card you're reading, and tapping a tab jumps to its card.
 */
export function SectionTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(-1);
  const idKey = tabs.map((t) => t.id).join(",");

  useEffect(() => {
    const sections = idKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      // The card whose top has crossed 40% of the screen is the one being read.
      const line = window.innerHeight * 0.4;
      let current = -1;
      sections.forEach((section, i) => {
        if (section.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
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
  }, [idKey]);

  return (
    <nav aria-label="Jump to a section" className="sticky top-3 z-30">
      <ol
        className="relative grid rounded-full bg-white/85 p-1 shadow-soft ring-1 ring-line/80 backdrop-blur-md"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-y-1 left-1 rounded-full bg-navy shadow-soft transition-[transform,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            active < 0 ? "opacity-0" : "opacity-100"
          }`}
          style={{
            width: `calc((100% - 0.5rem) / ${tabs.length})`,
            transform: `translateX(${Math.max(active, 0) * 100}%)`,
          }}
        />
        {tabs.map((tab, i) => {
          const Icon = ICONS[tab.id];
          const isActive = i === active;
          return (
            <li key={tab.id} className="relative">
              <a
                href={`#${tab.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-center justify-center gap-1.5 rounded-full py-2.5 font-display text-[13px] font-bold transition-colors duration-300 ${
                  isActive ? "text-white" : "text-navy-400 hover:text-navy"
                }`}
              >
                {Icon && <Icon className={`h-[15px] w-[15px] ${isActive ? "text-orange" : ""}`} />}
                {tab.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
