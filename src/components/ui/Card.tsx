import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay }}
      className={`rounded-xl border border-neutral-700/40 bg-neutral-900/70 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md hover:border-neutral-600/50 ${className}`}
    >
      {children}
    </motion.div>
  );
}
