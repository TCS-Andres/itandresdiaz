"use client";

import { useState, type FormEvent } from "react";
import { site, WEB3FORMS_ENDPOINT, WEB3FORMS_KEY } from "@/lib/site";

const BUSINESS_TYPES = [
  "Home services or trades",
  "Professional services",
  "Health and wellness",
  "Restaurant or hospitality",
  "Retail or ecommerce",
  "Real estate or construction",
  "B2B, manufacturing, or logistics",
  "Something else",
];

const INTERESTS = [
  "AI implementation, missed calls and follow up",
  "Marketing help, ongoing support",
  "Website or rebrand project",
  "Fractional CMO leadership",
  "Not sure yet, I want to talk it through",
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
      setError("Sorry, that did not go through.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-orange/30 bg-white p-8 text-center shadow-soft md:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange/15">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F28D3D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-5 text-2xl">Thank you. It came through.</h3>
        <p className="mx-auto mt-3 max-w-md text-navy-400">
          I read every one of these myself. You will hear back from me within one business day.
          If it is easier to just grab time on my calendar, that link is right here.
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
      onSubmit={onSubmit}
      noValidate={false}
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

        <div>
          <label className="label" htmlFor="businessType">
            Type of business
          </label>
          <select id="businessType" name="businessType" className="field" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="interest">
            What brought you here
          </label>
          <select id="interest" name="interest" className="field" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {INTERESTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="label" htmlFor="message">
          What is going on right now
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A few sentences is plenty. What is working, what is not, and what you would like to change."
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
          and I will get right back to you.
        </div>
      )}

      <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary w-full shrink-0 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? "Sending..." : "Send it over"}
        </button>
        <p className="text-center text-[13px] leading-relaxed text-navy-300 sm:text-left">
          I read every message myself. No sales sequence, no list you did not ask to be on.
        </p>
      </div>
    </form>
  );
}
