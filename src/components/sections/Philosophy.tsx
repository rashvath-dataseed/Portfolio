import { motion } from 'framer-motion';
import {
  Code2,
  Blocks,
  Smartphone,
  ShieldCheck,
  Zap,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';

const principles = [
  {
    icon: Code2,
    title: 'Clean & Maintainable Code',
    description:
      'Writing readable, well-structured code that is easy to understand, debug, and extend over time.',
  },
  {
    icon: Blocks,
    title: 'Reusable Component Architecture',
    description:
      'Building modular, composable components that reduce duplication and accelerate development.',
  },
  {
    icon: Smartphone,
    title: 'Responsive & Accessible UI',
    description:
      'Crafting interfaces that work beautifully across all devices and are accessible to every user.',
  },
  {
    icon: ShieldCheck,
    title: 'Type-Safe Development',
    description:
      'Leveraging TypeScript to catch errors early, improve DX, and build more reliable applications.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description:
      'Ensuring fast load times, smooth interactions, and efficient resource usage for the best UX.',
  },
  // {
  //   icon: Lightbulb,
  //   title: 'Real-World Problem Solving',
  //   description:
  //     'Translating complex business requirements into intuitive, user-friendly digital solutions.',
  // },
  {
    icon: TrendingUp,
    title: 'Continuous Learning & Improvement',
    description:
      'Staying current with modern technologies and best practices to deliver cutting-edge results.',
  },
];

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="py-20 sm:py-28"
      aria-label="Development Philosophy"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Development Philosophy"
          subtitle="I believe great frontend development is more than just building interfaces — it's about creating scalable, maintainable, and user-focused digital experiences."
        />

        {/* Intro paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-14 max-w-3xl space-y-4 text-center"
        >
          <p className="text-base leading-relaxed text-neutral-300">
            My approach focuses on writing clean, reusable code, building responsive and
            accessible user interfaces, and developing solutions that are both efficient
            and easy to maintain.
          </p>
          <p className="text-base leading-relaxed text-neutral-300">
            I enjoy transforming complex requirements into intuitive applications using
            modern technologies like{' '}
            <span className="font-medium text-white">React</span>,{' '}
            <span className="font-medium text-white">Next.js</span>, and{' '}
            <span className="font-medium text-white">TypeScript</span> while continuously
            improving performance, usability, and developer experience.
          </p>
        </motion.div>

        {/* Principles grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} delay={i * 0.08} className="group">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-cyan-400 transition-colors group-hover:bg-accent-950 group-hover:text-accent-400">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
