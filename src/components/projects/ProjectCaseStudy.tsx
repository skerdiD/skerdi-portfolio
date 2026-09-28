import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import type { Project } from "@/data/projects";
import ProjectActions from "./ProjectActions";
import ProjectArchitecture from "./ProjectArchitecture";
import ProjectGallery from "./ProjectGallery";
import { getProjectScreenshots } from "@/data/projectScreenshots";
import ProjectScreenshot from "./ProjectScreenshot";

interface Props {
  project: Project;
  previous?: Project;
  next?: Project;
}

const navigationClass = "min-w-0 rounded-xl border border-border/80 bg-card/80 p-5 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export default function ProjectCaseStudy({ project, previous, next }: Props) {
  const cover = getProjectScreenshots(project).find(image => /\/cover\.[^.]+$/.test(image.src)) ?? project.heroImage;

  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl space-y-14 px-5 pb-20 pt-28 sm:space-y-20 sm:px-8 sm:pt-36">
      <header className="space-y-7">
        <Link to="/#projects" className="inline-flex items-center gap-2 rounded text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Projects
        </Link>
        <div className="max-w-4xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">{project.category}</p>
          <h1 className="font-outfit text-4xl font-extrabold tracking-tight sm:text-6xl">{project.name}</h1>
          <p className="mt-5 max-w-3xl font-grotesk text-lg leading-relaxed text-muted-foreground sm:text-xl">{project.tagline}</p>
        </div>
        <ProjectActions project={project} />
        <ProjectScreenshot key={cover.src} screenshot={cover} name={project.name} liveUrl={project.hasLiveDemo ? project.link : undefined} priority />
      </header>

      <section aria-labelledby="overview-title" className="space-y-6">
        <h2 id="overview-title" className="font-outfit text-3xl font-bold">Overview</h2>
        <p className="max-w-3xl font-grotesk text-base leading-8 text-muted-foreground">{project.overview}</p>
        <div className="grid gap-5 md:grid-cols-2">
          {[["Problem", project.problem], ["Solution", project.solution]].map(([title, description]) => (
            <Card key={title} className="border-border/80 bg-card/80 p-6">
              <h3 className="mb-3 font-outfit text-xl font-semibold">{title}</h3>
              <p className="font-grotesk text-sm leading-7 text-muted-foreground">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      <ProjectArchitecture project={project} />

      <section aria-labelledby="engineering-title" className="space-y-6">
        <h2 id="engineering-title" className="font-outfit text-3xl font-bold">Key engineering</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {project.engineeringHighlights.map(detail => (
            <Card key={detail.title} className="border-border/80 bg-card/80 p-6">
              <h3 className="font-outfit text-lg font-semibold">{detail.title}</h3>
              <p className="mt-3 font-grotesk text-sm leading-7 text-muted-foreground">{detail.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="stack-title" className="space-y-6">
        <h2 id="stack-title" className="font-outfit text-3xl font-bold">Tech stack</h2>
        <ul className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <li key={tech.name} className="rounded-md border border-border/60 bg-secondary/60 px-3 py-2 font-mono text-xs text-foreground/80">{tech.name}</li>
          ))}
        </ul>
      </section>

      <ProjectGallery project={project} />

      <section aria-labelledby="explore-title" className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
        <h2 id="explore-title" className="mb-3 font-outfit text-2xl font-bold">Explore the project</h2>
        <p className="mb-6 font-grotesk text-sm leading-7 text-muted-foreground">Read the implementation{project.hasLiveDemo && project.link ? " or try the application for yourself" : " on GitHub"}.</p>
        <ProjectActions project={project} />
      </section>

      <nav aria-label="Project navigation" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {previous && (
          <Link to={previous.caseStudyLink} className={navigationClass}>
            <span className="mb-2 flex items-center gap-2 font-mono text-xs text-muted-foreground"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous Project</span>
            <span className="font-outfit text-lg font-semibold">{previous.name}</span>
          </Link>
        )}
        {next && (
          <Link to={next.caseStudyLink} className={`${navigationClass} sm:col-start-2 sm:text-right`}>
            <span className="mb-2 flex items-center gap-2 font-mono text-xs text-muted-foreground sm:justify-end">Next Project <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            <span className="font-outfit text-lg font-semibold">{next.name}</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
