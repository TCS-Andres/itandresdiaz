# itandresdiaz

A one page landing site for Andres Diaz, built for dentists, physicians, and health and wellness
practice owners. Its job is to explain who Andres is, what he does across strategy, marketing, and
AI, and to capture inquiries through a contact form.

Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS.

## Running locally

```bash
npm install
```

```bash
npm run dev
```

The site runs on http://localhost:3003.

## Contact form

Submissions POST to `/api/contact`, which sends two emails through Resend:

1. A lead notification to `NOTIFY_EMAIL`, with `reply_to` set to the visitor so a reply goes
   straight back to them.
2. A courtesy confirmation to the visitor, sent after the response using `after()` so it never
   delays the form.

The lead notification is the one that matters. If it fails, the API returns a 502 and the form
tells the visitor to email Andres directly, so an inquiry is never silently lost. The failed
payload is also written to the server log as a backstop.

Spam is handled with a hidden honeypot field. Bots that fill it get a success response and no
email is sent.

### Environment variables

Copy `.env.example` to `.env.local` and fill it in:

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | Resend API key. Without it the form returns an error. |
| `RESEND_FROM` | no | Sender address. Defaults to the Resend sandbox sender. |
| `NOTIFY_EMAIL` | no | Where lead notifications land. Defaults to andres@mycreativestrategist.com. |
| `RESEND_API_URL` | no | Overrides the Resend endpoint. Only used to point at a stub in testing. |

Until `mycreativestrategist.com` is verified in Resend, leave `RESEND_FROM` on the sandbox sender
`The Creative Strategist <onboarding@resend.dev>`. After verifying the domain, switch it to
`Andres Diaz <andres@mycreativestrategist.com>` so replies and deliverability look right.

## Deploying

Import the repo in Vercel, add the environment variables above under Project Settings, and deploy.
No other configuration is needed. The page is statically prerendered and only `/api/contact` runs
on demand.

## Editing the copy

Nearly all text lives in [`src/lib/site.ts`](src/lib/site.ts): the hero, the problem list, the
three service pillars, the engagement paths, the process steps, and the contact details. Change it
there rather than in the components.

Brand rules that apply to any edit:

- No em dashes anywhere. Use commas, colons, periods, or restructure. Verify with
  `grep -rnP '\x{2014}' src/`
- Colors: Deep Navy `#1C192A`, Brand Orange `#F28D3D`, Golden Yellow `#FCDF09`, Accent Blue
  `#2B69D8`. Yellow is a garnish, never a background for body text.
- Type: Quicksand for headings, DM Sans for body.
- Never guarantee specific results. Guarantee systems, effort, and excellence.

## Project structure

```
src/
  app/
    layout.tsx           fonts, metadata, noscript reveal fallback
    page.tsx             section order and JSON-LD
    globals.css          design tokens and component classes
    api/contact/route.ts form handler and email templates
  components/
    site-nav.tsx         fixed header with mobile sheet
    site-footer.tsx
    contact-form.tsx     the form, its states, and the fallback message
    reveal.tsx           scroll fade-in, fails open to visible
    sections/            one file per page section
  lib/
    site.ts              all copy and contact details
    resend.ts            minimal Resend REST client
```

## A note on the reveal animation

Sections fade in on scroll. That animation is decorative, so every failure path ends with the
content visible rather than hidden: a `<noscript>` override covers scripting being off, and the
component shows content immediately if it is already on screen, if `IntersectionObserver` is
missing, or if the observer has not reported within two seconds. A landing page that renders blank
because an animation did not fire would be far worse than one that does not animate.
