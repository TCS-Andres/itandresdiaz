/**
 * Every piece of copy and contact detail on the page lives here so the whole
 * landing page can be re-pointed or reworded without touching components.
 *
 * House style: short. Headlines are a few bold words that still say the value
 * plainly. Two sentences per block is the ceiling. Contractions are fine and
 * encouraged: the voice is a trusted friend who happens to be an expert, not a
 * brochure. This page is read on a phone by a busy owner between meetings, so
 * anything that can be cut, gets cut. Keep the language industry neutral.
 */

/**
 * Web3Forms access key. This is public by design: Web3Forms only accepts
 * submissions from the browser, so the key ships in the client bundle the same
 * way it would sit in a static HTML form. It grants nothing except the ability
 * to send a message to the inbox registered on the form.
 *
 * Rotate it from the Web3Forms dashboard, or override it here without a code
 * change by setting NEXT_PUBLIC_WEB3FORMS_KEY.
 */
export const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "9cb40bc3-e1b6-43bb-b3eb-62a6b5f68ae9";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const site = {
  name: "Andres Diaz",
  company: "The Creative Strategist",
  role: "Fractional CMO and AI Specialist",
  location: "South Florida",
  email: "andres@mycreativestrategist.com",
  calendly: "https://calendly.com/andres-hdw/30min",
  website: "https://mycreativestrategist.com",
  url: "https://www.itsandresdiaz.com",
  social: {
    instagram: "https://instagram.com/mycreativestrategist",
    linkedin: "https://linkedin.com/in/andresdiazmiami",
  },
  metaTitle: "Andres Diaz | Marketing Strategy and AI for Growing Businesses",
  metaDescription:
    "I help business owners get more people to know them, trust them, and do business with them, by combining creative strategy, marketing, and applied AI.",
  footerTagline:
    "Strategy, marketing, and AI for businesses that want to grow without losing what makes them worth choosing.",
};

export const hero = {
  eyebrow: "For owners ready to grow",
  /**
   * Each line draws its orange underline in turn. The full signature line,
   * "know you, trust you, and do business with you", lives in the lede.
   */
  headline: [
    { before: "Be ", ink: "known", after: "." },
    { before: "Be ", ink: "trusted", after: "." },
    { before: "Be ", ink: "chosen", after: "." },
  ],
  lede: "I'm Andres Diaz. I bring strategy, marketing, and AI together to get more people to know you, trust you, and do business with you.",
  primaryCta: "Let's grow your business",
  secondaryCta: "Get the free guide",
  /** Short reassurances under the buttons. Every one is already stated elsewhere on the page. */
  proof: [
    "You work with me directly",
    "Strategy, marketing, and AI in one place",
    "Based in South Florida, working nationwide",
  ],
};

