import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { DATA } from '../app/data';
import { getCurrentYear } from '@/lib/date-utils';

export const Footer = () => {
  const currentYear = getCurrentYear();
  
  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">{DATA.personal.name}</h2>
        
        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a 
            href={DATA.personal.social.github} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
            className="p-3 bg-gray-800 rounded-full text-white hover:bg-white hover:text-black transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Github size={20} />
          </a>
          <a 
            href={DATA.personal.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit my LinkedIn profile"
            className="p-3 bg-gray-800 rounded-full text-white hover:bg-white hover:text-black transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href={DATA.personal.social.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit my X/Twitter profile"
            className="p-3 bg-gray-800 rounded-full text-white hover:bg-white hover:text-black transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Twitter size={20} />
          </a>
          <a 
            href={`mailto:${DATA.personal.email}`}
            aria-label="Send me an email"
            className="p-3 bg-gray-800 rounded-full text-white hover:bg-white hover:text-black transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Mail size={20} />
          </a>
        </div>
        
        <p className="text-gray-600 text-sm">
          © {currentYear} {DATA.personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
