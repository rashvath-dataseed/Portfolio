import CinematicSection from "../ui/CinematicSection";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";

export default function About() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const paragraphs = data.personalInfo.aboutMe
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <CinematicSection id="about">
      <div className="section-container text-center">
        {/* Premium Section Heading */}
        <div data-stagger className="relative">
          <div className="section-heading-glow" />
          <h2 className="section-heading font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            About Me
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
            A brief introduction to who I am and what I do.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-6">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              data-stagger
              className="text-center text-base leading-relaxed text-neutral-300 sm:text-lg"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </CinematicSection>
  );
}
