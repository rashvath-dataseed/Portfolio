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
import { recordVisit } from "./lib/portfolioStore";

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
