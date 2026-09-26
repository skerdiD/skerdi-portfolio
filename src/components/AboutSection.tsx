import { motion } from "framer-motion";
import { Boxes, BrainCircuit, Waypoints } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";
import SpotlightCard from "@/components/SpotlightCard";

const icons = [Waypoints, Boxes, BrainCircuit];

const AboutSection = () => (
  <section id="about" className="section-shell">
    <SectionHeader eyebrow="About" title={portfolio.about.heading} description="Engineering complete product flows with an emphasis on clear boundaries and dependable backend foundations." />
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="space-y-5 text-lg leading-8 text-muted-foreground">
        {portfolio.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 font-mono text-sm leading-7 text-foreground">
          <span className="text-primary">const focus =</span> [<span className="text-accent">&quot;architecture&quot;</span>, <span className="text-accent">&quot;APIs&quot;</span>, <span className="text-accent">&quot;data&quot;</span>, <span className="text-accent">&quot;delivery&quot;</span>];
        </div>
      </motion.div>
      <div className="space-y-3">
        {portfolio.about.principles.map((principle, index) => {
          const Icon = icons[index];
          return (
            <SpotlightCard key={principle.title} innerClassName="flex gap-4 p-5 sm:p-6">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
              <div><h3 className="font-semibold">{principle.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{principle.description}</p></div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  </section>
);

export default AboutSection;
