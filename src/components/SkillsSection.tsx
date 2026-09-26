import { motion } from "framer-motion";
import { Braces, CloudCog, DatabaseZap, PanelsTopLeft } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";
import SpotlightCard from "@/components/SpotlightCard";

const icons = [Braces, DatabaseZap, PanelsTopLeft, CloudCog];

const SkillsSection = () => (
  <section id="skills" className="section-shell">
    <SectionHeader eyebrow="Tech stack" title="Tools organized by responsibility." description="A TypeScript-first toolkit spanning interfaces, APIs, data, background processing, AI integrations, testing, and delivery." />
    <div className="grid gap-4 md:grid-cols-2">
      {portfolio.skillGroups.map((group, index) => {
        const Icon = icons[index];
        return (
          <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.05 }}>
            <SpotlightCard innerClassName="h-full p-6 sm:p-7">
              <div className="mb-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span><div><h3 className="font-semibold">{group.title}</h3><p className="mt-1 text-sm text-muted-foreground">{group.description}</p></div></div>
              <div className="flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className="rounded-lg border border-border bg-background/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition group-hover:text-foreground">{skill}</span>)}</div>
            </SpotlightCard>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default SkillsSection;
