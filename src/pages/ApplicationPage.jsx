import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import FormCard from '../components/FormCard';
import FormField from '../components/FormField';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import PillarOption from '../components/PillarOption';
import { GraduationCap, Users, BookOpen, Heart, Building2, Megaphone } from 'lucide-react';

const careerOptions = [
  { value: 'sistemas', label: 'Ing. de Sistemas' },
  { value: 'industrial', label: 'Ing. Industrial' },
  { value: 'mecatronica', label: 'Ing. Mecatrónica' },
  { value: 'civil', label: 'Ing. Civil' },
  { value: 'ambiental', label: 'Ing. Ambiental' },
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
    career: '',
    cycle: '',
    acceptedTerms: false,
  });
  const [selectedPillar, setSelectedPillar] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden [&::-webkit-scrollbar]:hidden"
      style={{
        background: 'linear-gradient(to bottom right, #09092a 0%, #36042f 100%)',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // Internet Explorer 10+
        WebkitScrollbar: { display: 'none' }, // Chrome, Safari, Opera
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
            <button
              className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-8 py-2 rounded-full shadow-lg font-bold hover:scale-105 transition"
              onClick={scrollToForm}
            >
              Únete
            </button>
            <button
              className="border-2 border-[#a6249d] text-white px-8 py-2 rounded-full shadow-lg font-bold hover:scale-105 transition bg-[#030c40]/80"
              onClick={scrollToInfo}
            >
              Descubre
            </button>
          </div>
        </div>
      </section>

      {/* Sección informativa con fondo negro */}
      <section
        id="info-section"
        className="w-full flex flex-col items-center justify-center min-h-screen py-8 px-4 z-20 relative"
      >
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
      <section
        id="application-form"
        className="w-full flex flex-col items-center justify-center min-h-screen py-8 px-4 z-20 relative"
      >
        <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <FormCard
              title="Información General"
              subtitle="Completamos tu registro en 2 días hábiles."
            >
              <FormField label="Nombre Completo">
                <TextInput
                  value={formData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                />
              </FormField>
              <FormField label="Carrera">
                <SelectInput
                  options={careerOptions}
                  value={formData.career}
                  onChange={value => handleInputChange('career', value)}
                />
              </FormField>
              <FormField label="Ciclo Relativo">
                <TextInput
                  value={formData.cycle}
                  onChange={e => handleInputChange('cycle', e.target.value)}
                />
              </FormField>
              <Checkbox
                checked={formData.acceptedTerms}
                onChange={checked => handleInputChange('acceptedTerms', checked)}
                label={
                  <>
                    Acepto los términos y condiciones
                    <a
                      href="#"
                      className="ml-1 underline hover:text-white transition-colors"
                      style={{ color: theme.colors.primary }}
                    >
                      Leer T&Cs
                    </a>
                  </>
                }
              />
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
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#bf2a51] to-[#a6249d] bg-clip-text text-transparent">
                    {pillarContent[selectedPillar].title}
                  </h3>
                  <p className="text-[#f3eafd]">{pillarContent[selectedPillar].description}</p>
                </div>
              </FormCard>
            )}
            {selectedPillar && (
              <FormCard title="INFORMACIÓN ESPECÍFICA PARA POSTULAR AL PILAR">
                <div className="text-white">
                  <p className="text-[#a6249d] italic">
                    Complete la información específica requerida para este pilar.
                  </p>
                  <FormField label="Experiencia Previa">
                    <TextInput
                      value=""
                      onChange={() => {}}
                      placeholder="Describe tu experiencia previa en este campo"
                    />
                  </FormField>
                  <FormField label="Motivación">
                    <TextInput
                      value=""
                      onChange={() => {}}
                      placeholder="¿Por qué te interesa este pilar?"
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
