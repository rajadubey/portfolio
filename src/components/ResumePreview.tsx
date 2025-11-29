import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { DATA } from '../app/data.tsx';
import { SectionTitle } from './SectionTitle';

export const ResumePreview = () => {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <SectionTitle title="Resume" subtitle="A formal look at my professional journey." />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto bg-white text-black p-8 md:p-16 rounded-sm shadow-2xl overflow-hidden text-left"
          style={{ minHeight: '600px' }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-black pb-8 mb-8 gap-6">
            <div>
              <h3 className="text-4xl font-serif font-bold text-gray-900 mb-2">{DATA.personal.name}</h3>
              <p className="text-xl text-gray-600 font-medium">{DATA.personal.title}</p>
            </div>
            <div className="text-sm text-gray-600 text-right space-y-1">
              <p>{DATA.personal.email}</p>
              <p>{DATA.personal.phone}</p>
              <p>{DATA.personal.location}</p>
              <p className="text-blue-600">{DATA.personal.social.linkedin.replace('https://', '')}</p>
            </div>
          </div>

          {/* Content Mockup */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 text-gray-500">Summary</h4>
              <p className="text-gray-800 leading-relaxed text-base">
                {DATA.personal.about}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 text-gray-500">Latest Experience</h4>
              {DATA.experience.slice(0, 1).map((exp) => (
                 <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-bold text-gray-900 text-lg">{exp.role}</span>
                      <span className="text-sm text-gray-500">{exp.date}</span>
                    </div>
                    <div className="text-blue-700 font-medium mb-3">{exp.company}</div>
                    <ul className="list-disc list-outside ml-4 text-gray-700 space-y-2">
                      {exp.description.slice(0, 2).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                 </div>
              ))}
            </div>
            
            <div>
               <h4 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-4 pb-1 text-gray-500">Technical Skills</h4>
               <p className="text-gray-700 text-sm">
                 <strong>Languages:</strong> Java, JavaScript, HTML, CSS, SQL<br/>
                 <strong>Frameworks:</strong> ReactJS, Next.js, Spring Boot, Redux, Express<br/>
                 <strong>Tools:</strong> Docker, AWS, MongoDB, Elastic Search, Redis
               </p>
            </div>
          </div>

          {/* Overlay Button */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/95 to-transparent flex items-end justify-center pb-10">
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-xl font-bold">
              <Download size={18} /> Download Full Resume
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
