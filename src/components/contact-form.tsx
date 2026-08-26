"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const PRACTICE_TYPES = [
  "Dental practice",
  "Physician or specialist practice",
  "Med spa or aesthetics",
  "Wellness or functional medicine clinic",
  "Chiropractic or physical therapy",
  "Other health and wellness business",
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
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(payload.error || "Something went wrong on our end.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong on our end.");
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
      {/* Honeypot. Real people never see it, bots fill it in. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Do not fill this in</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
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
            placeholder="Dr. Jane Smith"
            className="field"
          />
        </div>

        <div>
          <label className="label" htmlFor="practice">
            Practice name
          </label>
          <input
            id="practice"
            name="practice"
            type="text"
            autoComplete="organization"
            placeholder="Smith Family Dental"
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
            placeholder="you@yourpractice.com"
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
          <label className="label" htmlFor="practiceType">
            Type of practice
          </label>
          <select id="practiceType" name="practiceType" className="field" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {PRACTICE_TYPES.map((t) => (
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
          What is going on in the practice right now
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me what is working, what is frustrating, and what you would like to be different a year from now. As much or as little detail as you want."
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
