import React from 'react';
import { motion } from 'framer-motion';

const MemberCard = ({ member, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(member)}
      className="relative group cursor-pointer"
    >
      {/* Efecto de brillo en hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4D3B6E] to-[#8B5CF6] rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
      
      {/* Contenido principal */}
      <div className="relative bg-[#1A0B2E] border border-purple-500/20 rounded-xl overflow-hidden">
        {/* Imagen con overlay gradiente */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E] via-transparent to-transparent z-10"></div>
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition duration-500"
          />
        </div>

        {/* Información */}
        <div className="relative z-20 p-6 -mt-10">
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#4D3B6E]">
            {member.name}
          </h3>
          <p className="text-white/80 text-sm">
            {member.position}
          </p>

          {/* Botón ver más */}
          <div className="mt-4 flex justify-end">
            <button className="text-sm text-white/60 hover:text-white flex items-center gap-1 group-hover:text-[#8B5CF6] transition-colors">
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
