import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import EventModal from '../components/EventModal';
import CountdownTimer from '../components/CountdownTimer';

const parseFechaLatina = fechaStr => {
  if (!fechaStr) return null;

  if (fechaStr.includes('/')) {
    const [dia, mes, anio] = fechaStr.split('/');

    return new Date(`${anio}-${mes}-${dia}T12:00:00`);
  }

  const isoDate = new Date(fechaStr);
  return isNaN(isoDate) ? null : isoDate;
};

const isTodayOrFuture = date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d >= today;
};

const PillarDetails = ({ pillar }) => {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const eventosPorPagina = 6;

  const toggleEvents = () => {
    setShowUpcoming(!showUpcoming);
    setCurrentPage(1);
  };

  const handleOpenModal = event => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  //Filtro para eventos próximos
  const filteredUpcoming = [...pillar.upcoming]
    .filter(event => {
      const eventDate = parseFechaLatina(event.fechaTentativaDelEvento);

      if (!eventDate || isNaN(eventDate)) {
        console.warn('Fecha inválida:', event.fechaTentativaDelEvento);
        return false;
      }

      return isTodayOrFuture(eventDate);
    })
    .sort(
      (a, b) =>
        parseFechaLatina(a.fechaTentativaDelEvento) - parseFechaLatina(b.fechaTentativaDelEvento)
    );
  const filteredPast = [...pillar.events]
    .filter(event => {
      const date = parseFechaLatina(event.fechaDelEvento);
      return date && !isTodayOrFuture(date);
    })
    .sort((a, b) => parseFechaLatina(b.fechaDelEvento) - parseFechaLatina(a.fechaDelEvento));

  let eventsToShow = showUpcoming ? filteredUpcoming : filteredPast;

  // Paginación solo para eventos pasados
  const totalPages = showUpcoming ? 1 : Math.ceil(eventsToShow.length / eventosPorPagina);
  const startIndex = (currentPage - 1) * eventosPorPagina;
  const endIndex = startIndex + eventosPorPagina;
  eventsToShow = showUpcoming ? eventsToShow : eventsToShow.slice(startIndex, endIndex);

  console.log('Pilar recibido:', pillar.name);
  console.log('Eventos filtrados (upcoming):', filteredUpcoming);
  console.log('EventsToShow (que sí se deben renderizar):', eventsToShow);

  return (
    <div className="bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#a6249d]/40 shadow-lg animate-fadeIn">
      {/* Pilar Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-2/3 text-left">
          <div className="flex items-center mb-4">
            <div className="mr-4 text-3xl">
              {pillar.logo ? (
                <img src={pillar.logo} alt={pillar.name} className="w-12 h-12 object-contain" />
              ) : (
                pillar.emoji
              )}
            </div>
            <h2 className="text-2xl font-bold text-white drop-shadow-md">Pilar {pillar.name}</h2>
          </div>
          <p className="text-white mb-6">{pillar.description}</p>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text mb-3">
            Misión
          </h3>
          <p className="text-white mb-6">{pillar.mission}</p>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text mb-3">
            Actividades
          </h3>
          <ul className="list-disc pl-5 mb-6">
            {pillar.activities.map((activity, index) => (
              <li key={index} className="text-white mb-2">
                {activity}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text mb-3">
            Coordinador
          </h3>
          <p className="text-white">{pillar.coordinator}</p>
        </div>

        <div className="md:w-1/3">
          <div className="rounded-2xl overflow-hidden border-2 border-[#a6249d]/40 shadow-lg">
            <img
              src={pillar.coverImage}
              alt={`Pilar ${pillar.name}`}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
      {/* Mostrar sección de eventos solo si NO es marketing */}

      {pillar.id !== 'marketing' && (
        <>
          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex border-2 border-[#a6249d]/40 rounded-full overflow-hidden">
              <button
                onClick={() => setShowUpcoming(true)}
                className={`px-4 py-1 font-semibold transition ${showUpcoming ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white' : 'bg-transparent text-white/70'}`}
              >
                Eventos Próximos
              </button>
              <button
                onClick={() => setShowUpcoming(false)}
                className={`px-4 py-1 font-semibold transition ${!showUpcoming ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white' : 'bg-transparent text-white/70'}`}
              >
                Eventos Pasados
              </button>
            </div>
          </div>

          {/* Cuenta regresiva */}
          {showUpcoming && filteredUpcoming.length > 0 && (
            <div className="text-center mb-10">
              <h3 className="text-xl text-white mb-1">Próximo evento destacado:</h3>
              <p className="text-2xl bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text font-bold mb-3">
                {filteredUpcoming[0].nombreDelEvento}
              </p>
              <CountdownTimer fechaStr={filteredUpcoming[0].fechaTentativaDelEvento} grande />
            </div>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {eventsToShow.length > 0 ? (
              eventsToShow.map((event, index) => (
                <div
                  key={index}
                  className="bg-[#1A0B2E]/90 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-[#a6249d]/40 shadow-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => handleOpenModal({ ...event })}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.imagenUrl}
                      alt={event.nombreDelEvento || event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white text-xs px-3 py-1 rounded-full shadow-md">
                        {pillar.name}
                      </span>
                    </div>
                    {showUpcoming && event.fechaTentativaDelEvento && (
                      <div className="absolute top-4 left-4">
                        <CountdownTimer fechaStr={event.fechaTentativaDelEvento} />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A0B2E]/90 to-transparent p-4">
                      <div className="flex items-center text-[#a6249d] text-sm mb-2">
                        <Calendar size={16} className="mr-2" />
                        <span>
                          {event.fechaTentativaDelEvento ||
                            event.fechaDelEvento ||
                            'Fecha no disponible'}
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
              <p className="text-white/70 text-center col-span-full">
                No hay eventos para mostrar. ¡Mantente pendiente a nuestras publicaciones!
              </p>
            )}
          </div>
          {/* Paginación */}
          {!showUpcoming && totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-[#a6249d]/20 text-[#a6249d] cursor-not-allowed' : 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white hover:from-[#a6249d] hover:to-[#d93340]'}`}
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded ${num === currentPage ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white' : 'bg-[#1A0B2E]/80 text-white/70 hover:bg-gradient-to-r hover:from-[#d93340]/60 hover:to-[#a6249d]/60'}`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-[#a6249d]/20 text-[#a6249d] cursor-not-allowed' : 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white hover:from-[#a6249d] hover:to-[#d93340]'}`}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

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
