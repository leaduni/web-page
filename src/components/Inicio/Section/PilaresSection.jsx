import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const pilares = [
  {
    id: 1,
    emoji: '🧭',
    title: 'Pilar Liderazgo',
    description: 'Formamos líderes con valores y habilidades para dirigir equipos e iniciativas con visión y propósito.'
  },
  {
    id: 2,
    emoji: '💻',
    title: 'Pilar Excelencia Académica',
    description: 'Impulsamos el alto rendimiento académico y el desarrollo continuo de habilidades técnicas.'
  },
  {
    id: 3,
    emoji: '✨',
    title: 'Pilar Impulso Femenino',
    description: 'Empoderamos y promovemos el liderazgo femenino en el campo de la tecnología.'
  },
  {
    id: 4,
    emoji: '💼',
    title: 'Pilar Desarrollo Profesional',
    description: 'Facilitamos oportunidades de crecimiento y conexiones profesionales valiosas.'
  },
  {
    id: 5,
    emoji: '🤝',
    title: 'Pilar Impacto Social',
    description: 'Generamos cambios positivos en nuestra comunidad a través de proyectos significativos.'
  },
  {
    id: 6,
    emoji: '🧩',
    title: 'Pilar Desarrollo del Capítulo',
    description: 'Fortalecemos y expandimos nuestro capítulo para maximizar nuestro impacto.'
  },
  {
    id: 7,
    emoji: '📈',
    title: 'Pilar Lead Academia',
    description: 'Desarrollamos programas educativos innovadores para potenciar el aprendizaje.'
  }
];

