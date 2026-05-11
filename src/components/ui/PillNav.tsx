import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './PillNav.css';

interface PillNavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  items: PillNavItem[];
  logo?: React.ReactNode;
  baseColor?: string;
  pillBg?: string;
  pillTextColor?: string;
  hoverTextColor?: string;
  activeItem?: string;
  onItemClick?: (href: string) => void;
}

export default function PillNav({
  items,
  logo,
  baseColor = '#000',
  pillBg = '#fff',
  pillTextColor = '#000',
  hoverTextColor = '#fff',
  activeItem,
  onItemClick,
}: PillNavProps) {
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hoverLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerLinesRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleEnter = (i: number) => {
    const circle = circleRefs.current[i];
    const label = labelRefs.current[i];
    const hoverLabel = hoverLabelRefs.current[i];
    if (!circle || !label || !hoverLabel) return;

    gsap.killTweensOf([circle, label, hoverLabel]);
    gsap.to(circle, {
      width: '300%',
      height: '300%',
      x: '-50%',
      y: '0%',
      duration: 0.45,
      ease: 'power3.out',
    });
    gsap.to(label, {
      y: '-110%',
      duration: 0.35,
      ease: 'power3.out',
    });
    gsap.to(hoverLabel, {
      y: '0%',
      opacity: 1,
      duration: 0.35,
      ease: 'power3.out',
    });
  };

  const handleLeave = (i: number) => {
    const circle = circleRefs.current[i];
    const label = labelRefs.current[i];
    const hoverLabel = hoverLabelRefs.current[i];
    if (!circle || !label || !hoverLabel) return;

    gsap.killTweensOf([circle, label, hoverLabel]);
    gsap.to(circle, {
      width: 0,
      height: 0,
      x: '-50%',
      y: '50%',
      duration: 0.35,
      ease: 'power3.in',
    });
    gsap.to(label, {
      y: '0%',
      duration: 0.35,
      ease: 'power3.out',
    });
    gsap.to(hoverLabel, {
      y: '110%',
      opacity: 0,
      duration: 0.35,
      ease: 'power3.in',
    });
  };

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);
    const menu = mobileMenuRef.current;
    const lines = hamburgerLinesRef.current;

    if (next) {
      if (menu) {
        gsap.to(menu, {
          opacity: 1,
          scale: 1,
          visibility: 'visible',
          duration: 0.35,
          ease: 'back.out(1.5)',
        });
      }
      if (lines[0]) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease: 'power2.out' });
      }
      if (lines[1]) {
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease: 'power2.out' });
      }
    } else {
      if (menu) {
        gsap.to(menu, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          },
        });
      }
      if (lines[0]) {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      }
      if (lines[1]) {
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    }
  };

  // Initialize hover label positions
  useEffect(() => {
    hoverLabelRefs.current.forEach((el) => {
      if (el) gsap.set(el, { y: '110%', opacity: 0 });
    });
    circleRefs.current.forEach((el) => {
      if (el) gsap.set(el, { width: 0, height: 0, x: '-50%', y: '50%' });
    });
  }, []);

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillBg,
    '--pill-text': pillTextColor,
    '--hover-text': hoverTextColor,
  } as React.CSSProperties;

  const handleClick = (href: string) => {
    onItemClick?.(href);
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pill-nav-container" style={cssVars}>
      <nav className="pill-nav">
        {/* Logo */}
        {logo && (
          <a
            ref={logoRef}
            href={items?.[0]?.href || '#'}
            className="pill-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {logo}
          </a>
        )}

        {/* Desktop nav */}
        <div className="pill-nav-items desktop-only">
          <ul className="pill-list">
            {items.map((item, i) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`pill${activeItem === item.href.replace('#', '') ? ' is-active' : ''}`}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                >
                  <span
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                    className="hover-circle"
                  />
                  <span className="label-stack">
                    <span
                      ref={(el) => {
                        labelRefs.current[i] = el;
                      }}
                      className="pill-label"
                    >
                      {item.label}
                    </span>
                    <span
                      ref={(el) => {
                        hoverLabelRefs.current[i] = el;
                      }}
                      className="pill-label-hover"
                    >
                      {item.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span
            ref={(el) => {
              hamburgerLinesRef.current[0] = el;
            }}
            className="hamburger-line"
          />
          <span
            ref={(el) => {
              hamburgerLinesRef.current[1] = el;
            }}
            className="hamburger-line"
          />
        </button>
      </nav>

      {/* Mobile menu popover */}
      <div ref={mobileMenuRef} className="mobile-menu-popover mobile-only">
        <ul className="mobile-menu-list">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="mobile-menu-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.href);
                  setIsMobileMenuOpen(false);
                  toggleMobileMenu();
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
