import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const CoverLetter = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-slate-900 text-white p-8 sm:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Raja Babu Dubey</h1>
              <p className="text-xl text-blue-400 font-medium">Senior Software Engineer - UI</p>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end space-y-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Gurgaon, HR</span>
                
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>786-930-3752</span>
                
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>rajadubey1997@gmail.com</span>
                
              </div>
              <div className="flex gap-4 mt-2">
                <a href="https://linkedin.com/in/rajababudubey" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="https://github.com/rajadubey" className="hover:text-white transition-colors"><Github size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-12 text-slate-800 leading-relaxed space-y-6">
          <p className="font-semibold">Dear Hiring Manager,</p>

          <p>
            I am writing to express my strong interest in the Senior Software Engineer position. With over 4 years of experience driving high-impact frontend architectures and optimizing complex web systems, I specialize in building scalable, performance-critical applications. My background in revamping legacy systems and establishing engineering standards aligns perfectly with the technical excellence your team strives for.
          </p>

          <p>
            Currently, as a <strong>Senior Software Engineer - UI at Oxyzo Financial Services</strong>, I am leading the design and development of a group-wide task and workflow management platform. This initiative has been pivotal in automating daily operations and improving organizational visibility. Beyond product development, I am deeply invested in developer experience and infrastructure; I designed a scalable frontend boilerplate and established a private NPM registry to standardize component distribution across the organization, significantly boosting development efficiency.
          </p>

          <p>
            Previously, at <strong>OfBusiness</strong>, I tackled large-scale performance and data challenges. I implemented a distributed web scraping framework using AWS Lambda and re-architected a tender review system using Elasticsearch, which resulted in a <strong>3x improvement in operational efficiency</strong>. I also spearheaded a performance optimization initiative that increased our web page performance score from <strong>65 to 95+</strong> by leveraging Server-Side Rendering (SSR) and advanced code-splitting strategies.
          </p>

          <p>
            I am technically versatile, with deep expertise in <strong>React, Next.js, Node.js, and AWS</strong>, alongside a strong grasp of data layers like <strong>MongoDB and Elasticsearch</strong>. I take pride in writing clean, maintainable code and mentoring teams to adopt modern web best practices.
          </p>

          <p>
            I am eager to bring my expertise in scalable UI architecture and performance optimization to your engineering team. Thank you for your time and consideration.
          </p>

          <div className="pt-8 mt-8 border-t border-slate-200">
            <p className="mb-2">Sincerely,</p>
            <p className="text-xl font-bold font-serif text-slate-900">Raja Babu Dubey</p>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600"></div>
      </div>
    </div>
  );
};

export default CoverLetter;