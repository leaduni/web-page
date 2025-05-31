import { Link } from 'react-router-dom';

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
      <article className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 max-w-2xl">
        <div className="relative h-48 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime} de lectura</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
            {title}
          </h2>
          <p className="text-gray-300 line-clamp-3 mb-4">{description}</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
              {author.charAt(0)}
            </div>
            <span className="text-sm text-gray-400">{author}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
