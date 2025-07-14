import React from 'react';
import { motion } from 'framer-motion';

const CARD_HEIGHT = 'h-[440px]'; // Altura intermedia para mejor equilibrio visual

const MemberCard = ({ member, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: '0 8px 32px 0 rgba(139,92,246,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.10)' }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(member)}
      className={`relative group cursor-pointer transition-all duration-300 ${CARD_HEIGHT}`}
      style={{ minHeight: '440px' }}
    >
      {/* Efecto de brillo y sombra en hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#4D3B6E] to-[#8B5CF6] rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-500 pointer-events-none z-10"></div>
      {/* Contenido principal */}
      <div className="relative bg-[#1A0B2E] border-2 border-purple-500/30 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 z-20 flex flex-col h-full">
        {/* Imagen con overlay gradiente */}
        <div className="relative h-72 md:h-64 overflow-hidden flex-shrink-0 flex items-center justify-center bg-[#1A0B2E]">
          <img
            src={member.image}
            alt={member.name}
            className={`w-full h-full object-cover rounded-t-2xl shadow-md transition-transform duration-500 group-hover:scale-105 ${
              (member.name === 'Miguel Anthony Castañeda Villanueva' || member.name === 'Gabriel Wei Wei Siguas')
                ? 'object-[center_50%] md:object-center'
                : `object-top md:${member.imgClass || 'object-center'}`
            }`}
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
          {/* Overlay gradiente más suave */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E]/70 via-transparent to-transparent z-10 pointer-events-none"></div>
        </div>
        {/* Información */}
        <div className="relative z-20 p-6 flex flex-col flex-1 justify-between min-h-[120px]">
          <div>
            <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#4D3B6E] break-words">
              {member.name}
            </h3>
            <p className="text-white/80 text-sm">
              {member.position}
            </p>
          </div>
          {/* Botón ver más */}
          <div className="mt-4 flex justify-end">
            <button className="text-sm text-white/60 hover:text-[#8B5CF6] flex items-center gap-1 transition-colors group-hover:text-[#8B5CF6]">
              Ver más
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;