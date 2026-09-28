import { useState } from "react";
import { ExternalLink, ImageIcon } from "lucide-react";
import type { ProjectScreenshot as Screenshot } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";

interface Props {
  screenshot: Screenshot;
  name: string;
  liveUrl?: string;
  priority?: boolean;
}

export default function ProjectScreenshot({ screenshot, name, liveUrl, priority = false }: Props) {
  const [failed, setFailed] = useState(false);
  const visual = failed ? (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 bg-secondary/40 p-8 text-muted-foreground">
      <ImageIcon className="h-8 w-8 text-primary" aria-hidden="true" />
      <span className="font-grotesk text-sm">Explore {name}{liveUrl ? " in the live application" : " on GitHub"}.</span>
    </div>
  ) : (
    <img
      src={screenshot.src}
      alt={screenshot.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className="block h-auto w-full object-contain"
    />
  );

  return (
    <figure className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name} Live Demo (opens in a new tab)`}
          className="block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          onClick={() => trackEvent("click", "demo", name)}
        >
          {visual}
        </a>
      ) : visual}
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 px-4 py-3 font-mono text-xs text-muted-foreground">
        <span>{screenshot.caption}</span>
        {liveUrl && <span className="inline-flex items-center gap-1.5 text-primary">Open Live Demo <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></span>}
      </figcaption>
    </figure>
  );
}
