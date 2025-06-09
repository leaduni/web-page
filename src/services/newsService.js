// Este servicio proporciona funciones para obtener datos de noticias
// En un entorno real, estas funciones harían peticiones a una API

// Datos simulados de noticias
const newsData = [
  {
    id: '1',
    title: 'LEAD en los Colegios de SJL',
    description:
      "LEAD UNI llega a los colegios de San Juan de Lurigancho (SJL) con su programa 'LEAD UNI en los Colegios'. Esta iniciativa representa un valioso apoyo comunitario de la organización LEAD, buscando impactar positivamente en la educación y el desarrollo de los jóvenes estudiantes de la zona.",
    date: '15 de Julio, 2025',
    readTime: '5 min',
    author: 'Usuario 1',
    imageUrl:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
    category: 'Educación',
    content: `
      <p>LEAD UNI ha puesto en marcha una iniciativa innovadora que busca llevar sus valores y conocimientos a los colegios de San Juan de Lurigancho. Este programa está diseñado para proporcionar a los estudiantes de educación secundaria las herramientas necesarias para su desarrollo personal y académico.</p>
      
      <p>A través de talleres interactivos y charlas motivacionales, los miembros de LEAD están compartiendo habilidades fundamentales como:</p>
      
      <ul>
        <li>Técnicas de estudio eficaces</li>
        <li>Habilidades de liderazgo</li>
        <li>Preparación para la vida universitaria</li>
        <li>Desarrollo de proyectos comunitarios</li>
      </ul>
      
      <p>El programa ha sido recibido con entusiasmo por directores, profesores y estudiantes, quienes valoran la oportunidad de conectar con universitarios que pueden servir como modelos a seguir.</p>
      
      <p>"Estamos muy contentos de poder compartir nuestras experiencias con estos jóvenes. Creemos firmemente que la educación es la base para el desarrollo de nuestra sociedad", comentó uno de los organizadores de LEAD UNI.</p>
      
      <p>El proyecto continuará expandiéndose a más colegios en los próximos meses, con el objetivo de impactar positivamente en la mayor cantidad posible de estudiantes de la zona.</p>
    `,
  },
  {
    id: '2',
    title: 'Nuevo Programa de Liderazgo',
    description:
      'LEAD UNI lanza su nuevo programa de liderazgo para estudiantes universitarios, enfocado en desarrollar habilidades de gestión y emprendimiento.',
    date: '10 de Julio, 2025',
    readTime: '3 min',
    author: 'Usuario 2',
    imageUrl:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    category: 'Programas',
    content: `
      <p>LEAD UNI ha anunciado el lanzamiento de su nuevo programa de liderazgo, diseñado específicamente para estudiantes universitarios que deseen potenciar sus habilidades de gestión y emprendimiento.</p>
      
      <p>El programa, que se desarrollará a lo largo de seis meses, incluirá:</p>
      
      <ul>
        <li>Talleres prácticos de liderazgo</li>
        <li>Mentoría personalizada por profesionales de diversos sectores</li>
        <li>Proyectos reales con impacto en la comunidad</li>
        <li>Networking con empresas y organizaciones colaboradoras</li>
      </ul>
      
      <p>"Queremos que los participantes no solo adquieran conocimientos teóricos, sino que pongan en práctica lo aprendido en situaciones reales", explicó el coordinador del programa.</p>
      
      <p>Las inscripciones ya están abiertas y se espera una gran participación de estudiantes de diferentes facultades, lo que enriquecerá la experiencia con diversas perspectivas y enfoques.</p>
    `,
  },
  {
    id: '3',
    title: 'Conferencia Internacional',
    description:
      'LEAD UNI organiza conferencia internacional sobre innovación y tecnología, reuniendo a expertos de todo el mundo.',
    date: '5 de Julio, 2025',
    readTime: '4 min',
    author: 'Usuario 3',
    imageUrl:
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
    category: 'Eventos',
    content: `
      <p>LEAD UNI está organizando su primera conferencia internacional de innovación y tecnología, un evento que reunirá a expertos y profesionales de todo el mundo para compartir ideas y tendencias sobre el futuro de la tecnología y su impacto en la sociedad.</p>
      
      <p>La conferencia contará con:</p>
      
      <ul>
        <li>Keynotes de reconocidos líderes de la industria tecnológica</li>
        <li>Paneles de discusión sobre temas actuales y emergentes</li>
        <li>Talleres prácticos de nuevas tecnologías</li>
        <li>Espacio para networking y colaboración entre participantes</li>
      </ul>
      
      <p>"Este evento representa una oportunidad única para conectar con mentes brillantes y estar al tanto de las últimas tendencias en innovación y tecnología", declaró el presidente de LEAD UNI.</p>
      
      <p>La conferencia se llevará a cabo en el campus principal y contará con transmisión en vivo para quienes no puedan asistir presencialmente. Las inscripciones anticipadas ya están disponibles con importantes descuentos para estudiantes.</p>
    `,
  },
  {
    id: '4',
    title: 'LEAD en los Colegios de SJL',
    description:
      "LEAD UNI llega a los colegios de San Juan de Lurigancho (SJL) con su programa 'LEAD UNI en los Colegios'. Esta iniciativa representa un valioso apoyo comunitario de la organización LEAD, buscando impactar positivamente en la educación y el desarrollo de los jóvenes estudiantes de la zona.",
    date: '15 de Julio, 2025',
    readTime: '5 min',
    author: 'Usuario 1',
    imageUrl:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
    category: 'Educación',
    content: `
      <p>LEAD UNI ha puesto en marcha una iniciativa innovadora que busca llevar sus valores y conocimientos a los colegios de San Juan de Lurigancho. Este programa está diseñado para proporcionar a los estudiantes de educación secundaria las herramientas necesarias para su desarrollo personal y académico.</p>
      
      <p>A través de talleres interactivos y charlas motivacionales, los miembros de LEAD están compartiendo habilidades fundamentales como:</p>
      
      <ul>
        <li>Técnicas de estudio eficaces</li>
        <li>Habilidades de liderazgo</li>
        <li>Preparación para la vida universitaria</li>
        <li>Desarrollo de proyectos comunitarios</li>
      </ul>
      
      <p>El programa ha sido recibido con entusiasmo por directores, profesores y estudiantes, quienes valoran la oportunidad de conectar con universitarios que pueden servir como modelos a seguir.</p>
      
      <p>"Estamos muy contentos de poder compartir nuestras experiencias con estos jóvenes. Creemos firmemente que la educación es la base para el desarrollo de nuestra sociedad", comentó uno de los organizadores de LEAD UNI.</p>
      
      <p>El proyecto continuará expandiéndose a más colegios en los próximos meses, con el objetivo de impactar positivamente en la mayor cantidad posible de estudiantes de la zona.</p>
    `,
  },
  {
    id: '5',
    title: 'Nuevo Programa de Liderazgo',
    description:
      'LEAD UNI lanza su nuevo programa de liderazgo para estudiantes universitarios, enfocado en desarrollar habilidades de gestión y emprendimiento.',
    date: '10 de Julio, 2025',
    readTime: '3 min',
    author: 'Usuario 2',
    imageUrl:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    category: 'Programas',
    content: `
      <p>LEAD UNI ha anunciado el lanzamiento de su nuevo programa de liderazgo, diseñado específicamente para estudiantes universitarios que deseen potenciar sus habilidades de gestión y emprendimiento.</p>
      
      <p>El programa, que se desarrollará a lo largo de seis meses, incluirá:</p>
      
      <ul>
        <li>Talleres prácticos de liderazgo</li>
        <li>Mentoría personalizada por profesionales de diversos sectores</li>
        <li>Proyectos reales con impacto en la comunidad</li>
        <li>Networking con empresas y organizaciones colaboradoras</li>
      </ul>
      
      <p>"Queremos que los participantes no solo adquieran conocimientos teóricos, sino que pongan en práctica lo aprendido en situaciones reales", explicó el coordinador del programa.</p>
      
      <p>Las inscripciones ya están abiertas y se espera una gran participación de estudiantes de diferentes facultades, lo que enriquecerá la experiencia con diversas perspectivas y enfoques.</p>
    `,
  },
  {
    id: '6',
    title: 'Conferencia Internacional',
    description:
      'LEAD UNI organiza conferencia internacional sobre innovación y tecnología, reuniendo a expertos de todo el mundo.',
    date: '5 de Julio, 2025',
    readTime: '4 min',
    author: 'Usuario 3',
    imageUrl:
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
    category: 'Eventos',
    content: `
      <p>LEAD UNI está organizando su primera conferencia internacional de innovación y tecnología, un evento que reunirá a expertos y profesionales de todo el mundo para compartir ideas y tendencias sobre el futuro de la tecnología y su impacto en la sociedad.</p>
      
      <p>La conferencia contará con:</p>
      
      <ul>
        <li>Keynotes de reconocidos líderes de la industria tecnológica</li>
        <li>Paneles de discusión sobre temas actuales y emergentes</li>
        <li>Talleres prácticos de nuevas tecnologías</li>
        <li>Espacio para networking y colaboración entre participantes</li>
      </ul>
      
      <p>"Este evento representa una oportunidad única para conectar con mentes brillantes y estar al tanto de las últimas tendencias en innovación y tecnología", declaró el presidente de LEAD UNI.</p>
      
      <p>La conferencia se llevará a cabo en el campus principal y contará con transmisión en vivo para quienes no puedan asistir presencialmente. Las inscripciones anticipadas ya están disponibles con importantes descuentos para estudiantes.</p>
    `,
  },
  {
    id: '7',
    title: 'Conferencia Internacional',
    description:
      'LEAD UNI organiza conferencia internacional sobre innovación y tecnología, reuniendo a expertos de todo el mundo.',
    date: '5 de Julio, 2025',
    readTime: '4 min',
    author: 'Usuario 3',
    imageUrl:
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
    category: 'Eventos',
    content: `
      <p>LEAD UNI está organizando su primera conferencia internacional de innovación y tecnología, un evento que reunirá a expertos y profesionales de todo el mundo para compartir ideas y tendencias sobre el futuro de la tecnología y su impacto en la sociedad.</p>
      
      <p>La conferencia contará con:</p>
      
      <ul>
        <li>Keynotes de reconocidos líderes de la industria tecnológica</li>
        <li>Paneles de discusión sobre temas actuales y emergentes</li>
        <li>Talleres prácticos de nuevas tecnologías</li>
        <li>Espacio para networking y colaboración entre participantes</li>
      </ul>
      
      <p>"Este evento representa una oportunidad única para conectar con mentes brillantes y estar al tanto de las últimas tendencias en innovación y tecnología", declaró el presidente de LEAD UNI.</p>
      
      <p>La conferencia se llevará a cabo en el campus principal y contará con transmisión en vivo para quienes no puedan asistir presencialmente. Las inscripciones anticipadas ya están disponibles con importantes descuentos para estudiantes.</p>
    `,
  },
];

