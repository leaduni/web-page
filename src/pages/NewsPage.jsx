import { useState, useEffect } from 'react';
import { NewsCard } from '../components/news-card';
import { getAllNews } from '../services/newsService';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const newsData = await getAllNews();
        setNews(newsData);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);
  return (
    <main className="min-h-screen bg-[#1e0a2e]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">LEAD UNI Noticias</h1>
        <p className="text-gray-400 mb-8">
          Mantente informado sobre las últimas noticias y eventos de LEAD UNI
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-white">Cargando noticias...</div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center text-white">
            <p>No se encontraron noticias</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map(item => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
