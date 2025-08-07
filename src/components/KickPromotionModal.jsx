import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const KickPromotionModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Verificar si el modal ya se mostró hoy
    const lastShown = localStorage.getItem('kickModalLastShown');
    const modalEndDate = localStorage.getItem('kickModalEndDate');
    const today = new Date().toDateString();

    // Si no hay fecha de fin guardada, establecer 7 días desde hoy
    if (!modalEndDate) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      localStorage.setItem('kickModalEndDate', endDate.toISOString());
    }

    // Verificar si aún está dentro del período de 7 días
    const currentEndDate = new Date(modalEndDate || new Date().toISOString());
    const now = new Date();

    if (now <= currentEndDate && lastShown !== today) {
      // Mostrar el modal después de 2 segundos
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem('kickModalLastShown', today);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleKickRedirect = () => {
    window.open('https://kick.com/lead-uni', '_blank', 'noopener,noreferrer');
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-md bg-gradient-to-br from-[#09092a] to-[#1A0B2E] rounded-2xl overflow-hidden border border-[#53FC18]/30 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Header con gradiente Kick */}
            <div className="relative bg-gradient-to-r from-[#53FC18] to-[#00D100] p-6 text-center">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Logo Kick */}
              <div className="w-16 h-16 mx-auto mb-3 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg
                  width="40"
                  height="13"
                  viewBox="0 0 933 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-auto"
                >
                  <g clipPath="url(#kick_dark__clip0_9790_492437)">
                    <g clipPath="url(#kick_dark__clip1_9790_492437)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 0H100V66.6667H133.333V33.3333H166.667V0H266.667V100H233.333V133.333H200V166.667H233.333V200H266.667V300H166.667V266.667H133.333V233.333H100V300H0V0ZM666.667 0H766.667V66.6667H800V33.3333H833.333V0H933.333V100H900V133.333H866.667V166.667H900V200H933.333V300H833.333V266.667H800V233.333H766.667V300H666.667V0ZM300 0H400V300H300V0ZM533.333 0H466.667V33.3333H433.333V266.667H466.667V300H533.333H633.333V200H533.333V100H633.333V0H533.333Z"
                        fill="#FFF"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="kick_dark__clip0_9790_492437">
                      <rect width="933" height="300" fill="white" />
                    </clipPath>
                    <clipPath id="kick_dark__clip1_9790_492437">
                      <rect width="933.333" height="300" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">¡Nuevo en Kick! 🎮</h2>
              <p className="text-white/90 text-sm">LEAD UNI ahora también está en Kick</p>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-4">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-white">Únete a nuestra comunidad</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Descubre contenido exclusivo, streams en vivo y conecta con la comunidad de
                  <span className="text-[#53FC18] font-semibold"> LEAD UNI </span>
                  en nuestra nueva plataforma.
                </p>
              </div>

              {/* Características */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-[#53FC18] rounded-full"></div>
                  <span>Streams de programación en vivo</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-[#53FC18] rounded-full"></div>
                  <span>Talleres interactivos</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-[#53FC18] rounded-full"></div>
                  <span>Comunidad de desarrolladores</span>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={handleKickRedirect}
                  className="w-full bg-gradient-to-r from-[#53FC18] to-[#00D100] text-black font-semibold py-3 px-6 rounded-xl hover:from-[#4DE015] hover:to-[#00C100] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#53FC18]/25"
                >
                  <span>Visitar Canal</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClose}
                  className="w-full bg-white/10 text-white font-medium py-2 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Tal vez después
                </button>
              </div>
            </div>

            {/* Decoración */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#53FC18] via-[#00D100] to-[#53FC18] animate-pulse"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KickPromotionModal;
