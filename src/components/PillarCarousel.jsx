import React, { useState, useEffect } from 'react';

export function PillarCarouselNavigation({ pillars, currentIndex, setCurrentIndex }) {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-8 mb-4">
      <div className="flex items-center text-white/60 text-xs mb-2">
        <span>←</span>
        <span className="mx-2">Desliza para explorar</span>
        <span>→</span>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {pillars.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 border-[#a6249d]/40 ${index === currentIndex ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] shadow-lg' : 'bg-[#2D1B4E] hover:bg-[#d93340]'}`}
          />
        ))}
      </div>
    </div>
  );
}

const PillarCarousel = ({ pillars, selectedPillar, onSelectPillar, currentIndex, setCurrentIndex }) => {
  // Estados para drag/swipe
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);

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

  // Handlers para drag/swipe
  const handleTouchStart = e => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
    setDragOffset(0);
  };
  const handleTouchMove = e => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      setDragOffset(deltaX);
    }
  };
  const handleTouchEnd = () => {
    if (!isDragging) return;
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        rotateCarousel('prev');
      } else {
        rotateCarousel('next');
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  };
  const handleMouseDown = e => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    setDragOffset(0);
  };
  const handleMouseMove = e => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    setDragOffset(deltaX);
  };
  const handleMouseUp = () => {
    if (!isDragging) return;
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        rotateCarousel('prev');
      } else {
        rotateCarousel('next');
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div
      className="carousel-container relative h-[400px] w-full overflow-hidden perspective select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 md:left-4">
        <button
          onClick={() => rotateCarousel('prev')}
          className="bg-gradient-to-br from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] p-3 md:p-4 lg:p-6 rounded-full transition-all border-2 border-[#a6249d]/40 shadow-lg active:scale-95 focus:scale-95 duration-200 ease-out"
        >
          <span className="text-white text-xl md:text-2xl lg:text-3xl font-bold">←</span>
        </button>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 md:right-4">
        <button
          onClick={() => rotateCarousel('next')}
          className="bg-gradient-to-br from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] p-3 md:p-4 lg:p-6 rounded-full transition-all border-2 border-[#a6249d]/40 shadow-lg active:scale-95 focus:scale-95 duration-200 ease-out"
        >
          <span className="text-white text-xl md:text-2xl lg:text-3xl font-bold">→</span>
        </button>
      </div>
      <div 
        className="carousel relative w-full h-full transform-style-3d transition-transform duration-500"
        style={{
          transform: `rotateY(${currentIndex * -(360 / pillars.length) + (isDragging ? dragOffset * 0.2 : 0)}deg)`,
        }}
      >
        {pillars.map((pillar, index) => {
          const angle = (360 / pillars.length) * index;
          const radius = 300; 
          return (
            <div
              key={pillar.id}
              className={`carousel-item absolute left-1/2 top-1/2 w-56 h-64 -ml-28 -mt-32 transition-all duration-300
                ${selectedPillar?.id === pillar.id ? 'scale-110 z-20' : 'scale-95 rotate-y-12 z-10'}`}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
            >
              <button
                onClick={() => onSelectPillar(pillar)}
                className={`w-full h-full flex flex-col items-center justify-center p-6 rounded-xl backdrop-blur-sm border-2 border-[#a6249d]/40 shadow-lg
                  ${selectedPillar?.id === pillar.id 
                    ? 'bg-gradient-to-r from-[#d93340]/80 to-[#a6249d]/80' 
                    : 'bg-[#1A0B2E]/80 hover:bg-gradient-to-r hover:from-[#d93340]/60 hover:to-[#a6249d]/60'
                  }`}
              >
                <div className={`p-4 rounded-full mb-3 text-4xl ${selectedPillar?.id === pillar.id ? 'bg-[#d93340]/40' : 'bg-[#a6249d]/20'}`}>
                  {pillar.logo ? (
                    <img src={pillar.logo} alt={pillar.name} className="w-12 h-12 object-contain mx-auto" />
                  ) : (
                    pillar.emoji
                  )}
                </div>

                <span className="text-lg font-bold text-center text-white drop-shadow-md">{pillar.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PillarCarousel; 

