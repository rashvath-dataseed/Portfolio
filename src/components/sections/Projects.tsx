import { ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import SectionHeading from '../ui/SectionHeading';
import { usePublishedPortfolioData } from "../../context/PortfolioContext";
import { recordProjectView } from "../../lib/portfolioStore";

export default function Projects() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const projects = [...data.projects].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  return (
    <section id="projects" className="py-20 sm:py-28" aria-label="Projects">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="Selected work showcasing my skills and problem-solving approach."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Card key={project.title} delay={i * 0.1} className="flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {project.title}
                  </h3>
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
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
