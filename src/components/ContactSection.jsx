import React from 'react';

const ContactSection = () => {
  return (
    <footer className="w-full mt-16 relative z-20">
      {/* Fondo con gradiente y efectos 3D */}
      <div className="relative overflow-hidden">
        {/* Fondo principal */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09092a] via-[#09092a]/95 to-[#36042f]" />
        
        {/* Elementos decorativos 3D */}
        <div className="absolute inset-0">
          {/* Esferas 3D flotantes */}
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] opacity-30 blur-xl transform rotate-12 animate-pulse" />
          <div className="absolute top-20 right-20 w-12 h-12 rounded-full bg-gradient-to-br from-[#7957f1] to-[#a6249d] opacity-40 blur-lg transform -rotate-6 animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Líneas decorativas 3D */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7957f1] to-transparent opacity-30" />
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header con efecto 3D */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-white drop-shadow-2xl">
                <span className="bg-gradient-to-r from-[#d93340] via-[#a6249d] to-[#7957f1] bg-clip-text text-transparent">
                  Contáctanos
                </span>
              </h2>
              <p className="text-base text-[#f3eafd] max-w-xl mx-auto">
                Conecta con nosotros y forma parte de la comunidad LEAD UNI
              </p>
            </div>

            {/* Grid de tarjetas de contacto 3D */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {/* Tarjeta Email */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#EA4335] to-[#d32f2f] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg" 
                     style={{ 
                       transform: 'perspective(1000px) rotateX(3deg) rotateY(-3deg)',
                       boxShadow: '0 15px 30px rgba(234, 67, 53, 0.3)'
                     }} />
                <div className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#EA4335]/30 hover:border-[#EA4335]/60 transition-all duration-500"
                     style={{ 
                       transform: 'perspective(1000px) rotateX(3deg) rotateY(-3deg)',
                       boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                     }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#EA4335] to-[#d32f2f] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <rect width="24" height="24" rx="7" fill="white" />
                        <path d="M19.5 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 16.5v-9A1.5 1.5 0 0 1 6 6h12a1.5 1.5 0 0 1 1.5 1.5Zm-1.5 0-6 4.5-6-4.5m12 9h-12v-7.5l6 4.5 6-4.5V16.5Z" fill="#EA4335" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">Email</h3>
                    <p className="text-[#f3eafd] text-xs">contacto@leaduni.com</p>
                  </div>
                </div>
              </div>

              {/* Tarjeta Instagram */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C] to-[#C13584] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg" 
                     style={{ 
                       transform: 'perspective(1000px) rotateX(3deg) rotateY(3deg)',
                       boxShadow: '0 15px 30px rgba(225, 48, 108, 0.3)'
                     }} />
                <div className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#E1306C]/30 hover:border-[#E1306C]/60 transition-all duration-500"
                     style={{ 
                       transform: 'perspective(1000px) rotateX(3deg) rotateY(3deg)',
                       boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                     }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#E1306C] to-[#C13584] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <rect width="24" height="24" rx="7" fill="white" />
                        <path d="M16.98 2H7.02A5.02 5.02 0 0 0 2 7.02v9.96A5.02 5.02 0 0 0 7.02 22h9.96A5.02 5.02 0 0 0 22 16.98V7.02A5.02 5.02 0 0 0 16.98 2ZM12 17.2A5.2 5.2 0 1 1 17.2 12 5.2 5.2 0 0 1 12 17.2Zm6.4-9.44a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2Z" fill="#E1306C" />
                        <circle cx="12" cy="12" r="3.2" fill="#E1306C" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">Instagram</h3>
                    <p className="text-[#f3eafd] text-xs">@lead_uni</p>
                  </div>
                </div>
              </div>

              {/* Tarjeta LinkedIn */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2] to-[#0077b5] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg" 
                     style={{ 
                       transform: 'perspective(1000px) rotateX(-3deg) rotateY(-3deg)',
                       boxShadow: '0 15px 30px rgba(10, 102, 194, 0.3)'
                     }} />
                <div className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#0A66C2]/30 hover:border-[#0A66C2]/60 transition-all duration-500"
                     style={{ 
                       transform: 'perspective(1000px) rotateX(-3deg) rotateY(-3deg)',
                       boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                     }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0A66C2] to-[#0077b5] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <rect width="24" height="24" rx="7" fill="white" />
                        <path d="M8.34 17.34H5.67V9.67h2.67v7.67ZM7 8.67A1.33 1.33 0 1 1 7 6a1.33 1.33 0 0 1 0 2.67Zm10.34 8.67h-2.67v-3.67c0-.88-.32-1.48-1.12-1.48-.61 0-.97.41-1.13.8-.06.15-.08.36-.08.57v3.78h-2.67s.04-6.13 0-7.67h2.67v1.09c.35-.54.98-1.31 2.39-1.31 1.75 0 3.06 1.14 3.06 3.59v4.3Z" fill="#0A66C2" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">LinkedIn</h3>
                    <p className="text-[#f3eafd] text-xs">LEAD UNI</p>
                  </div>
                </div>
              </div>

              {/* Tarjeta Kick */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#53FC18] to-[#00D100] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg" 
                     style={{ 
                       transform: 'perspective(1000px) rotateX(-3deg) rotateY(3deg)',
                       boxShadow: '0 15px 30px rgba(83, 252, 24, 0.3)'
                     }} />
                <div className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#53FC18]/30 hover:border-[#53FC18]/60 transition-all duration-500"
                     style={{ 
                       transform: 'perspective(1000px) rotateX(-3deg) rotateY(3deg)',
                       boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                     }}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#53FC18] to-[#00D100] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <rect width="24" height="24" rx="7" fill="white" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#53FC18" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">Kick</h3>
                    <p className="text-[#f3eafd] text-xs">@lead_uni</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer con efecto 3D */}
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-[#09092a]/80 to-[#36042f]/60 backdrop-blur-sm rounded-xl px-6 py-3 border border-[#d93340]/30"
                   style={{ 
                     transform: 'perspective(1000px) rotateX(2deg)',
                     boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                   }}>
                <p className="text-[#f3eafd] text-xs font-medium">
                  &copy; {new Date().getFullYear()} LEAD | UNI. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection; 