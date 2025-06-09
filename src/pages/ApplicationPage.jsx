import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/header';
import FormCard from '../components/application/FormCard';
import FormField from '../components/application/FormField';
import TextInput from '../components/application/TextInput';
import SelectInput from '../components/application/SelectInput';
import Checkbox from '../components/application/Checkbox';
import PillarOption from '../components/application/PillarOption';
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
    description: 'Programa enfocado en potenciar el rendimiento académico y desarrollar habilidades de estudio efectivas.'
  },
  women: {
    title: 'Impulso Femenino',
    description: 'Iniciativa dedicada a empoderar y promover el liderazgo femenino en campos STEM.'
  },
  academia: {
    title: 'LEAD Academia',
    description: 'Formación integral en habilidades técnicas y blandas para futuros líderes en ingeniería.'
  },
  social: {
    title: 'Impacto Social',
    description: 'Proyectos orientados a crear cambios positivos en la comunidad a través de la ingeniería.'
  },
  chapter: {
    title: 'Desarrollo de Capítulo',
    description: 'Gestión y crecimiento del capítulo estudiantil, fortaleciendo la comunidad LEAD.'
  },
  marketing: {
    title: 'Marketing',
    description: 'Estrategias de comunicación y promoción para dar visibilidad a las iniciativas del capítulo.'
  }
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
      [field]: value
    }));
  };
  
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: 'radial-gradient(ellipse at 60% 40%, #030c40 0%, #7957f1 60%, #a6249d 100%)'
      }}
    >
      {/* Esferas decorativas flotantes */}
      <div className="absolute top-1/4 left-2/3 w-24 h-24 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] opacity-70 blur-2xl z-0" />
      <div className="absolute top-1/2 left-3/4 w-12 h-12 rounded-full bg-gradient-to-br from-[#bf2a51] to-[#7957f1] opacity-80 blur z-0" />
      <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-[#a6249d] to-[#d93340] opacity-60 blur z-0" />
      <div className="absolute bottom-10 left-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#7957f1] to-[#bf2a51] opacity-80 blur z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-[#d93340] to-[#030c40] opacity-60 blur z-0" />

      {/* Header al inicio */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Sección de bienvenida con fondo negro translúcido y esferas animadas */}
      <section className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-64px)] pt-10 pb-6 z-20 relative overflow-hidden" style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Fondo negro translúcido */}
        
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="w-full h-full" style={{background: 'rgba(3,12,64,0.92)', minHeight: '100%', borderRadius: 0}}></div>
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
        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg">
            Centro Estudiantil <span className="bg-gradient-to-r from-[#d93340] via-[#a6249d] to-[#7957f1] bg-clip-text text-transparent">LEAD UNI</span>
          </h1>
          <p className="text-lg text-[#f3eafd] text-center mb-2">
            Formando líderes para transformar el futuro a través de excelencia académica, desarrollo profesional e impacto social.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <button className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-8 py-2 rounded-full shadow-lg font-bold hover:scale-105 transition">Únete</button>
            <button className="border-2 border-[#7957f1] text-white px-8 py-2 rounded-full shadow-lg font-bold hover:scale-105 transition bg-[#030c40]/80">Descubre</button>
          </div>
        </div>
      </section>

      {/* Sección informativa con fondo negro translúcido */}
      <section className="w-full flex flex-col items-center justify-center py-8 px-4 z-20 relative">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="w-full h-full" style={{background: 'rgba(3,12,64,0.92)', minHeight: '100%', borderRadius: 0}}></div>
        </div>
        <div className="max-w-3xl w-full bg-[#030c40]/80 rounded-2xl shadow-xl p-6 mb-8 border border-[#7957f1]/40 relative z-10">
          <h2 className="text-2xl font-bold text-[#d93340] mb-2 text-center">¿Por qué unirte a <span className='bg-gradient-to-r from-[#d93340] via-[#a6249d] to-[#7957f1] bg-clip-text text-transparent'>LEAD UNI</span>?</h2>
          <ul className="list-disc list-inside text-[#f3eafd] text-lg space-y-2 mb-6">
            <li>Desarrolla habilidades de liderazgo y trabajo en equipo.</li>
            <li>Participa en proyectos de impacto social y académico.</li>
            <li>Accede a talleres, charlas y mentorías exclusivas.</li>
            <li>Conecta con una red de estudiantes y profesionales en ingeniería.</li>
            <li>¡Y mucho más!</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#d93340]/30 to-[#7957f1]/20 rounded-xl p-6 shadow-lg flex flex-col items-center">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2"><circle cx="12" cy="12" r="10" fill="#ff6ec7" opacity="0.2"/><path d="M12 6v6l4 2" stroke="#ff6ec7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="text-xl font-semibold text-[#7957f1] mb-1">Cronograma</h3>
              <ul className="text-[#f3eafd] text-base list-disc list-inside">
                <li>Postulación: hasta 31 de agosto</li>
                <li>Entrevistas: 2-6 de septiembre</li>
                <li>Resultados: 10 de septiembre</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#a6249d]/30 to-[#bf2a51]/20 rounded-xl p-6 shadow-lg flex flex-col items-center">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-2"><rect x="4" y="4" width="16" height="16" rx="8" fill="#7873f5" opacity="0.2"/><path d="M8 12l2 2 4-4" stroke="#7873f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
        <div className="w-[90%] h-[80%] flex items-center justify-center relative">
          <div
            className="overflow-visible shadow-2xl relative"
            style={{
              width: '100%',
              height: '100%',
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
              boxShadow: '0 12px 48px 0 rgba(0,0,0,0.25)',
              border: '6px solid rgba(255,255,255,0.18)',
              zIndex: 0,
              background: 'transparent',
            }}
          >
            <img
              src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Students in STEM"
              className="w-full h-full object-cover"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, white 60%, transparent 100%)',
                maskImage: 'radial-gradient(circle at 50% 50%, white 60%, transparent 100%)',
                filter: 'blur(0.5px)',
              }}
            />
            {/* Capa de desenfoque progresivo */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 60%, black 100%)',
                maskImage: 'radial-gradient(circle at 50% 50%, transparent 60%, black 100%)',
                backdropFilter: 'blur(16px)',
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* Sección de formulario y cuadros para rellenar datos */}
      <section className="w-full flex flex-col items-center justify-center py-8 px-4 z-20 relative">
        <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <FormCard 
              title="Información General" 
              subtitle="Completamos tu registro en 2 días hábiles."
            >
              <FormField label="Nombre Completo">
                <TextInput 
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </FormField>
              <FormField label="Carrera">
                <SelectInput 
                  options={careerOptions}
                  value={formData.career}
                  onChange={(value) => handleInputChange('career', value)}
                />
              </FormField>
              <FormField label="Ciclo Relativo">
                <TextInput 
                  value={formData.cycle}
                  onChange={(e) => handleInputChange('cycle', e.target.value)}
                />
              </FormField>
              <Checkbox 
                checked={formData.acceptedTerms}
                onChange={(checked) => handleInputChange('acceptedTerms', checked)}
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
              <h3 
                className="text-lg font-medium mb-4 text-[#a6249d]"
              >
                Seleccione el Pilar
              </h3>
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
                  <h3 className="text-xl font-bold mb-2 text-[#bf2a51]">
                    {pillarContent[selectedPillar].title}
                  </h3>
                  <p className="text-[#f3eafd]">
                    {pillarContent[selectedPillar].description}
                  </p>
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

      {/* Contact Section */}
      <footer className="w-full mt-16 flex flex-col items-center justify-center py-10 bg-[#030c40]/80 backdrop-blur-md border-t border-[#7957f1]/40 z-20 relative">
        <h2 className="text-2xl font-bold mb-4 text-[#d93340]">Contáctanos</h2>
        <div className="flex flex-wrap gap-6 items-center justify-center mb-4">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="Instagram">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="7" fill="#E1306C"/><path d="M16.98 2H7.02A5.02 5.02 0 0 0 2 7.02v9.96A5.02 5.02 0 0 0 7.02 22h9.96A5.02 5.02 0 0 0 22 16.98V7.02A5.02 5.02 0 0 0 16.98 2ZM12 17.2A5.2 5.2 0 1 1 17.2 12 5.2 5.2 0 0 1 12 17.2Zm6.4-9.44a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2Z" fill="#fff"/><circle cx="12" cy="12" r="3.2" fill="#fff"/></svg>
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="Facebook">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="7" fill="#1877F3"/><path d="M15.67 8.5h-1.34V7.5c0-.32.26-.58.58-.58h.76V5.08A10.1 10.1 0 0 0 14.1 5c-1.2 0-2.02.73-2.02 2.07v1.43H10v2h2.08v5.42h2.25V10.5h1.51l.24-2Z" fill="#fff"/></svg>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="LinkedIn">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="7" fill="#0A66C2"/><path d="M8.34 17.34H5.67V9.67h2.67v7.67ZM7 8.67A1.33 1.33 0 1 1 7 6a1.33 1.33 0 0 1 0 2.67Zm10.34 8.67h-2.67v-3.67c0-.88-.32-1.48-1.12-1.48-.61 0-.97.41-1.13.8-.06.15-.08.36-.08.57v3.78h-2.67s.04-6.13 0-7.67h2.67v1.09c.35-.54.98-1.31 2.39-1.31 1.75 0 3.06 1.14 3.06 3.59v4.3Z" fill="#fff"/></svg>
          </a>
          <a href="mailto:contacto@leaduni.com" className="hover:scale-110 transition-transform" title="Correo">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="7" fill="#EA4335"/><path d="M19.5 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 16.5v-9A1.5 1.5 0 0 1 6 6h12a1.5 1.5 0 0 1 1.5 1.5Zm-1.5 0-6 4.5-6-4.5m12 9h-12v-7.5l6 4.5 6-4.5V16.5Z" fill="#fff"/></svg>
          </a>
          <a href="tel:+51999999999" className="hover:scale-110 transition-transform" title="Teléfono">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="7" fill="#34A853"/><path d="M17.7 15.29l-2.2-1a1 1 0 0 0-1.13.21l-.97.99a7.49 7.49 0 0 1-3.54-3.54l.99-.97a1 1 0 0 0 .21-1.13l-1-2.2A1 1 0 0 0 8.1 7H6.5A1.5 1.5 0 0 0 5 8.5c0 6.08 4.92 11 11 11a1.5 1.5 0 0 0 1.5-1.5v-1.6a1 1 0 0 0-.8-.98Z" fill="#fff"/></svg>
          </a>
        </div>
        <div className="text-[#f3eafd] text-sm">&copy; {new Date().getFullYear()} LEAD | UNI. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
};

export default ApplicationPage;
