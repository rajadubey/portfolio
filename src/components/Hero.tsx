import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { DATA } from '../app/data.tsx';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl filter opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl filter opacity-50" />

      <div className="text-center z-10 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block"
        >
          <span className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            {DATA.hero.badge}
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight"
        >
          {DATA.hero.title}
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-4xl text-gray-400 mb-8 font-bold"
        >
          {DATA.hero.subtitle}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed text-lg"
        >
          {DATA.hero.description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a 
            href="#contact"
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Let's Connect
          </a>
          <a 
            href={DATA.personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent border border-gray-700 text-white font-bold rounded-full hover:bg-gray-900 hover:border-white transition-all w-full sm:w-auto justify-center flex items-center gap-2"
          >
            <Github size={20} /> GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};
