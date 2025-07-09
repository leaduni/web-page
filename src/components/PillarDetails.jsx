import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import EventModal from '../components/EventModal';
import CountdownTimer from '../components/CountdownTimer';

const PillarDetails = ({ pillar }) => {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleEvents = () => setShowUpcoming(!showUpcoming);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const eventsToShow = showUpcoming ? pillar.upcoming : pillar.events;

  return (
    <div className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-6 animate-fadeIn">
      {/* Pilar Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-2/3 text-left">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-pink-700/40 mr-4 text-3xl">
              {pillar.emoji}
            </div>
            <h2 className="text-2xl font-bold text-purple-300">Pilar {pillar.name}</h2>
          </div>
          <p className="text-white mb-6">{pillar.description}</p>
          <h3 className="text-xl font-semibold text-purple-300 mb-3">Misión</h3>
          <p className="text-white mb-6">{pillar.mission}</p>
          <h3 className="text-xl font-semibold text-purple-300 mb-3">Actividades</h3>
          <ul className="list-disc pl-5 mb-6">
            {pillar.activities.map((activity, index) => (
              <li key={index} className="text-white mb-2">{activity}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold text-purple-300 mb-3">Coordinador</h3>
          <p className="text-white">{pillar.coordinator}</p>
        </div>

        <div className="md:w-1/3">
          <div className="rounded-lg overflow-hidden">
            <img
              src={pillar.coverImage}
              alt={`Pilar ${pillar.name}`}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Toggle centrado */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex border-2 border-purple-600 rounded-full overflow-hidden">
          <button
            onClick={() => setShowUpcoming(true)}
            className={`px-4 py-1 font-semibold transition ${
              showUpcoming ? 'bg-purple-600 text-white' : 'bg-transparent text-purple-200'
            }`}
          >
            Eventos Próximos
          </button>
          <button
            onClick={() => setShowUpcoming(false)}
            className={`px-4 py-1 font-semibold transition ${
              !showUpcoming ? 'bg-purple-600 text-white' : 'bg-transparent text-purple-200'
            }`}
          >
            Eventos Pasados
          </button>
        </div>
      </div>

      {/* ✅ Cuenta regresiva grande del evento más próximo */}
      {showUpcoming && eventsToShow.length > 0 && (
        <div className="text-center mb-10">
          <h3 className="text-xl text-white mb-1">Próximo evento destacado:</h3>
          <p className="text-2xl text-pink-400 font-bold mb-3">{eventsToShow[0].nombreDelEvento}</p>
          <CountdownTimer fechaStr={eventsToShow[0].fechaTentativaDelEvento} grande />
        </div>
      )}


      {/* Cards de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {eventsToShow && eventsToShow.length > 0 ? (
          eventsToShow.map((event, index) => (
            <div
              key={index}
              className="bg-purple-900/30 backdrop-blur-sm rounded-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
              onClick={() => handleOpenModal({ ...event })}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.imagenUrl}
                  alt={event.nombreDelEvento || event.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />

                {/* Etiqueta Pilar */}
                <div className="absolute top-4 right-4">
                  <span className="bg-purple-800/50 text-purple-200 text-xs px-3 py-1 rounded-full">
                    {pillar.name}
                  </span>
                </div>

                {/* Countdown pequeño (solo si es próximo) */}
                {showUpcoming && event.fechaTentativaDelEvento && (
                  <div className="absolute top-4 left-4">
                    <CountdownTimer fechaStr={event.fechaTentativaDelEvento} />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/90 to-transparent p-4">
                  <div className="flex items-center text-purple-300 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      {event.fechaTentativaDelEvento || event.fechaDelEvento || 'Fecha no disponible'}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold">
                    {event.nombreDelEvento || event.title}
                  </h4>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-purple-100 text-center col-span-full">
            No hay eventos para mostrar. ¡Mantente pendiente a nuestras publicaciones!
          </p>
        )}
      </div>

      <div className="border-t border-purple-700/40 my-6" />

      {/* Ver más */}
      <div className="flex justify-center">
        <Link
          to={`/noticias?pilar=${pillar.id}`}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-6 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-300"
        >
          Ver más eventos
        </Link>
      </div>

      {/* Modal */}
      {modalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleCloseModal}
          tipo={showUpcoming ? 'proximo' : 'pasado'}
        />
      )}
    </div>
  );
};

export default PillarDetails;
