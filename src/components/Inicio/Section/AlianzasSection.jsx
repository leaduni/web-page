import React from 'react';
import { motion } from 'framer-motion';

const alianzas = [
  {
    id: 1,
    nombre: 'Google'
  },
  {
    id: 2,
    nombre: 'Cisco'
  },
  {
    id: 3,
    nombre: 'IBM'
  },
  {
    id: 4,
    nombre: 'Intel'
  }
];

export const AlianzasSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="relative min-h-screen bg-[#1A0B2E] py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#B936F5]/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#00F0FF]/5 via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-transparent bg-clip-text">
              Nuestras Alianzas
            </span>
          </h2>
          <p className="text-white/80 text-base max-w-2xl mx-auto">
            Colaboramos con organizaciones y empresas para potenciar el desarrollo de nuestros miembros.
          </p>
        </div>

        {/* Alianzas Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {alianzas.map((alianza) => (
            <motion.div
              key={alianza.id}
              variants={itemVariants}
              className="group relative bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-purple-900/20 hover:border-purple-600/40 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-[#B936F5] to-[#FF1CF7] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
              <div className="h-32 flex flex-col items-center justify-between">
                <div className="flex-1 flex items-center justify-center">
                  {/* Espacio para futura imagen */}
                </div>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                <div className="mt-4">
                  <span className="text-sm bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] bg-clip-text text-transparent font-medium">
                    {alianza.nombre}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 