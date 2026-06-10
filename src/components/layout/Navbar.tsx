import {
  Award,
  Briefcase,
  FolderKanban,
  GraduationCap,
  House,
  Mail,
  User,
  Wrench,
} from "lucide-react";
import type { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../config/data";
import Dock, { type DockItemData } from "../ui/Dock";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  return (
    <Dock
      items={dockItems}
      panelHeight={54}
      baseItemSize={40}
      magnification={46}
      distance={120}
      dockHeight={120}
      alwaysShowLabels={true}
    />
  );
}
