/**
 * Every piece of copy and contact detail on the page lives here so the whole
 * landing page can be re-pointed or reworded without touching components.
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
  role: "Fractional CMO, Marketing Specialist, and AI Specialist",
  location: "South Florida",
  email: "andres@mycreativestrategist.com",
  calendly: "https://calendly.com/andres-hdw/30min",
  website: "https://mycreativestrategist.com",
  url: "https://itandresdiaz.com",
  social: {
    instagram: "https://instagram.com/mycreativestrategist",
    linkedin: "https://linkedin.com/in/andresdiazmiami",
  },
  metaTitle: "Andres Diaz | Marketing, Strategy, and AI for Health and Wellness Practices",
  metaDescription:
    "I help dentists, physicians, and health and wellness practice owners get more patients to know them, trust them, and do business with them, using creative strategy and applied AI.",
};

export const nav = [
  { label: "The gap", href: "#gap" },
  { label: "About me", href: "#about" },
  { label: "What I do", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const industries = [
  "Dental practices",
  "Physicians and specialists",
  "Med spas",
  "Wellness clinics",
  "Chiropractic",
  "Sleep and airway",
  "Aesthetics",
  "Physical therapy",
  "Functional medicine",
  "Private practice groups",
];

/** Section 2: the problem, framed the way a practice owner actually feels it. */
export const problems = [
  {
    title: "The phone rings and nobody picks up",
    body: "Your front desk is with a patient, so the call goes to voicemail. That caller does not leave a message. They call the practice down the street instead, and you never even know it happened.",
  },
  {
    title: "You are the best kept secret in your area",
    body: "You deliver exceptional care and your patients love you. But the people who still need you have never heard your name, because nothing is consistently telling your story where they are looking.",
  },
  {
    title: "Marketing happens whenever there is time",
    body: "A post here, a boosted ad there, a website that has not been touched in three years. There is effort, but no strategy connecting any of it, so it is impossible to tell what is actually working.",
  },
  {
    title: "AI feels like one more thing you are behind on",
    body: "Everyone says you should be using it. Nobody has shown you what it actually does for a practice like yours, or where to start without disrupting the care you already deliver.",
  },
];

/** Section 4: the three disciplines, described for a clinical audience. */
export const pillars = [
  {
    number: "01",
    title: "Strategy",
    tagline: "The plan before the tactics",
    body: "I start as your strategist, not your vendor. We get clear on who your ideal patient is, what makes your practice genuinely different, and what the next twelve months need to look like. Everything after this is built on that plan.",
    items: [
      "Fractional CMO leadership for your practice",
      "Positioning and messaging that sounds like you",
      "Patient journey and referral pathway mapping",
      "Growth roadmap with clear priorities",
    ],
  },
  {
    number: "02",
    title: "Marketing",
    tagline: "The work that gets you seen",
    body: "Once the plan is set, my team executes it. Website, content, search, paid media, and brand. All of it pointed at one outcome: more of the right patients finding you and choosing you.",
    items: [
      "Websites built to convert, not just to look good",
      "SEO and Generative Engine Optimization",
      "Content, photography, and video production",
      "Paid search and paid social that respects your budget",
    ],
  },
  {
    number: "03",
    title: "AI Implementation",
    tagline: "The systems that catch what you miss",
    body: "This is where practices see the fastest return. AI that answers the calls your team cannot get to, follows up with every lead, and handles the repetitive work, so your people can stay focused on patient care.",
    items: [
      "Voice agents for missed calls and after hours",
      "Chatbots for your website, Instagram, and Messenger",
      "Automated follow up, recall, and review requests",
      "Workflow automation across your existing tools",
    ],
  },
];

/** Section 6: engagement paths. Consultative on purpose, no figures. */
export const paths = [
  {
    title: "Start with AI",
    subtitle: "A focused implementation project",
    body: "The fastest way to feel a difference. We pick the one or two places your practice is leaking the most opportunity, usually missed calls or follow up, and we build the system that closes the gap. Defined scope, defined timeline.",
    best: "Best if you want a clear win before a bigger commitment.",
  },
  {
    title: "Marketing partnership",
    subtitle: "An ongoing retainer with my team behind you",
    body: "You get the strategy and the execution together. I lead the plan, my team runs the work across your website, content, search, and campaigns, and AI is built into the operation from the start rather than bolted on later.",
    best: "Best if marketing keeps falling to the bottom of your list.",
    featured: true,
  },
  {
    title: "Fractional CMO",
    subtitle: "Executive marketing leadership, part time",
    body: "For larger practices and multi location groups that need a marketing leader at the table without carrying a full in house department. I sit with your leadership on strategy, growth, and AI transformation.",
    best: "Best if you have a team to direct but nobody directing it.",
  },
];

/** Section 7: what working together actually looks like. */
export const processSteps = [
  {
    step: "01",
    title: "We talk",
    body: "A real conversation, not a pitch. You tell me what is working, what is frustrating, and where you want the practice to be. I tell you honestly whether I am the right fit. Sometimes the answer is no, and I will say so.",
  },
  {
    step: "02",
    title: "I build the plan",
    body: "I come back with a clear recommendation: what to fix first, what it takes, and what it looks like when it is working. No jargon, no hundred page deck you will never read.",
  },
  {
    step: "03",
    title: "We build it together",
    body: "My team executes while you stay focused on your patients. You get regular reporting, a direct line to me, and systems that keep running whether or not anyone is watching them that week.",
  },
];

/** Section 5: the Master Brain differentiator. */
export const masterBrain = {
  eyebrow: "The part most people skip",
  title: "AI without an identity is a liability",
  body: [
    "Most practices that try AI on their own end up with something generic. A chatbot that sounds like every other chatbot. Content that could belong to any office in any city. It is technically working and it is quietly damaging the trust you spent years building.",
    "So before any tool goes live, I build you a Master Brain: a single document that captures your voice, your values, your services, your ideal patient, and how your practice actually runs. Every AI system I deploy for you is grounded in that document.",
    "The result is AI that sounds like your practice, because it was taught your practice first.",
  ],
  callout: "Identity first. Tools second. That order is not negotiable.",
};

export const values = [
  {
    title: "I do things in excellence",
    body: "It is the standard I hold myself and my team to, and it comes from my faith. I do not cut corners, and I do not hand you work I would not put my name on.",
  },
  {
    title: "Integrity over revenue",
    body: "If a different solution serves you better, I will tell you, even when it costs me the engagement. I would rather earn your trust than your invoice.",
  },
  {
    title: "Honest about outcomes",
    body: "I will never guarantee you a specific number of patients. Nobody credible can. What I guarantee is the system, the effort, and the standard of the work.",
  },
  {
    title: "A partner, not a vendor",
    body: "I want to be genuinely invested in where your practice is going. That is a different relationship than hiring someone to post for you.",
  },
];
