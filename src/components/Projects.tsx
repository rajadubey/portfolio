'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Project, Media } from '../../payload-types';
import { SectionTitle } from './SectionTitle';

interface ProjectsProps {
  projects: Project[];
}

// Helper function to extract text from rich text content
const extractTextFromRichText = (richText: any): string => {
  if (!richText) return '';
  
  if (typeof richText === 'string') return richText;
  
  if (richText.root && richText.root.children) {
    return richText.root.children
      .map((child: any) => {
        if (child.children) {
          return child.children.map((textNode: any) => textNode.text || '').join('');
        }
        return child.text || '';
      })
      .join(' ');
  }
  
  return '';
};

// Image component with error handling
const ProjectImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 ${className}`}>
        <div className="text-center">
          <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-800 animate-pulse ${className}`} />
      )}
      <Image 
        src={src} 
        alt={alt} 
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40 ${className}`}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        onError={() => setImageError(true)}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

// Helper function to get image URL
const getImageUrl = (coverImage: string | Media): string => {
  if (typeof coverImage === 'string') {
    return coverImage;
  }
  
  if (coverImage && typeof coverImage === 'object' && 'url' in coverImage) {
    return coverImage.url || '/projects/default.png';
  }
  
  return '/projects/default.png';
};
export const Projects = ({ projects }: ProjectsProps) => {
  // Fallback data if CMS is not available
  const fallbackProjects = [
    {
      id: '1',
      title: 'AI-Powered Code Review Agent',
      category: 'AI & DevOps',
      description: 'A self-hosted, asynchronous code review system that leverages local LLMs (Deepseek-coder via Ollama) to analyze GitHub Pull Requests.',
      techStack: [
        { technology: 'Node.js' },
        { technology: 'Docker' },
        { technology: 'Redis' },
        { technology: 'Ollama' },
        { technology: 'GitHub API' }
      ],
      repoLink: 'https://github.com/rajadubey',
      liveLink: null,
      coverImage: '/projects/ai-review.png',
      featured: true,
      order: 1,
      slug: 'ai-code-review-agent',
      createdAt: '',
      updatedAt: ''
    }
  ];

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="projects" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle id="projects-heading" title="Featured Projects" subtitle="Highlights from my development portfolio." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-0">
          {displayProjects.map((project) => {
            const description = extractTextFromRichText(project.description);
            const imageUrl = getImageUrl(project.coverImage);
            const projectLink = project.liveLink || project.repoLink || '#';
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800"
              >
                {/* Image Overlay */}
                <div className="aspect-video w-full overflow-hidden relative">
                  <ProjectImage 
                    src={imageUrl} 
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 block">{project.category}</span>
                    <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{description}</p>
                    
                    {/* Tech Stack */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">
                            {tech.technology}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <a 
                      href={projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white font-bold hover:text-red-500 transition-colors"
                    >
                      View Project <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
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
