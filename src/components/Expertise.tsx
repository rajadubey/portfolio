import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../app/data';
import { SectionTitle } from './SectionTitle';

export const Expertise = () => {
  return (
    <section id="expertise" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Technical Skills" 
          subtitle="My robust technical arsenal for building scalable solutions." 
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {DATA.skills.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-900 bg-gray-950/50 backdrop-blur-sm group cursor-pointer hover:border-gray-700 transition-colors"
            >
              <div className={`mb-4 ${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                {React.cloneElement(tech.icon as any, { size: 36 })}
              </div>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
