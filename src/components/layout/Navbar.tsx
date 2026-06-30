import {
  Award,
  Briefcase,
  ChevronDown,
  FolderKanban,
  GraduationCap,
  Menu,
  House,
  Mail,
  X,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../config/data";
import Dock, { type DockItemData } from "../ui/Dock";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const iconMap: Record<string, ReactElement> = {
    home: <House size={18} />,
    about: <User size={18} />,
    skills: <Wrench size={18} />,
    experience: <Briefcase size={18} />,
    projects: <FolderKanban size={18} />,
    certifications: <Award size={18} />,
    philosophy: <GraduationCap size={18} />,
    contact: <Mail size={18} />,
  };

  const dockItems: DockItemData[] = [
    {
      label: "Home",
      icon: iconMap.home,
      onClick: () => navigate("/"),
      className: pathname === "/" ? "dock-item-active" : "",
    },
    ...navLinks.map((link) => {
      const key = link.href.replace("/", "");
      return {
        label: link.label,
        icon: iconMap[key] ?? <User size={18} />,
        onClick: () => navigate(link.href),
        className: pathname === link.href ? "dock-item-active" : "",
      };
    }),
  ];

  const mobileLinks = [
    { label: "Home", href: "/", icon: iconMap.home },
    ...navLinks.map((link) => {
      const key = link.href.replace("/", "");
      return {
        label: link.label,
        href: link.href,
        icon: iconMap[key] ?? <User size={16} />,
      };
    }),
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const goTo = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="hidden md:block">
        <Dock
          items={dockItems}
          panelHeight={54}
          baseItemSize={40}
          magnification={46}
          distance={120}
          dockHeight={120}
          alwaysShowLabels={true}
        />
      </div>

      <div className="fixed top-3 left-1/2 z-[1300] w-[calc(100vw-1rem)] max-w-md -translate-x-1/2 md:hidden">
        <div className="rounded-2xl border border-neutral-800/90 bg-neutral-900/90 p-2 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => goTo("/")}
              className="inline-flex min-h-10 items-center rounded-xl bg-neutral-800 px-3 text-sm font-semibold tracking-wide text-neutral-100"
              aria-label="Go to home"
            >
              RS
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-neutral-800 px-3 text-sm font-medium text-neutral-100"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              Menu
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isMobileMenuOpen ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </div>

          {isMobileMenuOpen && (
            <nav
              id="mobile-nav-menu"
              className="mt-2 grid grid-cols-2 gap-2"
              aria-label="Mobile navigation"
            >
              {mobileLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => goTo(link.href)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "border border-blue-400/80 bg-blue-500/20 text-blue-100"
                        : "bg-neutral-800 text-neutral-200"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
