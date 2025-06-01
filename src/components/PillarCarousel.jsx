
import React, { useState, useEffect } from 'react';
const PillarCarousel = ({ pillars, selectedPillar, onSelectPillar }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rotateCarousel = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % pillars.length 
      : (currentIndex - 1 + pillars.length) % pillars.length;
    setCurrentIndex(newIndex); 
  };
  useEffect(() => {
    if (selectedPillar) {
      const index = pillars.findIndex(p => p.id === selectedPillar.id);
      if (index !== -1) setCurrentIndex(index);
    }
  }, [selectedPillar]);
  return (
    <div className="carousel-container relative h-[400px] w-full overflow-hidden perspective">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => rotateCarousel('prev')}
          className="bg-purple-600/30 hover:bg-purple-600/50 p-3 rounded-full transition-all"
        >
          ←
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => rotateCarousel('next')}
          className="bg-purple-600/30 hover:bg-purple-600/50 p-3 rounded-full transition-all"
        >
          →
        </button>
      </div>
      <div 
        className="carousel relative w-full h-full transform-style-3d transition-transform duration-500"
        style={{
          transform: `rotateY(${currentIndex * -(360 / pillars.length)}deg)`,
        }}
      >
        {pillars.map((pillar, index) => {
          const angle = (360 / pillars.length) * index;
          const radius = 300; // Adjust this value to change the circle size
          
          return (
            <div
              key={pillar.id}
              className={`carousel-item absolute left-1/2 top-1/2 w-64 h-64 -ml-32 -mt-32 transition-all duration-300
                ${selectedPillar?.id === pillar.id ? 'scale-110' : 'scale-100'}`}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
            >
              <button
                onClick={() => onSelectPillar(pillar)}
                className={`w-full h-full flex flex-col items-center justify-center p-6 rounded-xl backdrop-blur-sm
                  ${selectedPillar?.id === pillar.id 
                    ? 'bg-gradient-to-r from-purple-800/80 to-pink-800/80 shadow-lg' 
                    : 'bg-purple-900/30 hover:bg-purple-800/50'
                  }`}
              >
                <div className={`p-4 rounded-full mb-3 text-4xl ${
                  selectedPillar?.id === pillar.id ? 'bg-pink-700/50' : 'bg-purple-700/30'
                }`}>
                  {pillar.emoji}
                </div>

                <span className="text-lg font-medium text-center">{pillar.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PillarCarousel; 

