import { Card } from "@/components/ui/card";
import type { Project } from "@/data/projects";

export default function ProjectArchitecture({ project }: { project: Project }) {
  return (
    <section aria-labelledby="architecture-title" className="space-y-6">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">System design</p>
        <h2 id="architecture-title" className="font-outfit text-3xl font-bold">Architecture</h2>
        <p className="mt-4 max-w-3xl font-grotesk text-sm leading-7 text-muted-foreground">{project.architecture.summary}</p>
      </div>
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {project.architecture.nodes.map((node, index) => (
          <li key={node.title} className="min-w-0">
            <Card className="h-full border-border/80 bg-card/80 p-5">
              <span className="mb-5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 font-mono text-xs text-primary" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-outfit text-lg font-semibold">{node.title}</h3>
              <p className="mt-3 font-grotesk text-sm leading-6 text-muted-foreground">{node.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
