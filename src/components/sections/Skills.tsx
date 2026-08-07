import { Code2, Database, FolderCog, Globe, Layers3, Server, Star, Wrench } from "lucide-react";
import type { ComponentType } from "react";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";
import CinematicSection from "../ui/CinematicSection";

type SkillCategoryIconProps = { size?: number; className?: string };

const categoryIcons: Record<string, ComponentType<SkillCategoryIconProps>> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Databases: Database,
  Tools: Wrench,
  Cloud: FolderCog,
  Languages: Code2,
  "Frameworks / Libraries": Server,
  "State Management": Layers3,
  "Validation & Forms": Layers3,
  CMS: Globe,
  "Tools & Platforms": Wrench,
  Concepts: Star,
  "Other Skills": FolderCog,
};

export default function Skills() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const excludedSkills = new Set([
    "otp authentication",
    "component architecture",
  ]);

  const groupNameMap: Record<string, string> = {
    Languages: "Languages",
    Frontend: "Frameworks / Libraries",
    "Frameworks / Libraries": "Frameworks / Libraries",
    "State Management": "Frameworks / Libraries",
    "Validation & Forms": "Frameworks / Libraries",
    Backend: "Other Skills",
    Databases: "Other Skills",
    Database: "Other Skills",
    Concepts: "Other Skills",
    "Other Skills": "Other Skills",
    Tools: "Tools & Platforms",
    "Tools & Platforms": "Tools & Platforms",
    CMS: "Tools & Platforms",
  };

  const groupedSkills = data.skills.reduce<Record<string, typeof data.skills>>(
    (acc, skill) => {
      if (excludedSkills.has(skill.name.trim().toLowerCase())) return acc;
      const groupName = groupNameMap[skill.category] ?? "Other Skills";
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(skill);
      return acc;
    },
    {},
  );

  const orderedGroups = [
    "Languages",
    "Frameworks / Libraries",
    "Tools & Platforms",
    "Other Skills",
  ] as const;

  const renderSkillGroup = (category: string, accentClass: string) => {
    const skills = groupedSkills[category] ?? [];
    const Icon = categoryIcons[category] ?? Code2;

    return (
      <div className={`skills-v2-group ${accentClass}`}>
        <div className="skills-v2-group__header">
          <div className="skills-v2-group__icon">
            <Icon size={16} />
          </div>
          <h3 className="skills-v2-group__title">{category}</h3>
        </div>
        <div className="skills-v2-group__line" />

        <div className="skills-v2-chip-grid">
          {skills
            .slice()
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((skill) => {
              return (
                <div key={skill.id} className="skills-v2-chip" title={skill.name}>
                  <span className="skills-v2-chip__icon">
                    <Icon size={12} className="text-neutral-400" />
                  </span>
                  <span className="skills-v2-chip__label">{skill.name}</span>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <CinematicSection
      id="skills"
      disableParallax
      className="scroll-mt-24 items-start overflow-visible pt-8 pb-6 md:scroll-mt-28 md:pt-10 md:pb-8"
    >
      <div className="section-container">
        {/* Premium Section Heading */}
        <div className="relative mx-auto mb-7 max-w-3xl text-center md:mb-9">
          <div className="section-heading-glow" />
          <h2 className="section-heading font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-[2.3rem]">
            Skills & Technologies
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-balance text-sm leading-relaxed text-neutral-300 sm:text-[0.95rem]">
            The tools and technologies I work with to build modern web applications.
          </p>
          <div className="section-accent-line" />
        </div>

        <div className="skills-v2-layout">
          <div className="space-y-5">
            {renderSkillGroup(orderedGroups[0], "skills-v2-accent--blue")}
            {renderSkillGroup(orderedGroups[1], "skills-v2-accent--violet")}
          </div>

          <div className="skills-v2-center">
            <div className="skills-v2-orbit skills-v2-orbit--outer" />
            <div className="skills-v2-orbit skills-v2-orbit--mid" />
            <div className="skills-v2-orbit skills-v2-orbit--inner" />

            <span className="skills-v2-node skills-v2-node--top" />
            <span className="skills-v2-node skills-v2-node--right" />
            <span className="skills-v2-node skills-v2-node--bottom" />
            <span className="skills-v2-node skills-v2-node--left" />

            <div className="skills-v2-core">
              <Code2 size={34} />
            </div>

            <div className="skills-v2-float skills-v2-float--a">
              <Layers3 size={16} />
            </div>
            <div className="skills-v2-float skills-v2-float--b">
              <Wrench size={16} />
            </div>
            <div className="skills-v2-float skills-v2-float--c">
              <Globe size={16} />
            </div>
            <div className="skills-v2-float skills-v2-float--d">
              <Star size={16} />
            </div>
          </div>

          <div className="space-y-5">
            {renderSkillGroup(orderedGroups[2], "skills-v2-accent--green")}
            {renderSkillGroup(orderedGroups[3], "skills-v2-accent--amber")}
          </div>
        </div>
      </div>
    </CinematicSection>
  );
}
