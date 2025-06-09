import React from 'react';
import { Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Logo = () => {
  const theme = useTheme();
  
  return (
    <div className="flex items-center space-x-2">
      <Zap size={24} color={theme.colors.primary} />
      <span className="font-bold text-lg text-white">
        LEAD<span className="text-gray-400">|UNI</span>
      </span>
    </div>
  );
};

export default Logo;