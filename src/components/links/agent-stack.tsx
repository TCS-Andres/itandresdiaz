"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { AgentTile } from "@/components/links/agent-tile";

type Agent = { icon: string; role: string; outcome: string; body: string };

const STEP_PX = 48;
const TILT_DEG = 7;
const SWIPE_PX = 45;
const AUTO_MS = 3400;

/** Shortest signed distance from the active card, wrapping around the ends. */
function offsetFrom(i: number, active: number, len: number) {
  const raw = i - active;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

/**
 * A fanned deck of AI agents, each led by the result it gets rather than what
 * it is. Swipe the front card, tap a card behind it,
 * or use the arrows. Adapted from ruixen.ui's CardStack on 21st.dev, rebuilt
 * with CSS transforms and pointer events instead of framer-motion.
 *
 * It deals itself every few seconds until the visitor touches it, and never
 * with reduced motion.
 */
export function AgentStack({ agents, hint }: { agents: Agent[]; hint: string }) {
  const len = agents.length;
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const start = useRef(0);
  const stage = useRef<HTMLDivElement>(null);

  const go = (to: number) => setActive(((to % len) + len) % len);
  const stop = () => setTouched(true);

  useEffect(() => {
    if (touched || len < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only deal while the deck is on screen.
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.5 });
    if (stage.current) observer.observe(stage.current);
    const timer = window.setInterval(() => {
      if (visible) setActive((a) => (a + 1) % len);
    }, AUTO_MS);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [touched, len]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    start.current = e.clientX;
    setDragging(true);
    stop();
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - start.current;
    // Hold on to the pointer once it's clearly a swipe, so it can leave the card.
    if (Math.abs(dx) > 8 && !e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setDrag(dx);
  };
  const onPointerUp = () => {
    if (drag > SWIPE_PX) go(active - 1);
    else if (drag < -SWIPE_PX) go(active + 1);
    setDragging(false);
    setDrag(0);
  };
  const step = (by: number) => {
    stop();
    go(active + by);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="AI agents"
      onFocusCapture={stop}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
    >
      <div
        ref={stage}
        className="relative mx-auto h-[236px] max-w-[300px] touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {agents.map((agent, i) => {
          const off = offsetFrom(i, active, len);
          const abs = Math.abs(off);
          const isActive = off === 0;
          const dx = off * STEP_PX + (isActive ? drag : 0);
          const rotate = off * TILT_DEG + (isActive ? drag / 14 : 0);

          return (
            <div
              key={agent.role}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${len}: ${agent.role}`}
              aria-hidden={!isActive}
              onClick={() => {
                if (!isActive) step(off);
              }}
              className={`absolute bottom-2 left-1/2 h-[216px] w-[214px] rounded-[22px] bg-white p-4 ring-1 ${
                isActive ? "cursor-grab shadow-elevated ring-sky/40" : "cursor-pointer shadow-soft ring-line"
              } ${dragging && isActive ? "" : "transition-[transform,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"}`}
              style={{
                transform: `translateX(calc(-50% + ${dx}px)) translateY(${abs * 10}px) rotate(${rotate}deg) scale(${isActive ? 1 : 0.92})`,
                zIndex: 10 - abs,
                opacity: abs > 1 ? 0 : 1,
              }}
            >
              <div className="flex items-center gap-2.5">
                <AgentTile icon={agent.icon} size={42} />
                <p className="eyebrow text-[9.5px] leading-snug text-sky">{agent.role}</p>
              </div>
              <p className="mt-3 font-display text-[19px] font-bold leading-[1.15] tracking-tighter text-navy [text-wrap:balance]">
                {agent.outcome}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-navy-400">{agent.body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous agent"
          className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy ring-1 ring-line transition-colors hover:text-sky"
        >
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
        </button>
        <div className="flex items-center gap-1.5">
          {agents.map((agent, i) => (
            <button
              key={agent.role}
              type="button"
              onClick={() => step(offsetFrom(i, active, len))}
              aria-label={`Show ${agent.role}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-sky" : "w-2 bg-navy/20 hover:bg-navy/40"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next agent"
          className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy ring-1 ring-line transition-colors hover:text-sky"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-center text-[11.5px] text-navy-300">{hint}</p>
    </div>
  );
}
