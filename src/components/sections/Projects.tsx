import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";
import { getProjectDetailsPath } from "../../lib/projectRouting";
import { recordProjectView } from "../../lib/portfolioStore";
import CinematicSection from "../ui/CinematicSection";
import TiltCard from "../ui/TiltCard";

export default function Projects() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const projects = [...data.projects].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  return (
    <CinematicSection id="projects">
      <div className="section-container">
        {/* Premium Section Heading */}
        <div className="mb-12 text-center md:mb-16 relative" data-stagger>
          <div className="section-heading-glow" />
          <h2 className="section-heading font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
            Selected work showcasing my skills and problem-solving approach.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <TiltCard key={project.id} maxTilt={6}>
              <div
                data-stagger
                className="flex h-full flex-col rounded-xl border border-neutral-700/40 bg-neutral-900/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-neutral-600/50 hover:shadow-lg hover:shadow-accent-500/5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-white">
                        {project.title}
                      </h3>
                      <Link
                        to={getProjectDetailsPath(project)}
                        onClick={() => {
                          void recordProjectView(project.id);
                        }}
                        className="inline-flex items-center gap-1 rounded-md border border-neutral-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-200 transition-colors hover:bg-neutral-800/70"
                        aria-label={`Explore details for ${project.title}`}
                      >
                        Explore
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                    <p className="mt-1 text-xs font-medium text-neutral-400">
                      {project.techStack.join(", ")}
                    </p>
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      onClick={() => {
                        void recordProjectView(project.id);
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                      aria-label={`View ${project.title} live`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-300">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md border border-neutral-700 px-2.5 py-0.5 text-xs font-medium text-neutral-400 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
