import { useState, useRef, useEffect } from 'react';
import { Award, BookOpen, Briefcase, GraduationCap, Heart, Users, UserCircle } from 'lucide-react';
import PillarDetails from '../components/PillarDetails';
import PillarCarousel from '../components/PillarCarousel';
import { getPastEvents, getUpcomingEvents } from '../services/eventService';
import '../styles/carousel.css';

const PillarsPage = () => {
  const [pillars, setPillars] = useState([]);
  const [selectedPillar, setSelectedPillar] = useState(null);
  const detailRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const pastEvents = await getPastEvents();
      const upcomingEvents = await getUpcomingEvents();

      const pillarsData = [
        {
          id: 'liderazgo',
          name: 'Liderazgo',
          emoji: '🧭',
          icon: <Award className="h-6 w-6" />,
          description:
            'Desarrollamos habilidades de liderazgo efectivo a través de talleres, mentoría y capacitaciones prácticas que permiten a los estudiantes descubrir y potenciar sus capacidades directivas.',
          mission:
            'Formar líderes integrales con valores sólidos, capacidad de influencia positiva y habilidades para dirigir equipos diversos hacia objetivos comunes.',
          activities: [
            'Talleres de liderazgo y desarrollo personal',
            'Programas de mentoría con líderes experimentados',
            'Proyectos prácticos de liderazgo en equipo',
          ],
          coordinator: 'Joseph Chuquipiondo Robles',
          coverImage:
            'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
        },
        {
          id: 'excelencia_academica',
          name: 'Excelencia Académica',
          emoji: '💻',
          icon: <BookOpen className="h-6 w-6" />,
          description:
            'Promovemos la excelencia académica mediante programas de estudio, tutorías y recursos educativos que ayudan a los estudiantes a alcanzar su máximo potencial académico.',
          mission:
            'Fomentar una cultura de excelencia académica y aprendizaje continuo entre los estudiantes universitarios, promoviendo la curiosidad intelectual, el pensamiento crítico y la rigurosidad en el estudio como pilares fundamentales de su formación.',
          activities: [
            'Grupos de estudio colaborativo',
            'Tutorías personalizadas',
            'Talleres de métodos de estudio',
          ],
          coordinator: 'Diogo Abregu Gonzales',
          coverImage:
            'https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg',
        },
        {
          id: 'impulso_femenino',
          name: 'Impulso Femenino',
          emoji: '🌟',
          icon: <UserCircle className="h-6 w-6" />,
          description:
            'Empoderamos a las mujeres en la ingeniería a través de programas específicos, mentorías y oportunidades de desarrollo profesional.',
          mission:
            'Impulsar el liderazgo femenino en la ingeniería y crear una comunidad de apoyo para mujeres profesionales.',
          activities: [
            'Mentorías con ingenieras exitosas',
            'Talleres de liderazgo femenino',
            'Networking profesional',
          ],
          coordinator: 'Angela Cori Salas',
          coverImage:
            'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg',
        },
        {
          id: 'desarrollo_profesional',
          name: 'Desarrollo Profesional',
          emoji: '💼',
          icon: <Briefcase className="h-6 w-6" />,
          description:
            'Preparamos a los estudiantes para su futuro profesional mediante talleres, conexiones con la industria y desarrollo de habilidades laborales.',
          mission:
            'Facilitar la transición de los estudiantes al mundo profesional y potenciar su desarrollo de carrera.',
          activities: [
            'Talleres de empleabilidad',
            'Conexiones con empresas',
            'Desarrollo de CV y marca personal',
          ],
          coordinator: 'Yuleimy Lucas Zasiga',
          coverImage:
            'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
        },
        {
          id: 'impacto_social',
          name: 'Impacto Social',
          emoji: '🤝',
          icon: <Heart className="h-6 w-6" />,
          description:
            'Creamos proyectos que generan un impacto positivo en la sociedad, aplicando nuestros conocimientos en beneficio de la comunidad.',
          mission:
            'Desarrollar proyectos sociales que beneficien a la comunidad y fomenten la responsabilidad social.',
          activities: [
            'Proyectos comunitarios',
            'Voluntariado',
            'Iniciativas de sostenibilidad',
          ],
          coordinator: 'Gabriel Wei Siguas',
          coverImage:
            'https://images.pexels.com/photos/6646930/pexels-photo-6646930.jpeg',
        },
        {
          id: 'desarrollo_capitulo',
          name: 'Desarrollo del Capítulo',
          emoji: '🧩',
          icon: <Users className="h-6 w-6" />,
          description:
            'Trabajamos en el crecimiento y fortalecimiento de nuestra organización para brindar mejores oportunidades a nuestros miembros.',
          mission:
            'Fortalecer la estructura organizacional y expandir el alcance de LEAD UNI.',
          activities: [
            'Planificación estratégica',
            'Desarrollo de liderazgo interno',
            'Gestión de proyectos',
          ],
          coordinator: 'Enrique Torres Julca',
          coverImage:
            'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
        },
        {
          id: 'lead_academia',
          name: 'Lead Academia',
          emoji: '🚀',
          icon: <GraduationCap className="h-6 w-6" />,
          description:
            'Ofrecemos programas educativos especializados para complementar la formación académica y desarrollar habilidades específicas.',
          mission:
            'Proporcionar educación complementaria de calidad para el desarrollo integral de los estudiantes.',
          activities: ['Cursos especializados', 'Talleres prácticos', 'Certificaciones'],
          coordinator: 'Cesar Salazar Reyes',
          coverImage:
            'https://images.pexels.com/photos/3184644/pexels-photo-3184644.jpeg',
        },
      ].map((p) => ({
        ...p,
        events: pastEvents
          .filter((e) => e.pilar?.trim().toLowerCase() === p.name.trim().toLowerCase())
          .map((e) => ({ ...e, fecha: e.fechaDelEvento })),
        upcoming: upcomingEvents
          .filter((e) => e.pilar?.trim().toLowerCase() === p.name.trim().toLowerCase())
          .map((e) => ({ ...e, fecha: e.fechaTentativaEvento })),
      }));

      setPillars(pillarsData);
    };

    fetchData();
  }, []);

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
        behavior: 'smooth',
      });
    }
  }, [selectedPillar]);

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#09092a] to-[#36042f]" />

      <div className="min-h-screen text-white px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Nuestros Pilares
          </h1>
          <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
            LEAD UNI se organiza en siete pilares, cada uno enfocado en un área específica de
            desarrollo para nuestros miembros y la comunidad universitaria.
          </p>

          <div className="mt-[-40px] mb-8">
            <PillarCarousel
              pillars={pillars}
              selectedPillar={selectedPillar}
              onSelectPillar={handleSelectPillar}
            />
          </div>

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

