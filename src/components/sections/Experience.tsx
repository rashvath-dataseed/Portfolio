import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { experiences } from '../../config/data';

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 sm:py-28"
      aria-label="Work experience"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey and the impact I have made."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-neutral-800 sm:left-6 md:block" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative md:pl-16"
            >
              {/* Timeline Dot */}
              <div className="absolute left-2.5 top-1 hidden h-3 w-3 rounded-full border-2 border-accent-500 bg-neutral-950 sm:left-4.5 md:block" />

              <div className="rounded-xl border border-neutral-700/40 bg-neutral-900/70 p-6 backdrop-blur-sm">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {exp.role}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Briefcase size={13} />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 rounded-md bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-400">
                    <Calendar size={12} />
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                <ul className="mt-5 space-y-2.5">
                  {exp.description.map((item, j) => (
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
