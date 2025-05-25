import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundDecoration: React.FC = () => {
  const theme = useTheme();
  
  return (
    <>
      {/* Top texture */}
      <div 
        className="absolute top-0 left-0 right-0 h-16 z-0 opacity-20"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* STEM background images with gradient fade */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-1/3 h-1/2">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to right, black, transparent)'
            }}
          />
        </div>
        
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'linear-gradient(to left, black, transparent)'
            }}
          />
        </div>
        
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'radial-gradient(circle at center, transparent, black)'
            }}
          />
        </div>
      </div>
      
      {/* Diagonal accent */}
      <div 
        className="absolute top-0 right-0 w-full h-96 z-0 transform -skew-y-6 origin-top-right"
        style={{ 
          background: `linear-gradient(135deg, ${theme.colors.primary}22 0%, ${theme.colors.primary}00 100%)`,
        }}
      />
    </>
  );
};

export default BackgroundDecoration;