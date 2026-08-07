import { useEffect, useRef } from "react";
import { ArrowRight, BriefcaseBusiness, Code2, Mail, MapPin, Sparkles, Star } from "lucide-react";
import type { ComponentType } from "react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";
import { useSmoothScroll } from "../providers/SmoothScrollProvider";
import MagneticButton from "../ui/MagneticButton";
import { gsap } from "gsap";

const socialIconMap: Record<string, ComponentType<{ size?: number }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

export default function Hero() {
  const { data } = usePublishedPortfolioData();
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealEls = content.querySelectorAll("[data-hero-reveal]");

    const revealTl = gsap.timeline({ defaults: { ease: "power2.out" } });
    revealTl.fromTo(
      revealEls,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, delay: 0.08 },
    );

    return () => {
      revealTl.kill();
    };
  }, [data]);

  if (!data) return null;

  const codeLines = [
    "const developer = {",
    `  name: "${data.personalInfo.fullName}",`,
    '  role: "Software Developer",',
    '  location: "Bangalore, India",',
    '  stack: ["React", "Next.js", "TypeScript"],',
    '  focus: "Scalable and secure frontend systems"',
    "};",
  ];

  const socialLinks = [
    { label: "GitHub", href: data.personalInfo.githubUrl, icon: "github" },
    { label: "LinkedIn", href: data.personalInfo.linkedinUrl, icon: "linkedin" },
    { label: "Email", href: `mailto:${data.personalInfo.email}`, icon: "email" },
  ].filter((item) => item.href);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden scroll-snap-section px-6 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-10 lg:pt-20"
      aria-label="Introduction"
    >
      <div ref={contentRef} className="relative mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="max-w-2xl">
            <div data-hero-reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-700/60 bg-neutral-900/70 px-4 py-1.5 text-sm font-medium text-neutral-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/35" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for opportunities
              </span>
            </div>

            <h1
              data-hero-reveal
              className="mt-8 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl"
              style={{ textShadow: "0 0 40px rgba(59,130,246,0.22)" }}
            >
              Hi, I'm
              <span className="mt-1 block bg-gradient-to-r from-accent-400 via-accent-500 to-cyan-300 bg-clip-text text-transparent">
                {data.personalInfo.fullName}
              </span>
            </h1>

            <p
              data-hero-reveal
              className="mt-6 max-w-lg text-base leading-relaxed text-neutral-300 sm:text-base lg:text-[1.05rem]"
            >
              {data.personalInfo.designation} building scalable frontend solutions
              with <span className="font-medium text-white">React</span>,{" "}
              <span className="font-medium text-white">Next.js</span>, and{" "}
              <span className="font-medium text-white">TypeScript</span>.
            </p>

            <p
              data-hero-reveal
              className="mt-5 inline-flex items-center gap-2 text-sm text-neutral-400"
            >
              <MapPin size={14} />
              Based in {data.personalInfo.location}
            </p>

            <div data-hero-reveal className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <button
                  onClick={() => scrollTo("#contact", { duration: 1.4 })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition-all duration-200 hover:bg-accent-600"
                >
                  Get In Touch
                  <ArrowRight size={15} />
                </button>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => scrollTo("#projects", { duration: 1.3 })}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/50 px-5 py-3 text-sm font-semibold text-neutral-200 transition-all duration-200 hover:border-neutral-500 hover:bg-neutral-800/70"
                >
                  View Projects
                  <ArrowRight size={15} />
                </button>
              </MagneticButton>
            </div>

            <div data-hero-reveal className="mt-9 flex flex-wrap items-center gap-4">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.icon];
                if (!Icon) return null;
                return (
                  <MagneticButton key={link.label} strength={0.38}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700/60 bg-neutral-900/55 text-neutral-400 backdrop-blur-sm transition-all duration-200 hover:border-neutral-500 hover:text-white"
                      aria-label={link.label}
                    >
                      <Icon size={17} />
                    </a>
                  </MagneticButton>
                );
              })}
            </div>

          </div>

          <div className="mt-8 space-y-6 lg:mt-7 lg:pl-3">
            <div
              data-hero-reveal
              className="relative overflow-hidden rounded-2xl border border-neutral-800/90 bg-neutral-950/70 p-6 shadow-[0_20px_80px_rgba(20,60,140,0.25)] backdrop-blur-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <Code2 size={16} className="text-neutral-500" />
              </div>

              <pre className="overflow-x-auto text-[12px] leading-6 text-neutral-300">
                <code className="hero-code-lines" aria-label="Developer code snippet">
                  {codeLines.map((line, index) => (
                    <span
                      key={`${index}-${line}`}
                      className="hero-code-line"
                      style={{
                        ["--line-index" as string]: index,
                        ["--line-chars" as string]: line.length,
                      }}
                    >
                      {line}
                    </span>
                  ))}
                </code>
              </pre>
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent-500/20 blur-2xl" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div
                data-hero-reveal
                className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 backdrop-blur-sm"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <BriefcaseBusiness size={16} className="text-accent-400" />
                  Available for Full-time
                </p>
                <p className="mt-2 text-xs text-neutral-400">
                  Frontend Development, React, Next.js, TypeScript
                </p>
              </div>

              <div
                data-hero-reveal
                className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 backdrop-blur-sm"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Sparkles size={16} className="text-accent-400" />
                  Collaboration Ready
                </p>
                <p className="mt-2 text-xs text-neutral-400">
                  Remote-first with agile product teams and fast delivery cycles.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div data-hero-reveal className="mt-6 flex justify-center lg:mt-8">
          <button
            onClick={() => scrollTo("#about", { duration: 1.2 })}
            aria-label="Scroll to about section"
            className="group inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/55 px-4 py-2 text-xs font-semibold tracking-wide text-neutral-400 transition-all duration-200 hover:border-neutral-600 hover:text-neutral-200"
          >
            <span>SCROLL TO EXPLORE</span>
            <Star size={13} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
