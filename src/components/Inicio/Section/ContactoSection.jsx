import React from 'react';
import microsoftTeam from '../../../assets/images/IMG_5097.jpeg';
import { handleSubmit } from '../../../services/contactService';

export const ContactoSection = () => {
  return (
    <section className="relative min-h-screen bg-[#1A0B2E] py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#B936F5]/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#00F0FF]/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column - Image */}
          <div className="relative w-full max-w-xl">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_0_30px_-5px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_-5px_rgba(147,51,234,0.4)] transform hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B936F5]/30 via-transparent to-transparent opacity-60"></div>
              <img
                src={microsoftTeam}
                alt="Equipo LEAD UNI en Microsoft"
                className="w-full h-auto rounded-3xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">Nuestro Equipo</h3>
                <p className="text-white/90">
                  Conoce al equipo detrás de LEAD UNI y únete a nuestra comunidad
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-10 border border-white/10 w-full max-w-xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-transparent bg-clip-text">
                Contáctanos
              </h2>
              <p className="text-white/80">
                ¿Tienes preguntas o comentarios? Estamos aquí para ayudarte.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-white/80 mb-2 text-sm">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2 text-sm">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5] transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="asunto" className="block text-white/80 mb-2 text-sm">
                  Asunto
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#B936F5] transition-colors text-sm"
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
                <label htmlFor="mensaje" className="block text-white/80 mb-2 text-sm">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5] transition-colors resize-none text-sm"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-auto px-6 py-2 bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] text-white font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
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
