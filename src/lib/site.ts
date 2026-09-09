/**
 * Every piece of copy and contact detail on the page lives here so the whole
 * landing page can be re-pointed or reworded without touching components.
 *
 * House style: short. Two sentences per block is the ceiling. This page is read
 * on a phone by a busy owner between meetings, so anything that can be cut, gets
 * cut. Keep the language industry neutral: the audience is any business owner,
 * not one vertical.
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
  url: "https://itandresdiaz.com",
  social: {
    instagram: "https://instagram.com/mycreativestrategist",
    linkedin: "https://linkedin.com/in/andresdiazmiami",
  },
  metaTitle: "Andres Diaz | Marketing Strategy and AI for Growing Businesses",
  metaDescription:
    "I help business owners get more people to know them, trust them, and do business with them, by combining creative strategy, marketing, and applied AI.",
};

export const hero = {
  eyebrow: "For business owners who are ready to grow",
  lede: "I am Andres Diaz. I bring strategy, marketing, and AI together so your business becomes the obvious choice in your market.",
};

export const nav = [
  { label: "The gap", href: "#gap" },
  { label: "About me", href: "#about" },
  { label: "What I do", href: "#services" },
  { label: "How it works", href: "#process" },
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

/** The problem, framed the way an owner actually feels it. */
export const problems = [
  {
    title: "The phone rings and nobody picks up",
    body: "Your team is busy with a customer. That caller does not leave a message. They call your competitor instead.",
  },
  {
    title: "You are the best kept secret in town",
    body: "Your customers love you. The people who still need you have never heard your name.",
  },
  {
    title: "Marketing happens whenever there is time",
    body: "A post here, an ad there, a website from three years ago. Effort without a plan, so none of it adds up.",
  },
  {
    title: "AI feels like one more thing you are behind on",
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
    tagline: "The systems that catch what you miss",
    body: "Where most owners feel it fastest. AI answers the calls you miss and follows up with every lead.",
    items: [
      "Voice agents for missed calls",
      "Website and social chatbots",
      "Automated follow up and reviews",
      "Workflow automation",
    ],
  },
];

/** Engagement paths. Consultative on purpose, no figures. */
export const paths = [
  {
    title: "Start with AI",
    subtitle: "A focused project",
    body: "We find where you are leaking the most opportunity, usually missed calls, and build the system that closes it.",
    best: "Best if you want a clear win first.",
  },
  {
    title: "Marketing partnership",
    subtitle: "An ongoing retainer",
    body: "I lead the plan, my team runs the work, and AI is built in from the start rather than bolted on later.",
    best: "Best if marketing keeps falling to the bottom of your list.",
    featured: true,
  },
  {
    title: "Fractional CMO",
    subtitle: "Marketing leadership, part time",
    body: "For companies that need a marketing leader at the table without carrying a full in house department.",
    best: "Best if you have a team but nobody directing it.",
  },
];

/** What working together actually looks like. */
export const processSteps = [
  {
    step: "01",
    title: "We talk",
    body: "You tell me what is working and what is not. I tell you honestly whether I am the right fit.",
  },
  {
    step: "02",
    title: "I build the plan",
    body: "A clear recommendation on what to fix first and what it takes. No hundred page deck.",
  },
  {
    step: "03",
    title: "We build it together",
    body: "My team executes while you stay focused on running the business. Regular reporting and a direct line to me.",
  },
];

/** The Master Brain differentiator. */
export const masterBrain = {
  eyebrow: "The part most people skip",
  title: "AI without an identity is a liability",
  body: [
    "Most businesses that try AI alone end up sounding like everyone else. It technically works, and it quietly costs you the trust you spent years building.",
    "So before any tool goes live, I build you a Master Brain: one document that captures how your business actually sounds and runs. Every AI system I build for you is grounded in it.",
  ],
  callout: "Identity first. Tools second.",
  captures: [
    "Your voice and tone",
    "Your values and standards",
    "Your products and services",
    "Your ideal customer",
    "How your business runs",
    "What you will never say",
  ],
};

export const values = [
  {
    title: "I do things in excellence",
    body: "It comes from my faith. I do not hand you work I would not put my name on.",
  },
  {
    title: "Integrity over revenue",
    body: "If something else serves you better, I will say so, even when it costs me the work.",
  },
  {
    title: "Honest about outcomes",
    body: "I will not promise you specific numbers. I guarantee the systems and the standard of the work.",
  },
  {
    title: "A partner, not a vendor",
    body: "I want to be invested in where your business is going.",
  },
];
