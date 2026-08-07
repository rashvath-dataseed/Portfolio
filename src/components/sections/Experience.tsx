import { Briefcase, MapPin, Calendar } from "lucide-react";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";
import CinematicSection from "../ui/CinematicSection";

function splitExperienceDescription(description: string) {
  const lines = description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const summary: string[] = [];

  for (const rawLine of lines) {
    const cleanedLine = rawLine.replace(/^[-*]\s*/, "").trim();
    const withoutPrefix = cleanedLine
      .replace(/^Major Client Projects:\s*/i, "")
      .replace(/\.$/, "")
      .trim();

    const looksLikeProjectHeading =
      !rawLine.startsWith("-") &&
      / - /.test(withoutPrefix) &&
      withoutPrefix.split(" - ")[0].trim().split(/\s+/).length <= 5;

    if (looksLikeProjectHeading) {
      break;
    }

    summary.push(cleanedLine);
  }

  return { summary, lines };
}

export default function Experience() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  return (
    <CinematicSection id="experience" className="scroll-mt-24 pt-14 md:scroll-mt-28 md:pt-18">
      <div className="section-container">
        {/* Premium Section Heading */}
        <div className="mb-12 text-center md:mb-16 relative" data-stagger>
          <div className="section-heading-glow" />
          <h2 className="section-heading font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
            My professional journey and the impact I have made.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-accent-500/60 via-accent-500/20 to-transparent sm:left-6 md:block" />

          {data.experience.map((exp, i) => (
            <div
              key={exp.id}
              data-stagger
              className="relative mb-8 last:mb-0 md:pl-16"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {(() => {
                const { summary, lines } = splitExperienceDescription(exp.description);
                const displayLines = summary.length > 0 ? summary : lines;

                return (
                  <>
              {/* Timeline Dot */}
              <div className="absolute left-2.5 top-1 hidden h-3 w-3 rounded-full border-2 border-accent-500 bg-neutral-950 shadow-[0_0_10px_rgba(59,130,246,0.4)] sm:left-4.5 md:block" />

              <div className="rounded-xl border border-neutral-700/40 bg-neutral-900/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-600/50 hover:shadow-lg hover:shadow-accent-500/5">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {exp.role}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Briefcase size={13} />
                        {exp.companyName}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 rounded-md bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-400">
                    <Calendar size={12} />
                    {exp.duration}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-neutral-700/40 bg-neutral-900/60 p-5">
                <h4 className="text-sm font-semibold text-neutral-100">Role Highlights</h4>
                <ul className="mt-3 space-y-2.5">
                  {displayLines.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm leading-relaxed text-neutral-300"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
