import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CinematicSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** If true, section is exactly 100vh with no overflow */
  fullScreen?: boolean;
  /** Disable scrub/parallax to reduce scroll-time work for heavy sections */
  disableParallax?: boolean;
}

export default function CinematicSection({
  id,
  children,
  className = "",
  fullScreen = false,
  disableParallax = false,
}: CinematicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    /* ── Enter animation ── */
    const enterCtx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { opacity: 0, y: 70, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      /* Stagger children */
      const staggerEls = inner.querySelectorAll("[data-stagger]");
      if (staggerEls.length > 0) {
        gsap.fromTo(
          staggerEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, section);

    /* ── Optional parallax on inner content ── */
    const parallaxCtx = disableParallax
      ? null
      : gsap.context(() => {
          gsap.fromTo(
            inner,
            { yPercent: 0 },
            {
              yPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        }, section);

    return () => {
      enterCtx.revert();
      parallaxCtx?.revert();
    };
  }, [disableParallax]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative ${fullScreen ? "h-screen" : "min-h-screen"} flex items-center justify-center overflow-hidden scroll-snap-section ${className}`}
      aria-label={id}
    >
      <div ref={innerRef} className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}
