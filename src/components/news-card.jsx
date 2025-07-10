import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
}) {
  return (
    <Link to={`/news/${id}`} className="group">
      <motion.div
        key={id}
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="group relative bg-black/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-purple-900/20 hover:border-purple-600/40 transition-all duration-500 hover:shadow-[0_8px_30px_-5px_rgba(147,51,234,0.3)]"
      >
        {/* Imagen con estilos mejorados */}
        <div className="h-48 relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={e => {
              e.target.src =
                'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/30 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#B936F5]/10 via-[#FF1CF7]/10 to-[#00F0FF]/10 group-hover:opacity-30 transition-opacity duration-500"></div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium bg-[#B936F5]/20 text-[#B936F5] border border-[#B936F5]/30`}
            >
              {category}
            </span>
            <span className="text-sm text-white/60">{date}</span>
          </div>

          <h3 className="text-xl font-bold mb-3 text-[#B936F5]">{title}</h3>

          <p className="text-white/70 mb-4 line-clamp-2">{description}</p>

          <div className="flex justify-between w-full text-white/70 items-center mb-4">
            <span className="flex items-center gap-1">
              <span className="font-medium">{readTime}</span>
            </span>
            <div className="flex items-center gap-2 ">
              <span className="flex items-center gap-1">
                <span className="font-medium">Escrito por {author}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="absolute -inset-px bg-gradient-to-br from-[#B936F5] to-[#FF1CF7] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      </motion.div>
    </Link>
  );
}
