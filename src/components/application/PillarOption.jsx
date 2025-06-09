import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const PillarOption = ({ id, icon, selected, onClick }) => {
  const theme = useTheme();
  
  return (
    <button
      className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-2xl"
      style={{ 
        backgroundColor: selected ? theme.colors.primary : 'rgba(15, 2, 37, 0.7)',
        border: `2px solid ${selected ? theme.colors.primary : 'rgba(255, 110, 199, 0.3)'}`,
        boxShadow: selected
          ? '0 8px 24px 0 rgba(255, 110, 199, 0.35), 0 1.5px 4px 0 rgba(0,0,0,0.25)'
          : '0 4px 16px 0 rgba(0,0,0,0.18)',
        transform: selected ? 'translateY(-4px) scale(1.07) perspective(400px) rotateX(6deg)' : 'none',
      }}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default PillarOption;