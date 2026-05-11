import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';
import { skillCategories } from '../../config/data';

export default function Skills() {
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
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} delay={i * 0.08} className="group">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors group-hover:bg-accent-950 group-hover:text-accent-400">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-400 transition-colors"
                    >
                      {skill}
                    </span>
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
