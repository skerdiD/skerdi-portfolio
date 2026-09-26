import { ArrowUpRight, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { githubUrl, portfolio } from "@/data/portfolio";

const ContactSection = () => (
  <section id="contact" className="section-shell pb-16 sm:pb-20">
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card px-6 py-14 text-center shadow-2xl shadow-primary/5 sm:px-10 sm:py-20">
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
      <div className="relative"><p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">Contact</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Let&apos;s build software that holds up in production.</h2><p className="mx-auto mt-6 max-w-2xl leading-7 text-muted-foreground">I&apos;m interested in full-stack opportunities with teams that care about thoughtful product work, sound architecture, and dependable delivery.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href={`mailto:${portfolio.personal.email}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition hover:-translate-y-0.5"><Mail className="h-4 w-4" /> Send an email <ArrowUpRight className="h-4 w-4" /></a><a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-3.5 text-sm font-semibold transition hover:border-primary/40"><Github className="h-4 w-4" /> View GitHub</a></div><a href={`mailto:${portfolio.personal.email}`} className="mt-7 inline-block font-mono text-sm text-muted-foreground transition hover:text-primary">{portfolio.personal.email}</a></div>
    </motion.div>
  </section>
);

export default ContactSection;
