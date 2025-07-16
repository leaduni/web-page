import React from 'react';
import { motion } from 'framer-motion';

// Alianzas de respaldo si el API falla
const alianzasDeRespaldo = [
  {
    'Nombre de la organización': 'CIS UNI',
    'Objetivo de la alianza':
      'Impulsar proyectos y relaciones públicas mediante actividades conjuntas como workshops, capacitaciones y webinars, alineadas a los objetivos comunes de IEEE CIS UNI y LEAD UNI.',
    'Logo de la organización': 'https://i.postimg.cc/HLbVyGfM/cis.png',
  },
  {
    'Nombre de la organización': 'INSPÍRATE UNI',
    'Objetivo de la alianza':
      'Alianza estratégica para impulsar innovación y liderazgo a través de actividades que inspiran, conectan y transforman.',
    'Logo de la organización': 'https://i.postimg.cc/xT6TrL7J/inspirate.png',
  },
  {
    'Nombre de la organización': 'Rama Estudiantil IEEE UNI',
    'Objetivo de la alianza':
      'Impulsar el crecimiento integral de los estudiantes, promoviendo espacios de formación, liderazgo e innovación mediante actividades conjuntas que generen impacto dentro y fuera de la universidad.',
    'Logo de la organización': 'https://i.postimg.cc/C54XqHDj/ieee-rama.png',
  },
];

export const AlianzasSection = () => {
  const alianzas = alianzasDeRespaldo;
  const loading = false;
  const error = null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section className="relative min-h-screen bg-[rgb(9,9,42)] py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[rgb(9,9,42)]"></div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text">
            Alianzas Estratégicas
          </h2>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 text-center">
            Conoce a las organizaciones y empresas que colaboran con LEAD UNI para potenciar el
            impacto estudiantil.
          </p>
        </div>

        {/* Loading/Error */}
        {loading && <div className="text-center text-white/60">Cargando alianzas...</div>}
        {error && <div className="text-center text-red-400">{error}</div>}

        {/* Alianzas Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {alianzas.map((alianza, idx) => {
            let logoUrl = alianza['Logo de la organización'];
            if (logoUrl && logoUrl.includes('drive.google.com/open?id=')) {
              const fileId = logoUrl.split('id=')[1];
              logoUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
            }

            return (
              <motion.div
                key={alianza.id || idx}
                variants={itemVariants}
                className="group relative bg-[#1A0B2E]/90 backdrop-blur-lg rounded-3xl p-3 px-1 sm:p-6 sm:px-6 md:p-8 md:px-8 border border-[#a6249d]/40 shadow-[0_8px_30px_-5px_rgba(34,48,91,0.2)] hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center w-full max-w-[270px] sm:max-w-sm h-56 sm:h-72 md:h-96 overflow-hidden mx-auto"
              >
                {alianza['Objetivo de la alianza'] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 p-4 sm:p-6 rounded-3xl">
                    <span className="text-white text-center text-xs sm:text-base font-normal leading-relaxed px-3 py-2 break-words whitespace-pre-line rounded-xl bg-black/40 shadow-inner">
                      {alianza['Objetivo de la alianza']}
                    </span>
                  </div>
                )}
                <div className="absolute -inset-px bg-gradient-to-br from-[#B936F5] to-[#FF1CF7] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl z-10"></div>
                <div className="flex flex-col items-center w-full z-10 flex-1 justify-center justify-items-center text-center">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 flex items-center justify-center mb-3 sm:mb-4 mx-auto mx-auto">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={alianza['Nombre de la organización']}
                        className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain border-2 border-purple-400 bg-white shadow-md rounded-xl"
                      />
                    ) : (
                      <div className="w-36 h-36 bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-300 text-4xl font-bold">
                        {alianza['Nombre de la organización']?.[0] || '?'}
                      </div>
                    )}
                  </div>
                  <span className="text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent font-extrabold text-center block w-full mt-2 mb-3 sm:mb-2 mx-auto drop-shadow-[0_1px_4px_rgba(34,48,91,0.7)]">
                    {alianza['Nombre de la organización']}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
