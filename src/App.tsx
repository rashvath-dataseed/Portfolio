import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Philosophy from './components/sections/Philosophy';
import Contact from './components/sections/Contact';
import Testimonials from "./components/sections/Testimonials";
import FloatingLines from './components/ui/FloatingLines';
import TargetCursor from "./components/ui/TargetCursor";
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
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <div
        className="relative min-h-screen"
        style={{ backgroundColor: "#000" }}
      >
        <div className="fixed inset-0 z-0" style={{ opacity: 0.45 }}>
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={8}
            lineDistance={8}
            bendRadius={8}
            bendStrength={-2}
            interactive
            parallax={true}
            animationSpeed={1}
            gradientStart="#e945f5"
            gradientMid="#6f6f6f"
            gradientEnd="#6a6a6a"
          />
        </div>

        <div className="relative z-9 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-14 md:pt-10">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/philosophy" element={<Philosophy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
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
        <Route path="*" element={<PortfolioShell />} />
      </Routes>
    </>
  );
}
