import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface PillarOptionProps {
  id: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const PillarOption: React.FC<PillarOptionProps> = ({ id, icon, selected, onClick }) => {
  const theme = useTheme();
  
  return (
    <button
      className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105"
      style={{ 
        backgroundColor: selected ? theme.colors.primary : 'rgba(15, 2, 37, 0.7)',
        border: `2px solid ${selected ? theme.colors.primary : 'rgba(255, 110, 199, 0.3)'}`,
        boxShadow: selected ? '0 0 15px rgba(255, 110, 199, 0.5)' : 'none'
      }}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default PillarOption;