import React from 'react';
import microsoftTeam from '../../../assets/images/IMG_5097.jpeg';
import { handleSubmit } from '../../../services/contactService';

export const ContactoSection = () => {
  return (
    <section
      id="contacto"
      className="relative min-h-screen bg-[rgb(9,9,42)] py-12 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[rgb(9,9,42)]"></div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column - Image */}
          <div className="relative w-full max-w-xl mx-auto order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_-5px_rgba(147,51,234,0.4)] transform hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B936F5]/30 via-transparent to-transparent opacity-60"></div>
              <img
                src={microsoftTeam}
                alt="Equipo LEAD UNI en Microsoft"
                className="w-full h-[300px] sm:h-[400px] lg:h-auto object-cover lg:object-contain rounded-3xl"
              />
              {/* Fondo degradado mejorado */}
              <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 lg:h-56 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6 lg:p-8 z-10">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Nuestro Equipo</h3>
                <p className="text-white/90 text-sm lg:text-base">
                  Conoce al equipo detrás de LEAD UNI y únete a nuestra comunidad
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-[#1A0B2E]/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#a6249d]/40 shadow-[0_8px_30px_-5px_rgba(34,48,91,0.2)] w-full max-w-xl mx-auto order-1 lg:order-2">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text">
                Contáctanos
              </h2>
              <p className="text-base text-white/80 max-w-xs sm:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                Conecta con nosotros y forma parte de la comunidad LEAD UNI
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-white/80 mb-2 text-base">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5] transition-colors text-base"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2 text-base">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5] transition-colors text-base"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="asunto" className="block text-white/80 mb-2 text-base">
                  Asunto
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#B936F5] transition-colors text-base"
                >
                  <option value="" className="bg-[#1A0B2E]">
                    Selecciona un asunto
                  </option>
                  <option value="general" className="bg-[#1A0B2E]">
                    Consulta General
                  </option>
                  <option value="unirse" className="bg-[#1A0B2E]">
                    Unirse al Equipo
                  </option>
                  <option value="colaboracion" className="bg-[#1A0B2E]">
                    Propuesta de Colaboración
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-white/80 mb-2 text-base">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5] transition-colors resize-none text-base"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-auto px-6 py-2 bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-base"
                >
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
