import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNewsById, getPillarEmoji } from '../services/newsService';
import { Footer } from '../components/footer';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    async function fetchNewsItem() {
      try {
        setLoading(true);
        const data = await getNewsById(id);
        if (data) {
          setNewsItem(data);
        } else {
          setError('Noticia no encontrada');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Error al cargar la noticia');
      } finally {
        setLoading(false);
        // Iniciar animación después de cargar los datos
        setTimeout(() => setShow(true), 60);
      }
    }

    fetchNewsItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e0a2e] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Cargando...</h1>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen bg-[#1e0a2e] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{error || 'Noticia no encontrada'}</h1>
          <Link to="/" className="text-purple-400 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#1A0B2E] via-[#2D1B4E] to-[#1A0B2E] text-white py-12">
      <AnimatePresence>
        {show && (
          <motion.div
            key="news-detail"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl mx-auto px-4"
          >
            <div className="mb-4 text-center">
              <Link
                to="/news"
                className="text-purple-300 hover:underline text-sm transition-colors"
              >
                Noticias / LEAD News
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-pink-400 mb-4 leading-tight transition-colors">
              {newsItem.title}
            </h1>

            {/* Pilares con emojis */}
            {newsItem.pillars && newsItem.pillars.length > 0 && (
              <div className="flex justify-center gap-3 mb-6">
                {newsItem.pillars.map((pillar, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30"
                  >
                    <span className="text-xl">{getPillarEmoji(pillar)}</span>
                    <span className="text-purple-300 font-medium text-sm">{pillar}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="flex items-center gap-2 text-white">
                <User className="w-5 h-5" />
                <span className="font-semibold">Escrito por {newsItem.author}</span>
              </div>
              <div className="flex items-center gap-4 text-purple-200">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{newsItem.readTime}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{newsItem.date}</span>
                </span>
              </div>
            </div>

            <motion.div
              className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                onError={e => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>

            <motion.article
              className="prose prose-invert max-w-none text-lg mx-auto mb-12 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />

            {/* Sección de Tags mejorada */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
            >
              <div className="grid gap-6 md:grid-cols-3">
                {/* Tags de Contenido */}
                {newsItem.tagsContenido && newsItem.tagsContenido.length > 0 && (
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                    <h4 className="text-lg font-semibold text-white mb-3">Contenido</h4>
                    <div className="flex flex-wrap gap-2">
                      {newsItem.tagsContenido.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-600/30 text-gray-300 rounded-full text-sm border border-gray-600/50 cursor-pointer hover:bg-gray-600/50 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags de Enfoque */}
                {newsItem.tagsEnfoque && newsItem.tagsEnfoque.length > 0 && (
                  <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-700/30 hover:border-purple-600/50 transition-all duration-300">
                    <h4 className="text-lg font-semibold text-purple-200 mb-3">Enfoque</h4>
                    <div className="flex flex-wrap gap-2">
                      {newsItem.tagsEnfoque.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm border border-purple-600/50 cursor-pointer hover:bg-purple-600/50 hover:text-purple-100 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags de Público */}
                {newsItem.tagsPublico && newsItem.tagsPublico.length > 0 && (
                  <div className="bg-cyan-800/30 rounded-lg p-4 border border-cyan-700/30 hover:border-cyan-600/50 transition-all duration-300">
                    <h4 className="text-lg font-semibold text-cyan-200 mb-3">Público</h4>
                    <div className="flex flex-wrap gap-2">
                      {newsItem.tagsPublico.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-cyan-600/30 text-cyan-300 rounded-full text-sm border border-cyan-600/50 cursor-pointer hover:bg-cyan-600/50 hover:text-cyan-100 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col items-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </section>
  );
}
