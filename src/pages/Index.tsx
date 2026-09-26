import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import SEO from "@/components/SEO";
import SkillsSection from "@/components/SkillsSection";
import ScrollProgressIndicator from "@/components/motion/ScrollProgressIndicator";
import { portfolio } from "@/data/portfolio";

const Index = () => {
  const personSchema = {
    "@type": "Person",
    name: portfolio.personal.name,
    jobTitle: portfolio.personal.role,
    description: portfolio.personal.summary,
    url: portfolio.personal.siteUrl,
    email: portfolio.personal.email,
    sameAs: portfolio.socialLinks.filter((link) => link.type === "github").map((link) => link.href),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: portfolio.education[0].institution,
    },
    knowsAbout: portfolio.skillGroups.flatMap((group) => group.skills),
  };

  const websiteSchema = {
    "@type": "WebSite",
    name: `${portfolio.personal.name} — ${portfolio.personal.role}`,
    url: portfolio.personal.siteUrl,
    description: portfolio.personal.summary,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO schema={[personSchema, websiteSchema]} />
      <ScrollProgressIndicator />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
