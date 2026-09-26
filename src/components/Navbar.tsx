import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <motion.nav
        initial={reduceMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all sm:px-5 ${
          scrolled
            ? "border-border/80 bg-background/85 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
        aria-label="Primary navigation"
      >
        <a href="#home" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-mono text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:-rotate-3">
            {portfolio.personal.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">{portfolio.personal.name}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {portfolio.navigation.map((item) => (
            <a key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(event) => toggleTheme(event)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-border/80 bg-card/70 text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href={`mailto:${portfolio.personal.email}`} className="hidden rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 sm:inline-flex">
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-border/80 bg-card/70 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-border/80 bg-background/95 p-2 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {portfolio.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
