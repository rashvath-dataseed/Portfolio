import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { usePublishedPortfolioData } from "../../context/PortfolioContext";

export default function About() {
  const { data } = usePublishedPortfolioData();
  if (!data) return null;

  const aboutText = data.personalInfo.aboutMe
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");

  return (
    <section id="about" className="py-20 sm:py-28" aria-label="About me">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About Me"
          subtitle="A brief introduction to who I am and what I do."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <p className="text-center text-base leading-relaxed text-neutral-300 sm:text-lg">
            {aboutText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
