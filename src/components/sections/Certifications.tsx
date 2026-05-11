import { Award } from 'lucide-react';
import Card from '../ui/Card';
import SectionHeading from '../ui/SectionHeading';
import { certifications } from '../../config/data';

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-20 sm:py-28"
      aria-label="Certifications"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Certifications"
          subtitle="Professional certifications that validate my skills and knowledge."
        />

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Card key={cert.title} delay={i * 0.08} className="group">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors group-hover:bg-accent-950 group-hover:text-accent-400">
                  <Award size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    {cert.issuer}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {cert.date}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
