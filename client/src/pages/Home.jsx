import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Unique staggered text animation variant
  const textVariant = {
    hidden: { opacity: 0, y: 50, rotateX: -45 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
    })
  };

  return (
    <motion.div style={{ opacity }} className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-gutter py-section-padding-desktop">
      {/* Parallax Background Orbs */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]"></div>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.span
          custom={1} initial="hidden" animate="visible" variants={textVariant}
          className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-primary mb-6 block"
        >
          STUDENT • CLOUD ENTHUSIAST • CREATIVE DESIGNER
        </motion.span>

        <motion.h1
          custom={2} initial="hidden" animate="visible" variants={textVariant}
          className="font-display-lg text-display-lg text-on-surface mb-8 leading-none"
        >
          Curious About Cloud,<span className="text-primary"> Driven by Design.</span>
        </motion.h1>

        <motion.p
          custom={3} initial="hidden" animate="visible" variants={textVariant}
          className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12"
        >
          Interested in cloud computing, AI/ML & digital design, with a focus on creating thoughtful and modern digital experiences.
        </motion.p>

        <motion.div
          custom={4} initial="hidden" animate="visible" variants={textVariant}
          className="flex gap-6 justify-center"
        >
          <button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(192,193,255,0.2)] hover:shadow-[0_0_30px_rgba(192,193,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            className="border border-outline-variant text-on-surface px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-container hover:scale-105 active:scale-95 transition-all duration-300"
          >
            My Stack
          </button>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default Home;
