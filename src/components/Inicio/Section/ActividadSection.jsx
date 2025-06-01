import React from 'react';
import { motion } from 'framer-motion';

const actividades = [
  {
    id: 1,
    tipo: 'Evento',
    titulo: 'Workshop de Liderazgo Efectivo',
    descripcion: 'Taller práctico sobre habilidades de liderazgo y trabajo en equipo con ejercicios dinámicos.',
    fecha: '15 de Mayo, 2025'
  },
  {
    id: 2,
    tipo: 'Noticia',
    titulo: 'LEAD UNI recibe reconocimiento institucional',
    descripcion: 'Nuestro centro estudiantil fue reconocido por su contribución a la comunidad universitaria.',
    fecha: '10 de Mayo, 2025'
  },
  {
    id: 3,
    tipo: 'Proyecto',
    titulo: 'Lanzamiento del programa de mentoría 2025',
    descripcion: 'Iniciamos nuestro programa anual de mentorías para conectar estudiantes con profesionales experimentados.',
    fecha: '5 de Mayo, 2025'
  }
];

export const ActividadSection = () => {
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
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const getBadgeColor = (tipo) => {
    switch (tipo) {
      case 'Evento':
        return 'bg-[#B936F5]/20 text-[#B936F5] border border-[#B936F5]/30';
      case 'Noticia':
        return 'bg-[#FF1CF7]/20 text-[#FF1CF7] border border-[#FF1CF7]/30';
      case 'Proyecto':
        return 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30';
      default:
        return 'bg-purple-900/20 text-purple-300 border border-purple-300/30';
    }
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
          <motion.h2 
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-[#B936F5]/80 to-[#FF1CF7]/80 text-transparent bg-clip-text">
              Actividad Reciente
            </span>
          </motion.h2>
          <motion.p 
            className="text-white/60 text-base max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Conoce los últimos eventos, proyectos y noticias de LEAD UNI.
          </motion.p>
        </div>

        {/* Actividades Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {actividades.map((actividad) => (
            <motion.div
              key={actividad.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-black/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-900/20 hover:border-purple-600/40 transition-all duration-500 hover:shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
            >
              {/* Placeholder para imagen con gradiente animado */}
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/30 to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#B936F5]/10 via-[#FF1CF7]/10 to-[#00F0FF]/10 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(actividad.tipo)}`}>
                    {actividad.tipo}
                  </span>
                  <span className="text-sm text-white/60">
                    {actividad.fecha}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-[#B936F5]">
                  {actividad.titulo}
                </h3>

                <p className="text-white/70 mb-4 line-clamp-2">
                  {actividad.descripcion}
                </p>

                <button className="text-[#B936F5] hover:text-[#FF1CF7] transition-colors duration-300 font-medium">
                  Leer más →
                </button>
              </div>

              <div className="absolute -inset-px bg-gradient-to-br from-[#B936F5] to-[#FF1CF7] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 