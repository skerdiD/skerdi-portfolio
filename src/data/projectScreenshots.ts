import type { Project, ProjectScreenshot as Screenshot } from "./projects";

// Vite discovers real files at build time. Adding an image needs no content edit.
const images = import.meta.glob<string>("/public/projects/**/*.{webp,png,jpg,jpeg,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

export function getProjectScreenshots(project: Project): Screenshot[] {
  return Object.keys(images)
    .filter(path => path.startsWith(`/public/projects/${project.slug}/`))
    .sort()
    .map(path => {
      const caption = path.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      return { src: path.replace(/^\/public/, ""), alt: `${project.name} · ${caption}`, caption };
    });
}

