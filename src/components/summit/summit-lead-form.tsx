"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckIcon, SpinnerIcon } from "@/components/icons";
import { CONTACT_CARD_PATH, summit } from "@/lib/summit";
import { site, WEB3FORMS_ENDPOINT, WEB3FORMS_KEY } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * For attendees who would rather be called than pick a time. Goes to the same
 * Web3Forms inbox as the main contact form, under a "Summit lead" subject so
 * the event's leads are easy to pull out of the submissions list.
 */
export function SummitLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const thanksRef = useRef<HTMLParagraphElement>(null);

  // The form is replaced by the thank-you panel, so move focus onto it.
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
    const business = value("business");

    setStatus("sending");

    const payload: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
      subject: `Summit lead: ${name}${business ? ` (${business})` : ""}`,
      from_name: "itsandresdiaz.com/summit",
      replyto: value("email"),
      botcheck: value("botcheck"),
      Name: name,
      Email: value("email"),
      Source: summit.event,
    };
    // Only the optional fields that were filled in, so the email stays clean.
    const optional: Array<[string, string]> = [
      ["Phone", value("phone")],
      ["Business", business],
      ["First hire", value("firstHire")],
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
      const result = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !result.success) throw new Error(`Request failed with status ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error("[summit] lead submission failed:", err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-orange/30 bg-white p-8 text-center shadow-soft">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-orange/15 text-orange">
          <CheckIcon className="h-7 w-7" strokeWidth={2.5} />
        </div>
        <p
          ref={thanksRef}
          tabIndex={-1}
          className="mt-5 font-display text-2xl font-bold focus:outline-none"
        >
          {"Got it. I'll be in touch."}
        </p>
        <p className="mx-auto mt-3 max-w-sm text-navy-400">
          {"You'll hear from me within one business day. Save my contact so you know it's me."}
        </p>
        <a href={CONTACT_CARD_PATH} className="btn-primary mt-6">
          {summit.hero.secondaryCta}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft md:p-8"
    >
      {/* Honeypot. Web3Forms discards anything that arrives with this filled. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="summitBotcheck">Leave this field empty</label>
        <input id="summitBotcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <h3 className="text-2xl">{summit.book.formTitle}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-navy-400">{summit.book.formLede}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="summitName">
            Your name <span className="text-orange">*</span>
          </label>
          <input id="summitName" name="name" type="text" required autoComplete="name" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="summitBusiness">
            Business name
          </label>
          <input id="summitBusiness" name="business" type="text" autoComplete="organization" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="summitEmail">
            Email <span className="text-orange">*</span>
          </label>
          <input id="summitEmail" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="summitPhone">
            Phone
          </label>
          <input id="summitPhone" name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="label">{"The first role you'd hire"}</legend>
        <div className="flex flex-wrap gap-2">
          {summit.book.firstHireOptions.map((option) => (
            <label key={option} className="relative">
              <input type="radio" name="firstHire" value={option} className="peer sr-only" />
              <span className="chip">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-orange/40 bg-orange-50 px-4 py-3 text-sm text-navy-400"
        >
          <strong className="font-display font-bold text-navy">{"Sorry, that didn't go through."}</strong>{" "}
          Email me at{" "}
          <a href={`mailto:${site.email}`} className="font-bold text-sky underline">
            {site.email}
          </a>
          {" and I'll get right back to you."}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:self-start"
      >
        {status === "sending" ? (
          <>
            <SpinnerIcon />
            Sending...
          </>
        ) : (
          "Reach out to me"
        )}
      </button>
    </form>
  );
}
