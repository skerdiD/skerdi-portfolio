export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type SocialLink = {
  label: string;
  href: string;
  type: "github" | "email" | "website";
};

export type Experience = {
  role: string;
  organization: string;
  type: string;
  summary: string;
};

export type Education = {
  degree: string;
  institution: string;
  status: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export type Project = {
  title: string;
  eyebrow: string;
  summary: string;
  highlights: string[];
  stack: string[];
  repository: string;
  liveUrl?: string;
  featured?: boolean;
};

export type PortfolioData = {
  personal: {
    name: string;
    initials: string;
    role: string;
    headline: string;
    summary: string;
    email: string;
    siteUrl: string;
    availability: string;
  };
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
  about: {
    heading: string;
    paragraphs: string[];
    principles: { title: string; description: string }[];
  };
  experience: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  projects: Project[];
};

export const portfolio: PortfolioData = {
  personal: {
    name: "Skerdi Cacaj",
    initials: "SC",
    role: "Full-Stack Developer",
    headline: "Building reliable products from interface to infrastructure.",
    summary:
      "I build complete web applications—from responsive React and Next.js interfaces to APIs, relational data, background processing, and AI-powered workflows.",
    email: "skerdidev.services@gmail.com",
    siteUrl: "https://skerdi-portfolio.vercel.app",
    availability: "Open to Full-Stack Engineer opportunities",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/skerdiD", type: "github" },
    {
      label: "Email",
      href: "mailto:skerdidev.services@gmail.com",
      type: "email",
    },
    {
      label: "Portfolio",
      href: "https://skerdi-portfolio.vercel.app",
      type: "website",
    },
  ],
  about: {
    heading: "Full-stack breadth, backend depth.",
    paragraphs: [
      "I enjoy working across the full product surface, with a particular interest in backend systems, application architecture, APIs, data modeling, and system design.",
      "My work connects clean interfaces with secure server boundaries, durable data models, asynchronous jobs, and pragmatic deployment. I choose tools around the problem and keep maintainability in view from the first schema to the final screen.",
    ],
    principles: [
      {
        title: "Systems thinking",
        description: "Model the data, boundaries, and failure paths before adding complexity.",
      },
      {
        title: "Product ownership",
        description: "Treat UX, APIs, persistence, testing, and delivery as one connected system.",
      },
      {
        title: "Practical AI",
        description: "Use models inside validated, observable workflows—not as an unguarded shortcut.",
      },
    ],
  },
  experience: [
    {
      role: "Software / Web Development Intern",
      organization: "University of New York Tirana",
      type: "Internship",
      summary:
        "Completed a software and web development internship at the university, gaining practical development experience during a Computer Science degree.",
    },
  ],
  education: [
    {
      degree: "BSc Computer Science",
      institution: "University of New York Tirana",
      status: "Degree completed",
    },
  ],
  skillGroups: [
    {
      title: "Core application stack",
      description: "The tools I reach for to build complete, typed web products.",
      skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express.js", "NestJS", "REST APIs"],
    },
    {
      title: "Data & background work",
      description: "Relational modeling, persistence, queues, and application services.",
      skills: ["PostgreSQL", "Prisma", "Drizzle ORM", "Supabase", "MongoDB", "Redis", "BullMQ", "Zod"],
    },
    {
      title: "Interface & product UI",
      description: "Responsive, accessible interfaces with robust client-side data flows.",
      skills: ["Tailwind CSS", "shadcn/ui", "React Hook Form", "TanStack Query", "TanStack Table", "Recharts"],
    },
    {
      title: "AI, delivery & quality",
      description: "Integrations and tooling that support dependable releases.",
      skills: ["OpenAI API", "Gemini API", "Vercel AI SDK", "Docker", "GitHub Actions", "Vitest", "Playwright", "Sentry", "Vercel", "Render", "Git"],
    },
  ],
  projects: [
    {
      title: "BugTriage AI",
      eyebrow: "AI-assisted issue triage",
      summary: "Turns unstructured bug reports into actionable engineering tickets through asynchronous AI processing and semantic similarity search.",
      highlights: ["Multi-tenant authentication and authorization", "Transactional outbox dispatch with BullMQ workers", "pgvector duplicate detection and private file access", "Automated tests, Docker, and CI quality gates"],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "pgvector", "Redis", "BullMQ"],
      repository: "https://github.com/skerdiD/BugTriage-AI",
      liveUrl: "https://bug-triage-ai.vercel.app/",
      featured: true,
    },
    {
      title: "ScopeFlow AI",
      eyebrow: "Proposal workflow platform",
      summary: "Transforms rough requirements into structured proposals, quality reviews, reusable versions, and exportable documents with Gemini AI.",
      highlights: ["Separate React client and Express REST API", "Supabase token verification and user-scoped Prisma data", "Protected AI endpoints with usage tracking", "DOCX and PDF export workflows"],
      stack: ["React", "TypeScript", "Node.js", "Express.js", "Prisma", "PostgreSQL", "Gemini"],
      repository: "https://github.com/skerdiD/ScopeFlow-AI",
      liveUrl: "https://scope-flow-ai.vercel.app/",
      featured: true,
    },
    {
      title: "DeliverFlow",
      eyebrow: "Role-aware client delivery",
      summary: "A client portal that brings projects, tasks, milestones, files, feedback, approvals, notifications, and payment tracking into one workflow.",
      highlights: ["Workspace-scoped data and server-side role checks", "Supabase row-level security and signed file access", "Validation, analytics, and reminders", "Integration tests and production monitoring"],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Drizzle", "Zod", "Sentry"],
      repository: "https://github.com/skerdiD/deliver-flow",
      liveUrl: "https://deliver-flow.vercel.app/",
      featured: true,
    },
    {
      title: "PulseChat",
      eyebrow: "Realtime collaboration",
      summary: "A team messaging workspace with rooms, messages, reactions, typing states, and permission-aware collaboration flows.",
      highlights: ["Realtime subscriptions and relational persistence", "Membership rules and responsive UI states"],
      stack: ["Next.js", "TypeScript", "Supabase Realtime", "Drizzle"],
      repository: "https://github.com/skerdiD/pulse_chat",
      liveUrl: "https://pulse-chat-skerdid.vercel.app/",
    },
    {
      title: "LeadFlow",
      eyebrow: "Lead management SaaS",
      summary: "A protected CRM-style workspace for leads, statuses, notes, follow-ups, filters, and dashboard metrics.",
      highlights: ["Authentication boundaries and typed data models", "Validated CRUD workflows and rate limiting"],
      stack: ["Next.js", "TypeScript", "Clerk", "PostgreSQL", "Drizzle"],
      repository: "https://github.com/skerdiD/lead-flow",
      liveUrl: "https://lead-flow-skerdid.vercel.app/",
    },
    {
      title: "Portfolia",
      eyebrow: "Investment dashboard",
      summary: "A full-stack dashboard for tracking holdings, performance, allocation, watchlists, and portfolio analytics.",
      highlights: ["Derived financial metrics and chart-heavy interfaces", "Authenticated data, typed persistence, and filtering"],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Recharts"],
      repository: "https://github.com/skerdiD/Portfolia",
      liveUrl: "https://portfolia-skerdid.vercel.app/",
    },
  ],
};

export const githubUrl = portfolio.socialLinks.find((link) => link.type === "github")!.href;
export const emailHref = `mailto:${portfolio.personal.email}`;
