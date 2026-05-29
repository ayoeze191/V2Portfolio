import { Project } from "../Component/ProjectCard";
import ekopages from "./../assets/images/Projects/ekopages.png";
import dogify from "./../assets/images/Projects/Dogify.png";
import Mctchey from "./../assets/images/Projects/Mctechy.png";
import matacare from "./../assets/images/Projects/matacare.png";
import learnpally from "./../assets/images/Projects/learnpally.png";
import githubUserFinder from "./../assets/images/Projects/githubfindme.png";

export const projects: Project[] = [
  {
    image: "",
    id: 1,
    title: "AI Email Composer",
    description:
      "AI-powered web app that helps users compose professional emails based on prompts and send via SMTP.",
    longDescription:
      "This application leverages OpenAI's GPT API to generate professional, context-aware emails from simple user prompts. Built with Next.js and Express.js, it features authentication, email history storage, and seamless SMTP integration.",
    tech: [
      "Next.js",
      "Express.js",
      "OpenAI API",
      "MongoDB",
      "Nodemailer",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/ayoeze191/ai-email-composer",
    liveLink: "https://ai-email-composer.demo.com",
    features: [
      "AI-powered email generation from natural language prompts",
      "Multiple tone options (professional, friendly, formal, etc.)",
      "Send emails directly via Gmail SMTP",
      "Save email history to MongoDB",
      "User authentication with JWT",
      "Responsive design with Tailwind CSS",
    ],
    challenges:
      "Integrating OpenAI's API to generate contextually appropriate emails while maintaining consistent formatting was a key challenge. Also, handling rate limiting and error states gracefully.",
    learnings:
      "Deepened my understanding of LLM prompt engineering, SMTP protocols, and building secure authentication flows.",
    year: "2025",
  },
  {
    image: githubUserFinder,
    id: 2,
    title: "GitHub User Finder",
    description:
      "Search and view GitHub user profiles with elegant UI and real-time data fetching.",
    longDescription:
      "A clean, modern web app that allows users to search for GitHub profiles and view detailed information including repos, followers, and contribution stats.",
    tech: [
      "Next.js",
      "TypeScript",
      "GitHub API",
      "Framer Motion",
      "Tailwind CSS",
    ],
    githubLink: "https://github.com/ayoeze191/githubUserFinder",
    liveLink: "https://github-user-finder-eazy.vercel.app/",
    features: [
      "Search any GitHub user by username",
      "Display avatar, bio, followers, following, and public repos",
      "Copy username to clipboard",
      "Direct link to GitHub profile",
      "Smooth animations with Framer Motion",
      "Fully responsive design",
    ],
    challenges:
      "Handling API rate limits and providing meaningful error messages when users aren't found.",
    learnings:
      "Improved my skills with REST API integration, error handling, and creating smooth loading states.",
    year: "2025",
  },
  {
    id: 3,
    title: "EkoPages",
    description:
      "Educational platform teaching African children about SDGs through storytelling and courses.",
    longDescription:
      "An EdTech platform that uses SDG-themed children's literature, stories, and programs to educate African children about environmental, gender, and sustainability issues.",
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/ayoeze191/ekopages",
    liveLink: "https://ekopages.com",
    features: [
      "SDG-themed children's literature library",
      "Interactive e-learning modules",
      "Blended learning (online + physical workshops)",
      "Publisher platform for emerging writers",
      "School partnership program",
      "Impact tracking for 80,000+ children reached",
    ],
    challenges:
      "Creating age-appropriate content that balances education with engagement for young learners (ages 0-3 and up).",
    learnings:
      "Understanding the importance of culturally relevant educational content and scalable impact measurement.",
    year: "2024",
  },
  {
    image: Mctchey,
    id: 4,
    title: "McTechy",
    description:
      "Tech bootcamp landing page with course listings, testimonials, and lead generation.",
    longDescription:
      "A high-conversion landing page for a coding bootcamp, designed to showcase courses, highlight career outcomes, and capture leads through strategic CTAs.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Form Validation"],
    githubLink: "https://github.com/ayoeze191/mctechy",
    liveLink: "https://mktechy.netlify.app",
    features: [
      "Course catalog with 5+ programs",
      "Testimonial section with graduate stories",
      "Lead capture forms for career advisors",
      "Newsletter subscription",
      "Responsive multi-section layout",
      "Partner showcase section",
    ],
    challenges:
      "Building a complex, multi-section page that converts visitors while maintaining performance.",
    learnings:
      "Learned about conversion-focused design and structuring content for maximum engagement.",
    year: "2023",
  },
  {
    image: dogify,
    id: 5,
    title: "Dogify",
    description:
      "Dog breed directory with extensive breed list and one-click navigation.",
    longDescription:
      "A minimalist, fast-loading web application for browsing over 100 dog breeds. Built for simplicity, Dogify allows users to quickly discover and navigate to breed-specific information.",
    tech: ["React", "CSS Modules", "Responsive Design"],
    liveLink: "https://dogifii.netlify.app",
    features: [
      "100+ dog breeds listed alphabetically",
      "One-click breed navigation",
      "Clean, minimalist UI",
      "Fast-loading static site",
      "Mobile-responsive design",
    ],
    challenges:
      "Organizing and displaying large amounts of data in a scannable, user-friendly format.",
    learnings:
      "Mastered data structuring and creating efficient navigation patterns.",
    year: "2024",
  },
];
