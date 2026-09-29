import React, { useState, useEffect, useRef } from "react";
import { motion, MotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ExternalLink, Github, Camera, Users, Database, Truck, Activity,
  FileText, BookOpen, Coins, FileDown,
  Star, TrendingUp, Brain, ChevronLeft, ChevronRight, Zap, CheckCircle2,
  ShieldAlert, Gauge, Cpu, Navigation, Sparkles, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { ProgressiveImage } from "./ProgressiveImage";
import type { Project } from "@/data/projects";

const ProjectPreview = ({ project }: { project: Project }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Open ${project.title} Live Demo (opens in a new tab)`}
    onClick={() => trackEvent("click", "demo", project.title)}
    className="block w-full rounded-2xl border border-border/80 bg-card/80 p-2.5 shadow-xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  >
    <ProgressiveImage
      src={project.heroImage.src}
      alt={project.heroImage.alt}
      className="w-full h-[240px] xl:h-[270px] rounded-xl object-contain"
    />
    <span className="flex items-center justify-between gap-2 px-2 pt-2 text-[10px] font-mono">
      <span className={project.iconColor}>{project.title}</span>
      <span className="inline-flex items-center gap-1.5 text-emerald-500">Open Live Demo <ExternalLink className="h-3 w-3" /></span>
    </span>
  </a>
);

interface ProjectScrollyStageProps {
  scrollYProgress: MotionValue<number>;
  projects: Project[];
}

// Micro-Animation Helper: Pulsing Live Indicator
const PulsingDot: React.FC<{ colorClass?: string }> = ({ colorClass = "bg-emerald-400" }) => (
  <span className="relative flex h-2 w-2 shrink-0">
    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`} />
    <span className={`relative inline-flex rounded-full h-2 w-2 ${colorClass}`} />
  </span>
);

// Micro-Animation Helper: Interactive Metric Card with Hover Elevation
const AnimatedMetricCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
    whileHover={{ y: -3, scale: 1.02 }}
    className={`transition-all duration-300 hover:shadow-lg cursor-default select-none ${className}`}
  >
    {children}
  </motion.div>
);

