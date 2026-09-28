import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";

export default function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild className="gap-2">
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("click", "github_project", project.title)}>
          <Github className="h-4 w-4" aria-hidden="true" /> GitHub Repository
        </a>
      </Button>
      {project.hasLiveDemo && project.link && (
        <Button asChild variant="outline" className="gap-2">
          <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("click", "demo", project.title)}>
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live Demo
          </a>
        </Button>
      )}
    </div>
  );
}
