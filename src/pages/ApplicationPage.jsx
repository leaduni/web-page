import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import FormCard from '../components/FormCard';
import FormField from '../components/FormField';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import PillarOption from '../components/PillarOption';
import ContactSection from '../components/ContactSection';
import { GraduationCap, Users, BookOpen, Heart, Building2, Megaphone } from 'lucide-react';

const facultyOptions = [
  { value: 'fim', label: 'Facultad de Ingeniería Mecánica' },
  { value: 'fiee', label: 'Facultad de Ingeniería Eléctrica y Electrónica' },
  { value: 'fic', label: 'Facultad de Ingeniería Civil' },
  { value: 'fiq', label: 'Facultad de Ingeniería Química y Textil' },
  { value: 'figmm', label: 'Facultad de Ingeniería Geológica, Minera y Metalúrgica' },
  { value: 'fia', label: 'Facultad de Ingeniería Ambiental' },
  { value: 'fip', label: 'Facultad de Ingeniería Pesquera' },
  { value: 'fie', label: 'Facultad de Ingeniería Económica' },
  { value: 'fiaa', label: 'Facultad de Ingeniería Arquitectura y Artes' },
];

const careerOptions = [
  { value: 'sistemas', label: 'Ing. de Sistemas' },
  { value: 'industrial', label: 'Ing. Industrial' },
  { value: 'mecatronica', label: 'Ing. Mecatrónica' },
  { value: 'civil', label: 'Ing. Civil' },
  { value: 'ambiental', label: 'Ing. Ambiental' },
  { value: 'mecanica', label: 'Ing. Mecánica' },
  { value: 'electrica', label: 'Ing. Eléctrica' },
  { value: 'electronica', label: 'Ing. Electrónica' },
  { value: 'quimica', label: 'Ing. Química' },
  { value: 'textil', label: 'Ing. Textil' },
  { value: 'minera', label: 'Ing. de Minas' },
  { value: 'metalurgica', label: 'Ing. Metalúrgica' },
  { value: 'pesquera', label: 'Ing. Pesquera' },
  { value: 'economica', label: 'Ing. Económica' },
  { value: 'arquitectura', label: 'Arquitectura' },
];

const cycleOptions = [
  { value: '1', label: '1er Ciclo' },
  { value: '2', label: '2do Ciclo' },
  { value: '3', label: '3er Ciclo' },
  { value: '4', label: '4to Ciclo' },
  { value: '5', label: '5to Ciclo' },
  { value: '6', label: '6to Ciclo' },
  { value: '7', label: '7mo Ciclo' },
  { value: '8', label: '8vo Ciclo' },
  { value: '9', label: '9no Ciclo' },
  { value: '10', label: '10mo Ciclo' },
];

const pillarOptions = [
  { id: 'academic', icon: <GraduationCap size={24} color="white" />, name: 'Excelencia Académica' },
  { id: 'women', icon: <Users size={24} color="white" />, name: 'Impulso Femenino' },
  { id: 'academia', icon: <BookOpen size={24} color="white" />, name: 'LEAD Academia' },
  { id: 'social', icon: <Heart size={24} color="white" />, name: 'Impacto Social' },
  { id: 'chapter', icon: <Building2 size={24} color="white" />, name: 'Desarrollo de Capítulo' },
  { id: 'marketing', icon: <Megaphone size={24} color="white" />, name: 'Marketing' },
];

const pillarContent = {
  academic: {
    title: 'Excelencia Académica',
    description:
      'Programa enfocado en potenciar el rendimiento académico y desarrollar habilidades de estudio efectivas.',
  },
  women: {
    title: 'Impulso Femenino',
    description: 'Iniciativa dedicada a empoderar y promover el liderazgo femenino en campos STEM.',
  },
  academia: {
    title: 'LEAD Academia',
    description:
      'Formación integral en habilidades técnicas y blandas para futuros líderes en ingeniería.',
  },
  social: {
    title: 'Impacto Social',
    description:
      'Proyectos orientados a crear cambios positivos en la comunidad a través de la ingeniería.',
  },
  chapter: {
    title: 'Desarrollo de Capítulo',
    description: 'Gestión y crecimiento del capítulo estudiantil, fortaleciendo la comunidad LEAD.',
  },
  marketing: {
    title: 'Marketing',
    description:
      'Estrategias de comunicación y promoción para dar visibilidad a las iniciativas del capítulo.',
  },
};

const ApplicationPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    faculty: '',
    career: '',
    cycle: '',
  });
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [pillarSpecificData, setPillarSpecificData] = useState({
    projectType: '',
    skills: '',
  });
  const [leadUniDefinition, setLeadUniDefinition] = useState('');
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
    // Generar posiciones completamente aleatorias
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePillarSpecificChange = (field, value) => {
    setPillarSpecificData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToInfo = () => {
    const infoSection = document.getElementById('info-section');
    if (infoSection) {
      infoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSubmitForm = () => {
    // Verificar que todos los campos requeridos estén completos
    if (!formData.fullName || !formData.phone || !formData.email || 
        !formData.faculty || !formData.career || !formData.cycle || 
        !selectedPillar || !pillarSpecificData.projectType || 
        !pillarSpecificData.skills || !leadUniDefinition) {
      alert('Por favor, completa todos los campos requeridos antes de enviar el formulario.');
      return;
    }

    // Obtener el nombre del pilar seleccionado
    const selectedPillarName = pillarOptions.find(pillar => pillar.id === selectedPillar)?.name || '';

    // Construir la URL del formulario de Google con los parámetros
    const googleFormUrl = new URL('https://docs.google.com/forms/d/e/1FAIpQLSc1mIy-z6khAdySOylpJIDZVmwZHDznzrjxRbH44jBqDW0dcw/viewform');
    
    // Agregar los parámetros de entrada
    const params = new URLSearchParams({
      'usp': 'pp_url',
      'entry.2005620554': formData.fullName, // Nombres y Apellidos
      'entry.1201849899': formData.phone, // Número de celular
      'entry.1045781291': formData.email, // Dirección de correo electrónico
      'entry.1065046570': facultyOptions.find(f => f.value === formData.faculty)?.label || '', // Facultad
      'entry.1166974658': careerOptions.find(c => c.value === formData.career)?.label || '', // Carrera
      'entry.1403026133': cycleOptions.find(cy => cy.value === formData.cycle)?.label || '', // Ciclo Relativo
      'entry.21194440': pillarSpecificData.projectType, // ¿Cuál fue tu principal motivo para postular a este Pilar?
      'entry.5426552': pillarSpecificData.skills, // ¿Qué habilidades te ayudarían a destacar en este pilar?
      'entry.1624972609': leadUniDefinition, // Para ti, ¿qué es LEAD UNI?
    });

    googleFormUrl.search = params.toString();

    // Redirigir al formulario de Google
    window.open(googleFormUrl.toString(), '_blank');
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #09092a 0%, #36042f 100%)',
      }}
    >
      {/* Esferas decorativas aleatorias */}
      {/* 'radial-gradient(ellipse at 60% 40%, #030c40 0%, #7957f1 60%, #a6249d 100%)' */}
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

      {/* Sección de bienvenida con fondo negro y esferas animadas */}
      <section
        className="w-full flex flex-col items-center justify-center min-h-screen pt-10 pb-6 z-20 relative overflow-hidden"
      >
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
        <img
          src="/logo-lead-uni.png"
          alt="Logo LEAD UNI"
          className="w-1/3 max-w-xs object-contain shadow-xl mb-4 bg-transparent relative z-10"
        />
        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-4 py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg py-5">
            Centro Estudiantil{' '}
            <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent">
              LEAD UNI
            </span>
          </h1>
          <p className="text-lg text-[#f3eafd] text-center mb-2">
            Formando líderes para transformar el futuro a través de excelencia académica, desarrollo
            profesional e impacto social.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <button className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-8 py-2 rounded-full shadow-lg font-bold hover:scale-105 transition" onClick={scrollToForm}>
              Únete
            </button>
            <button className="border-2 border-[#a6249d] text-white px-8 py-2 rounded-full shadow-lg font-bold hover:scale-105 transition bg-[#030c40]/80" onClick={scrollToInfo}>
              Descubre
            </button>
          </div>
        </div>
      </section>

      {/* Sección informativa con fondo negro */}
      <section id="info-section" className="w-full flex flex-col items-center justify-center min-h-screen py-8 px-4 z-20 relative">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div
            className="w-full h-full"
            style={{ background: 'rgb(9,9,42)', minHeight: '100%', borderRadius: 0 }}
          ></div>
        </div>
        <div className="max-w-3xl w-full bg-[#19092a]/80 rounded-2xl shadow-xl p-6 mb-8 border border-[#a6249d]/40 relative z-10">
          <h2 className="text-2xl font-bold text-[#d93340] mb-2 text-center">
            ¿Por qué unirte a{' '}
            <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] bg-clip-text text-transparent">
              LEAD UNI
            </span>
            ?
          </h2>
          <ul className="list-disc list-inside text-[#f3eafd] text-lg space-y-2 mb-6 py-4">
            <li>Desarrolla habilidades de liderazgo y trabajo en equipo.</li>
            <li>Participa en proyectos de impacto social y académico.</li>
            <li>Accede a talleres, charlas y mentorías exclusivas.</li>
            <li>Conecta con una red de estudiantes y profesionales en ingeniería.</li>
            <li>¡Y mucho más!</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#d93340]/30 to-[#19092a]/20 rounded-xl p-6 shadow-lg flex flex-col items-center">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2">
                <circle cx="12" cy="12" r="10" fill="#ff6ec7" opacity="0.2" />
                <path
                  d="M12 6v6l4 2"
                  stroke="#ff6ec7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-xl font-semibold text-[#d93340] mb-1">Cronograma</h3>
              <ul className="text-[#f3eafd] text-base list-disc list-inside">
                <li>Postulación: hasta 31 de agosto</li>
                <li>Entrevistas: 2-6 de septiembre</li>
                <li>Resultados: 10 de septiembre</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#19092a]/30 to-[#bf2a51]/20 rounded-xl p-6 shadow-lg flex flex-col items-center">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2">
                <rect x="3" y="4" width="16" height="16" rx="10" fill="#ff6ec7" opacity="0.2" />
                <path
                  d="M8 12l2 2 4-4"
                  stroke="#ff6ec7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-xl font-semibold text-[#d93340] mb-1">Requisitos</h3>
              <ul className="text-[#f3eafd] text-base list-disc list-inside">
                <li>Ser estudiante de la UNI</li>
                <li>Tener interés en liderazgo y trabajo en equipo</li>
                <li>Compromiso con el desarrollo personal y profesional</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen decorativa de la derecha, ahora en el fondo (z-0) */}
      <div className="hidden lg:flex fixed right-0 top-0 h-full w-1/2 items-center justify-center z-0 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center relative">
          <img
            src="/student_stem.png"
            alt="Students in STEM"
            className="object-contain mx-auto"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* Sección de formulario y cuadros para rellenar datos */}
      <section id="application-form" className="w-full flex flex-col items-center justify-center min-h-screen py-8 px-4 z-20 relative">
        <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <FormCard
              title="Información General"
              subtitle="Cuentamos un poco más sobre ti"
            >
              <FormField label="Nombres y Apellidos">
                <TextInput
                  value={formData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                  placeholder="Ingresa tu nombre completo"
                />
              </FormField>
              <FormField label="Número de Celular">
                <TextInput
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  placeholder="Ej: 999 999 999"
                />
              </FormField>
              <FormField label="Dirección de Correo Electrónico">
                <TextInput
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  placeholder="ejemplo@correo.com"
                />
              </FormField>
              <FormField label="Facultad">
                <SelectInput
                  options={facultyOptions}
                  value={formData.faculty}
                  onChange={value => handleInputChange('faculty', value)}
                  placeholder="Selecciona tu facultad"
                />
              </FormField>
              <FormField label="Carrera">
                <SelectInput
                  options={careerOptions}
                  value={formData.career}
                  onChange={value => handleInputChange('career', value)}
                  placeholder="Selecciona tu carrera"
                />
              </FormField>
              <FormField label="Ciclo Relativo">
                <SelectInput
                  options={cycleOptions}
                  value={formData.cycle}
                  onChange={value => handleInputChange('cycle', value)}
                  placeholder="Selecciona tu ciclo"
                />
              </FormField>
            </FormCard>
            <div className="text-center mb-8">
              <h3 className="text-lg font-medium mb-4 text-[#ec46e1]">Seleccione el Pilar</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {pillarOptions.map(pillar => (
                  <PillarOption
                    key={pillar.id}
                    id={pillar.id}
                    icon={pillar.icon}
                    selected={selectedPillar === pillar.id}
                    onClick={() => setSelectedPillar(pillar.id)}
                  />
                ))}
              </div>
            </div>
            {selectedPillar && (
              <FormCard title={`INFORMACIÓN SOBRE EL PILAR`}>
                <div className="text-white">
                  <h3
                    className="text-xl font-bold mb-2 bg-gradient-to-r from-[#bf2a51] to-[#a6249d] bg-clip-text text-transparent"
                  >
                    {pillarContent[selectedPillar].title}
                  </h3>
                  <p className="text-[#f3eafd]">{pillarContent[selectedPillar].description}</p>
                </div>
              </FormCard>
            )}
            {selectedPillar && (
              <FormCard title="INFORMACIÓN ESPECÍFICA PARA POSTULAR AL PILAR">
                <div className="text-white">
                  <FormField label="¿Cuál fue tu principal motivo para postular a este Pilar?">
                    <TextInput
                      value={pillarSpecificData.projectType}
                      onChange={e => handlePillarSpecificChange('projectType', e.target.value)}
                      placeholder="Describe tus motivos para postular a este pilar"
                    />
                  </FormField>
                  <FormField label="¿Qué habilidades te ayudarían a destacar en este pilar?">
                    <TextInput
                      value={pillarSpecificData.skills}
                      onChange={e => handlePillarSpecificChange('skills', e.target.value)}
                      placeholder="Menciona las habilidades que posees o quieres desarrollar"
                    />
                  </FormField>
                </div>
              </FormCard>
            )}
            {selectedPillar && (
              <FormCard title="REFLEXIÓN FINAL">
                <div className="text-white">
                  <FormField label="Para ti, ¿qué es LEAD UNI?">
                    <TextInput
                      value={leadUniDefinition}
                      onChange={e => setLeadUniDefinition(e.target.value)}
                      placeholder="Comparte tu visión sobre LEAD UNI"
                    />
                  </FormField>
                </div>
              </FormCard>
            )}
            {/* Apartado para enviar solicitud */}
            {selectedPillar && (
              <div className="flex flex-col items-center mt-8">
                <button
                  className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-10 py-3 rounded-full shadow-lg font-bold text-lg hover:scale-105 transition"
                  type="button"
                  onClick={handleSubmitForm}
                >
                  Enviar Solicitud
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplicationPage;
