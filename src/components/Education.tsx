import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { DATA } from '../app/data.tsx';
import { SectionTitle } from './SectionTitle';

export const Education = () => {
  return (
    <section className="py-24 bg-black border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle title="Education" />
        
        <div className="space-y-6">
          {DATA.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-gray-900/20 border border-gray-800 rounded-2xl hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-xl text-white">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                    <p className="text-blue-400 font-medium mb-2">{edu.school}</p>
                    <p className="text-gray-500 text-sm">{edu.details}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                  <span className="inline-block px-4 py-1 rounded-full bg-white/5 text-sm text-gray-300 border border-white/10">
                    {edu.year}
                  </span>
                  <p className="text-gray-500 text-sm mt-2">{edu.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
