import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MemberModal = ({ selectedMember, setSelectedMember, activeMemberTab, setActiveMemberTab, memberDetails }) => {
  const details = memberDetails[selectedMember.name];
  
  const tabs = [
    { id: 'info', label: 'Información' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-4xl bg-[#1A0B2E] rounded-2xl overflow-hidden"
        >
          {/* Header con gradiente */}
          <div className="relative h-48 bg-gradient-to-r from-[#4D3B6E] to-[#8B5CF6]">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <div className="absolute -bottom-16 left-8 flex items-end gap-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#4D3B6E] to-[#8B5CF6] rounded-full blur"></div>
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-[#1A0B2E]"
                />
              </div>
              <div className="mb-4 text-white">
                <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                <p className="text-white/80">{selectedMember.position}</p>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8 pt-20">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMemberTab(tab.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeMemberTab === tab.id
                      ? 'bg-gradient-to-r from-[#4D3B6E] to-[#8B5CF6] text-white'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Contenido del tab activo */}
            <div className="space-y-6">
              {activeMemberTab === 'info' && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 leading-relaxed">{details.bio}</p>
                </div>
              )}

              {activeMemberTab === 'eventos' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#4D3B6E]">
                      Premios y Reconocimientos
                    </h3>
                    <ul className="space-y-2">
                      {details.eventos.premios.map((premio, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/80">
                          <span className="text-[#8B5CF6]">•</span>
                          {premio}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#4D3B6E]">
                      Eventos Liderados
                    </h3>
                    <ul className="space-y-2">
                      {details.eventos.liderados.map((evento, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/80">
                          <span className="text-[#8B5CF6]">•</span>
                          {evento}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeMemberTab === 'habilidades' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#4D3B6E]">
                      Habilidades Blandas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {details.habilidades.soft.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#4D3B6E]">
                      Habilidades Técnicas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {details.habilidades.hard.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeMemberTab === 'contacto' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {details.contacto.map((medio, idx) => (
                    <button
                      key={idx}
                      className="p-4 rounded-xl bg-white/5 hover:bg-[#4D3B6E]/30 transition-colors group"
                    >
                      <p className="text-white/80 group-hover:text-white text-center">{medio}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MemberModal;
