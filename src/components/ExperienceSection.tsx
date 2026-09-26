import { BriefcaseBusiness } from "lucide-react";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";

const ExperienceSection = () => (
  <section id="experience" className="section-shell">
    <SectionHeader eyebrow="Experience" title="A practical engineering foundation." description="Hands-on software and web development experience, presented without inflated titles or invented timelines." />
    <div className="mx-auto max-w-4xl">
      {portfolio.experience.map((item) => (
        <motion.article key={`${item.role}-${item.organization}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/75 p-6 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-8">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-accent" />
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><BriefcaseBusiness className="h-5 w-5" /></div>
            <div className="flex-1"><span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{item.type}</span><h3 className="mt-2 text-2xl font-bold tracking-tight">{item.role}</h3><p className="mt-2 font-medium text-muted-foreground">{item.organization}</p><p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{item.summary}</p></div>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
