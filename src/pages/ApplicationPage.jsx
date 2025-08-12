import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import FormCard from '../components/application/FormCard';
import FormField from '../components/application/FormField';
import TextInput from '../components/application/TextInput';
import SelectInput from '../components/application/SelectInput';
import PillarOption from '../components/application/PillarOption';
// Removemos la importación de iconos de Lucide React
// import { GraduationCap, Users, BookOpen, Heart, Building2, Megaphone } from 'lucide-react';

const facultyOptions = [
  { value: 'FAUA', label: 'Facultad de Arquitectura, Urbanismo y Artes' },
  { value: 'FC', label: 'Facultad de Ciencias' },
  { value: 'FIA', label: 'Facultad de Ingeniería Ambiental' },
  { value: 'FIC', label: 'Facultad de Ingeniería Civil' },
  { value: 'FIEECS', label: 'Facultad de Ingeniería Económica, Estadística y Ciencias Sociales' },
  { value: 'FIEE', label: 'Facultad de Ingeniería Eléctrica y Electrónica' },
  { value: 'FIGMM', label: 'Facultad de Ingeniería Geológica, Minera y Metalúrgica' },
  { value: 'FIIS', label: 'Facultad de Ingeniería Industrial y de Sistemas' },
  { value: 'FIM', label: 'Facultad de Ingeniería Mecánica' },
  { value: 'FIP', label: 'Facultad de Ingeniería de Petróleo, Gas Natural y Petroquímica' },
  { value: 'FIQT', label: 'Facultad de Ingeniería Química y Textil' },
];

const careerOptions = [
  { value: 'Arquitectura', label: 'Arquitectura' },
  { value: 'Física', label: 'Física' },
  { value: 'Matemática', label: 'Matemática' },
  { value: 'Química', label: 'Química' },
  { value: 'Ciencia de la Computación', label: 'Ciencia de la Computación' },
  { value: 'Ingeniería Sanitaria', label: 'Ingeniería Sanitaria' },
  { value: 'Ingeniería Ambiental', label: 'Ingeniería Ambiental' },
  {
    value: 'Ingeniería de Higiene y Seguridad Industrial',
    label: 'Ingeniería de Higiene y Seguridad Industrial',
  },
  { value: 'Ingeniería de Software', label: 'Ingeniería de Software' },

  { value: 'Ingeniería Civil', label: 'Ingeniería Civil' },
  { value: 'Ingeniería Económica', label: 'Ingeniería Económica' },
  { value: 'Ingeniería Estadística', label: 'Ingeniería Estadística' },
  { value: 'Ingeniería Eléctrica', label: 'Ingeniería Eléctrica' },
  { value: 'Ingeniería Electrónica', label: 'Ingeniería Electrónica' },
  { value: 'Ingeniería de Telecomunicaciones', label: 'Ingeniería de Telecomunicaciones' },
  { value: 'Ingeniería de Ciberseguridad', label: 'Ingeniería de Ciberseguridad' },
  { value: 'Ingeniería Geológica', label: 'Ingeniería Geológica' },
  { value: 'Ingeniería de Minas', label: 'Ingeniería de Minas' },
  { value: 'Ingeniería Metalúrgica', label: 'Ingeniería Metalúrgica' },
  { value: 'Ingeniería Industrial', label: 'Ingeniería Industrial' },
  { value: 'Ingeniería de Sistemas', label: 'Ingeniería de Sistemas' },
  { value: 'Ingeniería Mecánica', label: 'Ingeniería Mecánica' },
  { value: 'Ingeniería Mecánica-Eléctrica', label: 'Ingeniería Mecánica-Eléctrica' },
  { value: 'Ingeniería Naval', label: 'Ingeniería Naval' },
  { value: 'Ingeniería Mecatrónica', label: 'Ingeniería Mecatrónica' },
  { value: 'Ingeniería Aeroespacial', label: 'Ingeniería Aeroespacial' },
  { value: 'Ingeniería de Petróleo y Gas Natural', label: 'Ingeniería de Petróleo y Gas Natural' },
  { value: 'Ingeniería Petroquímica', label: 'Ingeniería Petroquímica' },
  { value: 'Ingeniería Química', label: 'Ingeniería Química' },
  { value: 'Ingeniería Textil', label: 'Ingeniería Textil' },
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
  {
    id: 'academic',
    image: '/pillars/ExcelenciaAcademica.png',
    name: 'Excelencia Académica',
    alt: 'Ícono de Excelencia Académica',
  },
  {
    id: 'women',
    image: '/pillars/ImpulsoFemenino.png',
    name: 'Impulso Femenino',
    alt: 'Ícono de Impulso Femenino',
  },
  {
    id: 'academia',
    image: '/pillars/LeadAcademia.png',
    name: 'LEAD Academia',
    alt: 'Ícono de LEAD Academia',
  },
  {
    id: 'social',
    image: '/pillars/ImpactoSocial.png',
    name: 'Impacto Social',
    alt: 'Ícono de Impacto Social',
  },
  {
    id: 'chapter',
    image: '/pillars/DesarrolloDelCapitulo.png',
    name: 'Desarrollo de Capítulo',
    alt: 'Ícono de Desarrollo de Capítulo',
  },
  {
    id: 'marketing',
    image: '/pillars/Marketing.png',
    name: 'Marketing',
    alt: 'Ícono de Marketing',
  },
  {
    id: 'leadership',
    image: '/pillars/Liderazgo.png',
    name: 'Liderazgo',
    alt: 'Ícono de Liderazgo',
  },
  {
    id: 'profesional',
    image: '/pillars/DesarrolloProfesional.png',
    name: 'Desarrollo Profesional',
    alt: 'Ícono de Desarrollo Profesional',
  },
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
  leadership: {
    title: 'Liderazgo',
    description:
      'Desarrollo de habilidades de liderazgo, gestión de equipos y toma de decisiones estratégicas.',
  },
  profesional: {
    title: 'Desarrollo Profesional',
    description:
      'Preparación para el mundo laboral a través de networking, mentorías y desarrollo de competencias profesionales.',
  },
};

