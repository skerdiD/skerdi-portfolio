import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import SectionHeader from "@/components/SectionHeader";

const EducationSection = () => (
  <section id="education" className="section-shell">
    <SectionHeader eyebrow="Education" title="Computer science fundamentals." description="The academic foundation behind the practical application work." />
    <div className="mx-auto max-w-4xl">
      {portfolio.education.map((item) => (
        <motion.article key={item.degree} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} className="flex flex-col gap-5 rounded-3xl border border-border/80 bg-card/70 p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><GraduationCap className="h-6 w-6" /></span>
          <div className="flex-1"><h3 className="text-2xl font-bold tracking-tight">{item.degree}</h3><p className="mt-2 text-muted-foreground">{item.institution}</p></div>
          <span className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">{item.status}</span>
        </motion.article>
      ))}
    </div>
  </section>
);

export default EducationSection;
