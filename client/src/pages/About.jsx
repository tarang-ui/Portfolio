import { motion } from 'framer-motion';
import profilePic from '../assets/profile.jpg';
import canvaIcon from '../assets/canva.svg';

const About = () => {
  const skewVariant = {
    hidden: { opacity: 0, y: 80, skewY: 4 },
    visible: { 
      opacity: 1, 
      y: 0, 
      skewY: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="max-w-container-max mx-auto px-gutter pt-8 pb-16">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">About Me</h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-1 bg-primary mb-8"
        ></motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
        <motion.div
          variants={skewVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="glass-card p-10 rounded-2xl relative overflow-hidden group max-h-[420px]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>
          <h3 className="text-2xl font-bold text-primary mb-6 relative z-10">Leadership & Learning</h3>
          <p className="text-on-surface-variant leading-relaxed mb-4 relative z-10">
            I’m a third-year Computer Science & Engineering student at Silver Oak University with a strong interest in cloud computing, emerging technologies, AI/ML and creative digital design. Alongside my academic journey, I actively explore cloud and infrastructure concepts while continuously expanding my understanding of modern technologies and interactive digital experiences through experimentation, creative projects and hands-on learning.
          </p>
          <p className="text-on-surface-variant leading-relaxed relative z-10">
            I also serve as the Vice-Chairperson of IEEE SOU SIGHT SBG, where I contribute to a collaborative and forward-thinking technical community that encourages innovation, creativity and continuous learning. I’m particularly interested in the intersection of technology and design creating clean, modern along with thoughtful digital experiences that are both functional and visually engaging.
          </p><br />
          
        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-card overflow-hidden rounded-2xl shadow-xl max-h-[420px]"
        >
          <img
            src={profilePic}
            alt="Professional headshot"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-10"
      >
        <motion.div
          whileHover={{ y: -6 }}
          className="glass-card p-10 rounded-[3rem] relative overflow-hidden group"
        >
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center mb-10">
              <h3 className="text-3xl font-bold text-primary text-center mb-4">Tech Stacks</h3>
              <div className="w-16 h-1 bg-primary"></div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 justify-center items-center">
              {[
                { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
                { name: 'PYTHON', icon: 'https://cdn.simpleicons.org/python/3776AB' },
                { name: 'JAVASCRIPT', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
                { name: 'HTML', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
                { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                { name: 'C', icon: 'https://cdn.simpleicons.org/c/A8B9CC' },
                { name: 'JAVA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                { name: 'AWS CLOUD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
                { name: 'CANVA', icon: canvaIcon },
                { name: 'FIGMA', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
                { name: 'NODE JS', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
                { name: 'REACT', icon: 'https://cdn.simpleicons.org/react/61DAFB' }
              ].map((stack) => (
                <div key={stack.name} className="group relative flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10 opacity-0 blur-2xl transition-all duration-300"></div>
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-surface-2/90 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.2)]" title={stack.name}>
                    <img
                      src={stack.icon}
                      alt={stack.name}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-24"
      >
        <div className="flex flex-col items-center mb-12">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Milestones & Achievements</h3>
          <div className="w-16 h-1 bg-primary"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Achievement 1 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-2xl relative overflow-hidden group border border-outline-variant/30 hover:border-primary/50 transition-colors"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full transition-transform duration-700 group-hover:scale-125"></div>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(192,193,255,0.2)]">
              <span className="material-symbols-outlined text-3xl">emoji_events</span>
            </div>
            <h4 className="text-xl font-bold text-on-surface mb-2">Google Student Ambassador</h4>
            <p className="text-sm text-primary mb-4 font-label-mono">2025 • PROGRAM</p>
            <p className="text-on-surface-variant leading-relaxed relative z-10">
              Recognized as Google Student Ambassador at Silver Oak University for active participation in the program.
            </p>
          </motion.div>

          {/* Achievement 2 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-2xl relative overflow-hidden group border border-outline-variant/30 hover:border-secondary/50 transition-colors"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-full transition-transform duration-700 group-hover:scale-125"></div>
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6 shadow-[0_0_15px_rgba(76,215,246,0.2)]">
              <span className="material-symbols-outlined text-3xl">public</span>
            </div>
            <h4 className="text-xl font-bold text-on-surface mb-2">TechSprint Winner</h4>
            <p className="text-sm text-secondary mb-4 font-label-mono">2026 • HACKATHON</p>
            <p className="text-on-surface-variant leading-relaxed relative z-10">
              Developed a multi-agent AI solution for content writing and verification during TechSprint.
            </p>
          </motion.div>

          {/* Achievement 3 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-2xl relative overflow-hidden group border border-outline-variant/30 hover:border-tertiary/50 transition-colors"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/10 rounded-bl-full transition-transform duration-700 group-hover:scale-125"></div>
            <div className="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center text-tertiary mb-6 shadow-[0_0_15px_rgba(255,183,131,0.2)]">
              <span className="material-symbols-outlined text-3xl">architecture</span>
            </div>
            <h4 className="text-xl font-bold text-on-surface mb-2">AWS Cloud Foundations</h4>
            <p className="text-sm text-tertiary mb-4 font-label-mono">2025 • CERTIFICATION</p>
            <p className="text-on-surface-variant leading-relaxed relative z-10">
              Completed AWS Academy Cloud Foundations training focused on core cloud and AWS concepts.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default About;
