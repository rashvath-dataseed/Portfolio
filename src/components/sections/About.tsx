import CinematicSection from "../ui/CinematicSection";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";
import aboutPortrait from "../../assets/lanyard/Rashvath-removebg-preview.png";
import { BriefcaseBusiness, Code2, UserRound } from "lucide-react";

export default function About() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const aboutLines = data.personalInfo.aboutMe
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const timelineItems = [
    aboutLines[0],
    aboutLines[1],
    data.personalInfo.shortBio,
  ]
    .filter((item): item is string => Boolean(item?.trim()))
    .filter((item, index, items) => items.indexOf(item) === index)
    .slice(0, 3);

  const resolvedTimelineItems = timelineItems.length
    ? timelineItems
    : [
        "I build scalable frontend applications using React.js and Next.js with reusable components and modular architecture.",
        "My growth from internship to full-time software development role came through consistent delivery and strong technical ownership.",
        "My work spans frontend systems, API integrations, backend workflows, and enterprise CMS customization.",
      ];

  const timelineIcons = [UserRound, BriefcaseBusiness, Code2] as const;

  return (
    <CinematicSection id="about" disableParallax className="scroll-mt-24 pt-10 pb-8 md:scroll-mt-28 md:pt-12">
      <div className="section-container">
        {/* Premium Section Heading */}
        <div data-stagger className="relative mx-auto max-w-3xl text-center">
          <div className="section-heading-glow" />
          <h2 className="section-heading font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            About Me
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
            A brief introduction to who I am and what I do.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="about-v2-layout">
          <div className="about-v2-portrait-wrap" data-stagger>
            <div className="about-v2-portrait-glow" />
            <img
              src={aboutPortrait}
              alt={`${data.personalInfo.fullName} portrait`}
              className="about-v2-portrait"
              loading="lazy"
            />
          </div>

          <div className="about-v2-content" data-stagger>
            <div className="about-v2-meta">
              <span className="about-v2-meta__pill">{data.personalInfo.designation}</span>
              <span className="about-v2-meta__pill">{data.personalInfo.location}</span>
            </div>
            <div className="about-v2-content__line" />

            <div className="about-v2-timeline">
              {resolvedTimelineItems.map((item, index) => {
                const Icon = timelineIcons[index] ?? Code2;
                return (
                  <div key={`${item}-${index}`} className="about-v2-point">
                    <div className="about-v2-point__icon">
                      <Icon size={18} />
                    </div>
                    <p className="about-v2-point__text">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
