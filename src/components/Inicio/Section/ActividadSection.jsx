import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllNews } from '../../../services/newsService';
import { NewsCard } from '../../news-card';

export const ActividadSection = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener las 3 noticias más recientes
  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        setLoading(true);
        const allNews = await getAllNews();
        // Obtener solo las 3 más recientes
        const recentNews = allNews.slice(0, 3);
        setNoticias(recentNews);
      } catch (err) {
        console.error('Error al cargar noticias:', err);
        setError('No se pudieron cargar las noticias');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentNews();
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full bg-[rgb(9,9,42)] py-12 sm:py-16 lg:py-24 overflow-hidden border-0">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0B2E] via-[#2D1B4E]/80 to-[#1A0B2E] opacity-90"></div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Actividad Reciente
          </motion.h2>
          <motion.p
            className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Conoce los últimos eventos, proyectos y noticias de LEAD UNI.
          </motion.p>
        </div>

        {/* Actividades Grid */}
        {loading ? (
          // Estado de carga
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map(skeleton => (
              <div
                key={skeleton}
                className="bg-black/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-900/20 animate-pulse"
              >
                <div className="h-48 bg-gradient-to-br from-purple-900/30 via-black/30 to-black/30"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-6 w-20 bg-purple-600/30 rounded-full"></div>
                    <div className="h-4 w-24 bg-white/20 rounded"></div>
                  </div>
                  <div className="h-6 w-3/4 bg-purple-600/30 rounded mb-3"></div>
                  <div className="h-4 w-full bg-white/10 rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-white/10 rounded mb-4"></div>
                  <div className="h-4 w-20 bg-purple-600/30 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Estado de error
          <div className="text-center py-12">
            <div className="text-red-400 mb-4 text-lg">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="text-[#B936F5] hover:text-[#FF1CF7] transition-colors duration-300 font-medium"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : (
          // Noticias cargadas usando NewsCard
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {noticias.map(noticia => (
              <NewsCard key={noticia.id} imageUrl={noticia.imageUrl} {...noticia} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
