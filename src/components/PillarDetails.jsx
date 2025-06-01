import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const PillarDetails = ({ pillar }) => {
  return (
    <div className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-2/3 text-left">
          <div className="flex items-center mb-4"> 
            <div className="p-2 rounded-full bg-pink-700/40 mr-4 text-3xl">
              {pillar.emoji}
            </div>
            <h2 className="text-2xl font-bold text-purple-300">Pilar {pillar.name}</h2>
          </div>

          <p className="text-white mb-6">{pillar.description}</p>

          
          <h3 className="text-xl font-semibold text-purple-300 mb-3">Mision</h3>
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

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-purple-300 mb-6">Eventos Recientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {pillar.events.slice(0, 3).map((event, index) => (
            <div 
              key={index}
              className="bg-purple-900/30 backdrop-blur-sm rounded-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="bg-purple-800/50 text-purple-200 text-xs px-3 py-1 rounded-full">
                    {pillar.name}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/90 to-transparent p-4">
                  <div className="flex items-center text-purple-300 text-sm mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{event.date || '15 de Mayo, 2025'}</span>
                  </div>
                  <h4 className="text-white font-semibold">{event.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link 
            to={`/noticias?pilar=${pillar.id}`}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-6 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-300"
          >
            Ver más eventos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PillarDetails;
