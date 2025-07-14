import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../assets/logo-lead.jpg';
export const HEADER_HEIGHT = 72;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/organization', label: 'Organigrama' },
    { path: '/news', label: 'Noticias' },
    { path: '/pillars', label: 'Pilares' },
    { path: '/application', label: 'Convocatoria' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all  duration-500 shadow shadow-[#1A0B2E] ${
        isScrolled
          ? 'bg-[#1A0B2E]/85 backdrop-blur-xl border-b border-[#a6249d]/30  shadow-[#a6249d]/20'
          : 'bg-transparent '
      }`}
      style={{ minHeight: `${HEADER_HEIGHT}px` }}
    >
      <div className="container mx-auto px-6 md:px-8 pt-4 flex justify-between items-center">
        {' '}
        <Link to="/" className="group relative flex items-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#a6249d]/30 group-hover:border-[#d93340]/50 transition-all items-center duration-300">
              <img
                src={logoImage}
                alt="LEAD UNI Logo"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#a6249d]/20 via-transparent to-[#d93340]/30 group-hover:opacity-0 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#d93340] via-[#a6249d] to-[#d93340] group-hover:from-[#ff6ec7] group-hover:via-[#d93340] group-hover:to-[#ff6ec7] transition-all duration-300">
              LEAD UNI
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#d93340] to-[#a6249d] group-hover:w-full transition-all duration-300"></span>
          </motion.div>
        </Link>
        {/* Navegación para pantallas medianas y grandes */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <NavLink key={link.path} to={link.path} active={location.pathname === link.path}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        {/* Botón del menú móvil */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#ff6ec7] focus:outline-none focus:ring-2 focus:ring-[#a6249d]/50 focus:ring-offset-1 focus:ring-offset-[#a6249d]/20 rounded-lg transition-colors"
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {mobileMenuOpen ? <X size={24} className="text-[#ff6ec7]" /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1A0B2E]/95 backdrop-blur-xl border-t border-[#a6249d]/30"
          >
            <div className="container mx-auto px-6 py-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-bold px-4 py-3 rounded-lg transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-[#a6249d]/30 to-[#d93340]/30 text-[#ff6ec7] border-l-4 border-[#d93340]'
                        : 'text-white hover:bg-[#a6249d]/20 hover:text-[#ff6ec7]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Componente para los enlaces de navegación
function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 mx-1 font-bold text-sm rounded-lg overflow-hidden transition-all duration-300 group`}
    >
      <span
        className={`relative z-10 transition-colors duration-300 ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}
      >
        {children}
      </span>
      {active ? (
        <motion.span
          layoutId="bubble"
          className="absolute inset-0 bg-gradient-to-r from-[#d93340] to-[#a6249d] -z-0"
          style={{ borderRadius: '8px' }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      ) : (
        <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[#a6249d]/20 transition-opacity duration-300 -z-0" />
      )}
    </Link>
  );
}
