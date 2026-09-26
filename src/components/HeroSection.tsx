import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Braces, Database, Github, Layers3, Mail, Workflow } from "lucide-react";
import { githubUrl, portfolio } from "@/data/portfolio";

const systemNodes = [
  { icon: Braces, label: "Client", detail: "React · Next.js" },
  { icon: Workflow, label: "API", detail: "Node · Express" },
  { icon: Database, label: "Data", detail: "PostgreSQL · Redis" },
];

const HeroSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="hero-grid absolute inset-0 -z-20" />
      <div className="absolute left-[8%] top-[20%] -z-10 h-72 w-72 rounded-full bg-primary/15 blur-[110px]" />
      <div className="absolute bottom-[8%] right-[8%] -z-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </span>
            {portfolio.personal.availability}
          </div>

          <p className="mb-4 font-mono text-sm text-muted-foreground">Hello, I&apos;m {portfolio.personal.name}.</p>
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-7xl xl:text-[5.3rem]">
            {portfolio.personal.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{portfolio.personal.summary}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition hover:-translate-y-0.5">
              View selected work <ArrowDown className="h-4 w-4" />
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3.5 text-sm font-semibold transition hover:border-primary/40 hover:bg-card">
              <Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
            <a href={`mailto:${portfolio.personal.email}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3.5 text-sm font-semibold transition hover:border-primary/40 hover:bg-card">
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7">
            <div className="mb-7 flex items-center justify-between border-b border-border/70 pb-4">
              <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" /></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">system.design.ts</span>
            </div>

            <div className="space-y-3">
              {systemNodes.map((node, index) => {
                const Icon = node.icon;
                return (
                  <div key={node.label} className="relative flex items-center gap-4 rounded-2xl border border-border/80 bg-background/55 p-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                    <div><p className="text-sm font-semibold">{node.label}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{node.detail}</p></div>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                    {index < systemNodes.length - 1 ? <span className="absolute -bottom-4 left-[2.35rem] h-4 w-px bg-primary/40" /> : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border/80 bg-background/55 p-4"><Layers3 className="mb-3 h-5 w-5 text-accent" /><p className="text-sm font-semibold">Background jobs</p><p className="mt-1 text-xs text-muted-foreground">Queues · workers · retries</p></div>
              <div className="rounded-2xl border border-border/80 bg-background/55 p-4"><Braces className="mb-3 h-5 w-5 text-accent" /><p className="text-sm font-semibold">AI workflows</p><p className="mt-1 text-xs text-muted-foreground">Validated · protected · useful</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
