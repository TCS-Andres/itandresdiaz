/**
 * Copy for /links, the link-in-bio page for Instagram, Facebook, and any other
 * profile. Someone lands here from a bio on a phone, so every card is one idea
 * and one button. Same house style as site.ts: a few bold words per headline,
 * two sentences at most, contractions welcome, no pricing, no promised numbers.
 *
 * In each card title, `ink` is the phrase that gets the orange underline.
 */
import { site } from "@/lib/site";
import { summit } from "@/lib/summit";

export const links = {
  metaTitle: "Andres Diaz | Start here",
  metaDescription:
    "Book a free call, grab the free marketing guide, and see how I help business owners grow with strategy, marketing, and AI.",

  hero: {
    status: "South Florida · Working nationwide",
    name: site.name,
    role: site.role,
    /**
     * "I help you" stays put while the results cycle in under it, each with the
     * service that gets it. AI leads and alternates with marketing, so both
     * sides of the business show up. Keep each `text` under about 23
     * characters so it fits one line on a phone.
     */
    lead: "I help you",
    outcomes: [
      { text: "never miss a call.", service: "AI Receptionist" },
      { text: "turn clicks into calls.", service: "Website Design" },
      { text: "answer every lead.", service: "AI Lead Follow-up" },
      { text: "be remembered.", service: "Brand Development" },
      { text: "win back hours.", service: "AI Automation" },
      { text: "get found online.", service: "SEO and AI Search" },
      { text: "stay open 24/7.", service: "AI Website Chat" },
      { text: "grow with a plan.", service: "Fractional CMO" },
    ],
    cta: "Book a free call",
  },

  /**
   * The round buttons in the header, in this order. Leave `href` empty to hide
   * one, so a profile can be added later by pasting its link here.
   */
  social: [
    { key: "instagram", label: "Instagram", href: summit.links.instagram },
    { key: "facebook", label: "Facebook", href: "" },
    { key: "linkedin", label: "LinkedIn", href: summit.links.linkedin },
    { key: "email", label: "Email", href: `mailto:${site.email}` },
    { key: "website", label: "The Creative Strategist", href: site.website },
  ],

  call: {
    id: "call",
    tab: "Call",
    eyebrow: "Free · 30 min · Online",
    title: { before: "Book a ", ink: "free call", after: "." },
    ledeStrong: "Just you and me, looking at your business.",
    lede: " No pitch, no pressure.",
    items: [
      { icon: "search", label: "Your bottlenecks" },
      { icon: "sparkles", label: "AI that fits" },
      { icon: "megaphone", label: "Marketing help" },
      { icon: "check", label: "A clear next step" },
    ],
    quote: "No handoffs. You'll be talking to me.",
    cta: "Pick a time",
    note: summit.session.note,
  },

  guide: {
    id: "guide",
    tab: "Guide",
    eyebrow: "Free guide · PDF",
    title: { before: "Stop guessing ", ink: "where to market", after: "." },
    ledeStrong: "The Complete Guide to Marketing Channels.",
    lede: " Every channel worth your time, with real small business examples.",
    stats: [
      { value: 22, suffix: "", label: "pages" },
      { value: 11, suffix: "", label: "categories" },
      { value: 50, suffix: "+", label: "channels" },
    ],
  },

  ai: {
    id: "ai",
    tab: "AI hire",
    eyebrow: "AI for your business",
    title: { before: "Meet your first ", ink: "AI hire", after: "." },
    ledeStrong: "You're not buying software.",
    lede: " You're hiring a result: calls answered, leads followed up, hours back in your week.",
    /**
     * The AI employees owners ask for most, each sold by what it gets done, not
     * by what it is. `icon` picks the tile icon in agent-tile.tsx. They also
     * orbit the portrait in the header.
     */
    agents: [
      {
        icon: "phone",
        role: "AI Receptionist",
        outcome: "Never miss another call.",
        body: "Answers every call day or night, books the appointment, and texts you the details.",
      },
      {
        icon: "inbox",
        role: "AI Inbox Assistant",
        outcome: "Get hours back from your inbox.",
        body: "Sorts every email, drafts replies in your voice, and flags only what needs you.",
      },
      {
        icon: "zap",
        role: "AI Lead Follow-up",
        outcome: "Every lead hears back in seconds.",
        body: "Texts and emails new leads the moment they come in, and follows up until they book.",
      },
      {
        icon: "chat",
        role: "AI Website Chat",
        outcome: "Your website, working for you 24/7.",
        body: "Answers questions, captures contact info, and books calls while you sleep.",
      },
      {
        icon: "star",
        role: "AI Review Manager",
        outcome: "Turn happy customers into reviews.",
        body: "Asks every happy customer at the right moment, and helps you reply to each review.",
      },
      {
        icon: "rewind",
        role: "AI Reactivation Agent",
        outcome: "Wake up your old customer list.",
        body: "Reaches out to past customers and cold leads with a reason to come back.",
      },
    ],
    swipeHint: "Swipe or tap to meet the team",
    note: summit.team.note,
    cta: "Find your first hire",
  },

  marketing: {
    id: "marketing",
    tab: "Marketing",
    eyebrow: "Full-service marketing",
    title: { before: "A full marketing team, ", ink: "minus the overhead", after: "." },
    ledeStrong: "I lead the plan, my team does the work.",
    lede: " You stay out of the weeds.",
    /**
     * Everything the agency does, each sold by what it does for the owner.
     * `icon` picks the icon in MarketingCard. `visual` swaps the icon for a
     * small drawing; "browser" also makes the tile full width.
     */
    services: [
      {
        icon: "monitor",
        name: "Website Design and Development",
        result: "A fast, modern site built to turn visitors into calls.",
        visual: "browser",
      },
      {
        icon: "palette",
        name: "Brand Development",
        result: "A look and message people remember.",
        visual: "swatches",
      },
      { icon: "search", name: "SEO and AI Search", result: "Show up on Google and in AI answers." },
      { icon: "target", name: "Paid Ads", result: "Google and Meta ads aimed at the right buyers." },
      { icon: "heart", name: "Social Media", result: "Show up every week, in your voice." },
      { icon: "camera", name: "Photo and Video", result: "Content that shows off your best work." },
      { icon: "mail", name: "Email and Text", result: "Stay top of mind with past customers." },
    ],
    cta: "Talk about your marketing",
  },

  work: {
    id: "work",
    tab: "Work",
    eyebrow: "Ways to work together",
    title: { before: "Strategy, marketing, and AI. ", ink: "One partner.", after: "" },
    lede: "Most businesses hire three vendors who never talk to each other. ",
    ledeStrong: "I bring it all together.",
    emailLabel: "Email me directly",
    emailCta: "Email me",
    copyCta: "Copy email",
    copied: "Copied",
    saveContact: "Save contact",
    fullSite: "Visit my site",
  },

  footer: {
    handle: summit.links.instagramHandle,
    handleHref: summit.links.instagram,
    signoff: "The Creative Strategist · Built with Excellence",
  },

  floatingCta: "Book a call",
};
