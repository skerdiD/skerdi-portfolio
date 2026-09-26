import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { portfolio } from "@/data/portfolio";

const NotFound = () => (
  <main className="grid min-h-screen place-items-center bg-background px-5 text-center">
    <SEO title={`Page not found — ${portfolio.personal.name}`} description="The requested page could not be found." />
    <div><p className="font-mono text-sm uppercase tracking-[0.3em] text-primary">404 / route not found</p><h1 className="mt-5 text-5xl font-extrabold tracking-tight sm:text-7xl">This endpoint doesn&apos;t exist.</h1><p className="mx-auto mt-5 max-w-xl text-muted-foreground">The portfolio has been simplified to a focused single-page experience.</p><Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"><ArrowLeft className="h-4 w-4" /> Return home</Link></div>
  </main>
);

export default NotFound;
