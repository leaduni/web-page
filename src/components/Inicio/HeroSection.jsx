import React, { useEffect, useRef } from 'react';
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

  // Scroll handlers
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
        className="relative w-full min-h-screen bg-transparent overflow-hidden"
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <div className="absolute inset-0 bg-transparent"></div>

        <div className="container mx-auto min-h-screen flex items-center px-4 lg:px-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 mb-4 gap-8 lg:gap-12">
            <div className="flex flex-col justify-center lg:ml-[12%] text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Centro Estudiantil
              </h1>

              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 lg:mb-8">
                <span className="bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] text-transparent bg-clip-text">
                  LEAD UNI
                </span>
              </div>

              <p className="text-white/90 text-center lg:text-start sm:text-lg lg:text-xl mb-8 lg:mb-12 leading-relaxed px-4 lg:px-0">
                Formando líderes para transformar el futuro a través de excelencia académica,
                desarrollo profesional e impacto social.
              </p>

              <div className="flex gap-4 lg:gap-6 flex-col justify-center lg:justify-start sm:flex-row w-full sm:w-auto">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] rounded-full opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <button
                    type="button"
                    onClick={handleScrollContacto}
                    className="relative w-full sm:w-[160px] px-6 py-3 lg:py-4 bg-[#B936F5] hover:bg-[#a020f0] rounded-full leading-none flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                  >
                    <span className="text-white text-base lg:text-lg font-medium select-none">
                      Únete
                    </span>
                  </button>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] rounded-full opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <button
                    type="button"
                    onClick={handleScrollQuienesSomos}
                    className="relative w-full sm:w-[160px] px-6 py-3 lg:py-4 bg-black hover:bg-gray-900 rounded-full leading-none flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                  >
                    <span className="text-white text-base lg:text-lg font-medium select-none">
                      Descubre
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full flex items-center justify-center order-1 lg:order-2">
              <div className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] flex items-center">
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-[#FF1CF7] rounded-full" />
                  <div className="absolute top-[40%] right-[10%] w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-[#B936F5] rounded-full" />
                  <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-[#00F0FF] rounded-full" />
                  <div className="absolute top-[40%] left-[10%] w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-[#B936F5] rounded-full" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-[#B936F5] opacity-50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="absolute w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                </div>

                <div className="absolute inset-0">
                  <div className="absolute top-[30%] left-[30%] w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-[#FF1CF7] to-transparent rounded-full animate-[bounce_3s_infinite]" />
                  <div className="absolute bottom-[30%] right-[30%] w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-bl from-[#00F0FF] to-transparent rounded-full animate-[bounce_3s_infinite_0.5s]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quienes-somos" className="relative w-full min-h-[80vh] bg-transparent overflow-hidden flex items-center py-8 lg:py-16">
        <div className="absolute inset-0 bg-transparent"></div>

        <div className="relative w-full">
          <div className="container mx-auto px-4 mb-8 lg:mb-12">
            <div ref={quienesSomosTitleRef} className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out">
              <h2 className="bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-transparent bg-clip-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
                ¿Quiénes somos?
              </h2>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
                Conoce más sobre nuestra historia y misión como centro estudiantil
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 max-w-6xl mx-auto">
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <div ref={quienesSomosContentRef} className="bg-black/30 backdrop-blur-sm rounded-3xl p-6 sm:p-8 opacity-0 -translate-x-10 transition-all duration-1000 ease-out">
                  <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">
                    <span className="text-[#FF1CF7] font-bold">LEAD UNI</span> es un centro
                    estudiantil fundado con la misión de potenciar el desarrollo integral de los
                    estudiantes universitarios a través de programas innovadores, actividades
                    formativas y oportunidades de crecimiento personal y profesional.
                    <br /><br />
                    Nuestro enfoque se basa en cultivar habilidades de liderazgo, fomentar la
                    excelencia académica, promover la igualdad de género, facilitar el desarrollo
                    profesional, generar impacto social y fortalecer nuestra comunidad estudiantil.
                  </p>
                </div>
              </div>

              <div ref={quienesSomosImageRef} className="w-full lg:w-1/2 opacity-0 translate-y-10 transition-all duration-1000 ease-out order-1 lg:order-2">
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

      <div className="bg-transparent">
        <PilaresSection />
        <AlianzasSection />
        <ActividadSection />
        <ContactoSection />
      </div>
    </>
  );
};