export const PilaresSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '80%' : '-80%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -35 : 35,
      transition: {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1]
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-80%' : '80%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 35 : -35,
      transition: {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1]
      }
    })
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const emojiVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.2,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "backOut",
        yoyo: Infinity
      }
    }
  };

  const paginate = (newDirection) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + pilares.length) % pilares.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section id="pilares" className="relative min-h-screen bg-[#1A0B2E] py-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#B936F5]/20 via-[#B936F5]/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#00F0FF]/10 via-[#00F0FF]/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.3))]"></div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-4">
          <motion.h2 
            className="text-5xl font-bold mb-4 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-[#B936F5]/80 to-[#FF1CF7]/80 text-transparent bg-clip-text">
              Nuestros Pilares
            </span>
          </motion.h2>
          <motion.p 
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Conoce las áreas clave en las que enfocamos nuestra misión y actividades.
          </motion.p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[480px] max-w-[1600px] mx-auto mt-0">
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '2000px' }}>
            {/* Navigation Buttons */}
            <motion.button
              className="absolute left-4 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              style={{ left: '10%' }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            
            <motion.button
              className="absolute right-4 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(1)}
              style={{ right: '10%' }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>

            {/* Far Left Card */}
            <motion.div 
              className="absolute transform-gpu"
              initial={false}
              animate={{
                x: '-120%',
                y: '10%',
                z: -200,
                scale: 0.7,
                opacity: 0.6,
                rotateY: 45,
                transition: {
                  duration: 0.8,
                  ease: [0.32, 0.72, 0, 1]
                }
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                transformOrigin: 'center right'
              }}
            >
              <motion.div 
                className="w-[420px] h-[260px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-900/30 shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="p-8 h-full flex flex-col">
                  <span className="text-4xl block mb-3">
                    {pilares[(currentIndex - 2 + pilares.length) % pilares.length].emoji}
                  </span>
                  <h3 className="text-lg font-bold text-white/70 mb-2">
                    {pilares[(currentIndex - 2 + pilares.length) % pilares.length].title}
                  </h3>
                  <p className="text-white/60 text-sm mb-2 flex-grow">
                    {pilares[(currentIndex - 2 + pilares.length) % pilares.length].description}
                  </p>
                  <button className="text-xs text-[#B936F5] hover:text-[#FF1CF7] transition-colors text-left">
                    Leer más →
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Left Card */}
            <motion.div 
              className="absolute transform-gpu"
              initial={false}
              animate={{
                x: '-80%',
                y: '5%',
                z: -120,
                scale: 0.8,
                opacity: 0.9,
                rotateY: 35,
                transition: {
                  duration: 0.8,
                  ease: [0.32, 0.72, 0, 1]
                }
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                transformOrigin: 'center right'
              }}
            >
              <motion.div 
                className="w-[450px] h-[280px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-900/30 shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="p-8 h-full flex flex-col">
                  <span className="text-5xl block mb-4">
                    {pilares[(currentIndex - 1 + pilares.length) % pilares.length].emoji}
                  </span>
                  <h3 className="text-xl font-bold text-white/70 mb-3">
                    {pilares[(currentIndex - 1 + pilares.length) % pilares.length].title}
                  </h3>
                  <p className="text-white/60 text-sm mb-2 flex-grow">
                    {pilares[(currentIndex - 1 + pilares.length) % pilares.length].description}
                  </p>
                  <button className="text-xs text-[#B936F5] hover:text-[#FF1CF7] transition-colors text-left">
                    Leer más →
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Current Card */}
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute transform-gpu z-20"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center',
                  left: '50%',
                  marginLeft: '-250px',
                  perspective: '1000px',
                  willChange: 'transform'
                }}
              >
                <motion.div 
                  className="w-[500px] h-[300px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-500/40 shadow-[0_8px_50px_-5px_rgba(147,51,234,0.5)] hover:shadow-[0_8px_70px_-5px_rgba(147,51,234,0.6)]"
                  whileHover="hover"
                  variants={cardVariants}
                >
                  <div className="p-10 h-full flex flex-col">
                    <span className="text-6xl block mb-4">
                      {pilares[currentIndex].emoji}
                    </span>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-transparent bg-clip-text mb-4">
                      {pilares[currentIndex].title}
                    </h3>
                    <p className="text-white/80 text-lg mb-3 flex-grow">
                      {pilares[currentIndex].description}
                    </p>
                    <button className="text-sm text-[#B936F5] hover:text-[#FF1CF7] transition-colors text-left font-medium">
                      Leer más →
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right Card (Now Further Back) */}
            <motion.div 
              className="absolute transform-gpu"
              initial={false}
              animate={{
                x: '120%',
                y: '10%',
                z: -200,
                scale: 0.7,
                opacity: 0.6,
                rotateY: -45,
                transition: {
                  duration: 0.8,
                  ease: [0.32, 0.72, 0, 1]
                }
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                transformOrigin: 'center left'
              }}
            >
              <motion.div 
                className="w-[420px] h-[260px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-900/30 shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="p-8 h-full flex flex-col">
                  <span className="text-4xl block mb-3">
                    {pilares[(currentIndex + 1) % pilares.length].emoji}
                  </span>
                  <h3 className="text-lg font-bold text-white/70 mb-2">
                    {pilares[(currentIndex + 1) % pilares.length].title}
                  </h3>
                  <p className="text-white/60 text-sm mb-2 flex-grow">
                    {pilares[(currentIndex + 1) % pilares.length].description}
                  </p>
                  <button className="text-xs text-[#B936F5] hover:text-[#FF1CF7] transition-colors text-left">
                    Leer más →
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Far Right Card (Now Closer) */}
            <motion.div 
              className="absolute transform-gpu"
              initial={false}
              animate={{
                x: '80%',
                y: '5%',
                z: -120,
                scale: 0.8,
                opacity: 0.9,
                rotateY: -35,
                transition: {
                  duration: 0.8,
                  ease: [0.32, 0.72, 0, 1]
                }
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                transformOrigin: 'center left'
              }}
            >
              <motion.div 
                className="w-[450px] h-[280px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-900/30 shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="p-8 h-full flex flex-col">
                  <span className="text-5xl block mb-4">
                    {pilares[(currentIndex + 2) % pilares.length].emoji}
                  </span>
                  <h3 className="text-xl font-bold text-white/70 mb-3">
                    {pilares[(currentIndex + 2) % pilares.length].title}
                  </h3>
                  <p className="text-white/60 text-sm mb-2 flex-grow">
                    {pilares[(currentIndex + 2) % pilares.length].description}
                  </p>
                  <button className="text-xs text-[#B936F5] hover:text-[#FF1CF7] transition-colors text-left">
                    Leer más →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}; 