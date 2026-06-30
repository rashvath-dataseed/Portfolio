import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';
import { Code2, Database, FolderCog, Server, Wrench } from "lucide-react";
import type { ComponentType } from "react";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";

type SkillCategoryIconProps = { size?: number; className?: string };

const categoryIcons: Record<string, ComponentType<SkillCategoryIconProps>> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  Cloud: FolderCog,
  Languages: Code2,
  "Frameworks / Libraries": Server,
  "Tools & Platforms": Wrench,
  "Other Skills": FolderCog,
};

const skillIconMap: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
  html: "html",
  html5: "html",
  css: "css",
  css3: "css",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  "tailwind css": "tailwind",
  tailwind: "tailwind",
  redux: "redux",
  "chart.js": "chartjs",
  zod: "regex",
  git: "git",
  github: "github",
  "vs code": "vscode",
  vercel: "vercel",
  clerk: "vercel",
  node: "nodejs",
  "node.js": "nodejs",
  express: "express",
  firebase: "firebase",
  mongodb: "mongodb",
  mysql: "mysql",
  postgresql: "postgresql",
};

function getSkillIconSrc(skillName: string, iconValue: string) {
  if (
    iconValue &&
    (iconValue.startsWith("http://") ||
      iconValue.startsWith("https://") ||
      iconValue.startsWith("/"))
  ) {
    return iconValue;
  }

  const key = skillName.trim().toLowerCase();
  const iconId = skillIconMap[key];

  if (!iconId) return null;

  return `https://skillicons.dev/icons?i=${iconId}`;
}

export default function Skills() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const groupedSkills = data.skills.reduce<Record<string, typeof data.skills>>(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {},
  );

  return (
    <section
      id="skills"
      className="py-20 sm:py-28"
      aria-label="Skills and technologies"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with to build modern web applications."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {Object.entries(groupedSkills).map(([category, skills], i) => {
            const Icon = categoryIcons[category] ?? Code2;
            return (
              <Card
                key={category}
                delay={i * 0.08}
                className="group flex h-full flex-col"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors group-hover:bg-accent-950 group-hover:text-accent-400">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {category}
                  </h3>
                </div>
                <div className="mt-4 grid flex-1 grid-cols-1 gap-2">
                  {skills
                    .slice()
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((skill) => {
                      const iconSrc = getSkillIconSrc(skill.name, skill.icon);
                      return (
                        <div
                          key={skill.id}
                          className="flex min-h-11 items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/70 px-3"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-800">
                            {iconSrc ? (
                              <img
                                src={iconSrc}
                                alt={`${skill.name} icon`}
                                className="h-5 w-5 object-contain"
                                loading="lazy"
                                onError={(event) => {
                                  event.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <Icon size={14} className="text-neutral-300" />
                            )}
                          </div>
                          <span className="text-sm text-neutral-100">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
