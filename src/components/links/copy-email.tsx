"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

/** The old way, for in-app browsers that don't expose the Clipboard API. */
function legacyCopy(text: string) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand("copy");
  field.remove();
  return ok;
}

/**
 * Copies the email address and says so for two seconds. If copying is blocked
 * entirely, it opens the mail app instead so the tap still does something.
 */
export function CopyEmailButton({
  email,
  label,
  copiedLabel,
  className,
}: {
  email: string;
  label: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      if (legacyCopy(email)) setCopied(true);
      else window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <button type="button" onClick={copy} className={className}>
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        {copied ? copiedLabel : label}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
