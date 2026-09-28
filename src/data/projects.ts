import { Brain, Users, TrendingUp, FileText, type LucideIcon } from "lucide-react";
import { caseStudies, type CaseStudyContent } from "./projectCaseStudies";

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface Project extends CaseStudyContent {
  slug: string;
  title: string;
  desc: string;
  link?: string;
  githubLink: string;
  caseStudyLink: string;
  logoImg?: string;
  pptLink?: string;
  researchPaperLink?: string;
  playStoreLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  color: string;
  activeColor: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  isFeatured?: boolean;
  techStack: { name: string; icon: string }[];
  problem: string;
  solution: string;
  impact: string[];
  hasLiveDemo: boolean;
}

// Preserve the homepage's descriptions, links, presentation and project order.
const showcaseProjects: Omit<Project, keyof CaseStudyContent>[] = [
  {
    title: "BugTriage AI",
    slug: "bugtriage-ai",
    caseStudyLink: "/projects/bugtriage-ai",
    desc: "AI-powered issue triage with semantic duplicate detection and multi-tenant workspaces.",
    link: "https://bug-triage-ai.vercel.app/",
    githubLink: "https://github.com/skerdiD/BugTriage-AI",
    color: "from-slate-800/20 to-slate-800/5",
    activeColor: "border-primary",
    icon: Brain,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    isFeatured: false,
    techStack: [
      { name: "Next.js", icon: "N" },
      { name: "TypeScript", icon: "TS" },
      { name: "Prisma", icon: "P" },
      { name: "PostgreSQL", icon: "PG" },
      { name: "pgvector", icon: "V" },
      { name: "Redis", icon: "R" },
      { name: "BullMQ", icon: "B" },
      { name: "Gemini AI", icon: "G" },
      { name: "Vercel AI SDK", icon: "AI" }
    ],
    problem: "Incoming issues need analysis, duplicate detection, and workspace organization.",
    solution: "Redis and BullMQ background processing with worker retries, transactional outbox dispatch, and pgvector similarity search.",
    impact: ["Semantic duplicate detection", "Private attachments", "GitHub Issues export"],
    hasLiveDemo: true
  },
  {
    title: "DeliverFlow",
    slug: "deliverflow",
    caseStudyLink: "/projects/deliverflow",
    desc: "Client delivery portal for projects, tasks, milestones, files, payments, feedback, and approvals across owner and client workspaces.",
    link: "https://deliver-flow.vercel.app/",
    githubLink: "https://github.com/skerdiD/deliver-flow",
    color: "from-orange-500/20 to-orange-500/5",
    activeColor: "border-orange-500",
    icon: Users,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    isFeatured: true,
    techStack: [
      { name: "Next.js", icon: "N" },
      { name: "TypeScript", icon: "TS" },
      { name: "PostgreSQL", icon: "PG" },
      { name: "Drizzle ORM", icon: "D" },
      { name: "Supabase", icon: "S" },
      { name: "Tailwind CSS", icon: "TW" }
    ],
    problem: "Client delivery work is scattered across projects, files, payments, and approvals.",
    solution: "Role-based access, Supabase RLS, workspace-scoped data, and private storage with signed URLs.",
    impact: ["Workspace notifications", "Delivery analytics", "Automated payment reminders"],
    hasLiveDemo: true
  },
  {
    title: "LeadFlow",
    slug: "leadflow",
    caseStudyLink: "/projects/leadflow",
    desc: "Multi-tenant CRM for lead qualification, deal pipelines, revenue forecasting, and follow-ups.",
    link: "https://lead-flow-skerdid.vercel.app/",
    githubLink: "https://github.com/skerdiD/lead-flow",
    color: "from-emerald-500/20 to-emerald-500/5",
    activeColor: "border-emerald-500",
    icon: TrendingUp,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    techStack: [
      { name: "Next.js", icon: "N" },
      { name: "TypeScript", icon: "TS" },
      { name: "PostgreSQL", icon: "PG" },
      { name: "Drizzle ORM", icon: "D" },
      { name: "Clerk", icon: "C" },
      { name: "Arcjet", icon: "A" }
    ],
    problem: "Sales teams need a connected view of leads, deals, follow-ups, and expected revenue.",
    solution: "Workspace-scoped CRM workflows with role-based permissions, transactional lead qualification, and a drag-and-drop deal pipeline.",
    impact: ["Weighted revenue forecasts", "Lead-to-deal qualification", "CSV imports and PDF exports"],
    hasLiveDemo: true
  },
  {
    title: "ScopeFlow AI",
    slug: "scopeflow-ai",
    caseStudyLink: "/projects/scopeflow-ai",
    desc: "AI proposal workspace for freelancers and agencies, from client requirements to export-ready proposals.",
    link: "https://scope-flow-ai.vercel.app/",
    githubLink: "https://github.com/skerdiD/ScopeFlow-AI",
    color: "from-violet-500/20 to-violet-500/5",
    activeColor: "border-violet-500",
    icon: FileText,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    techStack: [
      { name: "React", icon: "R" },
      { name: "TypeScript", icon: "TS" },
      { name: "Express.js", icon: "E" },
      { name: "Prisma", icon: "P" },
      { name: "PostgreSQL", icon: "PG" },
      { name: "Supabase Auth", icon: "S" },
      { name: "Gemini AI", icon: "G" }
    ],
    problem: "Turning rough client requirements into clear proposals involves repetitive drafting and review.",
    solution: "Authenticated, user-scoped workspaces with Gemini-powered drafting, quality reviews, proposal versions, and reusable templates.",
    impact: ["AI proposal quality reviews", "Versioned proposal drafts", "DOCX and PDF exports"],
    hasLiveDemo: true
  }
];

export const projects: Project[] = showcaseProjects.map(project => ({
  ...project,
  ...caseStudies[project.slug],
}));
