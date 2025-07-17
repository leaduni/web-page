import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Users, Calendar, Heart, Star, ArrowRight } from 'lucide-react';

const ApplicationPage = () => {
  const theme = useTheme();
  const [randomSpheres, setRandomSpheres] = useState([]);

  // Colores disponibles para las esferas
  const sphereColors = [
    { from: '#d93340', to: '#a6249d' },
    { from: '#a6249d', to: '#7957f1' },
    { from: '#7957f1', to: '#d93340' },
    { from: '#d93340', to: '#7957f1' },
    { from: '#a6249d', to: '#d93340' },
    { from: '#7957f1', to: '#a6249d' },
  ];

  // Función para generar posición aleatoria
  const getRandomPosition = () => {
    const top = Math.random() * 80 + 10; // Entre 10% y 90%
    const left = Math.random() * 80 + 10; // Entre 10% y 90%
    
    return {
      top: `${top}%`,
      left: `${left}%`,
    };
  };

  // Función para generar tamaño aleatorio
  const getRandomSize = () => {
    const sizes = ['w-8 h-8', 'w-10 h-10', 'w-12 h-12', 'w-16 h-16', 'w-20 h-20'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  // Función para generar esfera aleatoria
  const generateRandomSphere = () => {
    const position = getRandomPosition();
    const size = getRandomSize();
    const color = sphereColors[Math.floor(Math.random() * sphereColors.length)];
    const id = Date.now() + Math.random();

    return {
      id,
      position,
      size,
      color,
      opacity: Math.random() * 0.4 + 0.3, // Opacidad entre 0.3 y 0.7
    };
  };

  // Efecto para manejar las esferas aleatorias
  useEffect(() => {
    const interval = setInterval(() => {
      // Generar nueva esfera
      const newSphere = generateRandomSphere();
      setRandomSpheres(prev => [...prev, newSphere]);

      // Remover la esfera después de 6 segundos
      setTimeout(() => {
        setRandomSpheres(prev => prev.filter(sphere => sphere.id !== newSphere.id));
      }, 6000);
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const handleJoinCommunity = () => {
    window.open('https://lu.ma/dculvoh1', '_blank');
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden [&::-webkit-scrollbar]:hidden"
      style={{
        background: 'linear-gradient(to bottom right, #09092a 0%, #36042f 100%)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitScrollbar: { display: 'none' },
      }}
    >
      {/* Esferas decorativas aleatorias */}
      {randomSpheres.map(sphere => (
        <div
          key={sphere.id}
          className={`absolute ${sphere.size} rounded-full bg-gradient-to-br blur-2xl z-0 transition-all duration-1000 ease-in-out`}
          style={{
            top: sphere.position.top,
            left: sphere.position.left,
            background: `linear-gradient(to bottom right, ${sphere.color.from}, ${sphere.color.to})`,
            opacity: sphere.opacity,
          }}
        />
      ))}

      {/* Esferas decorativas estáticas adicionales */}
      <div className="absolute z-0 pointer-events-none w-full h-full">
        {/* Esfera grande superior izquierda */}
        <span className="absolute top-[-60px] left-[-60px] w-48 h-48 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] opacity-40 blur-2xl" />
        {/* Esfera mediana inferior derecha */}
        <span className="absolute bottom-[-40px] right-[-40px] w-32 h-32 rounded-full bg-gradient-to-br from-[#7957f1] to-[#d93340] opacity-30 blur-2xl" />
        {/* Esfera pequeña centro izquierda */}
        <span className="absolute top-1/2 left-[-30px] w-20 h-20 rounded-full bg-gradient-to-br from-[#a6249d] to-[#7957f1] opacity-30 blur-xl" />
        {/* Esfera mediana superior derecha */}
        <span className="absolute top-10 right-[-50px] w-28 h-28 rounded-full bg-gradient-to-br from-[#d93340] to-[#7957f1] opacity-25 blur-2xl" />
        {/* Esfera pequeña inferior centro */}
        <span className="absolute bottom-[-30px] left-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#a6249d] to-[#d93340] opacity-20 blur-xl" />
      </div>

      {/* Sección principal con fondo negro y esferas animadas */}
      <section className="w-full flex flex-col items-center justify-center min-h-screen pt-10 pb-6 z-20 relative overflow-hidden">
        {/* Fondo negro */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div
            className="w-full h-full"
            style={{ background: 'rgb(9,9,42)', minHeight: '100%', borderRadius: 0 }}
          ></div>
        </div>

        {/* Esferas animadas */}
        <div className="absolute inset-0 z-2 pointer-events-none">
          {/* Esfera 1 */}
          <span className="animate-bubble1 absolute top-10 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-[#d93340] via-[#a6249d] to-[#7957f1] opacity-70 blur-2xl" />
          {/* Esfera 2 */}
          <span className="animate-bubble2 absolute top-1/2 left-1/3 w-10 h-10 rounded-full bg-gradient-to-br from-[#bf2a51] via-[#7957f1] to-[#a6249d] opacity-60 blur" />
          {/* Esfera 3 */}
          <span className="animate-bubble3 absolute top-1/3 left-2/3 w-20 h-20 rounded-full bg-gradient-to-br from-[#a6249d] via-[#d93340] to-[#030c40] opacity-80 blur-xl" />
          {/* Esfera 4 */}
          <span className="animate-bubble4 absolute bottom-10 left-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#7957f1] via-[#bf2a51] to-[#d93340] opacity-70 blur" />
          {/* Esfera 5 */}
          <span className="animate-bubble5 absolute bottom-1/4 right-1/4 w-14 h-14 rounded-full bg-gradient-to-br from-[#d93340] via-[#a6249d] to-[#030c40] opacity-60 blur-2xl" />
        </div>

        {/* Logo */}
        <img
          src="/logo-lead-uni.png"
          alt="Logo LEAD UNI"
          className="w-1/2 max-w-lg object-contain shadow-xl mb-4 bg-transparent relative z-10"
          style={{ marginTop: '60px' }}
        />

        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4 py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg py-5">
            Centro Estudiantil{' '}
            <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent">
              LEAD UNI
            </span>
          </h1>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#d93340]/20 border border-[#d93340]/40 rounded-full px-6 py-3 mb-6">
              <Calendar className="w-5 h-5 text-[#d93340]" />
              <span className="text-[#d93340] font-semibold">Convocatoria Cerrada</span>
            </div>
            
            <p className="text-xl text-[#f3eafd] text-center mb-6 max-w-2xl">
              Actualmente no estamos en temporada de convocatoria. ¡Pero no te preocupes! 
              Puedes unirte a nuestra comunidad general y estar al tanto de las próximas oportunidades.
            </p>
          </div>

          {/* Tarjetas informativas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
            <div className="bg-gradient-to-br from-[#d93340]/20 to-[#19092a]/40 rounded-xl p-6 border border-[#d93340]/30">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-[#d93340]" />
              </div>
              <h3 className="text-lg font-semibold text-[#d93340] mb-2 text-center">Comunidad Activa</h3>
              <p className="text-[#f3eafd] text-center text-sm">
                Únete a nuestra comunidad general y conecta con otros estudiantes apasionados por el liderazgo.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#a6249d]/20 to-[#19092a]/40 rounded-xl p-6 border border-[#a6249d]/30">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-[#a6249d]" />
              </div>
              <h3 className="text-lg font-semibold text-[#a6249d] mb-2 text-center">Próximas Oportunidades</h3>
              <p className="text-[#f3eafd] text-center text-sm">
                Recibe notificaciones sobre futuras convocatorias y eventos especiales.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#7957f1]/20 to-[#19092a]/40 rounded-xl p-6 border border-[#7957f1]/30">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-[#7957f1]" />
              </div>
              <h3 className="text-lg font-semibold text-[#7957f1] mb-2 text-center">Desarrollo Continuo</h3>
              <p className="text-[#f3eafd] text-center text-sm">
                Accede a recursos, talleres y contenido exclusivo para tu crecimiento personal y profesional.
              </p>
            </div>
          </div>

          {/* Botón de unirse a la comunidad */}
          <div className="text-center">
            <button 
              className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-8 py-4 rounded-full shadow-lg font-bold text-lg hover:scale-105 transition flex items-center gap-3 mx-auto"
              onClick={handleJoinCommunity}
            >
              <span>Unirse a la Comunidad LEAD UNI</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-[#f3eafd]/70 text-sm mt-3">
              Te redirigiremos a nuestra plataforma de comunidad
            </p>
          </div>
        </div>
      </section>

      {/* Sección informativa adicional */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 z-20 relative">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div
            className="w-full h-full"
            style={{ background: 'rgb(9,9,42)', minHeight: '100%', borderRadius: 0 }}
          ></div>
        </div>
        
        <div className="max-w-4xl w-full bg-[#19092a]/80 rounded-2xl shadow-xl p-8 border border-[#a6249d]/40 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent">
              ¿Qué puedes esperar?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#d93340] mb-4">En la Comunidad General:</h3>
              <ul className="space-y-3 text-[#f3eafd]">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#d93340] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Notificaciones sobre próximas convocatorias</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#d93340] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Eventos y talleres abiertos a la comunidad</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#d93340] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recursos y contenido educativo</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#d93340] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Networking con otros estudiantes</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#a6249d] mb-4">Próximas Convocatorias:</h3>
              <ul className="space-y-3 text-[#f3eafd]">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a6249d] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Convocatoria de nuevos miembros (temporada regular)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a6249d] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Programas especiales de liderazgo</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a6249d] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Proyectos de impacto social</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#a6249d] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Mentorías y desarrollo profesional</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplicationPage; 
