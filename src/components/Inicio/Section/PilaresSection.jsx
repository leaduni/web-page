import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const pilares = [
  {
    id: 1,
    image: '/pillars/Liderazgo.png',
    title: 'Pilar Liderazgo',
    description:
      'Formamos líderes con valores y habilidades para dirigir equipos e iniciativas con visión y propósito.',
    easterEggMessage:
      '¡Wow! Parece que tienes madera de líder nato 👑 ¡Sigue inspirando a otros con tu ejemplo!',
  },
  {
    id: 2,
    image: '/pillars/ExcelenciaAcademica.png',
    title: 'Pilar Excelencia Académica',
    description:
      'Impulsamos el alto rendimiento académico y el desarrollo continuo de habilidades técnicas.',
    easterEggMessage:
      '¡Increíble! Tu dedicación académica es admirable 📚 ¡La excelencia es tu camino hacia el éxito!',
  },
  {
    id: 3,
    image: '/pillars/ImpulsoFemenino.png',
    title: 'Pilar Impulso Femenino',
    description: 'Empoderamos y promovemos el liderazgo femenino en el campo de la tecnología.',
    easterEggMessage:
      '¡Fantástico! El futuro es femenino y tú eres parte de esa revolución 💪 ¡Rompe esos techos de cristal!',
  },
  {
    id: 4,
    image: '/pillars/DesarrolloProfesional.png',
    title: 'Pilar Desarrollo Profesional',
    description: 'Facilitamos oportunidades de crecimiento y conexiones profesionales valiosas.',
    easterEggMessage:
      '¡Excelente! Tu crecimiento profesional no tiene límites 🚀 ¡Cada conexión es una nueva oportunidad!',
  },
  {
    id: 5,
    image: '/pillars/ImpactoSocial.png',
    title: 'Pilar Impacto Social',
    description:
      'Generamos cambios positivos en nuestra comunidad a través de proyectos significativos.',
    easterEggMessage:
      '¡Genial! Tu corazón solidario puede cambiar el mundo 🌍 ¡Cada acción cuenta para hacer la diferencia!',
  },
  {
    id: 6,
    image: '/pillars/DesarrolloDelCapitulo.png',
    title: 'Pilar Desarrollo del Capítulo',
    description: 'Fortalecemos y expandimos nuestro capítulo para maximizar nuestro impacto.',
    easterEggMessage:
      '¡Asombroso! Eres un verdadero constructor de comunidades 🏗️ ¡Juntos somos más fuertes!',
  },
  {
    id: 7,
    image: '/pillars/LeadAcademia.png',
    title: 'Pilar Lead Academia',
    description: 'Desarrollamos programas educativos innovadores para potenciar el aprendizaje.',
    easterEggMessage:
      '¡Brillante! Tu pasión por enseñar ilumina mentes 💡 ¡El conocimiento que compartes transforma vidas!',
  },
];

