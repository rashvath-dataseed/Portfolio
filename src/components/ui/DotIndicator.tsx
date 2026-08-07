import { useEffect, useState } from "react";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function DotIndicator() {
  const { scrollTo } = useSmoothScroll();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      /* Show after scrolling past 30% of first section */
      setVisible(scrollY > vh * 0.3);

      /* Find active section */
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop - vh * 0.5 <= scrollY) {
          setActive(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="dot-indicator"
      style={{ opacity: visible ? 1 : 0 }}
      aria-label="Section navigation"
    >
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(`#${section.id}`, { duration: 1.6 })}
          className={`dot-indicator__dot ${i === active ? "dot-indicator__dot--active" : ""}`}
          aria-label={`Scroll to ${section.label}`}
          aria-current={i === active ? "true" : undefined}
        >
          <span className="dot-indicator__tooltip">{section.label}</span>
        </button>
      ))}
    </nav>
  );
}
