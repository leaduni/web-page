import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MemberModal = ({
  selectedMember,
  setSelectedMember,
  activeMemberTab,
  setActiveMemberTab,
  memberDetails,
}) => {
  const details = memberDetails[selectedMember.name];
  const [showingContactIdx, setShowingContactIdx] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  // Estado para expandir/cerrar habilidades técnicas
  const [showAllHardSkills, setShowAllHardSkills] = useState(false);
  // Estado para expandir/cerrar habilidades blandas
  const [showAllSoftSkills, setShowAllSoftSkills] = useState(false);

  // Contraer la lista de habilidades al cambiar de tab
  useEffect(() => {
    setShowAllHardSkills(false);
    setShowAllSoftSkills(false);
  }, [activeMemberTab]);

  // Función helper para manejar casos sin información
  const getDefaultText = type => {
    if (type === 'premios') {
      return 'Construyendo un legado de excelencia en LEAD UNI';
    }
    if (type === 'eventos') {
      return 'Desarrollando iniciativas de liderazgo e innovación';
    }
    return '';
  };

  // Función para verificar si hay información real (no texto por defecto)
  const hasRealInfo = (array, type) => {
    if (!array || array.length === 0) return false;
    const defaultText = getDefaultText(type);
    return !array.every(item => item === defaultText);
  };

  const tabs = [
    { id: 'info', label: 'Información' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-4xl bg-[#1A0B2E] rounded-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
        >
          {/* Header con gradiente y posicionamiento para continuidad */}
          <div className="relative bg-gradient-to-r from-[#d93340] to-[#a6249d] pb-3 md:h-32 md:mb-5">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            {/* Desktop: imagen y texto alineados horizontalmente */}
            <div className="absolute left-8 top-full -translate-y-1/2 z-20 items-center gap-6 md:flex hidden mb-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#d93340] to-[#a6249d] rounded-full blur"></div>
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="relative w-32 h-32 rounded-full object-cover border-4 border-[#1A0B2E] bg-white"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-0 leading-tight">
                  {selectedMember.name}
                </h2>
                <p className="text-white bg-[#1A0B2E] px-2 py-1 rounded-b-lg w-fit shadow-lg mt-1 text-base md:text-lg">
                  {selectedMember.position}
                </p>
              </div>
            </div>
            {/* Móvil: imagen, nombre y cargo centrados verticalmente, todo dentro del fondo violeta */}
            <div className="flex flex-col items-center justify-center md:hidden pt-6 px-6">
              <div className="relative mb-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#d93340] to-[#a6249d] rounded-full blur"></div>
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-[#1A0B2E] bg-white"
                />
              </div>
              <h2 className="text-lg font-bold text-white mb-1 leading-tight text-center mt-2">
                {selectedMember.name}
              </h2>
              <p className="text-white text-sm font-medium text-center mt-0">
                {selectedMember.position}
              </p>
            </div>
          </div>
          {/* Espaciado prudente entre header y tabs - solo móvil */}
          <div className="mb-6 md:mb-0"></div>

          {/* Contenido */}
          <div className="pt-0 px-4 pb-8 md:p-8 md:pt-20">
            {/* Tabs */}
            {/* Móvil: tabs en dos filas de dos botones */}
            <div className="grid grid-cols-2 gap-2 md:hidden border-b border-[#a6249d] mt-0 pb-5 mb-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMemberTab(tab.id)}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors text-base shadow-sm border focus:outline-none focus:ring-2 focus:ring-[#d93340] focus:ring-offset-2 focus:ring-offset-[#1A0B2E] duration-150 ${
                    activeMemberTab === tab.id
                      ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white border-[#d93340] scale-105'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border-[#a6249d]/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Escritorio: tabs en una fila horizontal */}
            <div className="hidden md:flex gap-2 border-b border-[#a6249d] pb-4 mb-4 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMemberTab(tab.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeMemberTab === tab.id
                      ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white'
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
                  <p className="text-white leading-relaxed text-justify text-base md:text-lg tracking-wide px-1 md:px-0">
                    {details.bio}
                  </p>
                </div>
              )}

              {activeMemberTab === 'eventos' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] to-[#a6249d]">
                      Premios y Reconocimientos
                    </h3>
                    <ul className="space-y-3 bg-white/5 rounded-xl p-4 border border-[#a6249d]/20">
                      {details.eventos.premios && details.eventos.premios.length > 0 ? (
                        details.eventos.premios.map((premio, idx) => (
                          <li key={idx} className="text-white text-base">
                            <span className="mr-2 text-[#d93340]">–</span>
                            {premio}
                          </li>
                        ))
                      ) : (
                        <li className="text-white/70 text-base italic">
                          <span className="mr-2 text-[#d93340]">–</span>
                          {getDefaultText('premios')}
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] to-[#a6249d]">
                      Eventos Liderados
                    </h3>
                    <ul className="space-y-3 bg-white/5 rounded-xl p-4 border border-[#a6249d]/20">
                      {details.eventos.liderados && details.eventos.liderados.length > 0 ? (
                        details.eventos.liderados.map((evento, idx) => (
                          <li key={idx} className="text-white text-base">
                            <span className="mr-2 text-[#a6249d]">–</span>
                            {evento}
                          </li>
                        ))
                      ) : (
                        <li className="text-white/70 text-base italic">
                          <span className="mr-2 text-[#a6249d]">–</span>
                          {getDefaultText('eventos')}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {activeMemberTab === 'habilidades' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] to-[#a6249d] drop-shadow-sm tracking-wide">
                      Habilidades Blandas
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-2">
                      {(showAllSoftSkills
                        ? details.habilidades.soft
                        : details.habilidades.soft.slice(0, 6)
                      ).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-5 py-2 rounded-full bg-white/10 shadow-md text-white text-base font-medium backdrop-blur-sm border border-[#a6249d]/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {details.habilidades.soft.length > 6 && !showAllSoftSkills && (
                        <button
                          className="px-5 py-2 rounded-full bg-[#a6249d] text-white text-base font-semibold border border-[#a6249d]/30 hover:bg-[#d93340] transition-colors"
                          onClick={() => setShowAllSoftSkills(true)}
                        >
                          +{details.habilidades.soft.length - 6}
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] to-[#a6249d] drop-shadow-sm tracking-wide">
                      Habilidades Técnicas
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-2">
                      {(showAllHardSkills
                        ? details.habilidades.hard
                        : details.habilidades.hard.slice(0, 6)
                      ).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-5 py-2 rounded-full bg-white/10 shadow-md text-white text-base font-medium backdrop-blur-sm border border-[#a6249d]/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {details.habilidades.hard.length > 6 && !showAllHardSkills && (
                        <button
                          className="px-5 py-2 rounded-full bg-[#a6249d] text-white text-base font-semibold border border-[#a6249d]/30 hover:bg-[#d93340] transition-colors"
                          onClick={() => setShowAllHardSkills(true)}
                        >
                          +{details.habilidades.hard.length - 6}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeMemberTab === 'contacto' && (
                <div className="relative">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(() => {
                      const labels = [
                        { label: 'LinkedIn', type: 'link' },
                        { label: 'Curriculum Vitae', type: 'link' },
                        { label: 'Github', type: 'link' },
                        { label: 'Portafolio', type: 'link' },
                        { label: 'Otro', type: 'link' },
                      ];
                      const values = details.contacto || [];
                      return labels.map((item, idx) => {
                        const value = values[idx];
                        if (!value) return null;
                        let href = undefined;
                        if (item.type === 'phone') href = `http://wa.me/+51${value}`;
                        else if (item.type === 'link') href = value;
                        // Mostrar el correo real si está seleccionado
                        const showReal = showingContactIdx === idx && item.type === 'email';
                        if (item.type === 'email') {
                          return (
                            <div
                              key={item.label}
                              className="relative w-full flex flex-col items-center"
                            >
                              {copiedIdx === idx && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#a6249d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold z-50 animate-fade-in-out pointer-events-none">
                                  ¡Copiado!
                                </div>
                              )}
                              <button
                                type="button"
                                className="h-16 w-full rounded-xl flex items-center justify-center text-center transition-colors group bg-white/10 shadow-md border border-[#a6249d]/30 cursor-pointer select-none text-base font-semibold text-white backdrop-blur-sm"
                                onClick={() => {
                                  setShowingContactIdx(idx);
                                  if (navigator.clipboard) {
                                    navigator.clipboard.writeText(value);
                                    setCopiedIdx(idx);
                                    setTimeout(() => {
                                      setCopiedIdx(null);
                                    }, 600);
                                  }
                                }}
                                onBlur={() => {
                                  setShowingContactIdx(null);
                                  setCopiedIdx(null);
                                }}
                                onMouseLeave={() => {
                                  setShowingContactIdx(null);
                                  setCopiedIdx(null);
                                }}
                                tabIndex={0}
                              >
                                <span className="text-white group-hover:text-white text-center break-all px-2">
                                  {showReal ? value : item.label}
                                </span>
                              </button>
                            </div>
                          );
                        }
                        return (
                          <a
                            key={item.label}
                            href={href}
                            target={href ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="h-16 w-full rounded-xl flex items-center justify-center text-center transition-colors group bg-white/10 shadow-md border border-[#a6249d]/30 cursor-pointer select-none text-base font-semibold text-white backdrop-blur-sm"
                            tabIndex={0}
                          >
                            <span className="text-white group-hover:text-white text-center break-all px-2">
                              {item.label}
                            </span>
                          </a>
                        );
                      });
                    })()}
                  </div>
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
