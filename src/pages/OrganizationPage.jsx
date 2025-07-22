import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MemberCard from '../components/organigrama/MemberCard';
import MemberModal from '../components/organigrama/MemberModal';
import Carrusel from '../components/organigrama/Carrusel';

const OrganizationPage = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [activeMemberTab, setActiveMemberTab] = useState('info');
  const [selectedMember, setSelectedMember] = useState(null);
  const [activePillar, setActivePillar] = useState(0);
  const tabsRef = useRef(null);

  const scrollTabs = direction => {
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
    {
      title: 'Desarrollo del Capítulo',
      description:
        'Fortalecemos conexiones entre miembros, creando un ambiente inclusivo y colaborativo.',
      image: '/pillars/DesarrolloDelCapitulo.png',
    },
    {
      title: 'Excelencia Académica',
      description: 'Promovemos una base académica sólida con mentorías y recursos para el éxito.',
      image: '/pillars/ExcelenciaAcademica.png',
    },
    {
      title: 'Liderazgo',
      description:
        'Empoderamos estudiantes con habilidades, confianza y visión para liderar éticamente.',
      image: '/pillars/Liderazgo.png',
    },
    {
      title: 'Desarrollo Profesional',
      description: 'Desarrollamos habilidades críticas para preparar líderes responsables.',
      image: '/pillars/DesarrolloProfesional.png',
    },
    {
      title: 'Impacto Comunitario',
      description: 'Fomentamos el servicio y voluntariado, desarrollando empatía y deber cívico.',
      image: '/pillars/ImpactoSocial.png',
    },
    {
      title: 'Impulso Femenino',
      description: 'Promovemos el empoderamiento e inclusión, reduciendo disparidades de género.',
      image: '/pillars/ImpulsoFemenino.png',
    },
    {
      title: 'Marketing',
      description:
        'Potenciamos la visibilidad y el alcance de nuestras iniciativas, conectando con la comunidad y difundiendo el impacto de LEAD UNI.',
      image: '/pillars/Marketing.png',
    },
    {
      title: 'LEAD Academia',
      description: 'Creamos eventos para inspirar y educar, construyendo futuros líderes.',
      image: '/pillars/LeadAcademia.png',
    },
  ];

  const members = {
    direccion: [
      {
        name: 'Arianna Micaela Yauri Azabache',
        position: 'Presidenta',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752436112/7b539560-c13f-4647-89c1-0c380a1d856e_-_Arianna_Yauri_ek5wmw.jpg',
        imgClass: 'object-[center_top]',
      },
      {
        name: 'Jose Martin Rojas Sanchez',
        position: 'Vicepresidente',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752628013/WhatsApp_Image_2025-07-14_at_12.41.49_PM_-_Jose_Martin_Rojas_Sanchez_ergodj_tombkl.jpg',
      },
      {
        name: 'Claudia Ballarta Ulloa',
        position: 'Jefa de Personal',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752624875/DSC_1000_-_Claudia_Ballarta1_h8czpc.jpg',
        imgClass: 'object-top',
      },
      {
        name: 'Miguel Anthony Castañeda Villanueva',
        position: 'Tesorero',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752634476/WhatsApp_Image_2025-06-02_at_19.57.59_f83fh8_u447ka.jpg',
        imgClass: 'object-top md:object-center',
      },
    ],
    liderazgo: [
      {
        name: 'Petter Joseph Chuquipiondo Robles',
        position: 'Director del Pilar de Liderazgo',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752635075/IMG_5268_-_Joseph_Robles11_pgbfjk.jpg',
      },
    ],
    academica: [
      {
        name: 'Diogo Fabricio Abregu Gonzales',
        position: 'Director del Pilar de Excelencia Académica',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752634090/careta_-_Diogo_Abregu_Gonzales1_pceeau.jpg',
      },
    ],
    femenina: [
      {
        name: 'Angela Cori Salas',
        position: 'Directora del Pilar de Impulso Femenino',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752436134/IMG-20250712-WA0035_-_ANGELA_CORI_SALAS_w3i03r.jpg',
        imgClass: 'object-[center_top]',
      },
    ],
    profesional: [
      {
        name: 'Yuleimy Yasmin Lucas Zasiga',
        position: 'Directora del Pilar de Desarrollo Profesional',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752635408/foto1_-_YULEIMY_YASMIN_LUCAS_ZASIGA2_nmz1yn.jpg',
        imgClass: 'object-top',
      },
    ],
    social: [
      {
        name: 'Gabriel Wei Wei Siguas',
        position: 'Director del Pilar de Impacto Comunitario',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752436149/IMG_4317_-_GABRIEL_WEI_WEI_SIGUAS_yvgngt.jpg',
      },
    ],
    capitulo: [
      {
        name: 'Enrique Torres Julca',
        position: 'Director del Pilar de Desarrollo del Capítulo',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752633861/WhatsApp_Image_2025-07-15_at_20.38.55_1_urdulk.jpg',
      },
    ],
    marketing: [
      {
        name: 'Daniel Kevin Manayay Cadillo',
        position: 'Director de Marketing',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752625998/515495259_17914512348150651_1323602709192233497_n_-_Daniel_Manayay_zncogm.jpg',
        imgClass: 'object-top',
      },
      {
        name: 'Eliane Brenda Antara Gallupe',
        position: 'Subdirectora de Marketing',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752618464/foto_-_Brenda_Antara_zyhfah.jpg',
      },
    ],
    academia: [
      {
        name: 'Cesar Miguel Salazar Reyes',
        position: 'Director del Pilar de LEAD Academia',
        image:
          'https://res.cloudinary.com/dcozbyikt/image/upload/v1752627821/Nueva1_foto_Linkendl_-_Cesar_salazar_qwgsnt_mhk6vl.jpg',
      },
    ],
    todos: [],
  };

  members.todos = Object.values(members)
    .filter((_, k) => k !== 'todos')
    .flatMap(x => x);

  const memberDetails = {
    'Arianna Micaela Yauri Azabache': {
      bio: 'Soy estudiante de Ingeniería de Telecomunicaciones, apasionada por impulsar la tecnología para generar impacto social e inclusión. Actualmente, presidenta de LEAD UNI, busco reducir la brecha de género en el sector tecnológico empoderando a las mujeres mediante la innovación, la educación y el liderazgo. Busco oportunidades en equipos con propósito donde pueda crecer como desarrolladora y agente de cambios. Mi objetivo es contribuir a soluciones que sean técnicamente sólidas y socialmente significativas.',
      contacto: [
        'https://www.linkedin.com/in/arianna-yauri-azabache-a2132a2b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        'https://drive.google.com/open?id=1Qj47SVRyflgOESQwGRgVJdKKNJ1iqBnz',
        'https://github.com/AriannaYauri',
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: [
          'Ganador Primer Lugar – Concurso ISC UNI 2024',
          'Reconocimiento por NUNA, una solución de tecnología de viajes que utiliza IA para descentralizar el turismo en Perú y generar perspectivas estratégicas para la industria.',
          'Segundo Lugar – Hackathon Innova BCP (Edición para Mujeres 2025)',
          'Finalista – Hackathon Meta Llama LATAM',
          'Ganador – Hackathon EmpoderaTech (MIMP)',
          'Becaria del DAAD',
          'Destacada – La Voz Revista Internacional',
        ],
        liderados: [
          'Ponente – Eventos STEM: STEMos Unidas y panel Mujeres en Telecomunicaciones y Redes.',
          'Directora – Departamento de Proyectos, CCT UNI: Primera participación mayoritaria femenina en el departamento.',
        ],
      },
      habilidades: {
        hard: [
          'C++',
          'Python',
          'JavaScript',
          'TypeScript',
          'SQL',
          'React',
          'HTML / CSS',
          'Tailwind CSS',
          'Linux (Ubuntu)',
          'Power BI',
          'Excel',
          'GCP',
          'Kubernetes',
          'Docker',
          'Figma',
          'Vercel',
          'IoT',
        ],
        soft: ['Scrum', 'Trabajo Interdisciplinario', 'Liderazgo', 'Adaptabilidad', 'Proactividad'],
      },
      image:
        'https://res.cloudinary.com/dcozbyikt/image/upload/v1752436112/7b539560-c13f-4647-89c1-0c380a1d856e_-_Arianna_Yauri_ek5wmw.jpg',
    },

    'Jose Martin Rojas Sanchez': {
      bio: 'Soy Vicepresidente de LEAD UNI y estudiante de Ingeniería de Software. Actualmente me desempeño como Director del área Académica en CCN 2025 y Coordinador Académico en CEIIS 24-25. Me apasiona el Cloud Computing y me gusta aprender nuevas cosas y afrontar nuevos retos constantemente.',
      contacto: [
        'https://www.linkedin.com/in/jose-martin-rojas-sanchez-4349b4300?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGgUAKAzpS620EQBAowmbKQ%3D%3D',
        '',
        'https://github.com/JoseRojas-a11y',
        '',
        '',
      ],
      eventos: {
        premios: [],
        liderados: ['OpenDay_Fiis - Jul 2025', 'Circuito empresarial - Mar 2025'],
      },
      habilidades: {
        hard: ['Python', 'SQL', 'C++', 'Looker', 'GCP'],
        soft: ['Trabajo en equipo', 'Organización de proyectos', 'Gestión de eventos'],
      },
      image:
        'https://res.cloudinary.com/dcozbyikt/image/upload/v1752628013/WhatsApp_Image_2025-07-14_at_12.41.49_PM_-_Jose_Martin_Rojas_Sanchez_ergodj_tombkl.jpg',
    },

    'Claudia Ballarta Ulloa': {
      bio: 'Soy estudiante de Ingeniería Industrial y actualmente me desempeño como Jefa de Personal en LEAD UNI. Desde este cargo, me enfoco en la organización y desarrollo de los distintos pilares de la comunidad. Entre mis principales intereses se encuentran la inteligencia artificial aplicada a la industria, la automatización de procesos y la ciberseguridad organizacional. Mi principal motivación es generar cambios positivos que contribuyan al bienestar de la comunidad universitaria.',
      contacto: [
        'www.linkedin.com/in/claudia-belen-ballarta-ulloa-070221305',
        'https://drive.google.com/open?id=1Lsr6ICn4l3UnBWbKgAilQ8uvqU6tchW6',
        '', // Github vacío
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: ['1er puesto - Hackathon Innova BCP 2025'],
        liderados: ['Charla de "Women Leading Data And IA" – Junio 2025'],
      },
      habilidades: {
        hard: ['C++', 'Python'],
        soft: [
          'Liderazgo',
          'Comunicación asertiva',
          'Empatía',
          'Resolución de conflictos',
          'Trabajo en equipo',
        ],
      },
      image:
        'https://res.cloudinary.com/dcozbyikt/image/upload/v1752624875/DSC_1000_-_Claudia_Ballarta1_h8czpc.jpg',
    },

    'Miguel Anthony Castañeda Villanueva': {
      bio: 'Soy Tesorero de LEAD UNI y estudiante de Ingeniería de Sistemas. Tengo experiencia en desarrollo web, inteligencia artificial y servicios en la nube (especialmente AWS). Me interesa el mundo DevOps y la IA Generativa. Me apasiona la tecnología, aprender constantemente y el trabajo en equipo.',
      contacto: [
        'https://www.linkedin.com/in/miguel-anthony-casta%C3%B1eda-villanueva-69b194271/',
        '', // CV vacío
        'https://github.com/Anthony240406',
        '', // Portafolio vacío
        'https://www.credly.com/users/miguel-anthony-castaneda-villanueva',
      ],
      eventos: {
        premios: ['2do puesto - Feria de Proyectos 2024-1 ABET-FIIS'],
        liderados: [
          'Taller de Programación para estudiantes de FIIS (UNI) - Mar 2024',
          'Asesorías académicas de cursos básicos para ingresantes FIIS (UNI) - Mar 2024',
        ],
      },
      habilidades: {
        hard: [
          'Python (nivel intermedio)',
          'SQL (PostgreSQL, SQL Server)',
          'HTML',
          'CSS',
          'JavaScript',
          'Modelado de Datos',
          'Linux',
        ],
        soft: ['Liderazgo', 'Resolución de problemas', 'Proactividad'],
      },
      image:
        'https://res.cloudinary.com/dcozbyikt/image/upload/v1752634476/WhatsApp_Image_2025-06-02_at_19.57.59_f83fh8_u447ka.jpg',
    },

    'Petter Joseph Chuquipiondo Robles': {
      bio: 'Soy estudiante de Ingeniería de Telecomunicaciones en la Universidad Nacional de Ingeniería (UNI), actualmente lidero el pilar de Liderazgo en LEAD UNI y me desempeño como vicepresidente en IEEE CIS UNI. Me apasiona el desarrollo de soluciones innovadoras que integren desarrollo web, IOT y IA. He participado en diversos proyectos y concursos a nivel universitario, utilizando herramientas de ingeniería para crear propuestas disruptivas y responsables con el medio ambiente. Me motiva el aprendizaje en comunidad, especialmente en temas como inteligencia computacional, cloud computing, y disfruto involucrarme en iniciativas que desafíen mis límites, como Challengues y Hackathons, con el propósito de contribuir a una sociedad más verde y más conectada.',
      contacto: [
        'https://www.linkedin.com/in/joseph-chuquipiondo-robles-230733256',
        'https://drive.google.com/open?id=1WeglPKoAWUU6u0TMOfmxxc1YoMeUMwtK',
        'https://github.com/JosephRobles23',
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: [
          '4to puesto - Hackathon “Llama Impact Pan-LATAM Hackathon-es Summary” 2024, Organizado por Lablab.ai and Meta',
        ],
        liderados: ['STEM Fair UNI CCT 2023'],
      },
      habilidades: {
        soft: ['Liderazgo', 'Trabajo en equipo', 'Comunicación efectiva', 'Proactividad'],
        hard: ['React', 'TailwindCSS', 'Git y GitHub', 'Python', 'SQL', 'AWS'],
      },
    },

    'Diogo Fabricio Abregu Gonzales': {
      bio: 'Soy el actual director del Pilar de Excelencia Académica en LEAD UNI y estudiante de Ingeniería de Sistemas con enfoque en Inteligencia Artificial. He participado en hackatones, desarrollado asistentes virtuales, plataformas de inversión y sistemas para startups. Me apasiona la IA generativa, el desarrollo de productos digitales y la tecnología aplicada a startups. Mi propósito personal es transformar ideas en soluciones tecnológicas que generen valor real en las personas y sus comunidades.',
      contacto: [
        'https://www.linkedin.com/in/diogo-abregu-g/',
        'https://drive.google.com/open?id=1gfqaD0uYqUeBqWhMLmZs_BSdYt3vGxl0',
        'https://github.com/DiogoFabricioAG',
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: ['Finalista - Dataton Labora Tech 2024'],
        liderados: ['Transformación Digital del Comedor Universitario - Mar 2025'],
      },
      habilidades: {
        soft: ['Liderazgo', 'Comunicación efectiva', 'Trabajo en equipo', 'Resiliencia'],
        hard: ['Python', 'SQL', 'Javascript', 'Typescript', 'Java'],
      },
      image:
        'https://res.cloudinary.com/dcozbyikt/image/upload/v1752634090/careta_-_Diogo_Abregu_Gonzales1_pceeau.jpg',
    },

    'Angela Cori Salas': {
      bio: 'Soy la actual directora del Pilar de Impulso Femenino en LEAD UNI y estudiante de Ingeniería Industrial. Fui practicante de Gobierno de Datos en Interbank y tengo un gran interés en data analytics. Mi propósito es impulsar y motivar a que más chicas puedan ser parte del mundo STEM.',
      contacto: [
        'https://www.linkedin.com/in/angela-cori-salas?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        '', // CV vacío
        '', // Github vacío
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: ['Finalista - Hackaton Becas BCP 2025'],
        liderados: ['Women Leading Data & IA - junio 2025'],
      },
      habilidades: {
        soft: ['Trabajo en equipo', 'Comunicación', 'Empatía'],
        hard: ['Power BI', 'SQL'],
      },
    },

    'Yuleimy Yasmin Lucas Zasiga': {
      bio: "Soy la actual directora del Pilar de Desarrollo Profesional en LEAD UNI y estudiante de Ingeniería de Sistemas. He desarrollado proyectos web en ProyectaUNI y Lead  UNI, y he participado activamente en el Congreso Programático de Ideas, Proyectos e Investigaciones – Gran Foro de las 5 Hélices: 'GuiaGO'. Me apasionan la inteligencia artificial, el análisis y la ciencia de datos, así como la automatización de procesos. Mi motivación es generar un impacto real a través de soluciones digitales que mejoren procesos, potencien habilidades y conecten a jóvenes con nuevas oportunidades.",
      contacto: [
        'https://www.linkedin.com/in/yuleimy-lucas',
        'https://drive.google.com/open?id=1fQxslJL_uiCMgEo54RcrZE6denjPvseN',
        'https://github.com/YuleimyLZ',
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: ['1er puesto - P1MP 2024-2'],
        liderados: ['Webinars: Herramientas de Microsoft para la gestión de proyectos - Feb 2025'],
      },
      habilidades: {
        soft: [
          'Comunicación efectiva',
          'Trabajo en equipo',
          'Liderazgo',
          'Pensamiento crítico',
          'Adaptabilidad al cambio',
          'Escucha activa',
          'Resiliencia',
          'Creatividad e innovación',
          'Empatía',
        ],
        hard: [
          'SQL',
          'Power BI',
          'Excel',
          'Python',
          'JavaScript',
          'MySQL / PostgreSQL',
          'React',
          'Figma',
        ],
      },
    },

    'Gabriel Wei Wei Siguas': {
      bio: 'Soy el actual director del Pilar de Impacto Comunitario en LEAD UNI y estudiante de Ingeniería de Sistemas. Tengo experiencia como miembro de CCAT y fui subdirector de Relaciones Públicas en CC. Núcleo. Me interesan las finanzas y el análisis de datos. Mi motivación es fomentar el crecimiento autónomo de la comunidad e inspirar a las personas demostrando que el cambio y las grandes cosas están al alcance de todos.',
      contacto: [
        'https://www.linkedin.com/in/gabriel-wei',
        '', // CV vacío
        '', // Github vacío
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: [],
        liderados: [],
      },
      habilidades: {
        soft: ['Comunicación', 'Trabajo en equipo'],
        hard: ['Java', 'C++'],
      },
    },

    'Enrique Torres Julca': {
      bio: 'Soy estudiante de Ingeniería en Sistemas y actualmente asumo el cargo de Director del Pilar de Desarrollo del Capítulo en LEAD UNI. Anteriormente he asumido responsabilidades a nivel de mi facultad como delegado general de mi código en el periodo 2024, formo parte de los centros culturales Núcleo y CCAT, en las áreas de investigación y GDH. A nivel de la UNI conformé parte del IEEE CIS UNI e InspirateUNI como subdirector de R.R.P.P. y miembro de marketing. Además, actualmente soy parte del Centro de estudiantes de mi facultad, asumiendo el rol de coordinador académico de sistemas. Me gusta mucho la dualidad entre la tecnología y las ciencias, desarrollar actividades nuevas e innovar en diversos campos.',
      contacto: [
        'https://www.linkedin.com/in/enrique-torres-julca-717227305?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        '',
        '',
        '',
        '',
      ],
      eventos: {
        premios: ['2do puesto en categoría I de la Feria y concurso de proyectos 2025 en la FIIS'],
        liderados: ['Taller de introducción a bigData - Jul 2024'],
      },
      habilidades: {
        hard: ['SQL', 'C++', 'Java'],
        soft: [
          'Liderazgo',
          'Comunicación efectiva',
          'Pensamiento crítico',
          'Resolución de problemas',
          'Tolerancia y comprensión',
        ],
      },
      image:
        'https://res.cloudinary.com/dcozbyikt/image/upload/v1752633861/WhatsApp_Image_2025-07-15_at_20.38.55_1_urdulk.jpg',
    },

    'Daniel Kevin Manayay Cadillo': {
      bio: 'Soy Director de Marketing en LEAD UNI y estudiante de Ingeniería de Sistemas. He sido miembro del CCAT en el CODE (área de RR.PP.), voluntario en SSAMI en RR.PP. y delegado de especialidad en 2024. Apasionado por el mundo tech, los modelos de Frontier AI y el impacto transversal de la inteligencia artificial a nivel profesional. Me motiva conectar y desarrollar networking, fortalecer mis habilidades blandas y el liderazgo. Estoy en crecimiento continuo para impulsar el cambio positivo en mi entorno, redefinir nuestros límites, nuestra mentalidad y fomentar el trabajo en equipo.',
      contacto: [
        'https://www.linkedin.com/in/daniel-manayay-cadillo-269453287',
        '', // CV vacío
        'https://github.com/DanielManayayC',
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: [
          // No se reportan premios en la ficha
        ],
        liderados: [
          // No se reportan eventos liderados en la ficha
        ],
      },
      habilidades: {
        hard: ['SQL'],
        soft: ['Liderazgo', 'Comunicación efectiva', 'Trabajo en equipo'],
      },
      image:
        'https://res.cloudinary.com/dcozbyikt/image/upload/v1752625998/515495259_17914512348150651_1323602709192233497_n_-_Daniel_Manayay_zncogm.jpg',
    },

    'Eliane Brenda Antara Gallupe': {
      bio: 'Soy Subdirectora de Marketing en LEAD UNI y estudiante de Ingeniería de Telecomunicaciones. Tengo experiencia en participación de proyectos y eventos universitarios enfocados en liderazgo, gestión y tecnología. Me apasiona la Inteligencia Artificial y todo lo relacionado con su aplicación tecnológica y social. Mi propósito es impulsar la innovación a través del conocimiento y la tecnología, promoviendo soluciones que generen un impacto positivo en la comunidad y contribuyan al desarrollo del país.',
      contacto: [
        'www.linkedin.com/in/eliane-brenda-antara-gallupe-9657a426b',
        '', // CV vacío
        '', // Github vacío
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: [
          'Ganadora Beca DAAD – Visita de Estudios en Alemania (Study Visits by Groups of Foreign Students) 2024',
          'Finalista – Concurso de Desarrollo de Soluciones con IA 2024',
        ],
        liderados: [
          'Directora de Marketing del evento "Warmisitay Tele: Celebrando el Día Internacional de la Mujer en la Ingeniería", en colaboración con IEEE Comsoc UNMSM y el CCT-UNI 2023',
          'Apoyo en logística y contenido para el taller "Fundamentos de Machine Learning" 2025',
        ],
      },
      habilidades: {
        hard: ['Python', 'SQL', 'Excel', 'Power BI'],
        soft: [
          'Liderazgo',
          'Comunicación efectiva',
          'Trabajo en equipo',
          'Organización de eventos',
          'Pensamiento crítico',
        ],
      },
      image:
        'https://res.cloudinary.com/dcozbyikt/image/upload/v1752618464/foto_-_Brenda_Antara_zyhfah.jpg',
    },

    'Cesar Miguel Salazar Reyes': {
      bio: 'Me encuentro en 9no ciclo de la carrera Ingeniería de Sistemas, actualmente ocupo el cargo de Director del Pilar LEAD Academia. Tengo experiencia previa en participaciones de competencias tecnológicas como hackathones donde he podido desarrollar ideas innovadoras junto a un grupo de personas. También he sido parte del centro de estudiantes de mi facultad (FIIS) lo que me ayudó a mejorar mis habilidades de gestión. Respecto a mi carrera profesional me encuentro practicando en el banco BBVA en el área de Finanzas. Me encuentro especializándome en Data Analytics y con interés en Data Science e Inteligencia Artificial. Mi motivación es poder ayudar a crear soluciones con ayuda de tecnología para mejorar la vida de las personas y poder hacer del mundo algo mucho mejor.',
      contacto: [
        'www.linkedin.com/in/cesarsalazarreyes',
        'https://drive.google.com/open?id=1H7o0MdNfsC1DG4PnJuFbN8u-y8V6GCCO',
        '', // Github vacío
        '', // Portafolio vacío
        '', // Otro vacío
      ],
      eventos: {
        premios: [
          '1er puesto en el reto New Tech de la Hackathon Rimac 2024',
          '2do puesto en el Road to Start Lima 2024',
          'Participación en la competencia mundial Start Hack 2025 en Suiza',
          '2do puesto en la Hackathon BCP 2025',
        ],
        liderados: ['Bienvenida de Cachimbos – Marzo 2024'],
      },
      habilidades: {
        hard: [
          'Python',
          'SQL',
          'Power BI',
          'Looker Studio',
          'Excel',
          'JavaScript',
          'Google Cloud Platform',
          'Spark',
          'Hadoop',
        ],
        soft: [
          'Liderazgo',
          'Adaptabilidad',
          'Enfoque analítico',
          'Creatividad',
          'Resiliencia',
          'Comunicación efectiva',
        ],
      },
      image:
        'https://res.cloudinary.com/dcozbyikt/image/upload/v1752627821/Nueva1_foto_Linkendl_-_Cesar_salazar_qwgsnt_mhk6vl.jpg',
    },
  };

  const getPrevIndex = () => (activePillar - 1 + pillars.length) % pillars.length;
  const getNextIndex = () => (activePillar + 1) % pillars.length;

  const nextPillar = () => setActivePillar(prev => (prev + 1) % pillars.length);
  const prevPillar = () => setActivePillar(prev => (prev - 1 + pillars.length) % pillars.length);

  return (
    <section className="min-h-screen w-full h-full bg-[rgb(9,9,42)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text">
            Dirección General
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-white/80 mx-auto mb-10 text-center whitespace-normal max-w-xs sm:max-w-xl lg:max-w-3xl xl:max-w-4xl">
          Conoce al equipo que lidera LEAD UNI y trabaja día a día para impulsar el desarrollo
          integral de nuestra comunidad estudiantil.
        </p>

        {/* ORGANIGRAMA */}
        <section className="mb-20">
          <div className="container mx-auto">
            <div className="relative rounded-2xl p-12 border-2 border-[#a6249d]/40 backdrop-blur-sm shadow-lg overflow-hidden">
              {/* Fondo degradado radial igual al carrusel */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d93340]/10 via-[#a6249d]/10 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#a6249d]/10 via-[#d93340]/10 to-transparent"></div>
              </div>
              {/* Líneas conectoras */}
              <div className="absolute inset-0 flex flex-col items-center z-10">
                <div className="w-px h-20 bg-gradient-to-b from-[#d93340] to-[#a6249d] mt-32"></div>
                <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#d93340] to-transparent mt-4"></div>
              </div>

              <div className="relative flex flex-col items-center space-y-12 z-10">
                {/* Presidencia */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#d93340] to-[#a6249d] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative px-12 py-6 bg-[#1A0B2E] rounded-lg border-2 border-[#a6249d]/40 shadow-lg">
                    <h3 className="text-2xl font-bold text-center text-white">Presidencia</h3>
                  </div>
                </div>

                {/* Cargos principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {['Vicepresidencia', 'Jefatura de Personal', 'Tesorería'].map(cargo => (
                    <div key={cargo} className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#d93340] to-[#a6249d] rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative px-8 py-4 bg-[#1A0B2E] rounded-lg border-2 border-[#a6249d]/40 shadow-lg">
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
        <Carrusel pillars={pillars} activePillar={activePillar} setActivePillar={setActivePillar} />

        {/* Sección Explorar Pilares */}
        <div className="my-8 py-8 border-y-2 border-[#a6249d]/40">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-semibold text-white/80 mb-7">
              Descubre más sobre nuestros pilares y su impacto
            </p>
            <Link
              to="/pillars"
              className="inline-flex items-center px-6 py-2 text-base md:text-lg bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white border-2 border-[#a6249d] rounded-full font-bold hover:bg-[#36042f] hover:text-[#ff6ec7] transition-all duration-300 shadow-lg shadow-pink-900/20"
            >
              Explorar Pilares
            </Link>
          </div>
        </div>

        {/* Tabs de departamentos */}
        <div className="relative mb-12">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#1A0B2E] to-transparent w-20 h-full z-10"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[#1A0B2E] to-transparent w-20 h-full z-10"></div>

          <button
            onClick={() => scrollTabs('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#1A0B2E] hover:bg-[#36042f] text-white border border-[#a6249d]/40 shadow-lg shadow-pink-900/10 rounded-full p-2 z-20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={tabsRef}
            className="flex overflow-x-auto gap-2 px-12 py-4 rounded-xl border-2 border-[#a6249d]/40 scrollbar-none shadow-lg"
            style={{ scrollBehavior: 'smooth' }}
          >
            {departments.map((dept, idx) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`px-6 py-3 font-medium transition-all rounded-lg whitespace-nowrap
                  ${
                    activeTab === dept.id
                      ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white shadow-lg shadow-pink-900/30'
                      : 'bg-[#1A0B2E] text-white/70 hover:text-white hover:bg-[#36042f]'
                  }
                `}
              >
                {dept.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTabs('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1A0B2E] hover:bg-[#36042f] text-white border border-[#a6249d]/40 shadow-lg shadow-pink-900/10 rounded-full p-2 z-20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Grid de miembros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members[activeTab]?.map(member => (
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
