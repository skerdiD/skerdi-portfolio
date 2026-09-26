import { ArrowUp, Github, Mail } from "lucide-react";
import { githubUrl, portfolio } from "@/data/portfolio";

const Footer = () => (
  <footer className="border-t border-border/70 px-5 py-8 sm:px-8 lg:px-12">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
      <div><p className="font-semibold">{portfolio.personal.name}</p><p className="mt-1 text-sm text-muted-foreground">{portfolio.personal.role} · Backend-oriented engineering</p></div>
      <div className="flex items-center gap-2"><a href={githubUrl} target="_blank" rel="noreferrer" className="footer-icon" aria-label="GitHub"><Github className="h-4 w-4" /></a><a href={`mailto:${portfolio.personal.email}`} className="footer-icon" aria-label="Email"><Mail className="h-4 w-4" /></a><a href="#home" className="footer-icon" aria-label="Back to top"><ArrowUp className="h-4 w-4" /></a></div>
    </div>
  </footer>
);

export default Footer;
