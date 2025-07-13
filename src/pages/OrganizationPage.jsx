import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MemberCard from '../components/organigrama/MemberCard';
import MemberModal from '../components/organigrama/MemberModal';
import Carrusel from '../components/organigrama/Carrusel';

const OrganizationPage = () => {
  const [activeTab, setActiveTab] = useState('direccion');
  const [activeMemberTab, setActiveMemberTab] = useState('info');
  const [selectedMember, setSelectedMember] = useState(null);
  const [activePillar, setActivePillar] = useState(0);
  const tabsRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  const departments = [
    { id: 'todos', label: 'Todos' },
    { id: 'direccion', label: 'Dirección General' },
    { id: 'liderazgo', label: 'Liderazgo' },
    { id: 'academica', label: 'Excelencia Académica' },
    { id: 'profesional', label: 'Desarrollo Profesional' },
    { id: 'social', label: 'Impacto Social' },
    { id: 'academia', label: 'Academia' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'capitulo', label: 'Desarrollo del Capítulo' },
    { id: 'femenina', label: 'Impulso Femenino' },
  ];

  const pillars = [
    { title: 'Desarrollo del Capítulo', description: 'Fortalecemos conexiones entre miembros, creando un ambiente inclusivo y colaborativo.', image: '/pillars/DesarrolloDelCapitulo.png' },
    { title: 'Excelencia Académica', description: 'Promovemos una base académica sólida con mentorías y recursos para el éxito.', image: '/pillars/ExcelenciaAcademica.png' },
    { title: 'Liderazgo', description: 'Empoderamos estudiantes con habilidades, confianza y visión para liderar éticamente.', image: '/pillars/Liderazgo.png' },
    { title: 'Desarrollo Profesional', description: 'Desarrollamos habilidades críticas para preparar líderes responsables.', image: '/pillars/DesarrolloProfesional.png' },
    { title: 'Impacto Comunitario', description: 'Fomentamos el servicio y voluntariado, desarrollando empatía y deber cívico.', image: '/pillars/ImpactoSocial.png' },
    { title: 'Impulso Femenino', description: 'Promovemos el empoderamiento e inclusión, reduciendo disparidades de género.', image: '/pillars/ImpulsoFemenino.png' },
    { title: 'LEAD Academia', description: 'Creamos eventos para inspirar y educar, construyendo futuros líderes.', image: '/pillars/LeadAcademia.png' },
  ];

  const members = {
  direccion: [
    { name: 'Arianna Micaela Yauri Azabache', position: 'Presidenta', image: '/placeholder-profile.png' },
    { name: 'Jose Martin Rojas Sanchez', position: 'Vicepresidente', image: '/placeholder-profile.png' },
    { name: 'Claudia Ballarta Ulloa', position: 'Jefe de Personal', image: '/placeholder-profile.png' },
    { name: 'Miguel Anthony Castañeda Villanueva', position: 'Tesorero', image: '/placeholder-profile.png' },
  ],
  liderazgo: [
    { name: 'Joseph Petter Chuquipiondo Robles', position: 'Pilar de Liderazgo', image: '/placeholder-profile.png' },
  ],
  academica: [
    { name: 'Diogo Fabricio Abregu Gonzales', position: 'Pilar de Excelencia Académica', image: '/placeholder-profile.png' },
  ],
  femenina: [
    { name: 'Angela Cori Salas', position: 'Pilar de Impulso Femenino', image: '/placeholder-profile.png' },
  ],
  profesional: [
    { name: 'Yuleimy Yasmin Lucas Zasiga', position: 'Pilar de Desarrollo Profesional', image: '/placeholder-profile.png' },
  ],
  social: [
    { name: 'Gabriel Wei Wei Siguas', position: 'Pilar de Impacto Social', image: '/placeholder-profile.png' },
  ],
  capitulo: [
    { name: 'Enrique Torres Julca', position: 'Pilar de Desarrollo del Capítulo', image: '/placeholder-profile.png' },
  ],
  marketing: [
    { name: 'Daniel Kevin Manayay Cadillo', position: 'Director de Marketing', image: '/placeholder-profile.png' },
    { name: 'Eliane Brenda Antara Gallupe', position: 'Subdirectora de Marketing', image: '/placeholder-profile.png' },
  ],
  academia: [
    { name: 'Cesar Miguel Salazar Reyes', position: 'Pilar de LEAD Academia', image: '/placeholder-profile.png' },
  ],
  todos: [],
};

members.todos = Object.values(members).filter((_, k) => k !== 'todos').flatMap((x) => x);

const memberDetails = {
  "Arianna Micaela Yauri Azabache": {
    bio: "Presidenta de LEAD UNI y estudiante de Ingeniería de Telecomunicaciones. Con experiencia en desarrollo web, gestión de equipos y creación de contenido audiovisual. Le motiva impulsar espacios donde la tecnología, el liderazgo y el trabajo en equipo se unan.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        '1er puesto - Hackathon "Women in Tech 2023"',
        '2do puesto - Hackathon Nacional UNI 2022'
      ],
      liderados: [
        'Congreso de Innovación Estudiantil – Oct 2023',
        'Taller IA para escolares – Mar 2024'
      ]
    },
    habilidades: {
      soft: [
        'Liderazgo proactivo',
        'Resolución de conflictos',
        'Comunicación efectiva'
      ],
      hard: [
        'Python, JavaScript (React)',
        'PostgreSQL, MongoDB',
        'Liderazgo proactivo',
        'Edición de video'
      ]
    }
  },

  "Jose Martin Rojas Sanchez": {
    bio: "Vicepresidente de LEAD UNI y estudiante de Ingeniería de Sistemas. Apasionado por la innovación educativa, la gestión de proyectos y el desarrollo de soluciones tecnológicas con impacto social.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Finalista - Concurso Nacional de Innovación 2023',
        'Reconocimiento a la Gestión Estudiantil 2022'
      ],
      liderados: [
        'Jornada de Capacitación en Liderazgo - Sep 2023',
        'Encuentro Nacional de Centros Estudiantiles - Ene 2024'
      ]
    },
    habilidades: {
      soft: [
        'Gestión de equipos',
        'Pensamiento estratégico',
        'Facilitación de talleres'
      ],
      hard: [
        'Python, TypeScript',
        'Gestión de proyectos con Trello/Asana',
        'Figma, Canva',
        'Sistemas de automatización con Notion + APIs'
      ]
    }
  },

  "Claudia Ballarta Ulloa": {
    bio: "Jefe del Personal de LEAD UNI y estudiante de Ingeniería Industrial. Enfocada en la gestión del talento humano, con habilidades para la planificación organizacional, evaluación de desempeño y cultura de bienestar estudiantil. Apasionada por construir equipos colaborativos y resilientes.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Reconocimiento a la Gestión Humana – LEAD 2023',
        'Participación destacada en Congreso de RRHH UNI 2022'
      ],
      liderados: [
        'Programa de Integración LEAD – Abril 2023',
        'Ciclo de Talleres "Bienestar y Equipo" – Nov 2023'
      ]
    },
    habilidades: {
      soft: [
        'Empatía organizacional',
        'Comunicación asertiva',
        'Gestión de conflictos internos'
      ],
      hard: [
        'Gestión de personal con Excel y Trello',
        'Diseño de encuestas de clima laboral',
        'Presentaciones institucionales (Canva, PowerPoint)',
        'Sistemas de entrevistas'
      ]
    }
  },

  "Miguel Anthony Castañeda Villanueva": {
    bio: "Tesorero de LEAD UNI y estudiante de Ingeniería de Sistemas. Apasionado por el desarrollo de software, la automatización de procesos y el análisis financiero. Comprometido con una gestión transparente y digital del presupuesto estudiantil.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Reconocimiento por innovación en herramientas internas LEAD 2023',
        '1er puesto en reto de Finanzas Digitales UNI 2022'
      ],
      liderados: [
        'Implementación de Panel de Finanzas – Jul 2023',
        'Taller de Finanzas Personales para miembros – Mar 2024'
      ]
    },
    habilidades: {
      soft: [
        'Responsabilidad financiera',
        'Pensamiento analítico',
        'Adaptabilidad en equipos multidisciplinarios'
      ],
      hard: [
        'Python (Flask), SQL y PostgreSQL',
        'Automatización con Google Apps Script',
        'Dashboards financieros con Google Data Studio',
        'Control de presupuestos y auditorías internas'
      ]
    }
  },

  "Joseph Petter Chuquipiondo Robles": {
    bio: "Pilar de Liderazgo en LEAD UNI y estudiante de Ingeniería Civil. Promotor del liderazgo con propósito en entornos estudiantiles, con experiencia en formación de líderes juveniles, facilitación de dinámicas grupales y vocería institucional.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Reconocimiento a la Trayectoria en Liderazgo Estudiantil – UNI 2023',
        'Mención especial – Semana del Liderazgo LEAD 2022'
      ],
      liderados: [
        'Taller de Liderazgo Ético – Jun 2023',
        'Bootcamp de Comunicación y Liderazgo – Ene 2024'
      ]
    },
    habilidades: {
      soft: [
        'Oratoria motivacional',
        'Trabajo en equipo',
        'Desarrollo de liderazgo personal'
      ],
      hard: [
        'Planificación de eventos formativos',
        'Diseño de mallas de formación',
        'Moderación de sesiones participativas',
        'Gestión de tiempo y liderazgo ágil'
      ]
    }
  },

  "Diogo Fabricio Abregu Gonzales": {
    bio: "Pilar de Excelencia Académica en LEAD UNI y estudiante de Ingeniería Electrónica. Enfocado en el desarrollo académico de los miembros mediante mentorías, material especializado y espacios de aprendizaje colaborativo. Cree firmemente en la educación como motor de cambio.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Ganador – Olimpiada de Matemática UNI 2023',
        'Reconocimiento a la Mentoría Estudiantil – LEAD 2022'
      ],
      liderados: [
        'Ciclo de Asesorías en Matemática y Física – May 2023',
        'Programa "Impulsa tu Ciclo" – Ago 2023'
      ]
    },
    habilidades: {
      soft: [
        'Capacidad de enseñanza',
        'Pensamiento lógico',
        'Empatía con estudiantes de primer ciclo'
      ],
      hard: [
        'MATLAB, LaTeX',
        'Diseño de sesiones académicas',
        'Tutoría personalizada',
        'Evaluación y seguimiento de progreso académico'
      ]
    }
  },

  "Angela Cori Salas": {
    bio: "Pilar de Impulso Femenino en LEAD UNI y estudiante de Ingeniería Química. Defensora de la equidad de género en entornos académicos y tecnológicos. Lidera iniciativas para visibilizar y empoderar a las mujeres en ingeniería y ciencias.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Embajadora STEM Perú 2023',
        'Ganadora del Concurso "Voces que Inspiran" 2022'
      ],
      liderados: [
        'Foro Mujeres que Inspiran – Mar 2023',
        'Círculo de Lectura Feminista – Oct 2023'
      ]
    },
    habilidades: {
      soft: [
        'Liderazgo inclusivo',
        'Perspectiva de género',
        'Habilidades de comunicación empática'
      ],
      hard: [
        'Organización de eventos sociales',
        'Campañas de sensibilización',
        'Gestión de redes sociales con enfoque institucional',
        'Redacción de artículos de opinión'
      ]
    }
  },

  "Yuleimy Yasmin Lucas Zasiga": {
    bio: "Pilar de Desarrollo Profesional en LEAD UNI y estudiante de Ingeniería de Higiene y Seguridad Industrial. Orientada a fortalecer las habilidades laborales y de empleabilidad de los miembros. Fomenta una mentalidad de crecimiento y preparación para el mundo corporativo.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Certificada en Empleabilidad Joven – Fundación Telefónica 2023',
        'Beca para programa de Liderazgo Profesional – Red Joven Perú'
      ],
      liderados: [
        'Semana de Empleabilidad y Talleres de CV – Abr 2023',
        'Simulación de Entrevistas Profesionales – Dic 2023'
      ]
    },
    habilidades: {
      soft: [
        'Orientación a resultados',
        'Coaching básico',
        'Inteligencia emocional'
      ],
      hard: [
        'Preparación de CVs y cartas de presentación',
        'Uso de plataformas como LinkedIn Learning y Miro',
        'Manejo de entrevistas STAR',
        'Seguimiento de desempeño profesional'
      ]
    }
  },

  "Gabriel Wei Wei Siguas": {
    bio: "Pilar de Impacto Social en LEAD UNI y estudiante de Ingeniería Ambiental. Promueve proyectos con enfoque comunitario, educación ambiental y voluntariado con impacto sostenible. Cree en el rol transformador de los ingenieros al servicio de la sociedad.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Reconocimiento a la Iniciativa Ambiental Estudiantil 2023',
        'Mención en el Reto "UNI Sostenible" 2022'
      ],
      liderados: [
        'Campaña de Reciclaje en Campus – Jun 2023',
        'Voluntariado "Uniendo Manos por Lima" – Dic 2023'
      ]
    },
    habilidades: {
      soft: [
        'Conciencia social',
        'Trabajo con comunidades',
        'Gestión colaborativa de proyectos'
      ],
      hard: [
        'Diseño de campañas con Canva y CapCut',
        'Formulación de proyectos sociales',
        'Educación ambiental',
        'Gestión de voluntarios'
      ]
    }
  },

  "Enrique Torres Julca": {
    bio: "Pilar de Desarrollo del Capítulo en LEAD UNI y estudiante de Ingeniería Electrónica. Su misión es fortalecer la cohesión organizacional y construir una cultura institucional sólida a través de eventos, tradición y sentido de pertenencia.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Reconocimiento a la Identidad LEAD UNI 2023',
        '3er puesto en Concurso de Cultura Organizacional – IEEE UNI'
      ],
      liderados: [
        'Semana de Integración – May 2023',
        'Desafío Trivia LEAD – Nov 2023'
      ]
    },
    habilidades: {
      soft: [
        'Organización de comunidades',
        'Escucha activa',
        'Creatividad en dinámicas internas'
      ],
      hard: [
        'Logística de eventos internos',
        'Gamificación con herramientas web',
        'Gestión de base de datos de miembros',
        'Diseño de merchandising institucional'
      ]
    }
  },

  "Daniel Kevin Manayay Cadillo": {
    bio: "Director de Marketing en LEAD UNI y estudiante de Ingeniería de Sistemas. Especialista en branding estudiantil, estrategias de posicionamiento y comunicación visual. Su enfoque se basa en conectar con el público mediante experiencias creativas.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Ganador - Desafío Creativo UNI 2023',
        'Reconocimiento al Mejor Spot Audiovisual LEAD'
      ],
      liderados: [
        'Campaña "LEAD: Aprende dejando huella" – Ene 2024',
        'Taller de Branding Estudiantil – Ago 2023'
      ]
    },
    habilidades: {
      soft: [
        'Pensamiento visual',
        'Innovación en campañas',
        'Gestión de equipos creativos'
      ],
      hard: [
        'Edición en Adobe Premiere / Illustrator',
        'Copywriting y storytelling',
        'Gestión de redes sociales',
        'Diseño de identidades gráficas'
      ]
    }
  },

  "Eliane Brenda Antara Gallupe": {
    bio: "Subdirectora de Marketing en LEAD UNI y estudiante de Ingeniería Económica. Apoya en la gestión de contenido, análisis de métricas y planificación de campañas. Le motiva fusionar creatividad con datos para mejorar el alcance del capítulo.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        '2do lugar en "Pitch de Campañas con Impacto" – FISI 2023',
        'Reconocimiento por Mérito en Gestión Digital – LEAD'
      ],
      liderados: [
        'Planificación de contenido 2024',
        'Lanzamiento de la nueva identidad gráfica LEAD – Dic 2023'
      ]
    },
    habilidades: {
      soft: [
        'Proactividad organizativa',
        'Colaboración en equipo creativo',
        'Sentido estético'
      ],
      hard: [
        'Manejo de KPIs en redes sociales',
        'Edición básica con Canva y CapCut',
        'Gestión de cronogramas',
        'Análisis de métricas de engagement'
      ]
    }
  },

  "Cesar Miguel Salazar Reyes": {
    bio: "Pilar de LEAD Academia y estudiante de Ingeniería Mecatrónica. Promotor de espacios de aprendizaje tecnológico para estudiantes con enfoque en innovación, robótica y nuevas tendencias. Su visión es democratizar el conocimiento técnico.",
    contacto: ['Correo', 'LinkedIn', 'Portafolio', 'Github', 'Curriculum Vitae'],
    eventos: {
      premios: [
        'Finalista – Reto Robótica UNI 2023',
        'Reconocimiento al Desarrollo de Contenido Técnico – LEAD'
      ],
      liderados: [
        'Bootcamp de Introducción a Python – Feb 2024',
        'Taller "IA desde Cero" – Oct 2023'
      ]
    },
    habilidades: {
      soft: [
        'Curiosidad por aprender',
        'Claridad para enseñar',
        'Visión académica'
      ],
      hard: [
        'Python, Arduino, ROS',
        'Diseño de sesiones técnicas',
        'Automatización de recursos educativos',
        'Creación de material audiovisual de aprendizaje'
      ]
    }
  },

};


  const getPrevIndex = () => (activePillar - 1 + pillars.length) % pillars.length;
  const getNextIndex = () => (activePillar + 1) % pillars.length;

  const nextPillar = () => setActivePillar((prev) => (prev + 1) % pillars.length);
  const prevPillar = () => setActivePillar((prev) => (prev - 1 + pillars.length) % pillars.length);


  return (
    <section className="min-h-screen bg-gradient-to-b from-[#1A0B2E] via-[#2D1B4E] to-[#1A0B2E] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] text-transparent bg-clip-text">
            Dirección General
          </span>
        </h1>
        <p className="text-center text-lg text-white/80 max-w-2xl mx-auto mb-16">
          Conoce al equipo que lidera LEAD UNI y trabaja día a día para impulsar el desarrollo integral de nuestra comunidad estudiantil.
        </p>

        {/* ORGANIGRAMA */}
        <section className="mb-20">
          <div className="container mx-auto">
            <div className="relative bg-gradient-to-br from-[#2D1B4E]/30 to-[#1A0B2E]/30 rounded-2xl p-12 border-2 border-purple-500/50 backdrop-blur-sm shadow-lg">
              {/* Líneas conectoras */}
              <div className="absolute inset-0 flex flex-col items-center">
                <div className="w-px h-20 bg-gradient-to-b from-[#FF1CF7] to-[#00F0FF] mt-32"></div>
                <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#FF1CF7] to-transparent mt-4"></div>
              </div>

              <div className="relative flex flex-col items-center space-y-12">
                {/* Presidencia */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative px-12 py-6 bg-[#1A0B2E] rounded-lg border-2 border-purple-500/50 shadow-lg">
                    <h3 className="text-2xl font-bold text-center text-white">Presidencia</h3>
                  </div>
                </div>

                {/* Cargos principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {['Vicepresidencia', 'Jefatura de Personal', 'Tesorería'].map((cargo) => (
                    <div key={cargo} className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#B936F5] to-[#FF1CF7] rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative px-8 py-4 bg-[#1A0B2E] rounded-lg border-2 border-purple-500/50 shadow-lg">
                        <h3 className="text-xl font-semibold text-center text-white">{cargo}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carrusel 3D */}
        <Carrusel
          pillars={pillars}
          activePillar={activePillar}
          setActivePillar={setActivePillar}
        />

        {/* Sección Explorar Pilares */}
                  <div className="my-8 py-8 border-y-2 border-purple-500/50">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-semibold text-white/80 mb-7">Descubre más sobre nuestros pilares y su impacto</p>
            <Link 
              to="/pillars" 
              className="inline-flex items-center px-10 py-4 text-lg md:text-xl bg-[#1A0B2E] hover:bg-[#2D1B4E] border-2 border-[#8B5CF6] rounded-full font-bold text-[#8B5CF6] hover:text-[#A78BFA] transition-all duration-300 shadow-lg shadow-purple-900/20"
            >
              Explorar Pilares
            </Link>
          </div>
        </div>

        {/* Tabs de departamentos */}
        <div className="relative mb-12">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#1A0B2E] to-transparent w-20 h-full z-10"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[#1A0B2E] to-transparent w-20 h-full z-10"></div>
          
          <button onClick={() => scrollTabs('left')} className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#1A0B2E] hover:bg-[#2D1B4E] text-white border border-purple-500/20 shadow-lg shadow-purple-500/10 rounded-full p-2 z-20 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div
            ref={tabsRef}
            className="flex overflow-x-auto gap-2 px-12 py-4 rounded-xl border-2 border-purple-500/50 scrollbar-none shadow-lg"
            style={{ scrollBehavior: 'smooth' }}
          >
            {departments.map((dept, idx) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`px-6 py-3 font-medium transition-all rounded-lg whitespace-nowrap
                  ${activeTab === dept.id
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] text-white shadow-lg shadow-purple-900/30'
                    : 'bg-[#1A0B2E] text-white/70 hover:text-white hover:bg-[#2D1B4E]'}
                `}
              >
                {dept.label}
              </button>
            ))}
          </div>
          
          <button onClick={() => scrollTabs('right')} className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1A0B2E] hover:bg-[#2D1B4E] text-white border border-purple-500/20 shadow-lg shadow-purple-500/10 rounded-full p-2 z-20 transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Grid de miembros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members[activeTab]?.map((member) => (
            <MemberCard key={member.name} member={member} onSelect={setSelectedMember} />
          ))}
        </div>

        {/* Modal de miembro */}
        {selectedMember && (
          <MemberModal
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            activeMemberTab={activeMemberTab}
            setActiveMemberTab={setActiveMemberTab}
            members={members}
            memberDetails={memberDetails}
          />
        )}
      </div>
    </section>
  );
};

export default OrganizationPage;
