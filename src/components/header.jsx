import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HEADER_HEIGHT = 72; // px

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 min-h-[${HEADER_HEIGHT}px] transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1A0B2E]/90 backdrop-blur-md shadow-lg shadow-purple-900/20'
          : 'bg-transparent'
      }`}
      style={{ minHeight: `${HEADER_HEIGHT}px` }}
    >
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-pink-400 tracking-tight hover:text-pink-300 transition-colors"
        >
          LEAD UNI
        </Link>
        <nav className="flex gap-8">
          <Link to="/" className="text-white hover:text-[#FF1CF7] transition-colors font-medium">
            Inicio
          </Link>
          <Link to="/organization" className="text-white hover:text-[#FF1CF7] transition-colors font-medium">
            Organigrama
          </Link>
          <Link to="/news" className="text-white hover:text-[#FF1CF7] transition-colors font-medium">
            Noticias
          </Link>
          <Link to="/pillars" className="text-white hover:text-[#FF1CF7] transition-colors font-medium">
            Pilares
          </Link>
          <Link to="/application" className="text-white hover:text-[#FF1CF7] transition-colors font-medium">
            Convocatoria
          </Link>
        </nav>
      </div>
    </header>
  );
}