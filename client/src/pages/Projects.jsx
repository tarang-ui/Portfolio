import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ProjectCard = ({ proj, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
      className="group cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 glass-card border border-outline-variant/30"
      >
        <motion.img 
          style={{ translateZ: "50px" }}
          transition={{ duration: 0.7 }}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-1000" 
          src={proj.img} 
          alt={proj.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60 pointer-events-none"></div>
      </motion.div>
      <span className={`font-label-mono text-label-mono mb-2 block ${proj.color}`}>
        {proj.category}
      </span>
      <h4 className={`font-headline-md text-headline-md text-on-surface transition-colors duration-300 group-hover:${proj.color.replace('text-', '')}`}>
        {proj.title}
      </h4>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2">
        {proj.desc}
      </p>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Quantum Analytics Dashboard",
      category: "SAAS PRODUCT • 2023",
      desc: "Next-generation real-time monitoring for distributed networks.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUMN99SUG9JJISvQfoDmBeQgsFTu8--AXVKS6T2upL_ilAxAKywlk7CvHWdDZJ3bDJE0mk8whP7WdIOCNKp8e8aZTSw1vY3Hq4Gv3zVoCDXiZ1z4RKpihBPPay27i-bvNPosHgTKV0hp9fxtIj8PLY7jSGEhnHcNz5pD9Cx6Nb3p8HrbwC6WMrFdlBGxeW15QDDYbimU_8PAWoKx-1rcSOcNQOl6IZVLQBD7vm-YW0_jZeGU4P6ImExUDAKCIBE4W0ktp3n8M9i88",
      color: "text-primary"
    },
    {
      id: 2,
      title: "Obsidian Core Identity",
      category: "BRAND DESIGN • 2024",
      desc: "Reimagining the digital presence of a global hardware manufacturer.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLZNRGEaBdSIP8KWRvWuz2CXJ4JadOIBFaSirl4PJNX-UOO887Cs0PZvR_L44AdADob6XsnguFRRdngtyTWFwkH5oAksYCpk5ecDOfhkuANNqzPZakxRgSppyG_W1Uho-aeiUBYJxsNTpWurOjehqXrcPKOiIg2zCdLn_71QY3YL9yAtxoMWqHzUGkyTMrgVw_ZIIx9vZ_NAiP4eVpkZXd0AUra2AqfvK_avuitS7lBdc0l0v9cCkhQkc49oBPvm0a6uJdn_SXBSY",
      color: "text-secondary"
    }
  ];

  return (
    <div className="max-w-container-max mx-auto px-gutter pt-16 pb-16">
      <div className="mb-20">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-headline-md text-headline-md text-on-surface mb-4"
        >
          Projects
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-1 bg-primary mb-8"
        ></motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
        >
          Deep dives into complex technical challenges. Showcasing architecture, design, and seamless execution.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {projects.map((proj, idx) => (
          <ProjectCard key={proj.id} proj={proj} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
