import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carrusel = ({ pillars, activePillar, setActivePillar }) => {
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const paginate = (newDirection) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);
    setActivePillar((prevIndex) => (prevIndex + newDirection + pillars.length) % pillars.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section className="relative min-h-[480px] bg-gradient-to-b from-[#1A0B2E] via-[#2D1B4E] to-[#1A0B2E] py-16 overflow-hidden border-2 border-purple-500/50 rounded-2xl">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2D1B4E]/15 via-[#1A0B2E]/8 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4C1D95]/8 via-[#2D1B4E]/3 to-transparent"></div>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative h-[480px] max-w-[1600px] mx-auto">
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '2000px' }}>
          {/* Navigation Buttons */}
          <motion.button
            className="absolute left-4 z-50 p-4 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] shadow-lg hover:scale-110 transition-all duration-300 border-2 border-white/20"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => paginate(-1)}
            style={{ left: '3%' }}
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </motion.button>
          
          <motion.button
            className="absolute right-4 z-50 p-4 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] shadow-lg hover:scale-110 transition-all duration-300 border-2 border-white/20"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => paginate(1)}
            style={{ right: '3%' }}
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </motion.button>

          {/* Far Left Card */}
          <motion.div 
            className="absolute transform-gpu z-10"
            initial={false}
            animate={{
              x: '-120%',
              y: '0%',
              z: -200,
              scale: 0.7,
              opacity: 0.3,
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
              className="w-[420px] h-[260px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-4">
                  <img src={pillars[(activePillar - 2 + pillars.length) % pillars.length].image} alt="icon" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-white/70 mb-2">
                  {pillars[(activePillar - 2 + pillars.length) % pillars.length].title}
                </h3>
                <p className="text-white/50 text-sm flex-grow">
                  {pillars[(activePillar - 2 + pillars.length) % pillars.length].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Left Card */}
          <motion.div 
            className="absolute transform-gpu z-20"
            initial={false}
            animate={{
              x: '-80%',
              y: '0%',
              z: -120,
              scale: 0.8,
              opacity: 0.6,
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
              className="w-[450px] h-[280px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-4">
                  <img src={pillars[(activePillar - 1 + pillars.length) % pillars.length].image} alt="icon" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-white/80 mb-2">
                  {pillars[(activePillar - 1 + pillars.length) % pillars.length].title}
                </h3>
                <p className="text-white/60 text-sm flex-grow">
                  {pillars[(activePillar - 1 + pillars.length) % pillars.length].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Center Card */}
          <motion.div 
            className="absolute transform-gpu z-30"
            initial={false}
            animate={{
              x: 0,
              y: 0,
              z: 0,
              scale: 1,
              opacity: 1,
              rotateY: 0,
              transition: {
                duration: 0.8,
                ease: [0.32, 0.72, 0, 1]
              }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              className="w-[500px] h-[300px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-[0_8px_30px_-5px_rgba(91,33,182,0.3)]"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-4 flex justify-center">
                  <img src={pillars[activePillar].image} alt="icon" className="w-24 h-24 object-contain mx-auto mt-2 drop-shadow-lg" />
                </div>
                <h3 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-center">
                  {pillars[activePillar].title}
                </h3>
                <p className="text-white/90 text-lg flex-grow text-center">
                  {pillars[activePillar].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Card */}
          <motion.div 
            className="absolute transform-gpu z-20"
            initial={false}
            animate={{
              x: '80%',
              y: '0%',
              z: -120,
              scale: 0.8,
              opacity: 0.6,
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
              className="w-[450px] h-[280px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-4">
                  <img src={pillars[(activePillar + 1) % pillars.length].image} alt="icon" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-white/80 mb-2">
                  {pillars[(activePillar + 1) % pillars.length].title}
                </h3>
                <p className="text-white/60 text-sm flex-grow">
                  {pillars[(activePillar + 1) % pillars.length].description}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Far Right Card */}
          <motion.div 
            className="absolute transform-gpu z-10"
            initial={false}
            animate={{
              x: '120%',
              y: '0%',
              z: -200,
              scale: 0.7,
              opacity: 0.3,
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
              className="w-[420px] h-[260px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-4">
                  <img src={pillars[(activePillar + 2) % pillars.length].image} alt="icon" className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-white/70 mb-2">
                  {pillars[(activePillar + 2) % pillars.length].title}
                </h3>
                <p className="text-white/50 text-sm flex-grow">
                  {pillars[(activePillar + 2) % pillars.length].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
          {pillars.map((_, index) => (
            <button
              key={index}
              onClick={() => setActivePillar(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white/30 ${index === activePillar ? 'bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] shadow-lg' : 'bg-[#2D1B4E] hover:bg-[#4C1D95]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carrusel;
