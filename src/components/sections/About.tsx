import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { aboutData, siteConfig, education } from '../../config/data';

export default function About() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28"
      aria-label="About me"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="A brief introduction to who I am and what I do."
        />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="space-y-4">
              {aboutData.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-neutral-300"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-neutral-400">
              <MapPin size={14} />
              <span>{siteConfig.location}</span>
            </div>
          </motion.div>

          {/* Stats + Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-8 lg:col-span-2"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-6">
              {aboutData.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-neutral-700/40 bg-neutral-900/70 p-4 text-center backdrop-blur-sm lg:text-left"
                >
                  <div className="font-display text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-neutral-700/40 bg-neutral-900/70 p-4 backdrop-blur-sm"
                  >
                    <p className="text-sm font-semibold text-white">
                      {edu.degree}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {edu.institution}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                      <span>{edu.grade}</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
