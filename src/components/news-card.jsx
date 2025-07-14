import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getPillarEmoji } from '../services/newsService';
import logoLeadUniNews from '../assets/logo-lead-uni-news.png';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export function NewsCard({
  id,
  title,
  description,
  date,
  readTime,
  author,
  imageUrl,
  category = 'Noticias',
  pillars = [],
  tagsContenido = [],
  tagsEnfoque = [],
  tagsPublico = [],
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Función para manejar carga de imagen con timeout
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = e => {
    console.log('🖼️ Error inicial en imagen de NewsCard, reintentando...');

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
          console.log('⚠️ Usando imagen de fallback definitiva en NewsCard');
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
  return (
    <div className="relative">
      {/* Tooltips posicionados fuera del componente principal */}
      {pillars.length > 0 && (
        <div className="absolute top-0 left-4 z-50 pointer-events-none">
          {pillars.map((pillar, index) => (
            <div
              key={`tooltip-${index}`}
              className="absolute px-3 py-2 bg-black/95 backdrop-blur-sm text-white text-sm rounded-lg border border-white/20 shadow-2xl opacity-0 transition-all duration-300 ease-out scale-95 whitespace-nowrap"
              style={{
                left: `${15 + index * 44}px`, // Posición basada en el índice del icono
                top: '-45px', // Arriba de los iconos
                transform: 'translateX(-50%)',
              }}
              data-tooltip={`${id}-${index}`} // Identificador único por tarjeta y pilar
            >
              {pillar}
              {/* Flecha del tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95"></div>
            </div>
          ))}
        </div>
      )}

      <Link to={`/news/${id}`} className="group">
        <motion.div
          key={id}
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          className="group relative bg-[#1A0B2E]/90 backdrop-blur-md rounded-3xl border-2 border-[#a6249d]/40 hover:border-[#d93340]/70 shadow-lg shadow-pink-900/20 transition-all duration-500 hover:shadow-[0_8px_30px_-5px_rgba(217,51,64,0.25)]"
        >
          {/* Imagen con estilos mejorados */}
          <div className="h-48 relative overflow-hidden rounded-t-3xl">
            {/* Indicador de carga */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d93340]"></div>
              </div>
            )}

            <img
              src={imageUrl}
              alt={title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#d93340]/10 via-[#a6249d]/10 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#B936F5]/10 via-[#FF1CF7]/10 to-[#00F0FF]/10 group-hover:opacity-30 transition-opacity duration-500"></div>

            {/* Emojis de pilares en la esquina superior izquierda */}
            {pillars.length > 0 && (
              <div className="absolute top-3 left-3 flex gap-1 z-30">
                {pillars.map((pillar, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg hover:bg-black/80 hover:scale-110 transition-all duration-200 relative group/pillar"
                    onMouseEnter={() => {
                      // Mostrar tooltip correspondiente usando ID único
                      const tooltip = document.querySelector(`[data-tooltip="${id}-${index}"]`);
                      if (tooltip) {
                        tooltip.style.opacity = '1';
                        tooltip.style.transform = 'translateX(-50%) scale(1)';
                      }
                    }}
                    onMouseLeave={() => {
                      // Ocultar tooltip correspondiente usando ID único
                      const tooltip = document.querySelector(`[data-tooltip="${id}-${index}"]`);
                      if (tooltip) {
                        tooltip.style.opacity = '0';
                        tooltip.style.transform = 'translateX(-50%) scale(0.95)';
                      }
                    }}
                  >
                    <span className="text-xl leading-none">{getPillarEmoji(pillar)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tags de contenido en la esquina superior derecha */}
            {tagsContenido.length > 0 && (
              <div className="absolute top-3 right-3 flex flex-wrap gap-1 max-w-[120px]">
                {tagsContenido.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white/90 font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {tagsContenido.length > 2 && (
                  <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white/70">
                    +{tagsContenido.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-[#2d0a2e]/80 to-[#a6249d]/80 text-white border border-[#a6249d]/60 shadow-sm transition-all duration-200">
                Noticias
              </span>
              <span className="text-sm text-white/60">{date}</span>
            </div>

            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text">
              {title}
            </h3>

            <p className="text-white/70 mb-4 line-clamp-2">{description}</p>

            {/* Tags de enfoque y público */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tagsEnfoque.slice(0, 3).map((tag, index) => (
                <span
                  key={`enfoque-${index}`}
                  className="px-2 py-1 bg-gradient-to-r from-[#2d0a2e]/80 to-[#a6249d]/80 text-white rounded-md text-xs font-bold border border-[#d93340]/60 shadow-sm transition-all duration-700 ease-in-out hover:from-[#d93340]/90 hover:to-[#a6249d]/90 hover:text-white hover:shadow-lg active:scale-95 active:bg-[#d93340]"
                >
                  {tag}
                </span>
              ))}
              {tagsPublico.slice(0, 2).map((tag, index) => (
                <span
                  key={`publico-${index}`}
                  className="px-2 py-1 bg-gradient-to-r from-[#0a2d2e]/80 to-[#00F0FF]/80 text-white rounded-md text-xs font-bold border border-[#00F0FF]/60 shadow-sm transition-all duration-700 ease-in-out hover:from-[#00F0FF]/90 hover:to-[#a6249d]/90 hover:text-white hover:shadow-lg active:scale-95 active:bg-[#00F0FF]"
                >
                  {tag}
                </span>
              ))}
              {(tagsEnfoque.length > 3 || tagsPublico.length > 2) && (
                <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-md text-xs">
                  ...
                </span>
              )}
            </div>

            <div className="flex justify-between w-full text-white/70 items-center">
              <span className="flex items-center gap-1">
                <span className="font-medium">{readTime}</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="font-medium">Escrito por {author}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="absolute rounded-3xl -inset-px bg-gradient-to-br from-[#a6249d]/30 via-[#d93340]/20 to-[#FF1CF7]/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
        </motion.div>
      </Link>
    </div>
  );
}
