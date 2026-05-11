import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { testimonials } from '../../config/data';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Testimonials"
          subtitle="What colleagues and managers have to say about working with me."
        />

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-xl border border-neutral-700/40 bg-neutral-900/70 p-6 backdrop-blur-sm"
            >
              <Quote
                size={20}
                className="mb-4 text-neutral-700"
              />
              <p className="text-sm leading-relaxed text-neutral-300">
                {t.text}
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 font-display text-sm font-semibold text-neutral-300">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <cite className="block text-sm font-semibold not-italic text-white">
                    {t.name}
                  </cite>
                  <span className="text-xs text-neutral-400">
                    {t.role}, {t.company}
                  </span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
