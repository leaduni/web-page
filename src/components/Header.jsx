import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#1e0a2e] border-b border-purple-900/40 py-4 px-6 flex items-center justify-between shadow-sm">
      <NavLink
        to="/"
        className="text-2xl font-extrabold text-pink-400 tracking-tight hover:text-pink-300 transition-colors"
      >
        LEAD UNI
      </NavLink>
      <nav className="flex gap-6">
        <NavLink to="/" className="text-white hover:text-pink-400 font-medium transition-colors">
          Inicio
        </NavLink>
        <NavLink to="/organigrama" className="text-white hover:text-pink-400 font-medium transition-colors">
          Organigrama
        </NavLink>
        <NavLink to="/noticias" className="text-white hover:text-pink-400 font-medium transition-colors">
          Noticias
        </NavLink>
        <NavLink to="/pillars" className="text-white hover:text-pink-400 font-medium transition-colors">
          Pilares
        </NavLink>
        <NavLink to="/convocatoria" className="text-white hover:text-pink-400 font-medium transition-colors">
          Convocatoria
        </NavLink>
      </nav>
    </header>
  );
}


export default Header; 