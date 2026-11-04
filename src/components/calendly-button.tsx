"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { SpinnerIcon, XIcon } from "@/components/icons";
import { site } from "@/lib/site";

/** Calendly's popup embed, without loading their widget script. */
const CALENDLY_POPUP = `${site.calendly}?embed_domain=${new URL(site.url).host}&embed_type=PopupText&hide_gdpr_banner=1&primary_color=f28d3d`;

/** Fired on window. `CalendlyDialog` listens, opens, and cancels the event to claim it. */
const OPEN_EVENT = "calendly:open";

/**
 * A link to Calendly that opens the booking calendar in a modal over the page,
 * so visitors book a call without leaving the site. It stays a plain link to
 * Calendly's own page without scripting, on a modified click (new tab, new
 * window), and on any page that does not mount `CalendlyDialog`.
 */
export function CalendlyButton({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const open = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const claimed = !window.dispatchEvent(new CustomEvent(OPEN_EVENT, { cancelable: true }));
    if (claimed) e.preventDefault();
  };

  return (
    <a href={site.calendly} target="_blank" rel="noopener noreferrer" className={className} onClick={open}>
      {children}
    </a>
  );
}

/**
 * The one booking modal every `CalendlyButton` on the page opens. Mount it once
 * per page, outside anything that can turn `inert`. The calendar loads on the
 * first open, not with the page.
 */
export function CalendlyDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      e.preventDefault();
      setOpened(true);
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      aria-label="Book a call with Andres Diaz"
      // A click on the dimmed backdrop lands on the dialog itself, not its contents.
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto h-[100dvh] max-h-none w-screen max-w-none overflow-hidden bg-white p-0 text-navy backdrop:bg-navy/80 backdrop:backdrop-blur-sm sm:h-[min(760px,calc(100dvh-3rem))] sm:w-[min(1060px,calc(100vw-3rem))] sm:rounded-2xl sm:shadow-2xl"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="font-display text-base font-bold">Book a call with me</p>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full text-navy-400 transition-colors hover:bg-cream hover:text-navy"
          >
            <XIcon />
          </button>
        </div>

        <div className="relative flex-1">
          {/* Shows until Calendly paints over it. */}
          <div className="absolute inset-0 grid place-items-center text-orange">
            <SpinnerIcon className="h-6 w-6" />
          </div>
          {opened && (
            <iframe
              src={CALENDLY_POPUP}
              title="Book a free 30-minute call with Andres Diaz"
              className="relative h-full w-full"
            />
          )}
        </div>
      </div>
    </dialog>
  );
}
