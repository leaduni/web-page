import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPillarEmoji } from '../services/newsService';

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
          whileHover={{ scale: 1.02 }}
          className="group relative bg-black/30 backdrop-blur-sm rounded-3xl border border-purple-900/20 hover:border-purple-600/40 transition-all duration-500 hover:shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
        >
          {/* Imagen con estilos mejorados */}
          <div className="h-48 relative overflow-hidden rounded-t-3xl">
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={e => {
                e.target.src =
                  'https://drive.google.com/thumbnail?id=1FCypvIUp0nSbRiTCffFAuiHad9oudIvu&sz=w1000';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/30 to-black/30"></div>
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
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium bg-[#B936F5]/20 text-[#B936F5] border border-[#B936F5]/30`}
              >
                Noticias
              </span>
              <span className="text-sm text-white/60">{date}</span>
            </div>

            <h3 className="text-xl font-bold mb-3 text-[#B936F5]">{title}</h3>

            <p className="text-white/70 mb-4 line-clamp-2">{description}</p>

            {/* Tags de enfoque y público */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tagsEnfoque.slice(0, 3).map((tag, index) => (
                <span
                  key={`enfoque-${index}`}
                  className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-md text-xs font-medium border border-purple-600/30"
                >
                  {tag}
                </span>
              ))}
              {tagsPublico.slice(0, 2).map((tag, index) => (
                <span
                  key={`publico-${index}`}
                  className="px-2 py-1 bg-cyan-600/20 text-cyan-300 rounded-md text-xs font-medium border border-cyan-600/30"
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

          <div className="absolute rounded-3xl -inset-px bg-gradient-to-br from-[#B936F5] to-[#FF1CF7] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        </motion.div>
      </Link>
    </div>
  );
}
