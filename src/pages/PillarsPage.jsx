import React, { useState, useRef, useEffect } from 'react';
import { Award, BookOpen, Briefcase, GraduationCap, Heart, Users, UserCircle } from 'lucide-react';
import PillarDetails from '../components/PillarDetails';
import PillarCarousel from '../components/PillarCarousel';
import '../styles/carousel.css';
//import { Header } from '../components/Header';


const pillars = [
  {
    id: 'liderazgo',
    name: 'Liderazgo',
    emoji: '🧭',
    icon: <Award className="h-6 w-6" />,
    description: 'Desarrollamos habilidades de liderazgo efectivo a través de talleres, mentoría y capacitaciones prácticas que permiten a los estudiantes descubrir y potenciar sus capacidades directivas.',
    mission: 'Formar líderes integrales con valores sólidos, capacidad de influencia positiva y habilidades para dirigir equipos diversos hacia objetivos comunes.',
    activities: [
      'Talleres de liderazgo y desarrollo personal',
      'Programas de mentoría con líderes experimentados',
      'Proyectos prácticos de liderazgo en equipo'
    ],
    coordinator: 'Francisco Morales',
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    events: [
      { title: 'LEAD en los Colegios de SJL', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg', date: '15 de Mayo, 2025' },
      { title: 'Taller de Liderazgo Efectivo', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', date: '20 de Mayo, 2025' },
      { title: 'Conferencia de Liderazgo', image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg', date: '25 de Mayo, 2025' }
    ]
  },
  {
    id: 'excelencia_academica',
    name: 'Excelencia Académica',
    emoji: '💻',
    icon: <BookOpen className="h-6 w-6" />,
    description: 'Promovemos la excelencia académica mediante programas de estudio, tutorías y recursos educativos que ayudan a los estudiantes a alcanzar su máximo potencial académico.',
    mission: 'Fomentar una cultura de excelencia académica y aprendizaje continuo entre los estudiantes universitarios.',
    activities: [
      'Grupos de estudio colaborativo',
      'Tutorías personalizadas',
      'Talleres de métodos de estudio'
    ],
    coordinator: 'María García',
    coverImage: 'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg',
    events: [
      { title: 'Sesión de Tutorías', image: 'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg', date: '10 de Mayo, 2025' },
      { title: 'Taller de Técnicas de Estudio', image: 'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg', date: '12 de Mayo, 2025' },
      { title: 'Grupo de Estudio', image: 'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg', date: '15 de Mayo, 2025' }
    ]
  },
  {
    id: 'impulso_femenino',
    name: 'Impulso Femenino',
    emoji: '🌟',
    icon: <UserCircle className="h-6 w-6" />,
    description: 'Empoderamos a las mujeres en la ingeniería a través de programas específicos, mentorías y oportunidades de desarrollo profesional.',
    mission: 'Impulsar el liderazgo femenino en la ingeniería y crear una comunidad de apoyo para mujeres profesionales.',
    activities: [
      'Mentorías con ingenieras exitosas',
      'Talleres de liderazgo femenino',
      'Networking profesional'
    ],
    coordinator: 'Ana López',
    coverImage: 'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg',
    events: [
      { title: 'Mujeres en Ingeniería', image: 'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg', date: '18 de Mayo, 2025' },
      { title: 'Taller de Liderazgo Femenino', image: 'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg', date: '20 de Mayo, 2025' },
      { title: 'Networking Profesional', image: 'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg', date: '22 de Mayo, 2025' }
    ]
  },
  {
    id: 'desarrollo_profesional',
    name: 'Desarrollo Profesional',
    emoji: '💼',
    icon: <Briefcase className="h-6 w-6" />,
    description: 'Preparamos a los estudiantes para su futuro profesional mediante talleres, conexiones con la industria y desarrollo de habilidades laborales.',
    mission: 'Facilitar la transición de los estudiantes al mundo profesional y potenciar su desarrollo de carrera.',
    activities: [
      'Talleres de empleabilidad',
      'Conexiones con empresas',
      'Desarrollo de CV y marca personal'
    ],
    coordinator: 'Carlos Ruiz',
    coverImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    events: [
      { title: 'Feria de Empleo', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', date: '25 de Mayo, 2025' },
      { title: 'Taller de CV', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', date: '27 de Mayo, 2025' },
      { title: 'Networking Empresarial', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', date: '29 de Mayo, 2025' }
    ]
  },
  {
    id: 'impacto_social',
    name: 'Impacto Social',
    emoji: '🤝',
    icon: <Heart className="h-6 w-6" />,
    description: 'Creamos proyectos que generan un impacto positivo en la sociedad, aplicando nuestros conocimientos en beneficio de la comunidad.',
    mission: 'Desarrollar proyectos sociales que beneficien a la comunidad y fomenten la responsabilidad social.',
    activities: [
      'Proyectos comunitarios',
      'Voluntariado',
      'Iniciativas de sostenibilidad'
    ],
    coordinator: 'Patricia Torres',
    coverImage: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg',
    events: [
      { title: 'Voluntariado Comunitario', image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg', date: '1 de Junio, 2025' },
      { title: 'Proyecto Sostenible', image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg', date: '3 de Junio, 2025' },
      { title: 'Impacto Comunitario', image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg', date: '5 de Junio, 2025' }
    ]
  },
  {
    id: 'desarrollo_capitulo',
    name: 'Desarrollo del Capítulo',
    emoji: '🧩',
    icon: <Users className="h-6 w-6" />,
    description: 'Trabajamos en el crecimiento y fortalecimiento de nuestra organización para brindar mejores oportunidades a nuestros miembros.',
    mission: 'Fortalecer la estructura organizacional y expandir el alcance de LEAD UNI.',
    activities: [
      'Planificación estratégica',
      'Desarrollo de liderazgo interno',
      'Gestión de proyectos'
    ],
    coordinator: 'Roberto Díaz',
    coverImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    events: [
      { title: 'Reunión de Planificación', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg', date: '8 de Junio, 2025' },
      { title: 'Taller de Gestión', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg', date: '10 de Junio, 2025' },
      { title: 'Desarrollo de Equipo', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg', date: '12 de Junio, 2025' }
    ]
  },
  {
    id: 'lead_academia',
    name: 'Lead Academia',
    emoji: '🚀',
    icon: <GraduationCap className="h-6 w-6" />,
    description: 'Ofrecemos programas educativos especializados para complementar la formación académica y desarrollar habilidades específicas.',
    mission: 'Proporcionar educación complementaria de calidad para el desarrollo integral de los estudiantes.',
    activities: [
      'Cursos especializados',
      'Talleres prácticos',
      'Certificaciones'
    ],
    coordinator: 'Luis Mendoza',
    coverImage: 'https://images.pexels.com/photos/3184644/pexels-photo-3184644.jpeg',
    events: [
      { title: 'Curso Especializado', image: 'https://images.pexels.com/photos/3184644/pexels-photo-3184644.jpeg', date: '15 de Junio, 2025' },
      { title: 'Taller Práctico', image: 'https://images.pexels.com/photos/3184644/pexels-photo-3184644.jpeg', date: '17 de Junio, 2025' },
      { title: 'Certificación Técnica', image: 'https://images.pexels.com/photos/3184644/pexels-photo-3184644.jpeg', date: '19 de Junio, 2025' }
    ]
  }
];


const PillarsPage = () => {
  const [selectedPillar, setSelectedPillar] = useState(null);
  const detailRef = useRef(null);

  const handleSelectPillar = (pillar) => {
    setSelectedPillar(pillar);
  };

  useEffect(() => {
    if (selectedPillar && detailRef.current) {
      const element = detailRef.current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, [selectedPillar]);

  return (
    <>
      {/* Fondo fijo que cubre toda la pantalla */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#09092a] to-[#36042f]" />
  
      {/* Contenido principal */}
      <div className="min-h-screen text-white px-4 py-12">

        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Nuestros Pilares
          </h1>
          <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
            LEAD UNI se organiza en siete pilares, cada uno enfocado en un área específica de desarrollo para nuestros 
            miembros y la comunidad universitaria.
          </p>
  
          {/* 3D Carousel */}
          <div className="mb-12">
            <PillarCarousel 
              pillars={pillars}
              selectedPillar={selectedPillar}
              onSelectPillar={handleSelectPillar}
            />
          </div>
  
          {/* Pillar Details */}
          {selectedPillar && (
            <div className="mt-20 scroll-mt-24" ref={detailRef}>
              <PillarDetails pillar={selectedPillar} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PillarsPage; 
