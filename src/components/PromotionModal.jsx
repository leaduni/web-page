import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const PromotionModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Verificar si el modal ya se mostró hoy (claves nuevas para evento)
    const lastShown = localStorage.getItem('promoModalLastShown');
    const modalEndDate = localStorage.getItem('promoModalEndDate');
    const today = new Date().toDateString();

    // Si no hay fecha de fin guardada, establecer 7 días desde hoy
    if (!modalEndDate) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      localStorage.setItem('promoModalEndDate', endDate.toISOString());
    }

    // Verificar si aún está dentro del período de 7 días
    const currentEndDate = new Date(modalEndDate || new Date().toISOString());
    const now = new Date();

    if (now <= currentEndDate && lastShown !== today) {
      // Mostrar el modal después de 2 segundos
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem('promoModalLastShown', today);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Kick channel decommissioned

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
            {/* Header Evento AI Recap */}
            <div className="relative bg-gradient-to-r from-[#d93340] to-[#a6249d] p-6 text-center">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="w-16 h-16 mx-auto mb-3 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                >
                  <circle cx="24" cy="24" r="24" fill="#a6249d" />
                  <path
                    d="M24 14v12m0 0v8m0-8h8m-8 0h-8"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">¡Nuevo Evento: AI Recap 2025!</h2>
              <p className="text-white/90 text-sm">Tendencias, demos y aprendizajes clave de IA.</p>
            </div>

            {/* Contenido Evento AI Recap */}
            <div className="p-6 space-y-4">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-white">AI Recap 2025</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Un resumen práctico y actualizado sobre Inteligencia Artificial: agentes, LLMs,
                  casos reales y puesta en producción. ¡Acompáñanos y aprende con demos y
                  experiencias del mundo real!
                </p>
              </div>

              <a
                href="/ai-recap"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white font-semibold py-3 px-6 rounded-xl hover:brightness-110 transition-all duration-300 shadow-lg shadow-pink-900/20"
                onClick={handleClose}
              >
                <span>Visitar AI Recap</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleClose}
                className="w-full bg-white/10 text-white font-medium py-2 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Tal vez después
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;
