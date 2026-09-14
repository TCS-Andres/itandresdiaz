"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckIcon, SpinnerIcon } from "@/components/icons";
import { INTEREST_EVENT } from "@/components/interest-link";
import {
  businessTypes,
  interests,
  site,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_KEY,
} from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);

  // A "Talk about this option" link elsewhere on the page preselects its option.
  useEffect(() => {
    const onInterest = (event: Event) => {
      const choice = (event as CustomEvent<string>).detail;
      const group = formRef.current?.elements.namedItem("interest");
      if (group instanceof RadioNodeList) group.value = choice;
    };
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  // The form is swapped for the thank-you panel, so move focus there or a
  // keyboard or screen reader user is left on a button that no longer exists.
  useEffect(() => {
    if (status === "sent") thanksRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const raw = new FormData(form);
    const value = (key: string) => String(raw.get(key) ?? "").trim();

    const name = value("name");
    const email = value("email");
    const business = value("business");

    setStatus("sending");
    setError("");

    /*
     * Posted straight from the browser on purpose: Web3Forms rejects
     * server-side submissions on this plan, so a serverless proxy would 403.
     * Keys are the labels that appear in the notification email, so they are
     * written for a human reading the inbox rather than for code.
     */
    const payload: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
      subject: `New inquiry: ${name}${business ? ` (${business})` : ""}`,
      from_name: "itandresdiaz.com",
      replyto: email,
      botcheck: value("botcheck"),
      Name: name,
      Email: email,
    };

    // Only send the optional fields that were actually filled in, so the
    // notification email does not carry a column of empty rows.
    const optional: Array<[string, string]> = [
      ["Business", business],
      ["Phone", value("phone")],
      ["Type of business", value("businessType")],
      ["Looking for", value("interest")],
      ["Message", value("message")],
    ];
    for (const [label, val] of optional) {
      if (val) payload[label] = val;
    }

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!res.ok || !result.success) {
        throw new Error(result.message || `Request failed with status ${res.status}`);
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      // The real reason goes to the console for debugging. Visitors get one
      // plain sentence and a way to reach Andres, never raw API wording.
      console.error("[contact] submission failed:", err);
      setStatus("error");
      setError("Sorry, that didn't go through.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-orange/30 bg-white p-8 text-center shadow-soft md:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange/15 text-orange">
          <CheckIcon className="h-7 w-7" strokeWidth={2.5} />
        </div>
        <h3 ref={thanksRef} tabIndex={-1} className="mt-5 text-2xl focus:outline-none">
          Thank you. It came through.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-navy-400">
          {
            "I read every one of these myself, and you'll hear back within one business day. Rather talk sooner? Grab a time on my calendar."
          }
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={site.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
          >
            Book a 30 minute call
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="btn-ghost-light w-full sm:w-auto"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="relative rounded-2xl border border-line bg-white p-6 shadow-soft md:p-9"
    >
      {/*
        Honeypot. "botcheck" is the field name Web3Forms looks for: if it comes
        back filled, they discard the submission as spam. Hidden from people and
        from screen readers, and skipped by keyboard tabbing.
      */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="botcheck">Leave this field empty</label>
        <input id="botcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            Your name <span className="text-orange">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className="field"
          />
        </div>

        <div>
          <label className="label" htmlFor="business">
            Business name
          </label>
          <input
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            placeholder="Smith and Co."
            className="field"
          />
        </div>

        <div>
          <label className="label" htmlFor="email">
            Email <span className="text-orange">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            className="field"
          />
        </div>

        <div>
          <label className="label" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(305) 555 0134"
            className="field"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="businessType">
            Type of business
          </label>
          <select id="businessType" name="businessType" className="field" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {businessTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* One tap instead of opening a dropdown, which matters most on a phone. */}
      <fieldset className="mt-5">
        <legend className="label">What brought you here</legend>
        <div className="flex flex-wrap gap-2">
          {interests.map((t) => (
            <label key={t} className="relative">
              <input type="radio" name="interest" value={t} className="peer sr-only" />
              <span className="chip">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label className="label" htmlFor="message">
          What is going on right now
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A few sentences is plenty. What's working, what isn't, and what you'd like to change."
          className="field resize-y"
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-orange/40 bg-orange-50 px-4 py-3 text-sm text-navy-400"
        >
          <strong className="font-display font-bold text-navy">{error}</strong>{" "}
          Please email me directly at{" "}
          <a href={`mailto:${site.email}`} className="font-bold text-sky underline">
            {site.email}
          </a>{" "}
          {"and I'll get right back to you."}
        </div>
      )}

      <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary w-full shrink-0 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <SpinnerIcon />
              Sending...
            </>
          ) : (
            "Send it over"
          )}
        </button>
        <p className="text-center text-[13px] leading-relaxed text-navy-300 sm:text-left">
          {"I read every message myself. No sales sequence, no list you didn't ask to join."}
        </p>
      </div>
    </form>
  );
}
