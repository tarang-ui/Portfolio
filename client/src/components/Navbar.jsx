import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(links[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-gutter py-4 max-w-container-max mx-auto bg-surface/80 backdrop-blur-lg border-b border-outline-variant/30 shadow-sm">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-headline-md text-headline-md font-extrabold text-primary tracking-tighter cursor-pointer"
        onClick={() => scrollToSection('home')}
      >
        Tarang Prajapati
      </motion.div>
      <nav className="hidden md:flex items-center space-x-8">
        {links.map((link, index) => {
          const isActive = activeSection === link.id;
          return (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
            >
              <button 
                onClick={() => scrollToSection(link.id)}
                className={`font-body-lg text-body-lg transition-all duration-300 relative ${
                  isActive 
                    ? 'text-primary font-bold' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </motion.div>
          );
        })}
      </nav>
      <motion.button 
        onClick={() => scrollToSection('contact')}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold shadow-[0_4px_14px_0_rgba(192,193,255,0.39)] hover:shadow-[0_6px_20px_rgba(192,193,255,0.23)] hover:bg-primary-fixed transition-colors duration-200"
      >
        Connect
      </motion.button>
    </header>
  );
};

export default Navbar;
