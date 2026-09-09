"use client";

import { useState, type FormEvent } from "react";
import {
  guide,
  GUIDE_FILENAME,
  GUIDE_PDF,
  site,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_KEY,
} from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

/** Kick off the PDF download without navigating away from the page. */
function startDownload() {
  const a = document.createElement("a");
  a.href = GUIDE_PDF;
  a.download = GUIDE_FILENAME;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Two fields, then the guide. The lead notification goes to the same Web3Forms
 * inbox as the contact form but with its own subject, so guide downloads are
 * easy to tell apart from real inquiries in the submissions list.
 */
export function GuideForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const raw = new FormData(form);
    const value = (key: string) => String(raw.get(key) ?? "").trim();

    const name = value("guideName");
    const email = value("guideEmail");

    setStatus("sending");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Guide download: ${name}`,
          from_name: "itsandresdiaz.com",
          replyto: email,
          botcheck: value("botcheck"),
          Name: name,
          Email: email,
          Requested: "The Complete Guide to Marketing Channels",
        }),
      });

      const result = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !result.success) throw new Error("submission rejected");

      setStatus("sent");
      startDownload();
    } catch (err) {
      /*
       * The guide is the promise, not the form. If capturing the lead fails we
       * hand over the download anyway rather than punishing the visitor for an
       * outage on our side.
       */
      console.error("[guide] lead capture failed, releasing download anyway:", err);
      setStatus("error");
      startDownload();
    }
  }

  if (status === "sent" || status === "error") {
    return (
      <div className="rounded-2xl border border-orange/30 bg-white/[0.06] p-6 text-center">
        <p className="font-display text-lg font-bold text-white">Your download is starting.</p>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-white/65">
          If nothing happened, the button below will open it directly.
        </p>
        <a
          href={GUIDE_PDF}
          download={GUIDE_FILENAME}
          className="btn-primary mt-5 inline-flex w-full justify-center sm:w-auto"
        >
          Open the guide
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      {/* Honeypot. Web3Forms discards anything that arrives with this filled. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="guideBotcheck">Leave this field empty</label>
        <input id="guideBotcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="guideName">
            Your name
          </label>
          <input
            id="guideName"
            name="guideName"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="field-dark"
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="guideEmail">
            Email
          </label>
          <input
            id="guideEmail"
            name="guideEmail"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            className="field-dark"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-3 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending it over..." : "Download the free guide"}
      </button>

      <p className="mt-3 text-[13px] leading-relaxed text-white/45">
        {guide.formNote} Prefer to just talk?{" "}
        <a href="#contact" className="text-orange underline-offset-2 hover:underline">
          Reach out instead
        </a>
        , or email {site.email}.
      </p>
    </form>
  );
}
