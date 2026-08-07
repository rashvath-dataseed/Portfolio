import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    /* Detect touch device */
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      glow.style.display = "none";
      return;
    }

    /* Reduced motion */
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      glow.style.display = "none";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      /* Intensify on interactive elements */
      const el = e.target as HTMLElement;
      const isInteractive =
        el.closest("a, button, [role='button'], input, textarea, [data-magnetic]");
      glow.style.setProperty("--glow-size", isInteractive ? "320px" : "220px");
      glow.style.setProperty("--glow-opacity", isInteractive ? "0.18" : "0.1");
    };

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      glow.style.transform = `translate(${pos.current.x - 110}px, ${pos.current.y - 110}px)`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      aria-hidden="true"
    />
  );
}
