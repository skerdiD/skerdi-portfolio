import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import CommandMenu from "./components/CommandMenu";

// Route-level code splitting: the homepage (Index) is eager since it's the
// entry point for almost every visitor, but the case studies and
// secondary profile pages are only fetched when someone actually navigates there.
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Resume = lazy(() => import("./pages/Resume"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (!hash) {
      // Small timeout allows framer-motion's IntersectionObserver (whileInView) to register the correct viewport after route transition
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    } else {
      const id = hash.replace("#", "");
      setTimeout(() => {
        if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 120);
    }

    // If the visitor is navigating or landed on an interior route, mark portfolio as loaded
    // so internal client-side navigation to "/" will never trigger the splash screen.
    if (pathname !== "/" && pathname !== "") {
      try {
        sessionStorage.setItem("skerdi-intro-played", "true");
        sessionStorage.setItem("portfolio_has_loaded", "true");
      } catch { }
    }
  }, [pathname, hash, navType]);

  return null;
};

// Wrapper for page transition animations
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full min-h-screen flex flex-col relative z-0"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
      <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
      <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
      <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        }>
          <CommandMenu />
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
