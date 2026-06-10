import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { GitHubIcon, LinkedInIcon } from '../ui/SocialIcons';
import Button from '../ui/Button';
import { usePublishedPortfolioData } from "../../context/PortfolioContext";

const socialIconMap: Record<string, ComponentType<{ size?: number }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

export default function Hero() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const socialLinks = [
    { label: "GitHub", href: data.personalInfo.githubUrl, icon: "github" },
    {
      label: "LinkedIn",
      href: data.personalInfo.linkedinUrl,
      icon: "linkedin",
    },
    {
      label: "Email",
      href: `mailto:${data.personalInfo.email}`,
      icon: "email",
    },
  ].filter((item) => item.href);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
      aria-label="Introduction"
    >
      <div className="relative mx-auto max-w-3xl text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-700/60 bg-neutral-900/80 px-4 py-1.5 text-sm font-medium text-neutral-300 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          style={{ textShadow: "0 0 40px rgba(255,255,255,0.15)" }}
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {data.personalInfo.fullName}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-6 text-lg leading-relaxed text-neutral-300 sm:text-xl"
        >
          {data.personalInfo.designation} building scalable frontend solutions
          with <span className="font-medium text-white">React</span>,{" "}
          <span className="font-medium text-white">Next.js</span>, and{" "}
          <span className="font-medium text-white">TypeScript</span>.
          <br className="hidden sm:block" />
          Based in {data.personalInfo.location}.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/contact" size="lg">
            Get in Touch
          </Button>
          <Button href="/projects" variant="secondary" size="lg">
            View Projects
          </Button>
        </motion.div>

        {/* Social Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          {socialLinks.map((link) => {
            const Icon = socialIconMap[link.icon];
            if (!Icon) return null;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700/60 bg-neutral-900/60 text-neutral-400 backdrop-blur-sm transition-all duration-200 hover:border-neutral-600 hover:bg-neutral-800/80 hover:text-white"
                aria-label={link.label}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link
          to="/about"
          aria-label="Scroll to about section"
          className="flex flex-col items-center gap-2 text-neutral-500 transition-colors hover:text-neutral-300"
        >
          <span className="text-xs font-medium uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
