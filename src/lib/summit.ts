/**
 * Copy for /summit, the page the QR code on the last slide of the
 * "Meet My Team" talk points to (AI for Small Business Summit, Sept 14 2026).
 *
 * It picks up exactly where the talk ends ("Let's find your first hire"), so
 * lines here echo the deck on purpose. Same house style as site.ts: a few bold
 * words per headline, two sentences per block at most, contractions welcome,
 * no pricing, no promised numbers.
 */

export const summit = {
  event: "AI for Small Business Summit 2026",

  /**
   * Andres's personal profiles, as he gave them for this page. They differ from
   * the business accounts in site.social, which the main site still uses.
   */
  links: {
    email: "andres@mycreativestrategist.com",
    linkedin: "https://www.linkedin.com/in/andresediaz/",
    instagram: "https://www.instagram.com/itsandresediaz/",
    instagramHandle: "@itsandresediaz",
  },

  metaTitle: "Let's find your first hire | Andres Diaz",
  metaDescription:
    "A free 30-minute call to spot the bottlenecks in your business and the AI that can take them off your plate.",

  hero: {
    eyebrow: "AI for Small Business Summit",
    before: "Let's find your first ",
    ink: "hire",
    after: ".",
    lede: "A free 30-minute call to spot the bottlenecks in your business and the AI that can take them off your plate.",
    primaryCta: "Book my free call",
    secondaryCta: "Save my contact",
  },

  session: {
    eyebrow: "Your free session",
    title: "30 minutes. Clear next steps.",
    lede: "Just you and me, looking at your business. No pitch, no pressure.",
    items: [
      {
        title: "Find your bottlenecks",
        body: "Where your time, calls, and leads are slipping, and what's worth fixing first.",
      },
      {
        title: "Explore AI that fits",
        body: "The AI tools and teammates that match how your business actually runs.",
      },
      {
        title: "Get marketing support",
        body: "Bring any marketing question. Strategy, website, content, or ads.",
      },
    ],
    note: "You leave with a clear next step, whether we work together or not.",
  },

  team: {
    eyebrow: "Want to go further?",
    title: "Build the team you can't afford yet.",
    lede: "Chat is an assistant you visit. An AI employee is a role that goes to work.",
    jarvis: {
      label: "Your own Jarvis",
      title: "A chief of staff that never clocks out.",
      body: "A personal AI assistant that knows your calendar, your clients, and your priorities, and takes action when you ask.",
    },
    /** The roles from the talk. Icons are the same renders used on the slides. */
    roles: [
      {
        icon: "/summit/roles/research.png",
        title: "Research Analyst",
        body: "Reads the internet so you don't have to.",
      },
      {
        icon: "/summit/roles/pm.png",
        title: "Project Manager",
        body: "Nothing said in a meeting gets lost.",
      },
      {
        icon: "/summit/roles/proposal.png",
        title: "Proposal Writer",
        body: "One sentence in. A client-ready proposal out.",
      },
      {
        icon: "/summit/roles/coach.png",
        title: "Accountability Coach",
        body: "Keeps the boss honest.",
      },
    ],
    openRole: {
      eyebrow: "Now hiring",
      title: "Your first hire",
      body: "Missed calls, follow up, scheduling, social media? Tell me the job you'd hand off first.",
    },
    note: "Every AI teammate runs on your Master Brain, so it sounds like you, not a robot.",
  },

  book: {
    eyebrow: "Book your call",
    title: "Grab your 30 minutes.",
    lede: "Pick a time that works for you. It's free, and it's just a conversation.",
    calendarCta: "Open my calendar",
    /** Phones get a button to Calendly's own page instead of the embedded calendar. */
    mobileTitle: "Pick a time that works",
    mobileBody: "30 minutes, free, right on my calendar.",
    formTitle: "Rather I reach out?",
    formLede: "Leave your details and I'll get back to you within one business day.",
    /** Chips on the form. The pick lands in the lead email as "First hire". */
    firstHireOptions: [
      "Executive assistant",
      "Answering calls and follow up",
      "Research",
      "Proposals",
      "Project management",
      "Social media",
      "Not sure yet",
    ],
  },

  stayInTouch: {
    eyebrow: "Stay in touch",
    title: "Let's keep the conversation going.",
    mainSiteCta: "See everything I do",
    signoff: "The Creative Strategist. Built with Excellence.",
  },
};

/** The downloadable contact card. Served by src/app/andres-diaz.vcf/route.ts. */
export const CONTACT_CARD_PATH = "/andres-diaz.vcf";
