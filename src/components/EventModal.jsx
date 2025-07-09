import { useRef, useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

// 👉 Función para parsear fecha en formato DD/MM/YYYY
const parseFechaLatina = (fechaStr) => {
  const [dia, mes, anio] = fechaStr.split('/');
  return new Date(`${anio}-${mes}-${dia}T00:00:00`);
};

const EventModal = ({ event, onClose, tipo }) => {
  const [countdown, setCountdown] = useState('');
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (modalContentRef.current) {
      const headerOffset = 92;
      const elementPosition = modalContentRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    console.log("📆 Fecha recibida:", event.fechaTentativaDelEvento || event.fechaDelEvento);


    if (tipo === 'proximo' && event.fechaTentativaDelEvento) {
      const eventDate = parseFechaLatina(event.fechaTentativaDelEvento);

      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate.getTime() - now;

        if (distance <= 0) {
          setCountdown('¡El evento ha comenzado!');
          clearInterval(interval);
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [event.fechaTentativaDelEvento, tipo]);

  const metricBoxStyle =
    'flex flex-col items-center justify-center bg-gradient-to-br text-white rounded-2xl py-3 px-4 shadow-xl hover:scale-105 transition-transform duration-200 hover:brightness-110';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div
        className="bg-[#1b0e2f] text-white rounded-xl p-6 w-full max-w-lg relative shadow-xl border border-purple-700"
        ref={modalContentRef}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-300 hover:text-red-400 text-lg"
        >
          ✕
        </button>

        <img
          src={event.imagenUrl}
          alt={event.nombreDelEvento}
          className="w-full h-48 object-cover rounded-md mb-4"
        />

        <h2 className="text-2xl font-bold text-white mb-1">
          {event.nombreDelEvento}
        </h2>
        <p className="text-sm text-gray-300 flex items-center mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          {event.fechaTentativaDelEvento || event.fechaDelEvento || 'Fecha no disponible'}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {event.cantidadDeAsistentes && (
            <div className={`${metricBoxStyle} from-[#a0218b] via-[#d64bbc] to-[#ff4dbc]`}>
              <span className="text-2xl font-extrabold drop-shadow">+{event.cantidadDeAsistentes}</span>
              <span className="text-xs font-medium">Asistentes</span>
            </div>
          )}

          {event.cantidadDePonentes && (
            <div className={`${metricBoxStyle} from-[#6a0dad] via-[#a0218b] to-[#d64bbc]`}>
              <span className="text-2xl font-extrabold drop-shadow">{event.cantidadDePonentes}</span>
              <span className="text-xs font-medium">Ponentes</span>
            </div>
          )}

          {event.universidadesParticipantes && (
            <div className={`${metricBoxStyle} from-[#3b0a60] via-[#6a0dad] to-[#a0218b]`}>
              <span className="text-2xl font-extrabold drop-shadow">+{event.universidadesParticipantes}</span>
              <span className="text-xs font-medium">Universidades</span>
            </div>
          )}

          {event.carrerasParticipantes && (
            <div className={`${metricBoxStyle} from-[#4c1d95] via-[#7e22ce] to-[#a855f7]`}>
              <span className="text-2xl font-extrabold drop-shadow">+{event.carrerasParticipantes}</span>
              <span className="text-xs font-medium text-center">Carreras Participantes</span>
            </div>
          )}

          {event.porcentajeCiclosSuperiores && (
            <div className={`${metricBoxStyle} from-[#ff69b4] via-[#ff4dbc] to-[#ff85c1]`}>
              <span className="text-2xl font-extrabold drop-shadow">{event.porcentajeCiclosSuperiores}%</span>
              <span className="text-xs font-medium text-center">Ciclos Superiores</span>
            </div>
          )}

          {event.nivelSatisfaccion && (
            <div className={`${metricBoxStyle} from-[#d64bbc] via-[#b82fa2] to-[#8a1c77]`}>
              <span className="text-2xl font-extrabold drop-shadow">{event.nivelSatisfaccion}%</span>
              <span className="text-xs font-medium text-center">Satisfacción</span>
            </div>
          )}
        </div>

        {/* Descripción y acciones */}
        {tipo === 'pasado' ? (
          <p className="text-sm text-gray-300">{event.descripcion}</p>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">{event.descripcionBreve}</p>

            {/* Cuenta regresiva si existe */}
            {countdown && (
              <div className="text-sm text-pink-400 font-semibold">⏳ {countdown}</div>
            )}

            <a
              href={event.linkDeInscripcion}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-[#a0218b] via-[#d64bbc] to-[#ff4dbc] hover:brightness-110 text-white text-center py-2 rounded-md transition duration-200"
            >
              Inscribirse al Evento
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventModal;
