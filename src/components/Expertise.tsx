'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  Layers, 
  Server, 
  Bot, 
  Terminal, 
  Workflow, 
  LayoutTemplate,
  Cloud,
  GitBranch,
  Zap,
  Settings,
  Monitor,
  Smartphone,
  Palette,
  FileCode,
  Package,
  Shield
} from 'lucide-react';
import { Skill } from '../../payload-types';
import { SectionTitle } from './SectionTitle';

interface ExpertiseProps {
  skillsByCategory: Record<string, Skill[]>;
}

// Icon mapping for Lucide React icons
const iconMap: Record<string, React.ReactElement> = {
  'code2': <Code2 />,
  'database': <Database />,
  'cpu': <Cpu />,
  'globe': <Globe />,
  'layers': <Layers />,
  'server': <Server />,
  'bot': <Bot />,
  'terminal': <Terminal />,
  'workflow': <Workflow />,
  'layout-template': <LayoutTemplate />,
  'cloud': <Cloud />,
  'git-branch': <GitBranch />,
  'zap': <Zap />,
  'settings': <Settings />,
  'monitor': <Monitor />,
  'smartphone': <Smartphone />,
  'palette': <Palette />,
  'file-code': <FileCode />,
  'package': <Package />,
  'shield': <Shield />
};

// Color mapping for different categories
const categoryColors: Record<string, string> = {
  'frontend': 'text-blue-400',
  'backend': 'text-green-500',
  'database': 'text-yellow-500',
  'devops': 'text-orange-400',
  'tools': 'text-purple-400'
};

export const Expertise = ({ skillsByCategory }: ExpertiseProps) => {
  // Fallback data if CMS is not available
  const fallbackSkills = {
    frontend: [
      { id: '1', name: 'React', iconName: 'globe', category: 'frontend' as const, order: 1, createdAt: '', updatedAt: '' },
      { id: '2', name: 'Next.js', iconName: 'layers', category: 'frontend' as const, order: 2, createdAt: '', updatedAt: '' },
    ],
    backend: [
      { id: '3', name: 'Spring Boot', iconName: 'server', category: 'backend' as const, order: 1, createdAt: '', updatedAt: '' },
      { id: '4', name: 'Node.js', iconName: 'terminal', category: 'backend' as const, order: 2, createdAt: '', updatedAt: '' },
    ],
    database: [
      { id: '5', name: 'MongoDB', iconName: 'database', category: 'database' as const, order: 1, createdAt: '', updatedAt: '' },
      { id: '6', name: 'Redis', iconName: 'database', category: 'database' as const, order: 2, createdAt: '', updatedAt: '' },
    ]
  };

  const displaySkills = Object.keys(skillsByCategory).length > 0 ? skillsByCategory : fallbackSkills;

  // Flatten all skills for grid display
  const allSkills = Object.values(displaySkills).flat().sort((a, b) => a.order - b.order);

  return (
    <section id="expertise" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          id="skills-heading"
          title="Technical Skills" 
          subtitle="My robust technical arsenal for building scalable solutions." 
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4 sm:p-0">
          {allSkills.map((skill, index) => {
            const icon = iconMap[skill.iconName] || <Code2 />;
            const color = categoryColors[skill.category] || 'text-gray-400';
            
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-900 bg-gray-950/50 backdrop-blur-sm group cursor-pointer hover:border-gray-700 transition-colors"
              >
                <div className={`mb-4 ${color} group-hover:scale-110 transition-transform duration-300`}>
                  {React.cloneElement(icon, { size: 36 })}
                </div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors text-center">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Category-wise display (optional, can be toggled) */}
        {Object.keys(displaySkills).length > 1 && (
          <div className="mt-16 space-y-12">
            {Object.entries(displaySkills).map(([category, skills]) => (
              <div key={category} className="text-center">
                <h3 className="text-xl font-bold text-white mb-6 capitalize">
                  {category} Skills
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {skills.map((skill: Skill) => {
                    const icon = iconMap[skill.iconName] || <Code2 />;
                    const color = categoryColors[skill.category] || 'text-gray-400';
                    
                    return (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-800"
                      >
                        <div className={color}>
                          {React.cloneElement(icon, { size: 20 })}
                        </div>
                        <span className="text-gray-300 text-sm font-medium">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
