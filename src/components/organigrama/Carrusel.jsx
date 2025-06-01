import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carrusel = ({ pillars, activePillar, setActivePillar }) => {
  const getPrevIndex = () => (activePillar - 1 + pillars.length) % pillars.length;
  const getNextIndex = () => (activePillar + 1) % pillars.length;

  const nextPillar = () => setActivePillar((prev) => (prev + 1) % pillars.length);
  const prevPillar = () => setActivePillar((prev) => (prev - 1 + pillars.length) % pillars.length);

  return (
    <div className="relative flex justify-center items-center h-[360px] mb-20" style={{ perspective: '1600px' }}>
      {/* Tarjeta izquierda */}
      <motion.div
        key={`prev-${activePillar}`}
        className="absolute left-[10%] z-10"
        animate={{ scale: 0.85, opacity: 0.3, rotateY: 25 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-[450px] h-[280px] rounded-3xl bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black px-6 py-8 text-center flex flex-col justify-center items-center shadow-xl">
          <h3 className="text-white font-bold text-xl mb-2">{pillars[getPrevIndex()].title}</h3>
          <p className="text-white/60 text-sm">{pillars[getPrevIndex()].description}</p>
        </div>
      </motion.div>

      {/* Tarjeta central */}
      <motion.div
        key={`active-${activePillar}`}
        className="z-20"
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-[500px] h-[300px] rounded-3xl border border-purple-500/40 bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black px-8 text-center flex flex-col justify-center items-center shadow-2xl">
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{pillars[activePillar].title}</h3>
          <p className="text-white/80">{pillars[activePillar].description}</p>
        </div>
      </motion.div>

      {/* Tarjeta derecha */}
      <motion.div
        key={`next-${activePillar}`}
        className="absolute right-[10%] z-10"
        animate={{ scale: 0.85, opacity: 0.3, rotateY: -25 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-[450px] h-[280px] rounded-3xl bg-gradient-to-br from-[#2D1B4E] via-[#1A0B2E] to-black px-6 py-8 text-center flex flex-col justify-center items-center shadow-xl">
          <h3 className="text-white font-bold text-xl mb-2">{pillars[getNextIndex()].title}</h3>
          <p className="text-white/60 text-sm">{pillars[getNextIndex()].description}</p>
        </div>
      </motion.div>

      {/* Botones */}
      <button
        onClick={prevPillar}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#0b0b1f] hover:bg-[#a0218b]/40 text-white border border-white/10 shadow-md rounded-full p-2 z-30"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextPillar}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0b0b1f] hover:bg-[#a0218b]/40 text-white border border-white/10 shadow-md rounded-full p-2 z-30"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Carrusel;
