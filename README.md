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

Submissions go straight from the browser to [Web3Forms](https://web3forms.com), which emails them
to the inbox registered on the form. There is no server route and no API key to configure: the
page works the moment it is deployed.

This has to be a client side POST. Web3Forms rejects server side submissions on the free plan
(`403: This method is not allowed. Use our API in client side`), so proxying it through a route
handler would fail. The access key is therefore public, which is how Web3Forms is designed: it
ships in static HTML on their own examples, and it grants nothing beyond sending a message to the
registered inbox.

The form sets `replyto` to the visitor's address, so replying from the inbox goes straight back to
them. Optional fields are only included when filled, keeping the notification email clean.

If the request fails, the form shows the error alongside a direct mailto link rather than
pretending it succeeded, so an inquiry is never silently lost.

Spam is handled by a hidden `botcheck` honeypot field, which is the name Web3Forms looks for.
Submissions that arrive with it filled are discarded on their side.

### Configuration

None required. The access key lives in [`src/lib/site.ts`](src/lib/site.ts).

To rotate the key, change it in the Web3Forms dashboard and either update that file or set
`NEXT_PUBLIC_WEB3FORMS_KEY` in the environment, which takes precedence.

Two settings worth reviewing in the Web3Forms dashboard:

- **Allowed domains.** Restrict the key to the production domain so the form cannot be submitted
  from someone else's page.
- **Autoresponder.** The page shows a thank you state immediately, but if you want the visitor to
  also receive a confirmation email, that is a dashboard setting rather than a code change.

## Deploying

Import the repo in Vercel and deploy. There are no environment variables and no build
configuration to set. Every route is statically prerendered.

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
  components/
    site-nav.tsx         fixed header with mobile sheet
    site-footer.tsx
    contact-form.tsx     the form, its states, and the Web3Forms submission
    reveal.tsx           scroll fade-in, fails open to visible
    sections/            one file per page section
  lib/
    site.ts              all copy, contact details, and the Web3Forms key
```

## A note on the reveal animation

Sections fade in on scroll. That animation is decorative, so every failure path ends with the
content visible rather than hidden: a `<noscript>` override covers scripting being off, and the
component shows content immediately if it is already on screen, if `IntersectionObserver` is
missing, or if the observer has not reported within two seconds. A landing page that renders blank
because an animation did not fire would be far worse than one that does not animate.