// Micro-Animation Helper: Interactive Tech Tag with Spring Scale
const TechTag: React.FC<{ tag: string; className?: string }> = ({ tag, className = "" }) => (
  <motion.span
    whileHover={{ y: -2, scale: 1.06 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className={`px-2.5 py-1 rounded-md bg-secondary/60 border border-border/60 text-xs font-mono text-foreground/80 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors inline-block cursor-default select-none ${className}`}
  >
    {tag}
  </motion.span>
);

// Micro-Animation Helper: Animated Accuracy Bar with Smooth Width Expansion
const AnimatedProgressBar: React.FC<{
  widthPercent: number;
  colorClass: string;
  delay?: number;
}> = ({ widthPercent, colorClass, delay = 0.2 }) => (
  <div className="h-2 rounded-full bg-secondary/80 overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${widthPercent}%` }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`h-full rounded-full ${colorClass}`}
    />
  </div>
);

// Micro-Animation Helper: Sparkline SVG with Draw-In Motion
const Sparkline = ({ colorClass, path, delay = 0.2 }: { colorClass: string; path: string; delay?: number }) => (
  <svg className={`w-full h-7 mt-1 opacity-70 ${colorClass}`} viewBox="0 0 100 30" fill="none">
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.8 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      d={path}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const bgGlowColors = [
  "rgba(249, 115, 22, 0.10)", // BugTriage AI
  "rgba(249, 115, 22, 0.14)", // DeliverFlow
  "rgba(16, 185, 129, 0.12)", // LeadFlow
  "rgba(139, 92, 246, 0.12)", // ScopeFlow AI
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 36 : -36,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.26,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -36 : 36,
    opacity: 0,
    scale: 0.99,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const ProjectScrollyStage: React.FC<ProjectScrollyStageProps> = ({
  scrollYProgress,
  projects,
}) => {
  const activeIndex = useTransform(scrollYProgress, (latest) =>
    Math.min(projects.length - 1, Math.max(0, Math.floor(latest * projects.length)))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    return activeIndex.on("change", (latest) => {
      if (latest !== prevIndexRef.current) {
        setDirection(latest > prevIndexRef.current ? 1 : -1);
        prevIndexRef.current = latest;
        setCurrentIndex(latest);
      }
    });
  }, [activeIndex]);

  const handleJumpToProject = (idx: number) => {
    const targetProgress = (idx + 0.5) / projects.length;
    const stageEl = document.getElementById("projects-stage-container");
    if (stageEl) {
      const rect = stageEl.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top;
      const totalDist = stageEl.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: scrollTop + targetProgress * totalDist,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center pt-20 sm:pt-22 lg:pt-20 xl:pt-24 pb-3 sm:pb-4 lg:pb-3 xl:pb-6 overflow-hidden z-20 px-4 sm:px-6 lg:px-8">

      {/* Dynamic Background Atmosphere that changes per project */}
      <div
        style={{ backgroundColor: bgGlowColors[currentIndex] }}
        className="absolute w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700"
      />

      <div className="max-w-6xl xl:max-w-7xl w-full flex flex-col justify-between flex-1 h-full max-h-[calc(100vh-85px)] xl:max-h-[calc(100vh-105px)] relative z-10 select-none">

        {/* ========================================================================= */}
        {/* STAGE HEADER: Milestone Tracker & Scrolly Runner                         */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pb-3 border-b border-border/60 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
              {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="text-xs text-muted-foreground uppercase font-mono tracking-widest hidden sm:inline-block">
              Scroll-Driven Project Stage
            </span>
          </div>

          {/* Quick Prev / Next Controls & Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                disabled={currentIndex === 0}
                onClick={() => handleJumpToProject(Math.max(0, currentIndex - 1))}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentIndex === projects.length - 1}
                onClick={() => handleJumpToProject(Math.min(projects.length - 1, currentIndex + 1))}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scrolly Progress Runner Bar */}
            <div className="w-40 sm:w-56 h-1.5 bg-secondary/80 rounded-full overflow-hidden relative">
              <motion.div
                style={{ scaleX: scrollYProgress, originX: 0 }}
                className="h-full bg-gradient-to-r from-primary via-orange-500 to-accent rounded-full shadow-[0_0_8px_hsl(var(--primary))]"
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE MAIN STAGE: Rich High-Impact Content with Micro-Animations            */}
        {/* ========================================================================= */}
        <div className="relative flex-1 w-full my-1.5 lg:my-2 xl:my-3 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>

            {/* --------------------------------------------------------------------- */}
            {/* PROJECT 01: BugTriage AI                                */}
            {/* --------------------------------------------------------------------- */}
            {currentIndex === 0 && (
              <motion.div
                key="project-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                {/* Left Story Column */}
                <div className="col-span-12 lg:col-span-6 space-y-3.5 text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-bold"
                  >
                    <Camera className="w-3.5 h-3.5 animate-pulse" />
                    <span>AI Issue Triage & Workspaces</span>
                  </motion.div>

                  <h3 className="text-3xl lg:text-4xl font-extrabold font-outfit text-foreground leading-tight">
                    BugTriage AI
                  </h3>

                  <p className="text-sm text-muted-foreground font-grotesk leading-relaxed">
                    AI-powered issue triage that analyzes incoming issues, detects semantic duplicates, and organizes work across multi-tenant workspaces.
                  </p>

                  {/* Engineering Highlights row with Micro-Animations */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <AnimatedMetricCard delay={0.05} className="p-2.5 rounded-xl bg-card/80 border border-border/80 text-center hover:border-primary/40">
                      <span className="text-base font-extrabold text-primary font-outfit block">BullMQ</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Background Jobs</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.1} className="p-2.5 rounded-xl bg-card/80 border border-border/80 text-center hover:border-foreground/30">
                      <span className="text-base font-extrabold text-foreground font-outfit block">pgvector</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Similarity Search</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-2.5 rounded-xl bg-card/80 border border-border/80 text-center hover:border-emerald-500/40">
                      <span className="text-base font-extrabold text-emerald-400 font-outfit block">Gemini AI</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Issue Analysis</span>
                    </AnimatedMetricCard>
                  </div>

                  {/* Problem & Solution with hover lift */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-primary/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🎯 Problem</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Incoming issues need analysis, duplicate detection, and workspace organization.
                      </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-primary/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🚀 Solution</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Redis and BullMQ workers with retries and transactional outbox dispatch.
                      </p>
                    </motion.div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 text-xs text-muted-foreground font-grotesk">
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>pgvector-based similarity search for semantic duplicate detection</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Private attachments and GitHub Issues export</span>
                    </motion.div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Next.js", "TypeScript", "Prisma", "PostgreSQL", "pgvector", "Redis", "BullMQ", "Gemini AI", "Vercel AI SDK"].map((t) => (
                      <TechTag key={t} tag={t} />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button asChild size="sm"><Link to={projects[0].caseStudyLink}>View Project</Link></Button>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild className="bg-primary hover:bg-primary/80 h-9 px-4 text-xs font-semibold shadow-md hover:shadow-primary/20" onClick={() => trackEvent("click", "github_project", "BugTriage AI")}>
                        <a href={projects[0].githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" /> View GitHub Repository
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild variant="outline" className="border-border hover:bg-secondary/60 hover:text-foreground h-9 px-4 text-xs font-semibold" onClick={() => trackEvent("click", "demo", "BugTriage AI")}>
                        <a href={projects[0].link} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Right Visual Column */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                    className="w-full rounded-2xl overflow-hidden border border-border/80 bg-card/80 shadow-2xl p-2.5 relative group"
                  >
                    <a href={projects[0].link} target="_blank" rel="noopener noreferrer" aria-label="Open BugTriage AI Live Demo (opens in a new tab)" className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" onClick={() => trackEvent("click", "demo", projects[0].title)}>
                      <ProgressiveImage
                        src={projects[0].heroImage.src}
                        alt={projects[0].heroImage.alt}
                        className="w-full h-[240px] xl:h-[270px] rounded-xl object-contain"
                      />
                    </a>

                    {/* Subtle detection scanline micro-effect */}
                    <div className="absolute inset-x-2.5 top-2.5 h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-[scanline_3s_ease-in-out_infinite] pointer-events-none" />

                    <div className="flex justify-between items-center px-2 pt-2 text-[10px] font-mono text-muted-foreground">
                      <span className="text-orange-400 font-bold flex items-center gap-1.5">
                        <PulsingDot colorClass="bg-orange-400" /> BugTriage AI
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <PulsingDot colorClass="bg-emerald-400" /> Open Live Demo
                      </span>
                    </div>
                  </motion.div>

                  {/* Live Telemetry Panel with Hover Lift */}
                  <div className="p-3.5 rounded-xl border border-primary/20 bg-card/60 backdrop-blur-md grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <AnimatedMetricCard delay={0.1} className="p-2 rounded-lg bg-secondary/50">
                      <span className="text-muted-foreground text-[10px] block">Dispatch</span>
                      <span className="text-primary font-bold">Outbox</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-2 rounded-lg bg-secondary/50">
                      <span className="text-muted-foreground text-[10px] block">Worker Retries</span>
                      <span className="text-emerald-400 font-bold">BullMQ</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.2} className="p-2 rounded-lg bg-secondary/50">
                      <span className="text-muted-foreground text-[10px] block">Attachments</span>
                      <span className="text-foreground font-bold">Private</span>
                    </AnimatedMetricCard>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* PROJECT 02: DeliverFlow                                              */}
            {/* --------------------------------------------------------------------- */}
            {currentIndex === 1 && (
              <motion.div
                key="project-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full grid grid-cols-12 gap-8 lg:gap-10 items-center"
              >
                {/* Left Story Column */}
                <div className="col-span-12 lg:col-span-6 space-y-3.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono font-bold">
                      <Users className="w-3.5 h-3.5" />
                      <span>Client Delivery Portal</span>
                    </span>
                    <motion.span whileHover={{ scale: 1.08 }} className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 cursor-default">
                      <Star className="w-3 h-3 fill-current animate-pulse" /> Owner / Client
                    </motion.span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-extrabold font-outfit text-foreground leading-tight">
                    DeliverFlow
                  </h3>

                  <p className="text-sm text-muted-foreground font-grotesk leading-relaxed">
                    Client delivery portal for projects, tasks, milestones, files, payments, feedback, and approvals across owner and client workspaces.
                  </p>

                  {/* Impact Highlights with Micro-Animations */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <AnimatedMetricCard delay={0.05} className="p-2.5 rounded-xl bg-card/80 border border-orange-500/20 text-center hover:border-orange-500/40">
                      <span className="text-base font-extrabold text-orange-400 font-outfit block">Roles</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Owner & Client</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.1} className="p-2.5 rounded-xl bg-card/80 border border-orange-500/20 text-center hover:border-foreground/30">
                      <span className="text-base font-extrabold text-foreground font-outfit block">RLS</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Scoped Data</span>
                    </AnimatedMetricCard>
                    <AnimatedMetricCard delay={0.15} className="p-2.5 rounded-xl bg-card/80 border border-orange-500/20 text-center hover:border-emerald-500/40">
                      <span className="text-base font-extrabold text-emerald-400 font-outfit block">Signed URLs</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Private Files</span>
                    </AnimatedMetricCard>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-orange-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🎯 Problem</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Client delivery work is scattered across tasks, files, payments, and approvals.
                      </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 rounded-xl bg-card/70 border border-border/70 backdrop-blur-xs transition-colors hover:border-orange-500/30">
                      <span className="text-[11px] font-bold text-foreground font-outfit block mb-1">🚀 Solution</span>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-snug">
                        Role-based access, Supabase RLS, private storage, and workspace-scoped data.
                      </p>
                    </motion.div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 text-xs text-muted-foreground font-grotesk">
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>Private file storage with signed URLs and workspace notifications</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>Delivery analytics and automated payment reminders</span>
                    </motion.div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Supabase", "Tailwind CSS"].map((t) => (
                      <TechTag key={t} tag={t} />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button asChild size="sm"><Link to={projects[1].caseStudyLink}>View Project</Link></Button>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild className="bg-primary hover:bg-primary/80 h-9 px-4 text-xs font-semibold shadow-md hover:shadow-primary/20" onClick={() => trackEvent("click", "github_project", "DeliverFlow")}>
                        <a href={projects[1].githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" /> View GitHub Repository
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button asChild variant="outline" className="border-border hover:bg-secondary/60 h-9 px-4 text-xs font-semibold" onClick={() => trackEvent("click", "demo", "DeliverFlow")}>
                        <a href={projects[1].link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Live application screenshot */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-center gap-3">
                  <ProjectPreview project={projects[1]} />

                  {/* Architecture & Reliability Pill */}
                  <div className="p-3 rounded-xl border border-border/60 bg-secondary/40 flex items-center justify-between text-xs font-mono">
                    <span className="text-muted-foreground">PostgreSQL + Drizzle ORM</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <PulsingDot colorClass="bg-emerald-400" /> Supabase RLS
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {projects.slice(2).map((project, index) => {
              if (currentIndex !== index + 2) return null;
              const ProjectIcon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full grid grid-cols-12 gap-8 lg:gap-10 items-center"
                >
                  <div className="col-span-6 space-y-3.5 text-left">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-mono font-bold ${project.iconBg} ${project.iconColor}`}>
                      <ProjectIcon className="w-3.5 h-3.5" />
                      <span>{project.title === "LeadFlow" ? "CRM & Revenue Pipeline" : "AI Proposal Workspace"}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-extrabold font-outfit text-foreground leading-tight">{project.title}</h3>
                    <p className="text-sm text-muted-foreground font-grotesk leading-relaxed">{project.desc}</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-card/80 border border-border/80">
                        <h4 className="text-xs font-bold text-foreground mb-1">Problem</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{project.problem}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-card/80 border border-border/80">
                        <h4 className="text-xs font-bold text-foreground mb-1">Solution</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{project.solution}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map(tech => <TechTag key={tech.name} tag={tech.name} />)}
                    </div>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <Button asChild><Link to={project.caseStudyLink}>View Project</Link></Button>
                      <Button asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("click", "demo", project.title)}>
                          <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                        </a>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("click", "github", project.title)}>
                          <Github className="w-4 h-4 mr-2" /> Source Code
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <ProjectPreview project={project} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* STAGE FOOTER: Project Direct Jumper Navigation                            */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50 shrink-0 text-xs text-muted-foreground font-mono">
          <span className="hidden sm:inline">
            Scroll down ↓
          </span>
          <div className="flex items-center gap-1.5 ml-auto">
            {projects.map((project, idx) => (
              <button
                key={project.title}
                onClick={() => handleJumpToProject(idx)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-all duration-300 ${currentIndex === idx
                  ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                  : "text-muted-foreground/60 hover:text-foreground hover:bg-secondary/60"
                  }`}
                aria-label={`Jump to Project ${String(idx + 1).padStart(2, "0")}: ${project.title}`}
              >
                {String(idx + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectScrollyStage;
