import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const PillarOption = ({ id, image, alt, selected, onClick }) => {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Colores propuestos
  const normalBg = 'rgba(30, 6, 60, 0.85)';
  const selectedBg = 'linear-gradient(135deg, #d93340 60%, #a6249d 100%)';
  const normalBorder = 'rgba(166, 36, 157, 0.5)';
  const selectedBorder = '#ec46e1';

  return (
    <button
      className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-xl overflow-visible relative ${selected ? 'ring-4 ring-[#ec46e1] scale-110' : ''}`}
      style={{
        background: selected ? selectedBg : normalBg,
        border: `2.5px solid ${selected ? selectedBorder : normalBorder}`,
        boxShadow: selected
          ? '0 8px 32px 0 rgba(220, 70, 225, 0.25), 0 2px 8px 0 rgba(0,0,0,0.18)'
          : '0 2px 8px 0 rgba(166, 36, 157, 0.10)',
        transform: selected
          ? 'translateY(-6px) scale(1.10) perspective(400px) rotateX(4deg)'
          : 'none',
      }}
      onClick={onClick}
    >
      {!imageError ? (
        <img 
          src={image} 
          alt={alt}
          className="w-16 h-16 object-contain"
          onError={handleImageError}
        />
      ) : (
        <div 
          className="w-10 h-10 flex items-center justify-center text-[#a6249d] font-bold text-xl"
        >
          {id.charAt(0).toUpperCase()}
        </div>
      )}
    </button>
  );
};

export default PillarOption;
