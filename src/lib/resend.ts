/** Minimal Resend client over the REST API. No SDK dependency needed. */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; reason: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "The Creative Strategist <onboarding@resend.dev>";
  // Overridable only so the send path can be exercised against a local stub.
  const endpoint = process.env.RESEND_API_URL || "https://api.resend.com/emails";

  if (!apiKey) {
    return { ok: false, reason: "RESEND_API_KEY is not set" };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      return { ok: false, reason: `Resend responded ${res.status}: ${await res.text()}` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: `Resend request failed: ${String(error)}` };
  }
}
