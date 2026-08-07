import { GraduationCap } from "lucide-react";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";
import CinematicSection from "../ui/CinematicSection";
import TiltCard from "../ui/TiltCard";

const EducationSection = () => {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const education = [...data.education].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );

  return (
    <CinematicSection id="education">
      <div className="section-container">
        <div className="relative mb-12 text-center md:mb-16" data-stagger>
          <div className="section-heading-glow" />
          <h2 className="section-heading font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Education
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
            Academic foundation that shaped my engineering journey.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {education.map((item, i) => (
            <TiltCard key={item.id} maxTilt={6}>
              <article
                data-stagger
                className="h-full rounded-xl border border-neutral-700/40 bg-neutral-900/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-neutral-600/50 hover:shadow-lg hover:shadow-accent-500/5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-300">
                      {item.institutionName}
                    </p>
                    {item.specialization && (
                      <p className="mt-1 text-xs text-neutral-500">{item.specialization}</p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-md border border-neutral-700 px-2 py-0.5 text-neutral-400">
                        {item.duration}
                      </span>
                      <span className="rounded-md border border-neutral-700 px-2 py-0.5 text-neutral-300">
                        {item.grade}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
};

export default EducationSection;
