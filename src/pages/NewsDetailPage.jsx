import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNewsById } from '../services/newsService';

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
    <main className="min-h-screen bg-gradient-to-b from-[#1e0a2e] to-[#3a0a3d]">
      <AnimatePresence>
        {show && (
          <motion.div
            key="news-detail"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl mx-auto px-4 py-12"
          >
            <div className="mb-8">
              <Link
                to="/news"
                className="text-purple-300 hover:underline text-sm transition-colors"
              >
                Noticias / LEAD News
              </Link>
            </div>
            <h1 className="text-5xl font-extrabold text-center text-pink-400 mb-4 leading-tight transition-colors">
              {newsItem.title}
            </h1>
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
              />
            </motion.div>
            <motion.article
              className="prose prose-invert max-w-none text-lg mx-auto mb-12 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
            <motion.div
              className="flex flex-col items-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
            >
              <div className="w-full max-w-xl border-2 border-purple-300 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#1e0a2e] transition-shadow duration-300 hover:shadow-purple-700/30">
                <span className="text-2xl font-bold text-white">¿Más Información?</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-3 rounded-md border-2 border-white transition-all duration-300 focus:ring-2 focus:ring-pink-400 focus:outline-none">
                  Suscribirse
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
