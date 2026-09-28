import type { Project } from "@/data/projects";
import { getProjectScreenshots } from "@/data/projectScreenshots";
import ProjectScreenshot from "./ProjectScreenshot";

export default function ProjectGallery({ project }: { project: Project }) {
  const screenshots = getProjectScreenshots(project).filter(image => !/\/cover\.[^.]+$/.test(image.src));
  if (!screenshots.length) return null;

  return (
    <section aria-labelledby="gallery-title" className="space-y-6">
      <h2 id="gallery-title" className="font-outfit text-3xl font-bold">Screenshots</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {screenshots.map(screenshot => (
          <ProjectScreenshot key={screenshot.src} screenshot={screenshot} name={project.name} liveUrl={project.hasLiveDemo ? project.link : undefined} />
        ))}
      </div>
    </section>
  );
}
