import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Github, Trophy, ArrowRight, Code2, GraduationCap, Loader2, CheckCircle2, AlertCircle, Flame, Mail, Award, Target, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useGithubStats } from "@/hooks/useDeveloperStats";

const About = () => {
  const { data: githubData, isLoading: isGithubLoading } = useGithubStats("about");
  const githubFollowers = githubData?.followers ?? "—";
  const githubRepos = githubData?.public_repos ?? "—";
  const avatarUrl = githubData?.avatar_url || "https://github.com/skerdiD.png";
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
        title="About Skerdi Cacaj | Full-Stack Developer"
        description="Full-Stack Developer building complete web applications, from modern React/Next.js interfaces to backend systems with Express.js and NestJS, databases, background processing, and AI-powered features."
        schema={personSchema}
      />
      <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit">
        <Navbar />

        <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

          {/* Top Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-muted-foreground font-grotesk">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-foreground font-semibold">About</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column (Profile Info Card & stats) */}
            <div className="lg:col-span-4 space-y-6">

              {/* Profile Photo Section (Optimized Image representation) */}
              <figure className="bg-card rounded-2xl border border-border overflow-hidden shadow-xl">
                <div className="h-64 w-full bg-gradient-to-b from-primary/10 to-card relative">
                  <img
                    src={avatarUrl}
                    alt="Skerdi Cacaj, Full-Stack Developer"
                    title="Skerdi Cacaj Profile Photo"
                    width="400"
                    height="400"
                    loading="eager"
                    className="w-full h-full object-cover object-top opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>

                <figcaption className="p-6 relative -mt-12 z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Skerdi Cacaj</h1>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                      <BadgeCheck className="w-3.5 h-3.5" /> Full-Stack Developer
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 font-grotesk">Full-Stack Developer</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-grotesk">
                    <MapPin className="w-4 h-4 text-primary" /> <span>Tirana, Albania</span>
                  </div>

                  <div className="w-full py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Open to conversations and collaboration
                  </div>
                </figcaption>
              </figure>

              {/* GitHub Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-xl relative overflow-hidden">
                {isGithubLoading && (
                  <div className="absolute inset-0 bg-card/85 flex items-center justify-center backdrop-blur-sm z-10">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                )}
                <div className="flex items-center gap-2 text-foreground mb-6 font-medium">
                  <Github className="w-5 h-5" /> <h2>GitHub Performance</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center divide-x divide-border">
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">{githubFollowers}</div>
                    <div className="text-xs text-muted-foreground font-grotesk">Followers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">{githubRepos}</div>
                    <div className="text-xs text-muted-foreground font-grotesk">Repositories</div>
                  </div>
                </div>
                <a
                  href="https://github.com/skerdiD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-6 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-border"
                >
                  Visit GitHub Profile <ArrowRight className="w-4 h-4" />
                </a>
              </div>


            </div>

            {/* Right Column (Long-form details) */}
            <div className="lg:col-span-8 space-y-8">

              {/* Biography Section */}
              <section className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xl space-y-6">
                <h2 className="text-2xl font-bold font-outfit border-b border-border pb-2 text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> Professional Overview & Goals
                </h2>
                <div className="font-grotesk text-muted-foreground leading-relaxed space-y-4 text-sm sm:text-base">
                  <p>Full-Stack Developer building complete web applications, from modern React/Next.js interfaces to backend systems with Express.js and NestJS, databases, background processing, and AI-powered features.</p>
                  <p>I enjoy working across the full stack, with a particular interest in backend systems, application architecture, and system design. Albanian — Native. English — B2 (Upper-Intermediate).</p>
                </div>
              </section>

              {/* Education Section */}
              <section className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xl space-y-6">
                <h2 className="text-2xl font-bold font-outfit border-b border-border pb-2 text-foreground flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> Academic History
                </h2>

                <div className="space-y-6">
                  <div className="border-l-2 border-primary/20 pl-4 space-y-2">
                    <span className="text-xs font-bold text-primary font-jetbrains bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">2023 – 2026</span>
                    <h3 className="text-lg font-bold text-foreground font-outfit">Bachelor in Computer Science</h3>
                    <p className="text-sm font-medium text-foreground font-grotesk">University of New York Tirana (UNYT) — Tirana, Albania</p>
                    <p className="text-xs text-muted-foreground font-grotesk">Tirana, Albania</p>
                  </div>


                </div>
              </section>

              {/* Tech Stack & Skills */}
              <section className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xl space-y-6">
                <h2 className="text-2xl font-bold font-outfit border-b border-border pb-2 text-foreground flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" /> Technical Skills & Tools
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-grotesk">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground border-b border-border pb-1 font-outfit">Programming Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {["TypeScript", "JavaScript", "HTML", "CSS"].map(lang => (
                        <span key={lang} className="px-2.5 py-1 rounded bg-muted border border-border text-foreground text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground border-b border-border pb-1 font-outfit">Frameworks & Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "Express.js", "NestJS", "Databases", "Background processing", "AI integrations", "System design"].map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded bg-muted border border-border text-foreground text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>



              {/* Core Projects Link */}
              <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left space-y-2">
                  <h2 className="text-xl font-bold text-foreground font-outfit flex items-center justify-center sm:justify-start gap-2">
                    <BookOpen className="w-5 h-5 text-primary" /> Real-World Products
                  </h2>
                  <p className="text-xs text-muted-foreground font-grotesk leading-relaxed">
                    Read the detailed architectural case studies for SaveethaHub and UniVault, documenting problems, solutions, tech stack, and design lifecycles.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition-all border border-orange-400/30">
                    <Link to="/case-study/saveethahub">SaveethaHub</Link>
                  </Button>
                  <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md transition-all border border-teal-500/30">
                    <Link to="/case-study/univault">UniVault</Link>
                  </Button>
                </div>
              </section>

            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;

