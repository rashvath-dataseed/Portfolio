import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import CursorGlow from "./components/ui/CursorGlow";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
import DotIndicator from "./components/ui/DotIndicator";
import FloatingParticlesCanvas from "./components/ui/FloatingParticlesCanvas";
import GradientBlobs from "./components/ui/GradientBlobs";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AdminLogin from "./pages/AdminLogin";
import { ADMIN_DASHBOARD_ROOT, ADMIN_LOGIN_SLUG } from "./context/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminPersonal from "./pages/admin/AdminPersonal";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminCertifications from "./pages/admin/AdminCertifications";
import AdminEducation from "./pages/admin/AdminEducation";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminContact from "./pages/admin/AdminContact";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import ProjectDetails from "./pages/ProjectDetails";
import { recordVisit } from "./lib/portfolioStore";
import { usePublishedPortfolioData } from "./context/PortfolioContext";
import { getProjectSlug } from "./lib/projectRouting";

const SITE_URL = "https://www.rashvath-shetty.in";
const DEFAULT_SEO_TITLE = "Rashvath Shetty | Software Developer";
const DEFAULT_SEO_DESCRIPTION =
  "Portfolio of Rashvath Shetty, Software Developer specializing in React, Next.js, TypeScript, and secure web application architecture.";

function setMetaTag(attribute: "name" | "property", key: string, value: string) {
  let meta = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", value);
}

function removeMetaTag(attribute: "name" | "property", key: string) {
  const meta = document.querySelector(`meta[${attribute}="${key}"]`);
  meta?.remove();
}

function setCanonical(url: string) {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

function SeoManager() {
  const { pathname } = useLocation();
  const { data } = usePublishedPortfolioData();

  useEffect(() => {
    const normalizedPath = pathname === "/" ? "" : pathname;
    const pageUrl = `${SITE_URL}${normalizedPath}`;
    const isAdminRoute =
      pathname === ADMIN_LOGIN_SLUG || pathname.startsWith(ADMIN_DASHBOARD_ROOT);

    if (isAdminRoute) {
      document.title = "Admin | Rashvath Shetty";
      setMetaTag("name", "robots", "noindex,nofollow");
      setCanonical(pageUrl);
      setMetaTag("property", "og:url", pageUrl);
      return;
    }

    let title = data?.settings.seoTitle?.trim() || DEFAULT_SEO_TITLE;
    let description = data?.settings.seoDescription?.trim() || DEFAULT_SEO_DESCRIPTION;

    if (pathname.startsWith("/projects/") && data) {
      const slug = pathname.replace("/projects/", "").trim().toLowerCase();
      const project = data.projects.find(
        (entry) => getProjectSlug(entry).toLowerCase() === slug,
      );

      if (project) {
        const fullName = data.personalInfo.fullName.trim() || "Rashvath Shetty";
        title = `${project.title} | Projects | ${fullName}`;
        if (project.description.trim()) {
          description = project.description.trim();
        }
      }
    }

    const ogImage = data?.settings.openGraphImage?.trim();

    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:url", pageUrl);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setCanonical(pageUrl || SITE_URL);

    if (ogImage) {
      setMetaTag("property", "og:image", ogImage);
      setMetaTag("name", "twitter:image", ogImage);
    } else {
      removeMetaTag("property", "og:image");
      removeMetaTag("name", "twitter:image");
    }
  }, [data, pathname]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function PortfolioShell() {
  useEffect(() => {
    void recordVisit();
  }, []);

  return (
    <>
      {/* ── Global Effects ── */}
      <GradientBlobs />
      <FloatingParticlesCanvas />
      <CursorGlow />
      <ScrollProgressBar />
      <DotIndicator />

      {/* ── Single-Page Scroll Container ── */}
      <div className="relative z-10 scroll-snap-container">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Certifications />
        <Contact />
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SeoManager />
      <Routes>
        <Route path={ADMIN_LOGIN_SLUG} element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ADMIN_DASHBOARD_ROOT} element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="personal" element={<AdminPersonal />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="certifications" element={<AdminCertifications />} />
            <Route path="education" element={<AdminEducation />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
        </Route>
        <Route path="/" element={<PortfolioShell />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
