import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import microsoftTeam from '../../assets/images/IMG_5097.jpeg';
import { AlianzasSection } from './Section/AlianzasSection';
import { ActividadSection } from './Section/ActividadSection';
import { PilaresSection } from './Section/PilaresSection';
import { ContactoSection } from './Section/ContactoSection';
import { HEADER_HEIGHT } from '../header';

export const HeroSection = () => {
  const quienesSomosTitleRef = useRef(null);
  const quienesSomosContentRef = useRef(null);
  const quienesSomosImageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px',
      }
    );

    const elements = [
      quienesSomosTitleRef.current,
      quienesSomosContentRef.current,
      quienesSomosImageRef.current,
    ].filter(Boolean);

    elements.forEach(element => {
      if (element) {
        observer.observe(element);
        // Si ya está visible (por hot reload), forzar la animación
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('opacity-100', 'translate-y-0');
          element.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(element);
        }
      }
    });

    return () => {
      elements.forEach(element => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleScrollContacto = () => {
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollQuienesSomos = () => {
    const el = document.getElementById('quienes-somos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        className="relative w-full min-h-screen bg-[rgb(9,9,42)] overflow-hidden border-b border-[#a6249d]/20 [@media(orientation:landscape)]:py-8"
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <div className="absolute inset-0 bg-transparent"></div>

        <div className="container mx-auto min-h-screen flex items-center px-6 sm:px-8 lg:px-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 mb-4 gap-8 lg:gap-12">
            <div className="flex flex-col justify-top lg:ml-[12%] text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 lg:mb-8 text-center lg:text-left drop-shadow-xl">
                <span className="block text-white">Organización Estudiantil</span>
                <span className="block bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text">
                  LEAD UNI
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 text-center lg:text-start mb-8 lg:mb-12 leading-relaxed px-2 sm:px-4 lg:px-0">
                Formando líderes para transformar el futuro a través de excelencia académica,
                desarrollo profesional e impacto social.
              </p>
              <div className="flex gap-3 lg:gap-4 flex-col justify-center lg:justify-start sm:flex-row w-full sm:w-auto mt-4 flex-wrap">
                <div className="relative group cursor-pointer mb-3 sm:mb-0">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d93340] to-[#a6249d] rounded-full opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <button
                    type="button"
                    onClick={handleScrollContacto}
                    className="relative w-full sm:w-[160px] px-6 py-3 lg:py-4 bg-gradient-to-r from-[#d93340] to-[#a6249d] hover:from-[#a6249d] hover:to-[#d93340] rounded-full leading-none flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                  >
                    <span className="text-white text-base lg:text-lg font-medium select-none">
                      Contáctanos
                    </span>
                  </button>
                </div>
                <div className="relative group cursor-pointer mb-3 sm:mb-0">
                  <div className="absolute -inset-0.5 rounded-full pointer-events-none bg-gradient-to-r from-[#d93340] via-[#ff6ec7] to-[#a6249d]" />
                  <button
                    type="button"
                    onClick={handleScrollQuienesSomos}
                    className="relative w-full sm:w-[160px] px-6 py-3 lg:py-4 bg-black rounded-full leading-none flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:translate-y-0 border-2 border-transparent"
                  >
                    <span className="text-white text-base lg:text-lg font-medium select-none">
                      Descubre
                    </span>
                  </button>
                </div>
                {/* Botón LEAD Peru - Estilo diferenciado */}
                <div className="relative group mb-3 sm:mb-0">
                  <a
                    href="https://www.leadmindset.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-full sm:w-auto px-6 py-3 lg:py-4 rounded-full leading-none flex items-center justify-center gap-2 bg-[#a6249d] hover:bg-[#8d1f88] text-white border-2 border-[#a6249d] hover:border-[#d93340] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 group shadow-lg shadow-[#a6249d]/30 hover:shadow-[#a6249d]/50"
                  >
                    <span className="text-base lg:text-lg font-medium select-none">Conoce LEAD PERU</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[200px] sm:h-[400px] lg:h-full flex items-center justify-center order-1 lg:order-2 lg:mt-[-40px]">
              <div className="relative w-[250px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] flex items-center">
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                  {/* Esfera pequeña blanca con sombra */}
                  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded-full shadow-[0_2px_8px_0_rgba(217,51,64,0.15)]" />
                  {/* Esfera pequeña degradado rosado-morado */}
                  <div className="absolute top-[40%] right-[10%] w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-gradient-to-br from-[#ff6ec7] via-[#a6249d] to-[#d93340] rounded-full shadow-[0_2px_8px_0_rgba(166,36,157,0.15)]" />
                  {/* Esfera pequeña rojiza */}
                  <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-gradient-to-br from-[#d93340] via-[#a6249d] to-[#ff6ec7] rounded-full shadow-[0_2px_8px_0_rgba(217,51,64,0.15)]" />
                  {/* Esfera pequeña rosada */}
                  <div className="absolute top-[40%] left-[10%] w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-gradient-to-br from-white via-[#ff6ec7] to-[#a6249d] rounded-full shadow-[0_2px_8px_0_rgba(255,110,199,0.12)]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Esfera grande con degradado radial y sombra */}
                  <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-[radial-gradient(circle_at_60%_40%,_#d93340_0%,_#a6249d_40%,_#ff6ec7_60%,_#d93340_100%)] shadow-[0_8px_32px_0_rgba(217,51,64,0.18)] opacity-98 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  {/* Esfera mediana con degradado radial y sombra */}
                  <div className="absolute w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-[radial-gradient(circle_at_40%_60%,_#ff6ec7_0%,_white_60%,_#a6249d_100%)] shadow-[0_4px_16px_0_rgba(166,36,157,0.15)] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                </div>
                <div className="absolute inset-0">
                  {/* Esfera mediana con degradado y sombra */}
                  <div className="absolute top-[30%] left-[30%] w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-[radial-gradient(circle_at_60%_40%,_white_0%,_#ff6ec7_60%,_#a6249d_100%)] shadow-[0_4px_16px_0_rgba(255,110,199,0.12)] animate-[bounce_3s_infinite]" />
                  {/* Esfera pequeña rojiza con sombra */}
                  <div className="absolute bottom-[30%] right-[30%] w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-[radial-gradient(circle_at_40%_60%,_#d93340_0%,_#a6249d_80%,_white_100%)] shadow-[0_2px_8px_0_rgba(217,51,64,0.15)] animate-[bounce_3s_infinite_0.5s]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separador de onda y línea gradiente institucional */}
      <svg
        className="w-full h-10"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient-institucional" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2D1B4E" stopOpacity="0" />
            <stop offset="50%" stopColor="#2D1B4E" stopOpacity="1" />
            <stop offset="100%" stopColor="#2D1B4E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave-gradient-institucional)"
          fillOpacity="0.18"
          d="M0,100 C480,20 960,180 1440,100 L1440,0 L0,0 Z"
        />
      </svg>
      <hr className="my-0 border-0 h-2 bg-gradient-to-r from-transparent via-[#2D1B4E] to-transparent opacity-80 rounded-full shadow-md" />

      <section
        id="quienes-somos"
        className="relative w-full min-h-[80vh] bg-[rgb(9,9,42)] overflow-hidden flex items-center py-8 lg:py-16"
      >
        <div className="absolute inset-0 bg-[rgb(9,9,42)]"></div>

        <div className="relative w-full">
          <div className="container mx-auto px-4 mb-8 lg:mb-12">
            <div
              ref={quienesSomosTitleRef}
              className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out"
            >
              <h2 className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
                ¿Quiénes somos?
              </h2>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 text-center">
                Conoce más sobre nuestra historia y misión como organización estudiantil
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start justify-center text-center gap-8 lg:gap-12 max-w-6xl mx-auto">
              <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col items-center justify-center">
                <div
                  ref={quienesSomosContentRef}
                  className="bg-[#1A0B2E]/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-10 border border-[#a6249d]/40 shadow-[0_8px_30px_-5px_rgba(34,48,91,0.2)] opacity-0 md:-translate-x-10 transition-all duration-1000 ease-out w-full max-w-full px-2 sm:max-w-md sm:px-4 lg:max-w-xl mx-auto flex flex-col items-center justify-center"
                >
                  <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed text-justify px-2 sm:px-4 text-center">
                    <span className="text-[#d93340] font-bold">LEAD UNI</span> es una organización
                    estudiantil fundado con la misión de potenciar el desarrollo integral de los
                    estudiantes universitarios a través de programas innovadores, actividades
                    formativas y oportunidades de crecimiento personal y profesional.
                    <br />
                    <br />
                    Nuestro enfoque se basa en cultivar habilidades de liderazgo, fomentar la
                    excelencia académica, promover la igualdad de género, facilitar el desarrollo
                    profesional, generar impacto social y fortalecer nuestra comunidad estudiantil.
                  </p>
                </div>
              </div>

              <div
                ref={quienesSomosImageRef}
                className="w-full lg:w-1/2 opacity-0 translate-y-10 transition-all duration-1000 ease-out order-1 lg:order-2"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_-5px_rgba(147,51,234,0.4)] transform hover:scale-105 transition-all duration-500 isolate group">
                  <div className="absolute -inset-8 bg-gradient-to-br from-[#B936F5]/60 via-[#FF1CF7]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1]"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40 z-[1]"></div>
                  <img
                    src={microsoftTeam}
                    alt="Equipo LEAD UNI"
                    className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-[2]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separador de onda y línea gradiente institucional */}
      <svg
        className="w-full h-10"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient-institucional" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2D1B4E" stopOpacity="0" />
            <stop offset="50%" stopColor="#2D1B4E" stopOpacity="1" />
            <stop offset="100%" stopColor="#2D1B4E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#wave-gradient-institucional)"
          fillOpacity="0.18"
          d="M0,100 C480,20 960,180 1440,100 L1440,0 L0,0 Z"
        />
      </svg>
      <hr className="my-0 border-0 h-2 bg-gradient-to-r from-transparent via-[#2D1B4E] to-transparent opacity-80 rounded-full shadow-md" />

      <div className="bg-transparent">
        <PilaresSection />
        {/* Separador de onda y línea gradiente institucional */}
        <svg
          className="w-full h-10"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wave-gradient-institucional" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2D1B4E" stopOpacity="0" />
              <stop offset="50%" stopColor="#2D1B4E" stopOpacity="1" />
              <stop offset="100%" stopColor="#2D1B4E" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-institucional)"
            fillOpacity="0.18"
            d="M0,100 C480,20 960,180 1440,100 L1440,0 L0,0 Z"
          />
        </svg>
        <hr className="my-0 border-0 h-2 bg-gradient-to-r from-transparent via-[#2D1B4E] to-transparent opacity-80 rounded-full shadow-md" />
        <AlianzasSection />
        {/* Separador de onda y línea gradiente institucional */}
        <svg
          className="w-full h-10"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wave-gradient-institucional" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2D1B4E" stopOpacity="0" />
              <stop offset="50%" stopColor="#2D1B4E" stopOpacity="1" />
              <stop offset="100%" stopColor="#2D1B4E" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-institucional)"
            fillOpacity="0.18"
            d="M0,100 C480,20 960,180 1440,100 L1440,0 L0,0 Z"
          />
        </svg>
        <hr className="my-0 border-0 h-2 bg-gradient-to-r from-transparent via-[#2D1B4E] to-transparent opacity-80 rounded-full shadow-md" />
        <ActividadSection />
        {/* Separador de onda y línea gradiente institucional */}
        <svg
          className="w-full h-10"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wave-gradient-institucional" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2D1B4E" stopOpacity="0" />
              <stop offset="50%" stopColor="#2D1B4E" stopOpacity="1" />
              <stop offset="100%" stopColor="#2D1B4E" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-institucional)"
            fillOpacity="0.18"
            d="M0,100 C480,20 960,180 1440,100 L1440,0 L0,0 Z"
          />
        </svg>
        <hr className="my-0 border-0 h-2 bg-gradient-to-r from-transparent via-[#2D1B4E] to-transparent opacity-80 rounded-full shadow-md" />
        <ContactoSection />
      </div>
    </>
  );
};
