'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '#home' },
  { name: 'Experience', path: '#experience' },
  { name: 'Skills', path: '#skills' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' },
];

interface NavigationProps {
  name: string;
}

export default function Navigation({ name }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  // Get initials from the name
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  const handleNavClick = (path: string) => {
    setActiveSection(path);
    setIsMenuOpen(false);
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section on scroll
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      const sections = navItems.map(item => item.path);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= scrollPosition && bottom >= scrollPosition) {
            setActiveSection(section);
            break;
          }
        }
      }
    });
  }

  return (
    <nav className="fixed top-0 w-full bg-primary border-b border-light/30 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => handleNavClick('#home')}
              className="relative group"
            >
              <span className="text-2xl font-heading font-bold tracking-wider text-light transition-all duration-300 group-hover:opacity-0">
                {initials}
              </span>
              <span className="absolute left-0 top-0 text-2xl font-heading font-bold tracking-wider text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                {initials}
              </span>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="relative text-light transition-colors duration-200 font-body"
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.name}
                {activeSection === item.path && (
                  <motion.div
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-light"
                    layoutId="underline"
                  />
                )}
                {hoveredItem === item.path && activeSection !== item.path && (
                  <motion.div
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-light/50"
                    layoutId="hover-underline"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-light/10"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`block w-full text-left py-2 px-3 rounded-md text-light font-body transition-colors duration-200 ${
                    activeSection === item.path ? 'bg-light/10' : 'hover:bg-light/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 