export const PilaresSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [easterEggMessage, setEasterEggMessage] = useState('');

  // Estados para el swipe
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);

  const handleCardClick = pillarTitle => {
    const now = Date.now();

    // Resetear contador si han pasado más de 3 segundos desde el último click
    if (now - lastClickTime > 3000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }

    setLastClickTime(now);

    // Mostrar Easter Egg al llegar a 10 clicks
    if (clickCount >= 9) {
      // 9 porque se incrementa después
      const currentPillar = pilares.find(pilar => pilar.title === pillarTitle);
      setEasterEggMessage(currentPillar.easterEggMessage);
      setShowEasterEgg(true);
      setClickCount(0);

      // Auto-cerrar después de 4 segundos
      setTimeout(() => {
        setShowEasterEgg(false);
      }, 4000);
    }
  };

  // Funciones para manejar el swipe en móviles
  const handleTouchStart = e => {
    if (isAnimating) return;
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = e => {
    if (!isDragging || isAnimating) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;

    // Solo permitir swipe horizontal si el movimiento es más horizontal que vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault(); // Prevenir scroll vertical
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || isAnimating) return;

    const threshold = 50; // Distancia mínima para activar el swipe

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Swipe hacia la derecha - ir al anterior
        paginate(-1);
      } else {
        // Swipe hacia la izquierda - ir al siguiente
        paginate(1);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseDown = e => {
    if (isAnimating) return;
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = e => {
    if (!isDragging || isAnimating) return;
    const deltaX = e.clientX - dragStart.x;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging || isAnimating) return;

    const threshold = 50;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        paginate(-1);
      } else {
        paginate(1);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  const slideVariants = {
    enter: direction => ({
      x: direction > 0 ? '100%' : '-100%',
      y: direction > 0 ? '-20%' : '20%',
      opacity: 0,
      scale: 0.6,
      rotateY: direction > 0 ? -65 : 65,
      rotateX: direction > 0 ? 15 : -15,
      rotateZ: direction > 0 ? 8 : -8,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 120,
        duration: 1.2,
      },
    }),
    center: {
      x: isDragging ? `${dragOffset * 0.1}px` : 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotateY: isDragging ? dragOffset * 0.02 : 0,
      rotateX: 0,
      rotateZ: 0,
      transition: {
        type: isDragging ? 'tween' : 'spring',
        damping: 20,
        stiffness: 100,
        duration: isDragging ? 0 : 1.2,
      },
    },
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
      y: -10,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 200,
        duration: 0.4,
      },
    },
    tap: {
      scale: 0.98,
      rotateZ: 2,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
        duration: 0.2,
      },
    },
  };

  const emojiVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.2,
      y: -5,
      transition: {
        duration: 0.3,
        ease: 'backOut',
        yoyo: Infinity,
      },
    },
  };

  const paginate = newDirection => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);
    setCurrentIndex(prevIndex => (prevIndex + newDirection + pilares.length) % pilares.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  return (
    <section
      id="pilares"
      className="relative bg-transparent py-8 sm:py-12 lg:py-16 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-transparent"></div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-6 lg:mb-8">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nuestros Pilares
          </motion.h2>
          <motion.p
            className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Conoce las áreas clave en las que enfocamos nuestra misión y actividades.
          </motion.p>
        </div>

        {/* Mobile Carousel */}
        <div className="block lg:hidden">
          <div
            className="relative h-[350px] max-w-sm mx-auto select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ touchAction: 'pan-y' }}
          >
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className={`w-full max-w-[300px] h-[280px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-500/40 shadow-[0_8px_50px_-5px_rgba(147,51,234,0.5)] cursor-pointer ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
                  whileHover="hover"
                  whileTap="tap"
                  variants={cardVariants}
                  onClick={() => !isDragging && handleCardClick(pilares[currentIndex].title)}
                  style={{
                    transform: isDragging
                      ? `translateX(${dragOffset}px) rotateY(${dragOffset * 0.1}deg)`
                      : 'none',
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                  }}
                >
                  <div className="p-6 h-full flex flex-col">
                    <span className="mb-3 flex items-center justify-center">
                      <img
                        src={pilares[currentIndex].image}
                        alt={pilares[currentIndex].title}
                        className="w-16 h-16 object-contain rounded-full shadow-lg border-2 border-[#a6249d]/40 bg-[#1A0B2E]"
                      />
                    </span>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-transparent bg-clip-text mb-3 select-none">
                      {pilares[currentIndex].title}
                    </h3>
                    <p className="text-white/80 text-sm flex-grow leading-relaxed select-none">
                      {pilares[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="w-3 h-3 text-white" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="w-3 h-3 text-white" />
            </button>
          </div>

          {/* Mobile Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {pilares.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#B936F5] w-6' : 'bg-white/30'
                }`}
                onClick={() => {
                  if (!isAnimating) {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }
                }}
              />
            ))}
          </div>

          {/* Swipe Indicator */}
          <div className="flex items-center justify-center mt-4 text-white/60 text-xs">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 1 }}
              animate={{ opacity: isDragging ? 0.3 : 1 }}
            >
              <span>←</span>
              <span>Desliza para explorar</span>
              <span>→</span>
            </motion.div>
          </div>
        </div>

        {/* Desktop 3D Carousel Container */}
        <div className="hidden lg:block relative h-[480px] max-w-[1600px] mx-auto mt-0">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: '2500px',
              perspectiveOrigin: 'center center',
            }}
          >
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
                x: '-140%',
                y: '15%',
                z: -250,
                scale: 0.65,
                opacity: 0.4,
                rotateY: 55,
                rotateX: 10,
                rotateZ: -5,
                transition: {
                  type: 'spring',
                  damping: 20,
                  stiffness: 80,
                  duration: 1.0,
                },
              }}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center right',
              }}
            >
              <motion.div
                className="w-[420px] h-[260px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-900/30 shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
                whileHover="hover"
                whileTap="tap"
                variants={cardVariants}
              >
                <div className="p-8 h-full flex flex-col">
                  <span className="mb-3 flex items-center justify-center">
                    <img
                      src={pilares[(currentIndex - 2 + pilares.length) % pilares.length].image}
                      alt={pilares[(currentIndex - 2 + pilares.length) % pilares.length].title}
                      className="w-16 h-16 object-contain rounded-full shadow-lg border-2 border-[#a6249d]/40 bg-[#1A0B2E]"
                    />
                  </span>
                  <h3 className="text-lg font-bold text-white/70 mb-2 select-none">
                    {pilares[(currentIndex - 2 + pilares.length) % pilares.length].title}
                  </h3>
                  <p className="text-white/60 text-sm flex-grow select-none">
                    {pilares[(currentIndex - 2 + pilares.length) % pilares.length].description}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Left Card */}
            <motion.div
              className="absolute transform-gpu"
              initial={false}
              animate={{
                x: '-90%',
                y: '8%',
                z: -150,
                scale: 0.75,
                opacity: 0.7,
                rotateY: 40,
                rotateX: 8,
                rotateZ: -3,
                transition: {
                  type: 'spring',
                  damping: 18,
                  stiffness: 90,
                  duration: 1.0,
                },
              }}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center right',
              }}
            >
              <motion.div
                className="w-[450px] h-[280px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-900/30 shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
                whileHover="hover"
                whileTap="tap"
                variants={cardVariants}
              >
                <div className="p-8 h-full flex flex-col">
                  <span className="mb-4 flex items-center justify-center">
                    <img
                      src={pilares[(currentIndex - 1 + pilares.length) % pilares.length].image}
                      alt={pilares[(currentIndex - 1 + pilares.length) % pilares.length].title}
                      className="w-20 h-20 object-contain rounded-full shadow-lg border-2 border-[#a6249d]/40 bg-[#1A0B2E]"
                    />
                  </span>
                  <h3 className="text-xl font-bold text-white/70 mb-3 select-none">
                    {pilares[(currentIndex - 1 + pilares.length) % pilares.length].title}
                  </h3>
                  <p className="text-white/60 text-sm flex-grow select-none">
                    {pilares[(currentIndex - 1 + pilares.length) % pilares.length].description}
                  </p>
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
                className="absolute transform-gpu z-20"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center',
                  left: '50%',
                  marginLeft: '-250px',
                  perspective: '1000px',
                  willChange: 'transform',
                }}
              >
                <motion.div
                  className="w-[500px] h-[300px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-500/40 shadow-[0_8px_50px_-5px_rgba(147,51,234,0.5)] hover:shadow-[0_8px_70px_-5px_rgba(147,51,234,0.6)] cursor-pointer"
                  whileHover="hover"
                  whileTap="tap"
                  variants={cardVariants}
                  onClick={() => handleCardClick(pilares[currentIndex].title)}
                >
                  <div className="p-10 flex flex-col h-full pb-10">
                    <span className="mb-4 flex items-center justify-center">
                      <img
                        src={pilares[currentIndex].image}
                        alt={pilares[currentIndex].title}
                        className="w-24 h-24 object-contain rounded-full shadow-lg border-2 border-[#a6249d]/40 bg-[#1A0B2E]"
                      />
                    </span>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-transparent bg-clip-text mb-1 select-none">
                      {pilares[currentIndex].title}
                    </h3>
                    <p className="text-white/80 text-lg flex-grow select-none">
                      {pilares[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right Card (Now Further Back) */}
            <motion.div
              className="absolute transform-gpu"
              initial={false}
              animate={{
                x: '140%',
                y: '15%',
                z: -250,
                scale: 0.65,
                opacity: 0.4,
                rotateY: -55,
                rotateX: 10,
                rotateZ: 5,
                transition: {
                  type: 'spring',
                  damping: 20,
                  stiffness: 80,
                  duration: 1.0,
                },
              }}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center left',
              }}
            >
              <motion.div
                className="w-[420px] h-[260px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-900/30 shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
                whileHover="hover"
                whileTap="tap"
                variants={cardVariants}
              >
                <div className="p-8 h-full flex flex-col">
                  <span className="mb-3 flex items-center justify-center">
                    <img
                      src={pilares[(currentIndex + 1) % pilares.length].image}
                      alt={pilares[(currentIndex + 1) % pilares.length].title}
                      className="w-16 h-16 object-contain rounded-full shadow-lg border-2 border-[#a6249d]/40 bg-[#1A0B2E]"
                    />
                  </span>
                  <h3 className="text-lg font-bold text-white/70 mb-2 select-none">
                    {pilares[(currentIndex + 1) % pilares.length].title}
                  </h3>
                  <p className="text-white/60 text-sm flex-grow select-none">
                    {pilares[(currentIndex + 1) % pilares.length].description}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Far Right Card (Now Closer) */}
            <motion.div
              className="absolute transform-gpu"
              initial={false}
              animate={{
                x: '90%',
                y: '8%',
                z: -150,
                scale: 0.75,
                opacity: 0.7,
                rotateY: -40,
                rotateX: 8,
                rotateZ: 3,
                transition: {
                  type: 'spring',
                  damping: 18,
                  stiffness: 90,
                  duration: 1.0,
                },
              }}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center left',
              }}
            >
              <motion.div
                className="w-[450px] h-[280px] bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-900/30 shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
                whileHover="hover"
                whileTap="tap"
                variants={cardVariants}
              >
                <div className="p-8 h-full flex flex-col">
                  <span className="mb-4 flex items-center justify-center">
                    <img
                      src={pilares[(currentIndex + 2) % pilares.length].image}
                      alt={pilares[(currentIndex + 2) % pilares.length].title}
                      className="w-20 h-20 object-contain rounded-full shadow-lg border-2 border-[#a6249d]/40 bg-[#1A0B2E]"
                    />
                  </span>
                  <h3 className="text-xl font-bold text-white/70 mb-3 select-none">
                    {pilares[(currentIndex + 2) % pilares.length].title}
                  </h3>
                  <p className="text-white/60 text-sm flex-grow select-none">
                    {pilares[(currentIndex + 2) % pilares.length].description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black backdrop-blur-xl rounded-3xl p-8 max-w-md mx-auto border border-[#a6249d]/40 shadow-[0_8px_50px_-5px_rgba(147,51,234,0.5)]"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 300,
                duration: 0.5,
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4 select-none">🎉</div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-transparent bg-clip-text mb-4 select-none">
                  ¡Easter Egg Desbloqueado!
                </h3>
                <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line mb-6 select-none">
                  {easterEggMessage}
                </p>
                <button
                  onClick={() => setShowEasterEgg(false)}
                  className="px-6 py-3 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 select-none"
                >
                  ¡Genial! 🚀
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
