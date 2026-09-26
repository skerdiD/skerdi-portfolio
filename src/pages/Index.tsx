import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IntroAnimation, { hasIntroPlayed } from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { trackEvent } from "@/lib/analytics";
import SEO from "@/components/SEO";
import ScrollProgressIndicator from "@/components/motion/ScrollProgressIndicator";

// Module-level guard: persists in memory across client-side route navigations and state changes,
// ensuring the splash screen fires strictly once per full page load only.
let splashHasFired = false;

const isSplashDismissed = (): boolean => {
  if (splashHasFired) return true;
  return hasIntroPlayed();
};

const Index = () => {
  const { hash } = useLocation();
  // loading = true while intro animation plays
  const [loading, setLoading] = useState(() => !isSplashDismissed());
  // introActive = true while the intro overlay is covering the page.
  // When false, the navbar logo becomes visible (handoff moment).
  const [introActive, setIntroActive] = useState(() => !isSplashDismissed());

  useEffect(() => {
    if (loading) return;

    const trackedSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && !trackedSections.has(sectionId)) {
              trackedSections.add(sectionId);
              
              let displayName = sectionId;
              if (sectionId === "home") displayName = "hero";
              if (sectionId === "certifications") displayName = "certificates";
              
              const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
              trackEvent("scroll", "section_view", formattedName);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (!loading && hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          const navOffset = 76;
          const elementTop = element.getBoundingClientRect().top + window.scrollY - navOffset;
          window.scrollTo({ top: Math.max(0, elementTop), behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, hash]);

  const personSchema = {
  "@type": "Person",
  "name": "Skerdi Cacaj",
  "jobTitle": "Full-Stack Developer",
  "description": "Full-Stack Developer building complete web applications, from modern React/Next.js interfaces to backend systems with Express.js and NestJS, databases, background processing, and AI-powered features.",
  "email": "skerdi.cacaj.dev@gmail.com",
  "telephone": "+355 67 64 29 267",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tirana",
    "addressCountry": "AL"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University of New York Tirana (UNYT)"
  },
  "sameAs": [
    "https://github.com/skerdiD",
    "https://www.linkedin.com/in/skerdi-cacaj"
  ],
  "knowsAbout": [
    "React",
    "Next.js",
    "Express.js",
    "NestJS",
    "Databases",
    "Background processing",
    "AI integrations",
    "Application architecture",
    "System design"
  ]
};

  return (
    <>
      <SEO
        title="Skerdi Cacaj | Full-Stack Developer"
        description="Full-Stack Developer building complete web applications, from modern React/Next.js interfaces to backend systems with Express.js and NestJS, databases, background processing, and AI-powered features."
        schema={personSchema}
      />

      {/* Navbar is ALWAYS mounted (portal to body) so #navbar-logo is in the DOM
          even during the intro — required for getBoundingClientRect measurement.
          introActive=true hides the logo while the intro plays. */}
      <Navbar skipEntryAnim={splashHasFired} introActive={introActive} />

      {loading && (
        <IntroAnimation
          onHandoff={() => setIntroActive(false)}
          onComplete={() => {
            splashHasFired = true;
            setLoading(false);
          }}
        />
      )}

      <div className={loading ? "hidden" : ""}>
        {!loading && <ScrollProgressIndicator />}
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;