import React, { useEffect, useRef } from "react";
import microsoftTeam from "../../assets/images/IMG_5097.jpeg";
import { AlianzasSection } from "./Section/AlianzasSection";
import { ActividadSection } from "./Section/ActividadSection";
import { PilaresSection } from "./Section/PilaresSection";
import { ContactoSection } from "./Section/ContactoSection";
import { HEADER_HEIGHT } from "../header";

export const HeroSection = () => {
  const quienesSomosTitleRef = useRef(null);
  const quienesSomosContentRef = useRef(null);
  const quienesSomosImageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    const elements = [
      quienesSomosTitleRef.current,
      quienesSomosContentRef.current,
      quienesSomosImageRef.current
    ].filter(Boolean);

    elements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elements.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <>
    <section 
      className="relative w-full min-h-screen bg-gradient-to-b from-black via-[#1A0B2E] via-50% to-black to-90% overflow-hidden"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-transparent"></div>

      {/* Main content container */}
      <div className="container mx-auto min-h-screen flex items-center">
        <div className="w-full grid grid-cols-2 gap-8 px-8">
          {/* Text content */}
          <div className="flex flex-col justify-center items-start ml-[12%]">
            <h1 className="flex text-left text-white text-6xl font-bold mb-4">
              Centro Estudiantil
            </h1>
            
            <div className="flex justify-start text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r text-left from-[#FF1CF7] to-[#00F0FF] text-transparent bg-clip-text">
                LEAD UNI
              </span>
            </div>

            <p className="text-white/90 text-left text-xl mb-12 max-w-xl leading-relaxed">
              Formando líderes para transformar el futuro a través de 
              excelencia académica, desarrollo profesional e impacto social.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-6 flex-row">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] rounded-full opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <button type="button" className="relative w-[160px] px-6 py-4 bg-[#B936F5] hover:bg-[#a020f0] rounded-full leading-none flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
                  <span className="text-white text-lg font-medium select-none">Únete</span>
                </button>
              </div>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] rounded-full opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <button type="button" className="relative w-[160px] px-6 py-4 bg-black hover:bg-gray-900 rounded-full leading-none flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
                  <span className="text-white text-lg font-medium select-none">Descubre</span>
                </button>
              </div>
            </div>
          </div>

          {/* Animated decoration */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-[600px] h-[600px] flex items-center">
              {/* Rotating circles */}
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FF1CF7] rounded-full" />
                <div className="absolute top-[40%] right-[10%] w-4 h-4 bg-[#B936F5] rounded-full" />
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-4 h-4 bg-[#00F0FF] rounded-full" />
                <div className="absolute top-[40%] left-[10%] w-4 h-4 bg-[#B936F5] rounded-full" />
              </div>

              {/* Pulsing circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-[#B936F5] opacity-50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
              </div>

              {/* Floating elements */}
              <div className="absolute inset-0">
                <div className="absolute top-[30%] left-[30%] w-16 h-16 bg-gradient-to-br from-[#FF1CF7] to-transparent rounded-full animate-[bounce_3s_infinite]" />
                <div className="absolute bottom-[30%] right-[30%] w-16 h-16 bg-gradient-to-bl from-[#00F0FF] to-transparent rounded-full animate-[bounce_3s_infinite_0.5s]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Quienes Somos Section */}
    <section className="relative w-full min-h-[80vh] bg-[#1A0B2E] overflow-hidden flex items-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1A0B2E] via-50% to-black to-90%"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#B936F5]/10 via-[#FF1CF7]/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#00F0FF]/5 via-purple-950/10 to-transparent"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative w-full py-16">
        {/* Title Section */}
        <div className="container mx-auto px-4 mb-8">
          <div 
            ref={quienesSomosTitleRef}
            className="text-center opacity-0 translate-y-10 transition-all duration-1000 ease-out"
          >
            <h2 className="bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-transparent bg-clip-text text-4xl font-bold mb-4 px-4">
              ¿Quiénes somos?
            </h2>
            <p className="text-white/80 text-base max-w-2xl mx-auto">
              Conoce más sobre nuestra historia y misión como centro estudiantil
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start gap-12 max-w-6xl mx-auto">
            {/* Text content */}
            <div className="w-1/2">
              <div 
                ref={quienesSomosContentRef}
                className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 opacity-0 -translate-x-10 transition-all duration-1000 ease-out"
              >
                <p className="text-lg text-white/90 leading-relaxed">
                  <span className="text-[#FF1CF7] font-bold">LEAD UNI</span> es un centro estudiantil 
                  fundado con la misión de potenciar el desarrollo integral de los estudiantes 
                  universitarios a través de programas innovadores, actividades formativas y 
                  oportunidades de crecimiento personal y profesional.
                  <br /><br />
                  Nuestro enfoque se basa en cultivar habilidades de liderazgo, fomentar la 
                  excelencia académica, promover la igualdad de género, facilitar el 
                  desarrollo profesional, generar impacto social y fortalecer nuestra 
                  comunidad estudiantil.
                </p>
              </div>
            </div>

            {/* Image content */}
            <div 
              ref={quienesSomosImageRef}
              className="w-1/2 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_-5px_rgba(147,51,234,0.4)] transform hover:scale-105 transition-all duration-500 isolate group">
                <div className="absolute -inset-8 bg-gradient-to-br from-[#B936F5]/60 via-[#FF1CF7]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40 z-[1]"></div>
                <img 
                  src={microsoftTeam} 
                  alt="Equipo LEAD UNI" 
                  className="w-full h-[400px] object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-[2]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="bg-gradient-to-b from-black via-[#1A0B2E] to-black">
      <PilaresSection />
      <AlianzasSection />
      <ActividadSection />
      <ContactoSection />
    </div>
    </>
  );
}; 