/**
 * Obtiene todas las noticias disponibles
 * @returns {Promise<Array>} Lista de noticias
 */
export async function getAllNews() {
  // Simulamos una petición a una API
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newsData);
    }, 300); // Simulamos un pequeño retraso
  });
}

/**
 * Obtiene una noticia específica por su ID
 * @param {string} id - ID de la noticia
 * @returns {Promise<Object|null>} Datos de la noticia o null si no se encuentra
 */
export async function getNewsById(id) {
  // Simulamos una petición a una API
  return new Promise(resolve => {
    setTimeout(() => {
      const news = newsData.find(item => item.id === id);
      resolve(news || null);
    }, 500); // Simulamos un pequeño retraso
  });
}

/**
 * Busca noticias por término
 * @param {string} term - Término de búsqueda
 * @returns {Promise<Array>} Lista de noticias filtradas
 */
export async function searchNews(term) {
  const normalizedTerm = term.toLowerCase();

  return new Promise(resolve => {
    setTimeout(() => {
      const filteredNews = newsData.filter(
        news =>
          news.title.toLowerCase().includes(normalizedTerm) ||
          news.description.toLowerCase().includes(normalizedTerm) ||
          news.category.toLowerCase().includes(normalizedTerm)
      );
      resolve(filteredNews);
    }, 300);
  });
}
