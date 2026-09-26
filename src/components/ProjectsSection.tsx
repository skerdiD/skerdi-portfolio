import { motion } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink, Github } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";
import SpotlightCard from "@/components/SpotlightCard";

const ProjectsSection = () => {
  const featured = portfolio.projects.filter((project) => project.featured);
  const additional = portfolio.projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="section-shell">
      <SectionHeader eyebrow="Featured projects" title="Real products, considered architecture." description="Selected full-stack work centered on business workflows, protected data, background processing, and useful AI integration." />

      <div className="space-y-6">
        {featured.map((project, index) => (
          <motion.article key={project.title} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
            <SpotlightCard className="overflow-hidden" innerClassName="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="project-visual relative min-h-64 overflow-hidden border-b border-border/70 p-7 lg:min-h-full lg:border-b-0 lg:border-r">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">0{index + 1} / selected work</span>
                <div className="absolute inset-x-7 bottom-7 rounded-2xl border border-white/10 bg-black/30 p-5 text-white backdrop-blur-md">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Architecture focus</p>
                  <p className="mt-2 text-xl font-semibold">{project.eyebrow}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-white/60"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Full-stack application</div>
                </div>
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{project.eyebrow}</p><h3 className="mt-2 text-3xl font-bold tracking-tight">{project.title}</h3></div><ArrowUpRight className="h-5 w-5 text-muted-foreground" /></div>
                <p className="mt-5 leading-7 text-muted-foreground">{project.summary}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">{project.highlights.map((highlight) => <li key={highlight} className="flex gap-2 text-sm leading-6 text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{highlight}</li>)}</ul>
                <div className="mt-6 flex flex-wrap gap-2">{project.stack.map((technology) => <span key={technology} className="rounded-md bg-secondary px-2.5 py-1 font-mono text-[11px] text-muted-foreground">{technology}</span>)}</div>
                <div className="mt-7 flex flex-wrap gap-3"><a href={project.repository} target="_blank" rel="noreferrer" className="project-link"><Github className="h-4 w-4" /> Source</a>{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link"><ExternalLink className="h-4 w-4" /> Live app</a> : null}</div>
              </div>
            </SpotlightCard>
          </motion.article>
        ))}
      </div>

      <div className="mt-14 flex items-center gap-4"><h3 className="whitespace-nowrap text-lg font-semibold">More full-stack work</h3><span className="h-px w-full bg-border" /></div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {additional.map((project) => (
          <SpotlightCard key={project.title} innerClassName="flex h-full flex-col p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{project.eyebrow}</p><h3 className="mt-3 text-xl font-bold">{project.title}</h3><p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{project.summary}</p><div className="mt-5 flex flex-wrap gap-1.5">{project.stack.map((item) => <span key={item} className="rounded-md border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground">{item}</span>)}</div><div className="mt-6 flex gap-4"><a href={project.repository} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`} className="text-muted-foreground transition hover:text-primary"><Github className="h-4 w-4" /></a>{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} live application`} className="text-muted-foreground transition hover:text-primary"><ExternalLink className="h-4 w-4" /></a> : null}</div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
