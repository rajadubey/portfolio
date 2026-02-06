'use client';

import { motion } from 'framer-motion';
import { Experience as ExperienceType } from '../../payload-types';
import { SectionTitle } from './SectionTitle';
import { formatDateRange } from '@/lib/date-utils';

interface ExperienceProps {
  experiences: ExperienceType[];
}

// Helper function to extract text from rich text content
const extractTextFromRichText = (richText: any): string[] => {
  if (!richText) return [];
  
  if (typeof richText === 'string') return [richText];
  
  if (richText.root && richText.root.children) {
    return richText.root.children
      .map((child: any) => {
        if (child.children) {
          return child.children.map((textNode: any) => textNode.text || '').join('');
        }
        return child.text || '';
      })
      .filter((text: string) => text.trim().length > 0);
  }
  
  return [];
};

export const Experience = ({ experiences }: ExperienceProps) => {
  // Fallback data if CMS is not available
  const fallbackExperiences = [
    {
      id: '1',
      company: 'Oxyzo Financial Services',
      role: 'Senior Software Engineer - UI',
      startDate: '2025-05-01',
      endDate: null,
      description: 'Architected an enterprise-grade Task & Workflow Management System from scratch, automating operations for organization-wide use.',
      techStack: [
        { technology: 'Next.js' },
        { technology: 'Spring Boot' },
        { technology: 'Redis' },
        { technology: 'Upstash Redis' },
        { technology: 'System Design' }
      ],
      order: 1,
      createdAt: '',
      updatedAt: ''
    }
  ];

  const displayExperiences = experiences.length > 0 ? experiences : fallbackExperiences;

  return (
    <section id="experience" className="py-32 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle id="experience-heading" title="Professional Experience" subtitle="My journey in the software industry." />
        
        <div className="relative border-l border-gray-800 ml-3 md:ml-6 space-y-16">
          {displayExperiences.map((exp, index) => {
            const descriptions = extractTextFromRichText(exp.description);
            const dateRange = formatDateRange(exp.startDate, exp.endDate);
            
            return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 md:pl-16"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] md:-left-[9px] top-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white border-4 border-black box-content shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                  <span className="text-gray-500 text-sm font-mono min-w-[160px] uppercase tracking-wider">{dateRange}</span>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    {exp.role} 
                  </h3>
                </div>
                <div className="text-blue-400 text-lg mb-6 font-medium">{exp.company}</div>
                
                <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 hover:bg-gray-900/60 transition-colors">
                  <ul className="space-y-3 mb-6">
                    {descriptions.map((item, i) => (
                      <li key={i} className="text-gray-300 text-base leading-relaxed flex items-start gap-3">
                        <span className="text-blue-500 mt-2 text-xs">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
                      {exp.techStack.map((tech, i) => (
                        <span key={i} className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                          {tech.technology}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
