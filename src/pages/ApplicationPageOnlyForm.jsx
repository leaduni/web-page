import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ApplicationPageOnlyForm = () => {
  const theme = useTheme();
  const [randomSpheres, setRandomSpheres] = useState([]);

  // Colores disponibles para las esferas
  const sphereColors = [
    { from: '#d93340', to: '#a6249d' },
    { from: '#a6249d', to: '#7957f1' },
    { from: '#7957f1', to: '#d93340' },
    { from: '#d93340', to: '#7957f1' },
    { from: '#a6249d', to: '#d93340' },
    { from: '#7957f1', to: '#a6249d' },
  ];

  // Función para generar posición aleatoria
  const getRandomPosition = () => {
    const top = Math.random() * 80 + 10;
    const left = Math.random() * 80 + 10;

    return {
      top: `${top}%`,
      left: `${left}%`,
    };
  };

  // Función para generar tamaño aleatorio
  const getRandomSize = () => {
    const sizes = ['w-8 h-8', 'w-10 h-10', 'w-12 h-12', 'w-16 h-16', 'w-20 h-20'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  // Función para generar esfera aleatoria
  const generateRandomSphere = () => {
    const position = getRandomPosition();
    const size = getRandomSize();
    const color = sphereColors[Math.floor(Math.random() * sphereColors.length)];
    const id = Date.now() + Math.random();

    return {
      id,
      position,
      size,
      color,
      opacity: Math.random() * 0.4 + 0.3,
    };
  };

  // Efecto para manejar las esferas aleatorias
  useEffect(() => {
    const interval = setInterval(() => {
      const newSphere = generateRandomSphere();
      setRandomSpheres(prev => [...prev, newSphere]);

        setTimeout(() => {
        setRandomSpheres(prev => prev.filter(sphere => sphere.id !== newSphere.id));
      }, 6000);
    }, 2000); // Frecuencia aumentada para más dinamismo

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden [&::-webkit-scrollbar]:hidden"
      style={{
        background: 'linear-gradient(to bottom right, #09092a 0%, #36042f 100%)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitScrollbar: { display: 'none' },
      }}
    >
      {/* Esferas decorativas aleatorias */}
      {randomSpheres.map(sphere => (
        <div
          key={sphere.id}
          className={`absolute ${sphere.size} rounded-full bg-gradient-to-br blur-2xl z-0 transition-all duration-1000 ease-in-out`}
          style={{
            top: sphere.position.top,
            left: sphere.position.left,
            background: `linear-gradient(to bottom right, ${sphere.color.from}, ${sphere.color.to})`,
            opacity: sphere.opacity,
          }}
        />
      ))}

      {/* Sección principal */}
      <section className="w-full flex flex-col items-center justify-center min-h-screen z-20 relative overflow-hidden px-4">
        {/* Fondo negro base */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
           <div className="w-full h-full bg-[rgb(9,9,42)] opacity-30"></div>
        </div>

        {/* Esferas animadas fijas de fondo */}
        <div className="absolute inset-0 z-2 pointer-events-none">
          <span className="animate-bubble1 absolute top-10 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-[#d93340] via-[#a6249d] to-[#7957f1] opacity-70 blur-2xl" />
          <span className="animate-bubble2 absolute top-1/2 left-1/3 w-10 h-10 rounded-full bg-gradient-to-br from-[#bf2a51] via-[#7957f1] to-[#a6249d] opacity-60 blur" />
          <span className="animate-bubble3 absolute top-1/3 left-2/3 w-20 h-20 rounded-full bg-gradient-to-br from-[#a6249d] via-[#d93340] to-[#030c40] opacity-80 blur-xl" />
        </div>

        <img
          src="/logo-lead-uni.png"
          alt="Logo LEAD UNI"
          className="w-48 md:w-64 max-w-xs object-contain shadow-xl mb-6 bg-transparent relative z-10 animate-fade-in-down"
        />

        <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-center bg-[#19092a]/60 p-8 md:p-12 rounded-3xl border border-[#a6249d]/30 backdrop-blur-sm shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Convocatoria{' '}
            <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent">
              LEAD UNI
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#f3eafd] mb-8 max-w-2xl leading-relaxed">
            Formando líderes para transformar el futuro a través de excelencia académica, desarrollo profesional e impacto social.
            <br/><br/>
            <strong>¡Postula y sé parte del cambio!</strong>
          </p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScQfuCThzQQnpF6Xb5-eNVMdpu6LA7X7fvP5Z7B_hVdSNu0mQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-10 py-5 rounded-full shadow-[0_0_20px_rgba(217,51,64,0.5)] font-bold text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(166,36,157,0.7)]"
          >
            <span className="mr-2">Postula Aquí</span>
            <svg 
              className="w-6 h-6 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
          
          <p className="mt-6 text-sm text-[#f3eafd]/70">
            Serás redirigido al formulario de Google Forms
          </p>
        </div>
      </section>
    </div>
  );
};

export default ApplicationPageOnlyForm;

