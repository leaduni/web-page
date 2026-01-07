import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeadGalaModal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Mostrar el modal después de 2 segundos siempre que se cargue la página
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleVisitPage = () => {
    navigate('/lead-gala');
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
            className="relative w-full max-w-md bg-gradient-to-br from-[#09092a] to-[#1A0B2E] rounded-2xl overflow-hidden border border-[#d93340]/30 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Header con gradiente de LEAD GALA */}
            <div className="relative bg-gradient-to-r from-[#d93340] via-[#a6249d] to-[#d93340] p-6 text-center">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="w-16 h-16 mx-auto mb-3 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                ¡LEAD UNI ganó Chapter of the Year!
              </h2>
              <p className="text-white/90 text-sm">
                Somos el mejor capítulo del año en LEAD GALA 2025
              </p>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 space-y-4">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-white">LEAD GALA 2025</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Durante la LEAD GALA 2025, LEAD UNI fue reconocido como{' '}
                  <span className="font-bold text-[#ff6ec7]">Chapter of the Year</span>, el máximo
                  reconocimiento de la noche y el más alto honor entre los 13 capítulos activos de
                  LEAD.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Además, recibimos los premios <span className="font-semibold">Culture of Belonging</span> y{' '}
                  <span className="font-semibold">Women Who Inspire</span>. ¡Descubre todos los
                  detalles de nuestros logros!
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleVisitPage}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white font-semibold py-3 px-6 rounded-xl hover:brightness-110 transition-all duration-300 shadow-lg shadow-pink-900/20"
                >
                  <span>Ver detalles completos</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClose}
                  className="w-full bg-white/10 text-white font-medium py-2 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadGalaModal;

