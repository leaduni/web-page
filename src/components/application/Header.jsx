import React from 'react';
const Header = () => {
  return (
    <header className="w-full bg-[#1b0036] border-b border-[#1b0036] shadow-none flex flex-col">
      <div className="flex flex-row justify-between items-center px-8 py-3 max-w-7xl mx-auto w-full">
        {/* Logo alineado a la izquierda */}
        <div className="flex items-center space-x-2 select-none flex-shrink-0">
          <span className="font-extrabold text-xl" style={{ color: '#ff6ec7' }}>
            LEAD
          </span>
          <span className="font-extrabold text-xl text-white">UNI</span>
        </div>
        {/* Navegación alineada a la derecha */}
        <nav className="flex space-x-8 ml-auto">
          <a href="#" className="text-white font-semibold text-base hover:text-pink-400 transition">
            Inicio
          </a>
          <a href="#" className="text-white font-semibold text-base hover:text-pink-400 transition">
            Organigrama
          </a>
          <a href="#" className="text-white font-semibold text-base hover:text-pink-400 transition">
            Noticias
          </a>
          <a href="#" className="text-white font-semibold text-base hover:text-pink-400 transition">
            Pilares
          </a>
          <a href="#" className="text-white font-semibold text-base hover:text-pink-400 transition">
            Convocatoria
          </a>
          <a href="#" className="text-pink-400 font-bold text-base border-b-2 border-pink-400 pb-1">
            Noticias
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
