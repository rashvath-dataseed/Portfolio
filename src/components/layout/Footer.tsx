import { Mail, ArrowUp } from 'lucide-react';
import type { ComponentType } from "react";
import { GitHubIcon, LinkedInIcon } from '../ui/SocialIcons';
import { usePublishedPortfolioData } from "../../context/PortfolioContext";

const iconMap: Record<string, ComponentType<{ size?: number }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

export default function Footer() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const socialLinks = [
    { label: "GitHub", href: data.contactInfo.github, icon: "github" },
    { label: "LinkedIn", href: data.contactInfo.linkedIn, icon: "linkedin" },
    { label: "Email", href: `mailto:${data.contactInfo.email}`, icon: "email" },
  ].filter((item) => item.href);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-neutral-700/40 bg-neutral-950/70 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div>
            <span className="font-display text-lg font-bold text-white">
              {data.personalInfo.fullName.split(" ")[0]}
              <span className="text-accent-500">.</span>
            </span>
            <p className="mt-1 text-sm text-neutral-400">
              {data.personalInfo.designation}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              if (!Icon) return null;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                  aria-label={link.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
            <button
              onClick={scrollToTop}
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-700/40 pt-6 text-center">
          <p className="text-xs text-neutral-500">
            {new Date().getFullYear()} {data.personalInfo.fullName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
