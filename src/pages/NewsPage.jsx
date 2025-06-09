import { useState, useEffect, useMemo } from 'react';
import { NewsCard } from '../components/news-card';
import { getAllNews } from '../services/newsService';
import { Search, Filter } from 'lucide-react';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Extraer todas las categorías únicas de las noticias
  const categories = useMemo(() => {
    if (!news.length) return [];
    return ['Todas', ...new Set(news.map(item => item.category))];
  }, [news]);

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

  // Filtrar noticias según búsqueda y categoría
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === '' ||
        selectedCategory === 'Todas' ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [news, searchTerm, selectedCategory]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage]);

  // Resetear página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Manejar cambio de página
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#1e0a2e]">
      <div className="container mx-auto px-4 py-12">
        {' '}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-primary text-white mb-3">LEAD UNI Noticias</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Mantente informado sobre las últimas noticias y eventos de LEAD UNI
          </p>

          {/* Buscador y filtros */}
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 pl-10 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative min-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 pl-10 pr-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="">Todas las categorías</option>
                {categories.map(
                  category =>
                    category !== 'Todas' && (
                      <option
                        className="bg-black rounded-md p-1 text-sm "
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                )}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>{' '}
          </div>

          {/* Indicador de resultados */}
          {!loading && filteredNews.length > 0 && (
            <div className="text-center text-purple-300 text-sm mt-2">
              Mostrando {filteredNews.length} resultado{filteredNews.length !== 1 ? 's' : ''}
              {selectedCategory && selectedCategory !== 'Todas' ? ` en ${selectedCategory}` : ''}
              {searchTerm ? ` para "${searchTerm}"` : ''}
            </div>
          )}
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-white">Cargando noticias...</div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center text-white">
            <p>No se encontraron noticias</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center text-white py-16">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-purple-500/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-xl">No se encontraron resultados para tu búsqueda</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="mt-4 px-4 py-2 rounded-md bg-purple-600/50 text-white hover:bg-purple-600 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedNews.map(item => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
        )}{' '}
        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16">
            <nav className="inline-flex items-center rounded-lg bg-purple-900/20 p-1.5 border border-purple-500/30">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 mx-1 rounded-md ${
                  currentPage === 1
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-white hover:bg-purple-600/30'
                } transition-colors`}
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                // Mostrar los números de página cercanos a la página actual
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 flex items-center justify-center rounded-md mx-1 ${
                        currentPage === pageNum
                          ? 'bg-purple-600 text-white'
                          : 'text-white hover:bg-purple-600/30'
                      } transition-colors`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === currentPage - 2 && currentPage > 3) ||
                  (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  // Mostrar puntos suspensivos
                  return (
                    <span key={pageNum} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 mx-1 rounded-md ${
                  currentPage === totalPages
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-white hover:bg-purple-600/30'
                } transition-colors`}
              >
                Siguiente
              </button>
            </nav>
          </div>
        )}
      </div>
    </main>
  );
}
