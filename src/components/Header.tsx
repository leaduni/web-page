import React from 'react';
import { UserCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const theme = useTheme();
  
  return (
    <header className="flex justify-between items-center p-4 w-full">
      <Logo />
      
      <nav className="hidden md:flex space-x-8">
        <NavLink href="#" label="Inicio" />
        <NavLink href="#" label="Noticias" />
        <NavLink href="#" label="Convocatoria" active />
      </nav>
      
      <button 
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <UserCircle size={24} color={theme.colors.text.dark} />
      </button>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, active }) => {
  const theme = useTheme();
  
  return (
    <a 
      href={href}
      className={`text-${active ? 'white' : 'white/80'} hover:text-white transition-colors duration-200 text-sm font-medium`}
      style={{ 
        borderBottom: active ? `2px solid ${theme.colors.primary}` : 'none',
        paddingBottom: '0.25rem'
      }}
    >
      {label}
    </a>
  );
};

export default Header;