import { useState, type FormEvent } from "react";
import { Send, Mail, MapPin, CheckCircle, Phone, Globe } from "lucide-react";
import type { ComponentType } from "react";
import {
  usePortfolio,
  usePublishedPortfolioData,
} from "../../context/PortfolioContext";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import MagneticButton from "../ui/MagneticButton";
import CinematicSection from "../ui/CinematicSection";

const socialIconMap: Record<string, ComponentType<{ size?: number }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { data } = usePublishedPortfolioData();
  const { submitContact } = usePortfolio();

  if (!data) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    await submitContact({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: "Portfolio Contact",
      message: String(formData.get("message") ?? ""),
    });
    setSubmitting(false);
    form.reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const socialLinks = [
    { label: "GitHub", href: data.contactInfo.github, icon: "github" },
    { label: "LinkedIn", href: data.contactInfo.linkedIn, icon: "linkedin" },
    { label: "Email", href: `mailto:${data.contactInfo.email}`, icon: "email" },
  ].filter((item) => item.href);

  return (
    <CinematicSection id="contact" fullScreen>
      <div className="section-container flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {/* Premium Heading */}
          <div className="mb-8 text-center relative" data-stagger>
            <div className="section-heading-glow" />
            <h2 className="section-heading font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Let's Work Together
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base text-neutral-400">
              Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
            </p>
          </div>

          {/* Glassmorphism Card */}
          <div className="glass-card p-6 sm:p-8" data-stagger>
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Left: Info */}
              <div className="space-y-5 lg:col-span-2">
                {/* Contact details */}
                <div className="space-y-3">
                  <a
                    href={`mailto:${data.contactInfo.email}`}
                    className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Mail size={15} className="text-accent-400" />
                    {data.contactInfo.email}
                  </a>
                  <a
                    href={`tel:${data.contactInfo.phone}`}
                    className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Phone size={15} className="text-accent-400" />
                    {data.contactInfo.phone}
                  </a>
                  <div className="flex items-center gap-3 px-2 py-1.5 text-sm text-neutral-300">
                    <MapPin size={15} className="text-accent-400" />
                    {data.personalInfo.location}
                  </div>
                  <a
                    href={data.contactInfo.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Globe size={15} className="text-accent-400" />
                    {data.contactInfo.portfolioUrl}
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-2 pt-2">
                  {socialLinks.map((link) => {
                    const Icon = socialIconMap[link.icon];
                    if (!Icon) return null;
                    return (
                      <MagneticButton key={link.label} strength={0.4}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-700/50 text-neutral-400 transition-all duration-200 hover:border-neutral-600 hover:bg-white/5 hover:text-white"
                          aria-label={link.label}
                        >
                          <Icon size={16} />
                        </a>
                      </MagneticButton>
                    );
                  })}
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1 block text-xs font-medium text-neutral-400"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-lg border border-neutral-700/60 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 backdrop-blur-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1 block text-xs font-medium text-neutral-400"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full rounded-lg border border-neutral-700/60 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 backdrop-blur-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1 block text-xs font-medium text-neutral-400"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      required
                      placeholder="Tell me about your project..."
                      className="w-full resize-none rounded-lg border border-neutral-700/60 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 backdrop-blur-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition-all duration-200 hover:bg-neutral-200 disabled:opacity-50"
                      >
                        <Send size={14} />
                        {submitting ? "Sending..." : "Send Message"}
                      </button>
                    </MagneticButton>

                    {submitted && (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                        <CheckCircle size={14} />
                        Message sent!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Footer mini */}
          <p className="mt-6 text-center text-xs text-neutral-600">
            © {new Date().getFullYear()} {data.personalInfo.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </CinematicSection>
  );
}
