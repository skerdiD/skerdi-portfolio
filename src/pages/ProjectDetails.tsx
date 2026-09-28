import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import { projects } from "@/data/projects";
import NotFound from "./NotFound";

export default function ProjectDetails() {
  const { slug } = useParams();
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index];
  if (!project) return <NotFound />;

  return (
    <>
      <SEO title={`${project.name} | Skerdi Cacaj`} description={project.overview} />
      <Navbar />
      <ProjectCaseStudy key={project.slug} project={project} previous={projects[index - 1]} next={projects[index + 1]} />
      <Footer />
    </>
  );
}
