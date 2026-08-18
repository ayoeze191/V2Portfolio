import type { StaticImageData } from "next/image";

import debsphere from "./../assets/images/Projects/debsphere.png";
import learnpally from "./../assets/images/Projects/learnpally.png";
import ekopages from "./../assets/images/Projects/ekopages.png";
import mctechy from "./../assets/images/Projects/Mctechy.png";
import unilms from "./../assets/images/Projects/unilms.png";
import shibayc from "./../assets/images/Projects/shibayc.png";
import githubUserFinder from "./../assets/images/Projects/githubfindme.png";
import dogify from "./../assets/images/Projects/Dogify.png";

/**
 * The single source of truth for work shown anywhere on the site.
 *
 * The home page renders `featuredProjects` as a tight edit; /projects renders
 * the full list with the `detail` block expanded inline. Add a project once,
 * here, and both surfaces pick it up.
 */
export type Project = {
  slug: string;
  title: string;
  role: string;
  year: string;
  summary: string;
  tech: string[];
  live?: string;
  github?: string;
  image?: StaticImageData;
  /** Shown on the home page list. Everything else lives in the archive only. */
  featured?: boolean;
  /** Long-form notes, revealed when an archive row is expanded. */
  detail?: {
    body?: string;
    features?: string[];
    challenges?: string;
    learnings?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "debsphere-academy",
    title: "Debsphere Academy",
    role: "Tech Lead",
    year: "2025",
    summary:
      "Led the team building a full-stack learning platform — queue-backed background jobs, Prisma data layer, and a Next.js frontend.",
    tech: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "Redis", "BullMQ"],
    live: "https://www.debshphereacademy.com/",
    image: debsphere,
    featured: true,
    detail: {
      body: "A learning platform built for a training academy, covering enrolment, course delivery, and cohort management. I led the engineering side: shaping the data model, standing up the job queue for anything slow enough to hurt a request, and setting the conventions the rest of the team built against.",
      features: [
        "Course and cohort management with role-based access",
        "Queue-backed background jobs for email and media processing",
        "Prisma schema covering enrolment, progress, and payments",
        "Redis-backed caching on the heaviest read paths",
      ],
      challenges:
        "Keeping request latency flat as the heavy work grew. Moving media processing and transactional email onto BullMQ workers meant the API stayed fast while the slow work drained in the background.",
      learnings:
        "Leading a team is mostly deciding what not to build yet, and writing the conventions down before anyone needs them.",
    },
  },
  {
    slug: "learnpally",
    title: "Learnpally",
    role: "Full-Stack Engineer",
    year: "2024",
    summary:
      "E-learning platform across web and mobile. Course management, Paystack payments, background jobs for email and video processing, and PostHog analytics.",
    tech: ["React", "React Native", "Node.js", "Express", "MongoDB", "Paystack"],
    live: "https://learn.learnpally.com",
    image: learnpally,
    featured: true,
    detail: {
      body: "One product, two clients: a React web app and a React Native mobile app sharing a single Express API. I worked across the whole stack, from the course player to the payment reconciliation behind it.",
      features: [
        "Shared Express API serving both web and React Native clients",
        "Paystack checkout with webhook-driven reconciliation",
        "Background workers for transactional email and video processing",
        "PostHog instrumentation across the signup and purchase funnels",
      ],
      challenges:
        "Payment webhooks arrive out of order and sometimes twice. Making enrolment idempotent — keyed on the provider reference rather than the request — was what made the flow trustworthy.",
      learnings:
        "Instrument the funnel before launch, not after someone asks why conversion is low.",
    },
  },
  {
    slug: "rentanything",
    title: "RentAnything",
    role: "Full-Stack Developer",
    year: "2024",
    summary:
      "Rental marketplace with a custom Vue 3 SSR pipeline, full booking and pricing workflows, and Google Maps location search.",
    tech: ["Vue 3", "Vite SSR", "Node.js", "Google Maps API"],
    live: "https://rentanything.io",
    featured: true,
    detail: {
      body: "A two-sided rental marketplace. Listings had to be indexable, so the app runs through a hand-rolled Vue 3 + Vite SSR pipeline rather than a framework that ships one out of the box.",
      features: [
        "Custom Vue 3 server-rendering pipeline on Vite",
        "Booking flow with date-range availability and pricing rules",
        "Google Maps location search and radius filtering",
        "Listing management for owners, with media upload",
      ],
      challenges:
        "Hydration mismatches on any component that touched dates or the user's locale. Pinning formatting to a single timezone on both sides of the render was the fix.",
      learnings:
        "SSR is a lot of machinery to own yourself — worth it for SEO-critical pages, rarely worth it for anything behind a login.",
    },
  },
  {
    slug: "ekopages",
    title: "EkoPages",
    role: "Frontend Developer",
    year: "2023",
    summary:
      "Educational platform teaching African children about the SDGs through illustrated stories, courses, and blended learning programmes.",
    tech: ["Next.js", "TypeScript", "Django", "Tailwind"],
    live: "https://ekopages.com",
    image: ekopages,
    featured: true,
    detail: {
      body: "An edtech platform using SDG-themed children's literature to teach environmental and sustainability topics, delivered both online and through physical workshops in schools.",
      features: [
        "SDG-themed children's literature library",
        "Interactive e-learning modules",
        "Blended learning — online modules plus physical workshops",
        "Publisher platform for emerging writers",
        "School partnership programme",
      ],
      challenges:
        "Building an interface that works for very young readers. Most of the decisions came down to reducing the number of things on screen at once.",
      learnings:
        "Culturally relevant content matters more than the feature list when the audience is children.",
    },
  },
  {
    slug: "unilms",
    title: "UniLMS",
    role: "Full-Stack Developer",
    year: "2024",
    summary:
      "University learning management system covering course delivery, assignments, assessments, and student progress tracking.",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    live: "https://eazy-lmsfrontend.netlify.app/",
    image: unilms,
    featured: true,
    detail: {
      body: "A learning management system built around the way a university term actually runs: courses, enrolment, assignments with deadlines, assessments, and progress visible to both students and staff.",
      features: [
        "Course delivery with structured modules and materials",
        "Assignment submission with deadline handling",
        "Assessments and automatic grade rollup",
        "Separate student and lecturer views over the same data",
      ],
      challenges:
        "Access control. Every query needed to answer 'who is asking' before 'what did they ask for', which pushed the permission checks down into the data layer rather than the UI.",
      learnings:
        "Model permissions once, at the boundary. Scattering role checks through components is how data leaks.",
    },
  },
  {
    slug: "mctechy",
    title: "McTechy",
    role: "Frontend Developer",
    year: "2023",
    summary:
      "Conversion-focused landing site for a tech bootcamp — course catalogue, graduate stories, and lead capture.",
    tech: ["React", "Tailwind", "Framer Motion"],
    live: "https://mktechy.netlify.app/",
    image: mctechy,
    featured: true,
    detail: {
      features: [
        "Course catalogue across five programmes",
        "Testimonial section with graduate stories",
        "Lead capture forms routed to career advisors",
        "Newsletter subscription and partner showcase",
      ],
      challenges:
        "Keeping a long, animation-heavy marketing page fast enough that it did not undo the conversion work.",
      learnings:
        "On a landing page, the structure of the content does more for conversion than the motion layered on top of it.",
    },
  },
  {
    slug: "shibayc",
    title: "ShibaYC",
    role: "Frontend Developer",
    year: "2022",
    summary:
      "Web3 collection landing experience with minting flow and animated reveal sequence.",
    tech: ["React", "Web3", "CSS"],
    image: shibayc,
    featured: true,
    detail: {
      body: "A launch site for an NFT collection, built around a timed reveal and an in-page minting flow.",
      challenges:
        "Wallet connection state is genuinely hostile — accounts switch, chains switch, and the page has to survive both without a reload.",
      learnings:
        "Treat the wallet as an external system that can change underneath you at any moment, not as app state you own.",
    },
  },
  {
    slug: "github-user-finder",
    title: "GitHub User Finder",
    role: "Personal Project",
    year: "2025",
    summary:
      "Search any GitHub profile and read the essentials — repos, followers, and bio — without the chrome.",
    tech: ["Next.js", "TypeScript", "GitHub API", "Tailwind"],
    live: "https://github-user-finder-eazy.vercel.app/",
    github: "https://github.com/ayoeze191/githubUserFinder",
    image: githubUserFinder,
    detail: {
      features: [
        "Search any GitHub user by username",
        "Avatar, bio, followers, following, and public repo counts",
        "Copy username to clipboard",
        "Fully responsive layout",
      ],
      challenges:
        "The GitHub API rate-limits unauthenticated requests aggressively, so the failure state had to be a real part of the design rather than an afterthought.",
      learnings:
        "Error and empty states are most of the work in anything backed by a public API.",
    },
  },
  {
    slug: "ai-email-composer",
    title: "AI Email Composer",
    role: "Personal Project",
    year: "2025",
    summary:
      "Drafts professional emails from a short prompt and sends them over SMTP.",
    tech: ["Next.js", "Express.js", "MongoDB", "Nodemailer", "Tailwind"],
    github: "https://github.com/ayoeze191/ai-email-composer",
    detail: {
      features: [
        "Email generation from a natural-language prompt",
        "Tone selection — professional, friendly, formal",
        "Sends directly over SMTP",
        "Email history stored per user, with JWT authentication",
      ],
      challenges:
        "Getting consistent formatting out of a generative model. Constraining the output shape in the prompt did more than any amount of post-processing.",
      learnings:
        "Prompt design, SMTP delivery, and how much of an AI feature is really just careful error handling.",
    },
  },
  {
    slug: "dogify",
    title: "Dogify",
    role: "Personal Project",
    year: "2024",
    summary:
      "A fast, minimal directory of over a hundred dog breeds, built for one-click browsing.",
    tech: ["React", "CSS Modules"],
    live: "https://dogifii.netlify.app",
    image: dogify,
    detail: {
      features: [
        "100+ breeds listed alphabetically",
        "One-click breed navigation",
        "Static, fast-loading build",
      ],
      challenges:
        "Presenting a long, flat list so that it stays scannable on a phone.",
      learnings:
        "Structure and typography carry a list further than any amount of styling.",
    },
  },
];

/** The tight edit shown on the home page. */
export const featuredProjects = projects.filter((p) => p.featured);
