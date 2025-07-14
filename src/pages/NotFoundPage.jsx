import { Link } from 'react-router';
import { Users, Newspaper, Target, ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[rgb(9,9,42)] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¡Oops! Te has perdido</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-8">
            Parece que la página que buscas no existe o ha sido movida. Pero no te preocupes, te
            ayudamos a encontrar tu camino de vuelta.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Organization Link */}
          <Link
            to="/organization"
            className="group bg-[#1A0B2E] border border-[#a6249d]/40 rounded-xl p-6 hover:bg-[#36042f] hover:border-[#a6249d] transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-900/10"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-gradient-to-r from-[#d93340] to-[#a6249d] p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Organización</h3>
              <p className="text-gray-400 text-sm text-center group-hover:text-gray-300 transition-colors">
                Conoce a nuestro increíble equipo y estructura organizacional
              </p>
            </div>
          </Link>

          {/* News Link */}
          <Link
            to="/news"
            className="group bg-[#1A0B2E] border border-[#a6249d]/40 rounded-xl p-6 hover:bg-[#36042f] hover:border-[#a6249d] transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-900/10"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-gradient-to-r from-[#d93340] to-[#a6249d] p-3 rounded-full">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Noticias</h3>
              <p className="text-gray-400 text-sm text-center group-hover:text-gray-300 transition-colors">
                Mantente al día con las últimas novedades y eventos de LEAD UNI
              </p>
            </div>
          </Link>

          {/* Pillars Link */}
          <Link
            to="/pillars"
            className="group bg-[#1A0B2E] border border-[#a6249d]/40 rounded-xl p-6 hover:bg-[#36042f] hover:border-[#a6249d] transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-900/10"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-gradient-to-r from-[#d93340] to-[#a6249d] p-3 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Pilares</h3>
              <p className="text-gray-400 text-sm text-center group-hover:text-gray-300 transition-colors">
                Descubre los pilares fundamentales que guían nuestra misión
              </p>
            </div>
          </Link>
        </div>

        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#36042f] hover:text-[#ff6ec7] transition-all duration-300 shadow-lg shadow-pink-900/20"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Volver al Inicio</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
