import { useEffect, useState } from "react";
import { Command, Mail, Navigation } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const CommandMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!open) return null;

  const goTo = (href: string) => {
    setOpen(false);
    if (href.startsWith("mailto:")) {
      window.location.href = href;
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-start bg-black/60 px-4 pt-[15vh] backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
      <div role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4"><Command className="h-4 w-4 text-primary" /><span className="text-sm font-medium">Quick navigation</span><kbd className="ml-auto rounded border border-border bg-secondary px-2 py-1 font-mono text-[10px] text-muted-foreground">ESC</kbd></div>
        <div className="p-2">
          {portfolio.navigation.map((item) => <button key={item.href} type="button" onClick={() => goTo(item.href)} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"><Navigation className="h-4 w-4" />{item.label}</button>)}
          <button type="button" onClick={() => goTo(`mailto:${portfolio.personal.email}`)} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"><Mail className="h-4 w-4" />Email {portfolio.personal.name}</button>
        </div>
      </div>
    </div>
  );
};

export default CommandMenu;
