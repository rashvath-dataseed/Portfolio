import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';
import { Code2, Database, FolderCog, Server, Wrench } from "lucide-react";
import type { ComponentType } from "react";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";

const categoryIcons: Record<string, ComponentType<{ size?: number }>> = {
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(groupedSkills).map(([category, skills], i) => {
            const Icon = categoryIcons[category] ?? Code2;
            return (
              <Card key={category} delay={i * 0.08} className="group">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors group-hover:bg-accent-950 group-hover:text-accent-400">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {category}
                  </h3>
                </div>
                <div className="mt-4 space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="mb-1 flex items-center justify-between text-xs text-neutral-300">
                        <span>{skill.name}</span>
                        <span>{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-neutral-800">
                        <div
                          className="h-1.5 rounded-full bg-accent-500"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
