'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { DATA } from '../app/data';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#home' },
    { name: 'Skills', href: '#expertise' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b 
        ${scrolled 
          ? 'bg-black/90 backdrop-blur-md border-gray-800 py-2 h-16' 
          : 'bg-transparent border-transparent py-6 h-24'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo / Name */}
          <div className="flex-shrink-0 flex items-center gap-3">
             <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                RB
             </div>
             <span className={`text-white font-bold tracking-tight transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>
               {DATA.personal.name}
             </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="/files/Resume - Raja Dubey.pdf" 
                download
                className="bg-red-600 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-red-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                Resume
              </a>
              <Link href="#contact" className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                Let's Connect
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none min-h-[44px] min-w-[44px]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-gray-800 overflow-hidden absolute w-full"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-3 rounded-md text-base font-medium min-h-[44px] min-w-[44px] flex items-center"
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="/files/Resume - Raja Dubey.pdf" 
                download
                onClick={() => setIsOpen(false)}
                className="text-red-400 hover:text-red-300 block px-3 py-3 rounded-md text-base font-medium min-h-[44px] min-w-[44px] flex items-center"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
