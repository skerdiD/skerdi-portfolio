import type { ProjectScreenshot } from "./projects";

export interface EngineeringDetail {
  title: string;
  description: string;
}

export interface CaseStudyContent {
  name: string;
  category: string;
  tagline: string;
  overview: string;
  architecture: { summary: string; nodes: EngineeringDetail[] };
  engineeringHighlights: EngineeringDetail[];
  heroImage: ProjectScreenshot;
}

// Content checked against the sibling application repositories and their READMEs.
// Architecture cards describe responsibilities, not an implied linear request chain.
export const caseStudies: Record<string, CaseStudyContent> = {
  "bugtriage-ai": {
    name: "BugTriage AI",
    category: "AI · Issue triage",
    tagline: "AI-powered multi-tenant issue triage platform.",
    overview: "An issue workspace for engineering teams that turns bug reports into structured tickets. Asynchronous AI analysis, semantic duplicate detection and private attachments keep the original evidence and triage results together.",
    heroImage: {
      src: "/projects_screenshots/engineering-dashboard.png",
      alt: "BugTriage AI engineering dashboard showing ticket status, severity and report trends",
      caption: "Engineering dashboard · ticket health and reporting",
    },
    architecture: {
      summary: "The application saves a ticket and a durable analysis dispatch before returning to the user. A separate worker processes queued work, persists the AI result and updates semantic search.",
      nodes: [
        { title: "Next.js application", description: "Authenticates requests, checks workspace and project access, and validates incoming reports." },
        { title: "Prisma + PostgreSQL", description: "Stores tickets and analysis history. A transactional outbox records pending analysis dispatches." },
        { title: "Redis + BullMQ", description: "Dispatches analysis jobs to a standalone worker, with retry handling for recoverable failures." },
        { title: "Gemini + pgvector", description: "The worker generates structured triage, stores embeddings and finds semantically similar issues." },
      ],
    },
    engineeringHighlights: [
      { title: "Durable job dispatch", description: "Ticket processing state and the outbox record are written in a database transaction, keeping queued work tied to persisted state." },
      { title: "Failure-aware workers", description: "The BullMQ processor distinguishes retryable errors from permanent failures and records the ticket's processing state." },
      { title: "Semantic duplicate detection", description: "Embeddings and pgvector similarity search surface related reports even when their wording differs." },
      { title: "Workspace authorization", description: "Server-side workspace and role checks protect ticket operations and access to private attachments." },
      { title: "GitHub handoff", description: "Issues can be exported to GitHub, with export state retained alongside the original report and AI analysis." },
    ],
  },
  deliverflow: {
    name: "DeliverFlow",
    category: "Full stack · Client delivery",
    tagline: "Workspace-scoped delivery, from project kickoff to approval.",
    overview: "A client delivery portal that brings projects, tasks, milestones, files, payments and approvals into one application. Owners manage delivery from a private workspace; clients see only the projects assigned to them.",
    heroImage: {
      src: "/projects_screenshots/owner-dashboard-light.png",
      alt: "DeliverFlow owner dashboard showing projects, approvals, payments and recent client feedback",
      caption: "Owner dashboard · delivery status and work requiring attention",
    },
    architecture: {
      summary: "Next.js serves the owner workspace and client portal. Authenticated server operations apply workspace and project access checks, with PostgreSQL data and private files managed through Supabase services.",
      nodes: [
        { title: "Next.js + TypeScript", description: "Separate owner and client experiences share delivery workflows and typed application logic." },
        { title: "Supabase Auth", description: "Identifies the user; role and project-assignment checks determine which resources they can access." },
        { title: "PostgreSQL + Drizzle", description: "Stores delivery records with workspace-scoped queries. Supabase RLS policies provide database access rules." },
        { title: "Private Storage", description: "File metadata belongs to projects. Permission-checked signed URLs provide access to private deliverables." },
      ],
    },
    engineeringHighlights: [
      { title: "Owner and client boundaries", description: "Clients access assigned projects while owners manage their workspace, keeping delivery data separated across tenants." },
      { title: "Private file delivery", description: "Supabase Storage keeps files private, with access checks before signed downloads and validation of uploaded files." },
      { title: "Scoped notifications", description: "Notification queries are limited to the authenticated recipient and workspace so activity stays within its intended audience." },
      { title: "Operational visibility", description: "Workspace analytics, payment tracking and automated reminders bring overdue work into the delivery workflow." },
    ],
  },
  leadflow: {
    name: "Lead Flow",
    category: "Full stack · CRM",
    tagline: "A multi-tenant CRM connecting qualification, pipeline and revenue.",
    overview: "A CRM for teams managing leads, accounts, contacts, deals and follow-ups. Workspace permissions, transactional mutations and revenue forecasting connect the sales workflow to a consistent data model.",
    heroImage: {
      src: "/projects_screenshots/dashboard-overview.png",
      alt: "LeadFlow dashboard showing open pipeline, weighted forecast, won revenue and follow-ups",
      caption: "CRM dashboard · pipeline, forecast and follow-ups",
    },
    architecture: {
      summary: "Next.js server actions and route handlers mediate CRM operations. Clerk authentication, capability checks and workspace scoping guard access before Drizzle reads or changes PostgreSQL records.",
      nodes: [
        { title: "Next.js workspace", description: "React views connect lead details, accounts, contacts, tasks and the deal pipeline." },
        { title: "Identity + capabilities", description: "Clerk identifies users. Membership and capability-based permissions authorize operations; Arcjet adds request protection." },
        { title: "Server actions", description: "Validate inputs and coordinate qualification, deal changes, imports and exports within the active workspace." },
        { title: "PostgreSQL + Drizzle", description: "Transactions keep related CRM mutations consistent; database-backed idempotency protects retry-sensitive operations." },
      ],
    },
    engineeringHighlights: [
      { title: "Transactional qualification", description: "Qualification connects a lead to an account, contact and deal with workspace validation, duplicate protection and audit history." },
      { title: "Consistent pipeline changes", description: "Deal stage changes keep state, activity and audit events in a transaction. Optimistic UI updates can roll back when a mutation fails." },
      { title: "Authorization beyond login", description: "Server-side capability and record-access checks determine what a workspace member can view or change." },
      { title: "Revenue modeling", description: "Deal value, probability and expected close dates support weighted forecasts, with database constraints protecting valid values." },
    ],
  },
  "scopeflow-ai": {
    name: "ScopeFlow AI",
    category: "AI · Proposal workflows",
    tagline: "From client requirements to versioned, export-ready proposals.",
    overview: "An authenticated proposal workspace for freelancers and agencies. A React client and Express API support Gemini-powered drafting, quality reviews, proposal versions, reusable templates and document exports.",
    heroImage: {
      src: "/projects_screenshots/activity-timeline.png",
      alt: "ScopeFlow AI activity timeline showing template creation, proposal export and final-version events",
      caption: "Proposal workspace · activity timeline",
    },
    architecture: {
      summary: "The React client authenticates with Supabase and sends tokens to the Express API. The backend verifies identity, scopes project data to the user and keeps Gemini calls and API keys server-side.",
      nodes: [
        { title: "React + TypeScript", description: "A Vite application presents projects, proposal editing, reviews, templates and usage views." },
        { title: "Supabase Auth", description: "Token-based access connects the client session to authenticated, user-scoped backend operations." },
        { title: "Express API", description: "Coordinates project APIs, proposal generation, quality review and DOCX/PDF exports." },
        { title: "Prisma + Gemini", description: "PostgreSQL persists projects and proposal versions. Server-side Gemini calls produce drafts and quality reviews." },
      ],
    },
    engineeringHighlights: [
      { title: "Server-side AI boundary", description: "Protected Express endpoints handle Gemini calls so model credentials stay out of the browser." },
      { title: "User-scoped data", description: "Supabase token verification establishes identity before the API accesses a user's project records." },
      { title: "Versioned proposals", description: "Saved proposal versions and final-version selection support revision without treating every draft as the final deliverable." },
      { title: "Review and export", description: "AI quality reviews give structured feedback, while DOCX and PDF exports turn saved content into shareable documents." },
    ],
  },
};
