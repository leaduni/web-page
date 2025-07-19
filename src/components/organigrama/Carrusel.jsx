import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carrusel = ({ pillars, activePillar, setActivePillar }) => {
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // Estados para swipe/drag
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);

  const paginate = (newDirection) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);
    setActivePillar((prevIndex) => (prevIndex + newDirection + pillars.length) % pillars.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Handlers para swipe/drag móvil
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
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      setDragOffset(deltaX);
    }
  };
  const handleTouchEnd = () => {
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

  return (
    <section className="relative min-h-[320px] md:min-h-[480px] bg-[rgb(9,9,42)] py-8 md:py-16 overflow-hidden border-2 border-[#a6249d]/40 rounded-2xl">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d93340]/10 via-[#a6249d]/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#a6249d]/10 via-[#d93340]/10 to-transparent"></div>
      </div>

      {/* Desktop 3D Carousel */}
      <div className="hidden md:block">
        {/* 3D Carousel Container */}
        <div
          className="relative h-[480px] max-w-[1600px] mx-auto select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '2000px' }}>
            {/* Navigation Buttons */}
            <motion.button
              className="absolute left-4 z-50 p-4 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] shadow-lg hover:scale-110 transition-all duration-300 border-2 border-[#a6249d]/40"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => paginate(-1)}
              style={{ left: '3%' }}
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </motion.button>
            
            <motion.button
              className="absolute right-4 z-50 p-4 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] shadow-lg hover:scale-110 transition-all duration-300 border-2 border-[#a6249d]/40"
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
                className="w-[420px] h-[260px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#a6249d]/40 shadow-lg"
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
                className="w-[450px] h-[280px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#a6249d]/40 shadow-lg"
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
                x: isDragging ? dragOffset : 0,
                y: 0,
                z: 0,
                scale: 1,
                opacity: 1,
                rotateY: isDragging ? dragOffset * 0.05 : 0,
                transition: {
                  duration: isDragging ? 0 : 0.8,
                  ease: [0.32, 0.72, 0, 1]
                }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                className="w-[500px] h-[300px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#a6249d]/40 shadow-[0_8px_30px_-5px_rgba(217,51,64,0.3)]"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="mb-4 flex justify-center">
                    <img src={pillars[activePillar].image} alt="icon" className="w-24 h-24 object-contain mx-auto mt-2 drop-shadow-lg" />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] to-[#a6249d] text-center">
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
                className="w-[450px] h-[280px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#a6249d]/40 shadow-lg"
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
                className="w-[420px] h-[260px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#a6249d]/40 shadow-lg"
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
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="flex gap-2">
              {pillars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePillar(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-[#a6249d]/40 ${index === activePillar ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] shadow-lg' : 'bg-[#2D1B4E] hover:bg-[#d93340]'}`}
                />
              ))}
            </div>
            {/* Texto de desliza para explorar en escritorio */}
            <div className="flex items-center justify-center mt-2 text-white/60 text-xs">
              <span>←</span>
              <span className="mx-2">Desliza para explorar</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Simple Carousel */}
      <div className="block md:hidden">
        <div
          className="relative h-[260px] w-full max-w-xs mx-auto flex items-center justify-center select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ touchAction: 'pan-y' }}
        >
          <button
            className="absolute left-0 z-10 p-3 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] shadow-lg border-2 border-[#a6249d]/40"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className={`w-full h-[220px] bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#a6249d]/40 shadow-lg flex flex-col items-center justify-center px-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ transform: isDragging ? `translateX(${dragOffset}px)` : 'none', transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}
          >
            <img src={pillars[activePillar].image} alt="icon" className="w-16 h-16 object-contain mb-2" />
            <h3 className="text-lg font-bold text-white mb-1 text-center">
              {pillars[activePillar].title}
            </h3>
            <p className="text-white text-sm text-center">
              {pillars[activePillar].description}
            </p>
          </div>
          <button
            className="absolute right-0 z-10 p-3 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] shadow-lg border-2 border-[#a6249d]/40"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-2">
          {pillars.map((_, index) => (
            <button
              key={index}
              onClick={() => setActivePillar(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-[#a6249d]/40 ${index === activePillar ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] shadow-lg' : 'bg-[#2D1B4E] hover:bg-[#d93340]'}`}
            />
          ))}
        </div>
        {/* Texto de desliza para explorar */}
        <div className="flex items-center justify-center mt-4 text-white/60 text-xs">
          <span>←</span>
          <span className="mx-2">Desliza para explorar</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
};

export default Carrusel;