const VISIBLE_PILLARS = 5; // cantidad de pilares visibles en el carrusel (impar)

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
  const [showImage, setShowImage] = useState(false);
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);

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

  // Efecto para controlar la visibilidad de la imagen decorativa
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Mostrar imagen después de que el usuario haya scrolleado más allá de la sección de bienvenida
      // La sección de bienvenida tiene aproximadamente 100vh, así que mostramos la imagen después de 80vh
      if (scrollPosition > windowHeight * 0.6) {
        setShowImage(true);
      } else {
        setShowImage(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoselección del pilar central
  useEffect(() => {
    const centerIndex =
      (currentPillarIndex + Math.floor(VISIBLE_PILLARS / 2)) % pillarOptions.length;
    setSelectedPillar(pillarOptions[centerIndex].id);
    // eslint-disable-next-line
  }, [currentPillarIndex]);

  // Mover el carrusel para centrar el pilar seleccionado
  const moveToCenter = visibleIdx => {
    // visibleIdx: índice en el array de visibles (0 a VISIBLE_PILLARS-1)
    // Queremos que visibleIdx quede en el centro
    const diff = visibleIdx - Math.floor(VISIBLE_PILLARS / 2);
    setCurrentPillarIndex(prev => (prev + diff + pillarOptions.length) % pillarOptions.length);
  };

  // Obtener los pilares visibles en el carrusel
  const getVisiblePillars = () => {
    const visible = [];
    for (let i = 0; i < VISIBLE_PILLARS; i++) {
      visible.push(pillarOptions[(currentPillarIndex + i) % pillarOptions.length]);
    }
    return visible;
  };

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
        block: 'start',
      });
    }
  };

  const scrollToInfo = () => {
    const infoSection = document.getElementById('info-section');
    if (infoSection) {
      infoSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleSubmitForm = async () => {
    // Limpiar estados de modal previos
    setModal({ type: null, message: '', open: false });
    // Verificar que todos los campos requeridos estén completos
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.faculty ||
      !formData.career ||
      !formData.cycle ||
      !selectedPillar ||
      !pillarSpecificData.projectType ||
      !pillarSpecificData.skills ||
      !leadUniDefinition
    ) {
      setModal({
        type: 'warning',
        title: 'Campos incompletos',
        message: 'Por favor, completa todos los campos requeridos antes de enviar el formulario.',
        open: true,
      });
      return;
    }

    // Construir la URL de Google Forms con campos prellenados y redirigir
    const FORM_VIEW_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLSc1mIy-z6khAdySOylpJIDZVmwZHDznzrjxRbH44jBqDW0dcw/viewform';

    const params = new URLSearchParams();
    const f = formData;
    const facultyLabel = facultyOptions.find(opt => opt.value === f.faculty)?.label || '';
    const careerLabel = careerOptions.find(opt => opt.value === f.career)?.label || '';
    params.set('usp', 'pp_url'); // modo prefill
    params.set('entry.2005620554', f.fullName); // Nombres y Apellidos
    params.set('entry.1201849899', f.phone); // Número de celular
    params.set('entry.1045781291', f.email); // Dirección de correo electrónico
    params.set('entry.1065046570', facultyLabel); // Facultad (label)
    params.set('entry.1166974658', careerLabel); // Carrera (label)
    params.set('entry.890700137', cycleOptions.find(cy => cy.value === f.cycle)?.label || ''); // Ciclo Relativo
    params.set('entry.21194440', pillarSpecificData.projectType); // Motivo Pilar
    params.set('entry.5426552', pillarSpecificData.skills); // Habilidades
    params.set('entry.1624972609', leadUniDefinition); // ¿Qué es LEAD UNI?

    // Abrir en una nueva pestaña con datos prellenados y mostrar modal de éxito en esta página
    const url = `${FORM_VIEW_URL}?${params.toString()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setModal({
      type: 'success',
      title: '¡Formulario listo para enviar! 🎉',
      message:
        'Abrimos el formulario de Google en una nueva pestaña con tus datos prellenados. Revísalo y haz clic en "Enviar" para completar tu postulación. 💜',
      open: true,
    });
  };

  // Estado y componente para modales
  const [modal, setModal] = useState({ type: null, title: '', message: '', open: false });
  const closeModal = () => setModal(m => ({ ...m, open: false }));

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
      {/* Modal de feedback */}
      {modal.open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-[#101030] to-[#190b2c] animate-in fade-in zoom-in duration-300">
            <div
              className={`px-6 py-4 border-b flex items-center gap-2 ${
                modal.type === 'success'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-green-400/10'
                  : modal.type === 'error'
                    ? 'bg-gradient-to-r from-rose-500/20 to-red-400/10'
                    : 'bg-gradient-to-r from-amber-500/20 to-yellow-400/10'
              }`}
            >
              <span className="text-lg">
                {modal.type === 'success' && '✅'}
                {modal.type === 'error' && '⚠️'}
                {modal.type === 'warning' && '📝'}
              </span>
              <h3 className="text-white font-semibold text-base">{modal.title}</h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line">
                {modal.message}
              </p>
              {modal.type === 'success' && (
                <p className="text-xs text-emerald-300/80">
                  Revisa tu correo en los próximos días para más novedades.
                </p>
              )}
              {modal.type === 'warning' && (
                <ul className="text-xs text-amber-200/80 list-disc ml-5 space-y-1">
                  <li>Nombre completo</li>
                  <li>Contacto (celular y correo)</li>
                  <li>Facultad y carrera</li>
                  <li>Ciclo y selección de pilar</li>
                  <li>Motivación y habilidades</li>
                  <li>Definición de LEAD UNI</li>
                </ul>
              )}
              <div className="flex justify-end pt-2">
                <button
                  onClick={closeModal}
                  className="px-5 py-2 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
            <div
              className={`h-1 w-full ${
                modal.type === 'success'
                  ? 'bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400'
                  : modal.type === 'error'
                    ? 'bg-gradient-to-r from-red-400 via-rose-500 to-red-400'
                    : 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400'
              } animate-pulse`}
            />
          </div>
        </div>
      )}
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
          <div className="w-full h-full bg-[rgb(9,9,42)] min-h-[100%] border-0"></div>
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
                <circle cx="12" cy="12" r="10" fill="#fff" opacity="0.2" />
                <path
                  d="M12 6v6l4 2"
                  stroke="#fff"
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
                <rect x="3" y="4" width="16" height="16" rx="10" fill="#fff" opacity="0.2" />
                <path
                  d="M8 12l2 2 4-4"
                  stroke="#fff"
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

      {/* Sección de formulario y cuadros para rellenar datos */}
      <section
        id="application-form"
        className="w-full flex flex-col items-center justify-center min-h-screen py-8 px-4 z-20 relative"
      >
        {/* Imagen decorativa SOLO para la sección de inscripción, visible en escritorio */}
        <div className="hidden lg:flex absolute right-0 top-0 h-full w-1/2 items-center justify-center z-0 pointer-events-none opacity-100">
          <div className="w-full h-full flex items-center justify-center relative">
            <img
              src="/student_stem.png"
              alt="Students in STEM"
              className="object-contain mx-auto"
              style={{ display: 'block' }}
            />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <FormCard
              title={<span className="text-white">Información General</span>}
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

            {/* Carrusel SOLO de íconos de pilares */}
            <div className="text-center mb-8 w-full max-w-lg mx-auto">
              <h3 className="text-lg font-medium mb-6 text-[#ec46e1]">Seleccione el Pilar</h3>
              <div
                className="flex items-center justify-center gap-2 relative"
                style={{ minHeight: 80 }}
              >
                <div className="flex gap-2 items-center transition-all duration-300 ease-in-out">
                  {getVisiblePillars().map((pillar, idx) => {
                    const isCenter = idx === Math.floor(VISIBLE_PILLARS / 2);
                    return (
                      <div
                        key={pillar.id}
                        className={`transition-all duration-500 ease-in-out rounded-xl ${
                          isCenter
                            ? 'scale-110 ring-4 ring-[#d93340]/60 ring-offset-2 z-10'
                            : 'opacity-60 blur-[2px] hover:opacity-90 hover:blur-0 cursor-pointer z-0'
                        }`}
                        style={{ zIndex: isCenter ? 2 : 1 }}
                        onClick={() => {
                          if (!isCenter) moveToCenter(idx);
                        }}
                      >
                        <PillarOption
                          id={pillar.id}
                          image={pillar.image}
                          alt={pillar.alt}
                          selected={isCenter}
                          onClick={() => {}}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* INFORMACIÓN SOBRE EL PILAR */}
            {selectedPillar && (
              <FormCard title={<span className="text-white">INFORMACIÓN SOBRE EL PILAR</span>}>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2 text-[#ff6ec7]">
                    {pillarContent[selectedPillar].title}
                  </h3>
                  <p className="text-white/90">{pillarContent[selectedPillar].description}</p>
                </div>
              </FormCard>
            )}
            {/* INFORMACIÓN ESPECÍFICA PARA POSTULAR AL PILAR */}
            {selectedPillar && (
              <FormCard
                title={
                  <span className="text-white">
                    INFORMACIÓN ESPECÍFICA PARA POSTULAR AL{' '}
                    <span className="text-white">PILAR</span>
                  </span>
                }
              >
                <div className="text-white">
                  <FormField
                    label={
                      <span className="text-[#ff6ec7] font-semibold">
                        ¿Cuál fue tu principal motivo para postular a este Pilar?
                      </span>
                    }
                  >
                    <TextInput
                      value={pillarSpecificData.projectType}
                      onChange={e => handlePillarSpecificChange('projectType', e.target.value)}
                      placeholder="Describe tus motivos para postular a este pilar"
                      className="text-white border-2 border-[#a6249d]/60 focus:border-[#d93340] bg-transparent"
                    />
                  </FormField>
                  <FormField
                    label={
                      <span className="text-[#ff6ec7] font-semibold">
                        ¿Qué habilidades te ayudarían a destacar en este pilar?
                      </span>
                    }
                  >
                    <TextInput
                      value={pillarSpecificData.skills}
                      onChange={e => handlePillarSpecificChange('skills', e.target.value)}
                      placeholder="Menciona las habilidades que posees o quieres desarrollar"
                      className="text-white border-2 border-[#a6249d]/60 focus:border-[#d93340] bg-transparent"
                    />
                  </FormField>
                </div>
              </FormCard>
            )}
            {/* REFLEXIÓN FINAL */}
            {selectedPillar && (
              <FormCard
                title={
                  <span className="text-white">
                    REFLEXIÓN <span className="text-white">FINAL</span>
                  </span>
                }
              >
                <div className="text-white">
                  <FormField
                    label={
                      <span className="text-[#ff6ec7] font-semibold">
                        Para ti, ¿qué es LEAD UNI?
                      </span>
                    }
                  >
                    <TextInput
                      value={leadUniDefinition}
                      onChange={e => setLeadUniDefinition(e.target.value)}
                      placeholder="Comparte tu visión sobre LEAD UNI"
                      className="text-white border-2 border-[#a6249d]/60 focus:border-[#d93340] bg-transparent"
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
