import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNewsById, getPillarEmoji } from '../services/newsService';
import logoLeadUniNews from '../assets/logo-lead-uni-news.png';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Función para manejar carga de imagen con timeout
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = e => {
    console.log('🖼️ Error inicial en imagen, reintentando...');

    // Para imágenes de Google Drive, intentar diferentes formatos
    const currentSrc = e.target.src;

    if (currentSrc.includes('drive.google.com/thumbnail')) {
      // Si ya es thumbnail y falló, intentar con sz=w2000
      if (currentSrc.includes('sz=w1000')) {
        console.log('🔄 Reintentando con resolución mayor...');
        e.target.src = currentSrc.replace('sz=w1000', 'sz=w2000');
        return;
      }

      setTimeout(() => {
        if (!imageLoaded) {
          console.log('⚠️ Usando imagen de fallback definitiva');
          setImageError(true);
          e.target.src = logoLeadUniNews;
        }
      }, 1000);
    } else {
      // Para otras URLs, usar fallback directo
      console.log('⚠️ Error en imagen no-Google Drive, usando fallback');
      e.target.src = logoLeadUniNews;
    }
  };

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
        setTimeout(() => setShow(true), 5);
      }
    }

    fetchNewsItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(9,9,42)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Cargando...</h1>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen bg-[rgb(9,9,42)] flex items-center justify-center">
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
    <section className="min-h-screen w-full h-full bg-[rgb(9,9,42)]  border-0 text-white py-12">
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
              className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={() => setShowImageModal(true)}
            >
              {/* Indicador de carga */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
                </div>
              )}

              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute inset-0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Click para ampliar
                </span>
              </div>
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

      {/* Modal de imagen */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              className="relative max-w-7xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Botón de cerrar */}
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
              >
                <X size={24} />
              </button>

              {/* Imagen ampliada */}
              <div className="relative">
                {/* Indicador de carga para modal */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
                  </div>
                )}

                <img
                  src={newsItem?.imageUrl}
                  alt={newsItem?.title}
                  className={`max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  onError={e => {
                    console.log('🖼️ Error en imagen del modal, usando logo LEAD UNI');
                    e.target.src = logoLeadUniNews;
                  }}
                  loading="eager"
                />
              </div>

              {/* Título de la imagen */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
                <h3 className="text-lg font-semibold">{newsItem?.title}</h3>
                <p className="text-sm text-gray-300 mt-1">
                  {newsItem?.author} • {newsItem?.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
