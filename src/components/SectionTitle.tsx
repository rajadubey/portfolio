'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  id?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const SectionTitle = ({ title, subtitle, id, level = 2 }: SectionTitleProps) => {
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
  
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <HeadingTag 
          id={id}
          className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
        >
          {title}
        </HeadingTag>
      </motion.div>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
