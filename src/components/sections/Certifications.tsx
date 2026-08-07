import { Award } from "lucide-react";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";
import CinematicSection from "../ui/CinematicSection";
import TiltCard from "../ui/TiltCard";

export default function Certifications() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  return (
    <CinematicSection id="certifications">
      <div className="section-container">
        {/* Premium Section Heading */}
        <div className="mb-12 text-center md:mb-16 relative" data-stagger>
          <div className="section-heading-glow" />
          <h2 className="section-heading font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Certifications
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
            Professional certifications that validate my skills and knowledge.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.certifications.map((cert, i) => (
            <TiltCard key={cert.id} maxTilt={8}>
              <div
                data-stagger
                className="group flex h-full rounded-xl border border-neutral-700/40 bg-neutral-900/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-neutral-600/50 hover:shadow-lg hover:shadow-accent-500/5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors group-hover:bg-accent-950 group-hover:text-accent-400">
                    <Award size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white">
                      {cert.certificateName}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-400">
                      {cert.issuingOrganization}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {cert.issueDate}
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