export const nav = [
  { label: "About me", href: "#about" },
  { label: "What I do", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Free guide", href: "#guide" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const industries = [
  "Home services",
  "Professional services",
  "Health and wellness",
  "Restaurants and hospitality",
  "Retail and ecommerce",
  "Real estate",
  "Construction and trades",
  "Legal and financial",
  "Med spas and clinics",
  "B2B and manufacturing",
];

/** Section intros: eyebrow, headline, and one short supporting line. */
export const sections = {
  gap: {
    eyebrow: "The gap",
    title: "Great work isn't enough.",
    lede: "Most owners I meet don't have a quality problem. They have one of these.",
    closer: "Posting more won't fix it.",
    closerStrong: "A system will.",
  },
  about: {
    eyebrow: "Who you work with",
    title: "No handoffs. You work with me.",
    body: [
      "I run The Creative Strategist out of South Florida as a fractional CMO and AI specialist, for businesses that want to grow without building a marketing department.",
      "I work with owners, not committees. Your marketing asks people to trust you with their money, their home, or their health. That deserves more than a template.",
    ],
    quote: "Marketing is an investment, not an expense.",
    quoteBody:
      "Think of your business as an airplane. Overhead is the body, and marketing and sales are the engines. Spend on the body and it gets heavier. Spend on the engines and it goes farther.",
  },
  services: {
    eyebrow: "What I do",
    title: "Strategy, marketing, and AI. One partner.",
    lede: "Most businesses hire three vendors who never talk to each other. I bring it all together.",
  },
  paths: {
    eyebrow: "Ways to work together",
    title: "Start where you need it most.",
    lede: "No cookie cutter packages. We build around where you are today.",
    footnote: "We scope it together, and you see the full investment before you commit.",
    cta: "Talk about this option",
  },
  process: {
    eyebrow: "How it works",
    title: "It starts with a conversation.",
    valuesEyebrow: "How I operate",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Fair questions. Straight answers.",
    lede: "Don't see yours here? Just ask me.",
    primaryCta: "Ask me directly",
    secondaryCta: "Send an email",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Ready to grow? Let's talk.",
    lede: "No pitch, no pressure. Just an honest conversation about where you are and whether I'm the right person to help.",
  },
};

/** The problem, framed the way an owner actually feels it. */
export const problems = [
  {
    title: "Missed calls, lost customers",
    body: "Your team is busy and the phone rings out. That caller won't leave a message. They'll call someone else.",
  },
  {
    title: "The best kept secret in town",
    body: "Your customers love you. The people who still need you have never heard your name.",
  },
  {
    title: "Marketing without a plan",
    body: "A post here, an ad there, a website from three years ago. None of it adds up.",
  },
  {
    title: "Behind on AI",
    body: "Everyone says you should be using it. Nobody has shown you what it actually does for a business like yours.",
  },
];

/** The three disciplines. */
export const pillars = [
  {
    number: "01",
    title: "Strategy",
    tagline: "The plan before the tactics",
    body: "We get clear on who your ideal customer is and what makes you different. Everything else is built on that.",
    items: [
      "Fractional CMO leadership",
      "Positioning and messaging",
      "Customer journey mapping",
      "A growth roadmap with priorities",
    ],
  },
  {
    number: "02",
    title: "Marketing",
    tagline: "The work that gets you seen",
    body: "My team runs the plan across your website, content, search, and campaigns. You stay out of the weeds.",
    items: [
      "Websites built to convert",
      "SEO and AI search visibility",
      "Content, photo, and video",
      "Paid search and paid social",
    ],
  },
  {
    number: "03",
    title: "AI Implementation",
    tagline: "Systems that catch what you miss",
    body: "Where most owners feel it fastest. AI answers the calls you miss and follows up with every lead.",
    items: [
      "Voice agents for missed calls",
      "Website and social chatbots",
      "Automated follow up and reviews",
      "Workflow automation",
    ],
  },
];

/** Options in the contact form. Each becomes a labeled row in the inquiry email. */
export const businessTypes = [
  "Home services or trades",
  "Professional services",
  "Health and wellness",
  "Restaurant or hospitality",
  "Retail or ecommerce",
  "Real estate or construction",
  "B2B, manufacturing, or logistics",
  "Something else",
];

export const interests = [
  "AI implementation, missed calls and follow up",
  "Marketing help, ongoing support",
  "Website or rebrand project",
  "Fractional CMO leadership",
  "Not sure yet, I want to talk it through",
];

/**
 * Engagement paths. Consultative on purpose, no figures. `interest` is the
 * contact form option a path's link preselects, so it must match `interests`.
 */
export const paths = [
  {
    title: "Start with AI",
    subtitle: "A focused project",
    body: "We find where you're losing the most opportunity, usually missed calls, and build the system that closes the gap.",
    best: "Best if you want a clear win first.",
    interest: interests[0],
  },
  {
    title: "Marketing partnership",
    subtitle: "An ongoing retainer",
    body: "I lead the plan, my team does the work, and AI is built in from day one instead of bolted on later.",
    best: "Best if marketing keeps falling to the bottom of your list.",
    interest: interests[1],
    featured: true,
  },
  {
    title: "Fractional CMO",
    subtitle: "Marketing leadership, part time",
    body: "A marketing leader at the table, without the cost of a full in house department.",
    best: "Best if you have a team but nobody directing it.",
    interest: interests[3],
  },
];

/** What working together actually looks like. */
export const processSteps = [
  {
    step: "01",
    title: "We talk",
    body: "You tell me what's working and what isn't. I tell you honestly whether I'm the right fit.",
  },
  {
    step: "02",
    title: "I build the plan",
    body: "A clear call on what to fix first and what it takes. No hundred page deck.",
  },
  {
    step: "03",
    title: "We build it together",
    body: "My team does the work while you run your business. You get regular reporting and a direct line to me.",
  },
];

/** The Master Brain differentiator. */
export const masterBrain = {
  eyebrow: "The part most people skip",
  title: "Your AI should sound like you.",
  body: [
    "Most businesses that try AI on their own end up sounding like everyone else. It works, and it quietly costs you the trust you spent years building.",
    "So before any tool goes live, I build your Master Brain: one document that captures how your business sounds and runs. Every AI system I build for you runs on it.",
  ],
  callout: "Identity first. Tools second.",
  capturesLabel: "The Master Brain captures",
  captures: [
    "Your voice and tone",
    "Your values and standards",
    "Your products and services",
    "Your ideal customer",
    "How your business runs",
    "What you'd never say",
  ],
};

export const values = [
  {
    title: "I do things in excellence",
    body: "It comes from my faith. I won't hand you work I wouldn't put my name on.",
  },
  {
    title: "Integrity over revenue",
    body: "If something else serves you better, I'll tell you, even when it costs me the work.",
  },
  {
    title: "Honest about outcomes",
    body: "I won't promise you specific numbers. I guarantee the systems and the standard of the work.",
  },
  {
    title: "A partner, not a vendor",
    body: "I'm genuinely invested in you and where your business is going.",
  },
];

/**
 * The questions owners ask before they reach out. Answers only restate what the
 * page already commits to, so nothing here promises more than the rest of the site.
 */
export const faqs = [
  {
    q: "How much does it cost?",
    a: "It depends on what we build, so there's no one price for everyone. We scope it together, and you see the full investment before you commit to anything.",
  },
  {
    q: "Do you work with businesses like mine?",
    a: "Most likely. I work with owners across industries, from home services and professional services to retail, real estate, and B2B.",
  },
  {
    q: "I'm not a tech person. Can I still use AI?",
    a: "Yes. My team and I build and run the systems, so you stay focused on running the business.",
  },
  {
    q: "Will AI make my business sound like a robot?",
    a: "Not when it's built on your Master Brain. Every AI system I build for you is grounded in how your business actually sounds and runs.",
  },
  {
    q: "Can you guarantee results?",
    a: "I won't promise you specific numbers. I guarantee the systems and the standard of the work.",
  },
  {
    q: "Do you only work in South Florida?",
    a: "I'm based in South Florida and work with businesses nationwide.",
  },
  {
    q: "What happens after I reach out?",
    a: "I read every message myself and reply within one business day. The first step is just a conversation, with no pitch and no pressure.",
  },
];

/** Path to the lead magnet in /public, and the filename a visitor ends up with. */
export const GUIDE_PDF = "/the-complete-guide-to-marketing-channels.pdf";
export const GUIDE_FILENAME = "The Complete Guide to Marketing Channels.pdf";

/** The free guide offered as the secondary call to action. */
export const guide = {
  eyebrow: "Free guide",
  /** The hook. `title` is the guide's real name and sits right under it. */
  headline: "Stop guessing where to market.",
  title: "The Complete Guide to Marketing Channels",
  lede: "Every channel worth your time, with real small business examples and a simple way to pick the few that fit you.",
  pullQuote: "You don't need every channel. Nobody does.",
  pullBody:
    "Pick one channel to get found, one to build relationships, and one to grow faster. Do those three with excellence before you add a fourth.",
  categories: [
    "Owned Digital",
    "Organic Social",
    "Paid Digital",
    "Content and Authority",
    "Local and Community",
    "Partnership and Referral",
    "Traditional and Offline",
    "Marketplaces and Directories",
    "PR and Earned Media",
    "Experiential and Guerrilla",
    "Emerging and AI Powered",
  ],
  categoriesLabel: "What's inside",
  facts: ["22 pages", "11 categories", "50+ channels", "Free"],
  formNote: "It opens right on your screen. No email sequence, no list you didn't ask to join.",
};
