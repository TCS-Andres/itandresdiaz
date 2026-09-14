"use client";

import type { ReactNode } from "react";

/** Fired on window. The contact form listens and ticks the matching option. */
export const INTEREST_EVENT = "contact:interest";

/**
 * A link down to the contact form that arrives with the visitor's choice
 * already selected, so they do not have to say twice what they just clicked.
 * Without scripting it is still a plain jump to #contact.
 */
export function InterestLink({
  interest,
  className,
  children,
}: {
  interest: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }))}
    >
      {children}
    </a>
  );
}
