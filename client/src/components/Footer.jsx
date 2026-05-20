import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const exploreLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tarang-prajapati/' },
    { label: 'GitHub', url: 'https://github.com/tarang-ui' },
    { label: 'Instagram', url: 'https://www.instagram.com/amdavaditarang/' },
    { label: 'Email', url: 'mailto:ptarang69@gmail.com' }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full mt-20 py-8 border-t border-outline-variant/10 bg-transparent relative z-20"
    >
      <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand */}
        <div 
          onClick={() => scrollToSection('home')}
          className="font-headline-md text-xl font-extrabold text-on-surface cursor-pointer hover:text-primary transition-colors flex items-center gap-2"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-primary to-secondary"></div>
          Tarang Prajapati
        </div>

        {/* Explore Links - Modern Floating Pill */}
        <div className="flex items-center gap-1 bg-surface-container-highest/50 backdrop-blur-md p-1.5 rounded-full border border-outline-variant/20 shadow-lg">
          {exploreLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="px-5 py-2 rounded-full text-sm font-label-mono text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a 
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-label-mono text-on-surface-variant hover:text-secondary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
