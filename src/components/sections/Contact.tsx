import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import {
  usePortfolio,
  usePublishedPortfolioData,
} from "../../context/PortfolioContext";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { data } = usePublishedPortfolioData();
  const { submitContact } = usePortfolio();

  if (!data) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    await submitContact({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    });
    setSubmitting(false);
    form.reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28" aria-label="Contact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind or want to discuss an opportunity? I would love to hear from you."
        />

        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:col-span-2"
          >
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                Contact Information
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                Feel free to reach out through the form or contact me directly
                using the details below.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${data.contactInfo.email}`}
                className="flex items-center gap-3 rounded-lg p-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800/50 hover:text-white"
              >
                <Mail size={16} className="text-neutral-500" />
                {data.contactInfo.email}
              </a>
              <a
                href={`tel:${data.contactInfo.phone}`}
                className="flex items-center gap-3 rounded-lg p-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800/50 hover:text-white"
              >
                <Phone size={16} className="text-neutral-500" />
                {data.contactInfo.phone}
              </a>
              <div className="flex items-center gap-3 p-2 text-sm text-neutral-400">
                <MapPin size={16} className="text-neutral-500" />
                {data.personalInfo.location}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-medium text-neutral-300"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-900/70 px-4 py-2.5 text-sm text-white placeholder-neutral-500 backdrop-blur-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium text-neutral-300"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-900/70 px-4 py-2.5 text-sm text-white placeholder-neutral-500 backdrop-blur-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-sm font-medium text-neutral-300"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What is this about?"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-900/70 px-4 py-2.5 text-sm text-white placeholder-neutral-500 backdrop-blur-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-neutral-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full resize-none rounded-lg border border-neutral-700 bg-neutral-900/70 px-4 py-2.5 text-sm text-white placeholder-neutral-500 backdrop-blur-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                />
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit" size="lg" disabled={submitting}>
                  <Send size={16} />
                  {submitting ? "Sending..." : "Send Message"}
                </Button>

                {submitted && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-sm font-medium text-emerald-400"
                  >
                    <CheckCircle size={16} />
                    Message sent!
                  </motion.span>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
