import { NextResponse, after } from "next/server";
import { sendEmail } from "@/lib/resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 120, email: 160, phone: 40, practice: 160, choice: 120, message: 4000 };

function clean(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Deliberately permissive. Bounces are cheaper than rejecting a real lead. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ROW = (label: string, value: string) =>
  value
    ? `<tr>
         <td style="padding:8px 16px 8px 0;color:#8B8797;font-size:13px;white-space:nowrap;vertical-align:top;">${label}</td>
         <td style="padding:8px 0;color:#1C192A;font-size:15px;font-weight:600;">${escapeHtml(value)}</td>
       </tr>`
    : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "That request could not be read." }, { status: 400 });
  }

  // Honeypot: silently accept so the bot does not learn anything.
  if (clean(body.company_website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const phone = clean(body.phone, MAX.phone);
  const practice = clean(body.practice, MAX.practice);
  const practiceType = clean(body.practiceType, MAX.choice);
  const interest = clean(body.interest, MAX.choice);
  const message = clean(body.message, MAX.message);

  if (!name || !email) {
    return NextResponse.json({ error: "Please include your name and email." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address does not look right." }, { status: 400 });
  }

  const notifyTo = process.env.NOTIFY_EMAIL || site.email;

  const internalHtml = `
  <div style="font-family:'DM Sans',Helvetica,Arial,sans-serif;background:#FAFAF7;padding:32px;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #E4E2EA;border-radius:16px;overflow:hidden;">
      <div style="background:#1C192A;padding:20px 28px;">
        <p style="margin:0;color:#F28D3D;font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;">New inquiry</p>
        <p style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:700;">${escapeHtml(name)}${
          practice ? ` &middot; ${escapeHtml(practice)}` : ""
        }</p>
      </div>
      <div style="padding:24px 28px;">
        <table style="width:100%;border-collapse:collapse;">
          ${ROW("Email", email)}
          ${ROW("Phone", phone)}
          ${ROW("Practice", practice)}
          ${ROW("Type", practiceType)}
          ${ROW("Looking for", interest)}
        </table>
        ${
          message
            ? `<div style="margin-top:20px;padding-top:20px;border-top:1px solid #E4E2EA;">
                 <p style="margin:0 0 8px;color:#8B8797;font-size:13px;">Message</p>
                 <p style="margin:0;color:#1C192A;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(message)}</p>
               </div>`
            : ""
        }
        <a href="mailto:${escapeHtml(email)}" style="display:inline-block;margin-top:24px;background:#F28D3D;color:#1C192A;font-weight:700;font-size:15px;text-decoration:none;padding:12px 26px;border-radius:999px;">Reply to ${escapeHtml(
          name.split(" ")[0] || name,
        )}</a>
      </div>
    </div>
  </div>`;

  // Only use a title the sender gave us. Office managers and marketing leads
  // fill this form too, so never assume "Dr." on their behalf.
  const parts = name.split(/\s+/).filter(Boolean);
  const hasDoctorTitle = /^dr\.?$/i.test(parts[0] ?? "");
  const greetingName = escapeHtml(
    hasDoctorTitle ? `Dr. ${parts[parts.length - 1]}` : parts[0] || name,
  );

  const replyHtml = `
  <div style="font-family:'DM Sans',Helvetica,Arial,sans-serif;background:#FAFAF7;padding:32px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E4E2EA;border-radius:16px;overflow:hidden;">
      <div style="background:#1C192A;padding:28px;">
        <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">Thank you for reaching out</p>
      </div>
      <div style="padding:28px;color:#1C192A;font-size:15px;line-height:1.7;">
        <p style="margin:0 0 16px;">${greetingName}, your message came through and it landed with me directly, not with an assistant or an autoresponder queue.</p>
        <p style="margin:0 0 16px;">I read every one of these myself, and I will get back to you within one business day with real thoughts on your situation. If you would rather skip the back and forth, you are welcome to grab time on my calendar right now.</p>
        <p style="margin:0 0 24px;">Either way, I am glad you reached out.</p>
        <a href="${site.calendly}" style="display:inline-block;background:#F28D3D;color:#1C192A;font-weight:700;font-size:15px;text-decoration:none;padding:13px 28px;border-radius:999px;">Book a 30 minute call</a>
        <p style="margin:28px 0 0;padding-top:20px;border-top:1px solid #E4E2EA;color:#1C192A;font-size:15px;">
          Andres Diaz<br />
          <span style="color:#8B8797;font-size:14px;">${site.role}<br />The Creative Strategist</span>
        </p>
      </div>
    </div>
  </div>`;

  // The lead notification is what actually matters. The courtesy reply is a bonus.
  const internal = await sendEmail({
    to: notifyTo,
    subject: `New inquiry: ${name}${practice ? ` (${practice})` : ""}`,
    html: internalHtml,
    replyTo: email,
  });

  if (!internal.ok) {
    console.error("[contact] failed to deliver lead notification:", internal.reason);
    console.error("[contact] lead payload:", JSON.stringify({ name, email, phone, practice, practiceType, interest, message }));
    return NextResponse.json(
      { error: "The form could not send just now." },
      { status: 502 },
    );
  }

  // The courtesy reply runs after the response is sent. The lead is already
  // captured, so a failure here is a log line, never a user-facing error.
  after(async () => {
    const courtesy = await sendEmail({
      to: email,
      subject: "Thanks for reaching out, I will be in touch shortly",
      html: replyHtml,
      replyTo: site.email,
    });
    if (!courtesy.ok) {
      console.warn("[contact] courtesy reply not sent:", courtesy.reason);
    }
  });

  return NextResponse.json({ ok: true });
}
