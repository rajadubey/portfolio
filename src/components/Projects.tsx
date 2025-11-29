import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import { DATA } from '../app/data';
import { SectionTitle } from './SectionTitle';

export const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Featured Projects" subtitle="Highlights from my development portfolio." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DATA.projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 ${project.span || ''}`}
            >
              {/* Image Overlay */}
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 block">{project.category}</span>
                    <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{project.description}</p>
                    
                    <a 
                    href={project.link}
                    className="inline-flex items-center gap-2 text-white font-bold hover:text-red-500 transition-colors"
                    >
                    View Project <ExternalLink size={18} />
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
          
           {/* Extracurriculars Block */}
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex flex-col justify-center p-8 bg-gray-900/20 border border-gray-800 rounded-3xl"
           >
              <div className="mb-4 text-purple-400"><Award size={32} /></div>
              <h3 className="text-xl font-bold text-white mb-2">Extracurriculars</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                  <li>• Volunteered in Golden Jubilee Marathon</li>
                  <li>• Volunteer at Mech-Tech-Meet</li>
                  <li>• AAYAM Annual Function Volunteer</li>
              </ul>
           </motion.div>
        </div>
      </div>
    </section>
  );
};
