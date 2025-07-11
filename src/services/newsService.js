// Este servicio proporciona funciones para obtener datos de noticias

// Configuración del caché
const CACHE_KEY = 'lead_uni_news_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos en milisegundos
const API_URL = 'https://api.sheety.co/d6f2d24940b41006fa4497853b883dcb/leadUni/noticias';
const DEBUG_MODE = false; // Cambiar a false para quitar los logs

// Variables para el caché en memoria
let memoryCache = {
  data: null,
  timestamp: null,
  isValid: function () {
    return this.data && this.timestamp && Date.now() - this.timestamp < CACHE_DURATION;
  },
};

/**
 * Obtiene datos del localStorage si están disponibles y son válidos
 * @returns {Array|null} - Datos del caché o null si no son válidos
 */
function getCachedData() {
  try {
    // Primero revisar caché en memoria
    if (memoryCache.isValid()) {
      console.log('📦 Usando datos del caché en memoria');
      return memoryCache.data;
    }

    // Si no hay caché en memoria válido, revisar localStorage
    const cachedItem = localStorage.getItem(CACHE_KEY);
    if (!cachedItem) return null;

    const { data, timestamp } = JSON.parse(cachedItem);

    // Verificar si el caché sigue siendo válido
    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log('💾 Usando datos del caché localStorage');
      // Actualizar caché en memoria
      memoryCache.data = data;
      memoryCache.timestamp = timestamp;
      return data;
    } else {
      console.log('⏰ Caché expirado, eliminando datos antiguos');
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  } catch (error) {
    console.error('Error al obtener datos del caché:', error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

/**
 * Guarda datos en el caché (memoria y localStorage)
 * @param {Array} data - Datos a guardar
 */
function setCachedData(data) {
  try {
    const timestamp = Date.now();

    // Guardar en caché de memoria
    memoryCache.data = data;
    memoryCache.timestamp = timestamp;

    // Guardar en localStorage
    const cacheItem = {
      data: data,
      timestamp: timestamp,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheItem));

    console.log('✅ Datos guardados en caché por', CACHE_DURATION / 60000, 'minutos');
  } catch (error) {
    console.error('Error al guardar en caché:', error);
  }
}

/**
 * Limpia el caché forzadamente
 */
export function clearNewsCache() {
  memoryCache.data = null;
  memoryCache.timestamp = null;
  localStorage.removeItem(CACHE_KEY);
  console.log('🗑️ Caché de noticias limpiado');
}

/**
 * Convierte los datos recibidos del endpoint a la estructura esperada por los componentes
 * @param {Object} rawData - Datos crudos del endpoint
 * @param {number} index - Índice del elemento en el array (para generar ID único)
 * @returns {Object} - Datos formateados para los componentes
 */
function formatNewsData(rawData, index = 0) {
  // Generar ID único basado en el título o usar el del API
  const generateId = (title, idx, apiId) => {
    if (rawData.id || apiId) return (rawData.id || apiId).toString();

    // Crear ID basado en el título (slug)
    const slug = title
      .toLowerCase()
      .normalize('NFD') // Normalizar caracteres especiales
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^a-z0-9\s]/g, '') // Remover caracteres especiales
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
      .replace(/^-|-$/g, '') // Remover guiones al inicio y final
      .substring(0, 50); // Limitar longitud

    const finalId = slug || `noticia-${idx + 1}`;
    if (DEBUG_MODE) console.log(`🆔 Generando ID para "${title}": "${finalId}"`);
    return finalId;
  };

  // Soporte para múltiples estructuras de API (nueva, anterior y fallback)
  const title =
    rawData.titulo || rawData.Titulo || rawData['tituloDeLaNoticia'] || `Noticia ${index + 1}`;
  const description =
    rawData.descripcion || rawData.Descripcion || rawData['descripciónDeLaNoticia'] || '';
  const dateField = rawData['hora-registro'] || rawData.fecha || rawData['marcaTemporal'] || '';
  const author =
    rawData.redactante ||
    rawData.Redactor ||
    rawData.redactor ||
    rawData['redactor (tuNombre)'] ||
    'Autor desconocido';
  const pillar = rawData.pilar || rawData.Pilar || 'General';

  // Mejorar selección de imágenes - priorizar campos específicos
  const image1 =
    rawData['imagenDeLaNoticia'] || // Nuevo formato API
    rawData.imagen1 ||
    rawData.Imagen1 ||
    rawData.imagen ||
    rawData.Imagen ||
    '';

  const image2 =
    rawData['linkDeLaImagen'] || // Nuevo formato API
    rawData.imagen2 ||
    rawData.Imagen2 ||
    rawData.imagenSecundaria ||
    rawData.ImagenSecundaria ||
    '';

  if (DEBUG_MODE && (image1 || image2)) {
    console.log(`🖼️ Imágenes encontradas para "${title}":`, {
      image1: image1 ? image1.substring(0, 50) + '...' : 'Sin imagen',
      image2: image2 ? image2.substring(0, 50) + '...' : 'Sin imagen',
    });
  }

  return {
    id: generateId(title, index, rawData.id),
    title: title,
    description: description,
    date: formatDate(dateField),
    readTime: calculateReadTime(description),
    author: author,
    imageUrl: formatImageUrl(image1),
    imageUrl2: formatImageUrl(image2), // Segunda imagen opcional
    category: formatPillar(pillar),
    // Nuevos campos para tags - soporte múltiple para diferentes estructuras
    tagsContenido: formatTags(
      rawData['tags-contenido'] || rawData.tagsContenido || rawData.Tags || ''
    ),
    tagsEnfoque: formatTags(rawData['tags-enfoque'] || rawData.tagsEnfoque || ''),
    tagsPublico: formatTags(rawData['tags-publico'] || rawData['tagsPúblico'] || ''),
    // Tags legacy para compatibilidad
    tags: formatTags(rawData['tags-enfoque'] || rawData.tagsEnfoque || rawData.Tags || ''),
    // Pilares como array para soporte múltiple
    pillars: formatPillars(pillar),
    content: generateContent(description, rawData['tags-contenido'] || rawData.Tags || ''),
  };
}

/**
 * Formatea la fecha del formato del endpoint al formato esperado
 * @param {string} dateString - Fecha en formato "10/07/2025 18:58:01" o "21/06/2025 18:43:37"
 * @returns {string} - Fecha formateada "10 de Julio, 2025"
 */
function formatDate(dateString) {
  if (!dateString) return new Date().toLocaleDateString('es-ES');

  try {
    // Si viene en formato "10/07/2025 18:58:01" o "21/06/2025 18:43:37"
    const [datePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const date = new Date(year, month - 1, day);

    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return `${parseInt(day)} de ${months[parseInt(month) - 1]}, ${year}`;
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return new Date().toLocaleDateString('es-ES');
  }
}

/**
 * Calcula el tiempo estimado de lectura basado en la descripción
 * @param {string} description - Descripción del artículo
 * @returns {string} - Tiempo de lectura estimado
 */
function calculateReadTime(description) {
  if (!description) return '1 min';

  const wordsPerMinute = 200;
  const wordCount = description.split(' ').length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  return `${Math.max(1, readTime)} min`;
}

/**
 * Convierte la URL de Google Drive a formato directo si es necesario
 * @param {string} imageUrl - URL de la imagen
 * @returns {string} - URL formateada para mostrar la imagen
 */
function formatImageUrl(imageUrl) {
  if (DEBUG_MODE) console.log(`🖼️ formatImageUrl recibió: "${imageUrl}"`);

  if (!imageUrl || imageUrl.trim() === '') {
    if (DEBUG_MODE) console.log('🖼️ No hay imagen, usando imagen por defecto');
    // Imagen por defecto si no hay imagen
    return 'https://drive.google.com/thumbnail?id=1FCypvIUp0nSbRiTCffFAuiHad9oudIvu&sz=w1000';
  }

  // Limpiar la URL de espacios
  const cleanUrl = imageUrl.trim();

  // Si es una URL de Google Drive, convertirla a formato thumbnail
  if (cleanUrl.includes('drive.google.com')) {
    let fileId = null;

    if (DEBUG_MODE) console.log(`🖼️ Detectada URL de Google Drive: ${cleanUrl}`);

    // Formato: https://drive.google.com/open?id=...
    if (cleanUrl.includes('open?id=')) {
      fileId = cleanUrl.split('open?id=')[1].split('&')[0];
      if (DEBUG_MODE) console.log(`🖼️ Extraído fileId del formato 'open?id=': ${fileId}`);
    }
    // Formato: https://drive.google.com/file/d/.../view
    else if (cleanUrl.includes('/file/d/')) {
      fileId = cleanUrl.split('/file/d/')[1].split('/')[0];
      if (DEBUG_MODE) console.log(`🖼️ Extraído fileId del formato '/file/d/': ${fileId}`);
    }
    // Formato: ...id=...
    else if (cleanUrl.includes('id=')) {
      fileId = cleanUrl.split('id=')[1].split('&')[0];
      if (DEBUG_MODE) console.log(`🖼️ Extraído fileId del formato 'id=': ${fileId}`);
    }

    if (fileId && fileId.trim() !== '') {
      const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
      if (DEBUG_MODE) console.log(`🖼️ ✅ URL convertida: ${thumbnailUrl}`);
      return thumbnailUrl;
    } else {
      if (DEBUG_MODE) console.log(`🖼️ ❌ No se pudo extraer fileId de: ${cleanUrl}`);
      // Si no se puede extraer el fileId, intentar usar uc?id= como alternativa
      if (cleanUrl.includes('open?id=')) {
        const fallbackId = cleanUrl.split('open?id=')[1].split('&')[0];
        const fallbackUrl = `https://drive.google.com/uc?id=${fallbackId}`;
        if (DEBUG_MODE) console.log(`🖼️ 🔄 Intentando URL alternativa: ${fallbackUrl}`);
        return fallbackUrl;
      }
    }
  }

  if (DEBUG_MODE) console.log(`🖼️ URL sin modificar: ${cleanUrl}`);
  return cleanUrl;
}

/**
 * Formatea el pilar a una categoría estándar
 * @param {string} pilar - Pilar desde el endpoint
 * @returns {string} - Categoría formateada
 */
function formatPillar(pilar) {
  if (!pilar) return 'General';

  const pilarMapping = {
    'P. Excelencia Académica': 'Excelencia Académica',
    'P. Impulso Femenino': 'Impulso Femenino',
    'P. LEAD Academia': 'LEAD Academia',
    'P. Impacto Social': 'Impacto Social',
    'P. Desarrollo de Capítulo': 'Desarrollo de Capítulo',
    'P. Desarrollo del Capítulo': 'Desarrollo de Capítulo',
    'P. Liderazgo': 'Liderazgo',
    'P. Desarrollo Profesional': 'Desarrollo Profesional',
    'P. Marketing': 'Marketing',
    // Variaciones sin prefijo
    'Excelencia Académica': 'Excelencia Académica',
    'Impulso Femenino': 'Impulso Femenino',
    'LEAD Academia': 'LEAD Academia',
    'Impacto Social': 'Impacto Social',
    'Desarrollo de Capítulo': 'Desarrollo de Capítulo',
    'Desarrollo del Capítulo': 'Desarrollo de Capítulo',
    Liderazgo: 'Liderazgo',
    'Desarrollo Profesional': 'Desarrollo Profesional',
    Marketing: 'Marketing',
    'LEAD UNI': 'LEAD UNI',
  };

  return pilarMapping[pilar] || pilar;
}

/**
 * Procesa múltiples pilares separados por comas
 * @param {string} pillarsString - Pilares separados por comas
 * @returns {Array} - Array de pilares formateados
 */
function formatPillars(pillarsString) {
  if (!pillarsString) return ['General'];

  return pillarsString
    .split(',')
    .map(pillar => formatPillar(pillar.trim()))
    .filter(pillar => pillar.length > 0);
}

/**
 * Obtiene el emoji correspondiente al pilar
 * @param {string} pillar - Nombre del pilar
 * @returns {string} - Emoji del pilar
 */
export function getPillarEmoji(pillar) {
  const emojiMapping = {
    Liderazgo: '🧭',
    'Excelencia Académica': '💻',
    'Desarrollo Profesional': '💼',
    'Impacto Social': '🤝',
    'LEAD Academia': '🚀',
    'Impulso Femenino': '✨',
    'Desarrollo de Capítulo': '🧩',
    Marketing: '📢',
    'LEAD UNI': '💜',
    General: '📰',
  };

  return emojiMapping[pillar] || '📰';
}

/**
 * Formatea los tags en un array
 * @param {string} tags - Tags separados por comas
 * @returns {Array} - Array de tags
 */
function formatTags(tags) {
  if (!tags) return [];

  return tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
}

/**
 * Genera contenido HTML básico basado en la descripción y tags
 * @param {string} description - Descripción del artículo
 * @param {string} tags - Tags del artículo
 * @returns {string} - Contenido HTML formateado
 */
function generateContent(description, tags) {
  const tagList = formatTags(tags);
  const paragraphs = description.split('\n').filter(p => p.trim().length > 0);

  let content = '';

  // Agregar párrafos de descripción
  paragraphs.forEach(paragraph => {
    content += `<p>${paragraph.trim()}</p>\n`;
  });

  // Agregar información sobre tags si existen
  if (tagList.length > 0) {
    content += `
      <p>Esta noticia está relacionada con los siguientes temas:</p>
      <ul>
        ${tagList.map(tag => `<li>${tag}</li>`).join('')}
      </ul>
    `;
  }

  // Contenido adicional básico
  content += `
    <p>Para más información sobre esta noticia y otras actividades de LEAD UNI, mantente al tanto de nuestras redes sociales y página web oficial.</p>
  `;

  return content;
}

// Datos simulados actualizados con la nueva estructura
const simulatedApiData = [
  {
    id: 3,
    'hora-registro': '10/07/2025 18:58:01',
    titulo: 'LEAD UNI en Microsoft',
    descripcion:
      'El pasado 7 de julio, tuvimos la oportunidad de presentar a LEAD UNI en las oficinas de Microsoft Perú, compartiendo los avances que hemos logrado como organización estudiantil desde nuestra formación.\n\nDurante la jornada, expusimos nuestra visión, estructura y las iniciativas que venimos impulsando con mucho compromiso y pasión. También compartimos los primeros avances de los proyectos desarrollados por los distintos pilares de la organización, demostrando cómo, en poco tiempo, hemos logrado articular ideas con impacto en diversas áreas clave de nuestra comunidad.\n\nContamos con la grata presencia de Luis Coronel y Antonny Porlles, quienes acompañaron esta presentación y compartieron su perspectiva como miembros con amplia trayectoria dentro de la comunidad LEAD, enriqueciendo aún más esta experiencia para nosotros.\n\nEste espacio marcó un paso importante en nuestro crecimiento, reafirmando que cuando el talento se une con propósito, grandes cosas pueden lograrse. ¡Vamos con todo, LEAD UNI! 💜',
    pilar: 'LEAD UNI',
    'tags-contenido': 'Actividad Interna, Comunicado, Oportunidad, Resumen Mensual',
    redactante: 'Diogo Abregu',
    imagen1: 'https://drive.google.com/open?id=1V4QoR4RLf-miHSOftQA1135IbPmde8PD',
    imagen2: '',
    'tags-enfoque': 'Organización, Crecimiento',
    'tags-publico': 'General',
  },
  {
    id: 2,
    'hora-registro': '08/07/2025 15:30:00',
    titulo: 'LEAD en los Colegios de SJL',
    descripcion:
      'LEAD UNI llega a los colegios de San Juan de Lurigancho con su programa educativo. Una iniciativa que busca impactar positivamente en la educación de los jóvenes, proporcionando talleres de liderazgo y orientación académica.',
    pilar: 'P. Impacto Social',
    'tags-contenido': 'Proyecto, Outreach',
    redactante: 'María González',
    imagen1:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
    imagen2: '',
    'tags-enfoque': 'Educación, Comunidad',
    'tags-publico': 'Estudiantes, Comunidad',
  },
  {
    id: 1,
    'hora-registro': '06/07/2025 10:15:22',
    titulo: 'Nuevo Programa de Liderazgo',
    descripcion:
      'LEAD UNI lanza su nuevo programa de liderazgo para estudiantes universitarios, enfocado en desarrollar habilidades de gestión y emprendimiento. El programa incluye talleres prácticos, mentoría personalizada y proyectos de impacto social.',
    pilar: 'P. Liderazgo',
    'tags-contenido': 'Programa, Lanzamiento',
    redactante: 'Carlos Ramírez',
    imagen1:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    imagen2: '',
    'tags-enfoque': 'Liderazgo, Desarrollo',
    'tags-publico': 'Estudiantes',
  },
  {
    id: 4,
    'hora-registro': '05/07/2025 14:20:45',
    titulo: 'Conferencia Internacional de Tecnología',
    descripcion:
      'LEAD UNI organiza conferencia internacional sobre innovación y tecnología, reuniendo a expertos de todo el mundo para discutir las últimas tendencias. El evento incluirá keynotes, paneles y talleres prácticos.',
    pilar: 'P. Excelencia Académica, P. Marketing',
    'tags-contenido': 'Evento, Conferencia, Internacional',
    redactante: 'Ana López',
    imagen1:
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
    imagen2: '',
    'tags-enfoque': 'Tecnología, Innovación',
    'tags-publico': 'Estudiantes, Profesionales',
  },
  {
    id: 5,
    'hora-registro': '04/07/2025 11:45:30',
    titulo: 'Iniciativa de Impulso Femenino',
    descripcion:
      'LEAD UNI lanza una nueva iniciativa para promover el liderazgo femenino en STEM. El programa incluye mentorías, talleres especializados y networking con profesionales exitosas del sector tecnológico.',
    pilar: 'P. Impulso Femenino',
    'tags-contenido': 'Programa, Iniciativa, Lanzamiento',
    redactante: 'Sofía Mendoza',
    imagen1:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    imagen2: '',
    'tags-enfoque': 'STEM, Empoderamiento, Networking',
    'tags-publico': 'Mujeres, Estudiantes',
  },
  {
    id: 6,
    'hora-registro': '03/07/2025 09:30:15',
    titulo: 'Desarrollo del Capítulo LEAD',
    descripcion:
      'El capítulo LEAD UNI presenta su plan de crecimiento y expansión para el próximo semestre. Nuevas alianzas estratégicas y proyectos comunitarios marcan el rumbo hacia un mayor impacto estudiantil.',
    pilar: 'P. Desarrollo de Capítulo',
    'tags-contenido': 'Plan, Estrategia, Crecimiento',
    redactante: 'Diego Torres',
    imagen1:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    imagen2: '',
    'tags-enfoque': 'Estrategia, Alianzas',
    'tags-publico': 'Miembros, Comunidad',
  },
  {
    id: 7,
    'hora-registro': '02/07/2025 16:00:00',
    titulo: 'Campaña de Marketing Digital',
    descripcion:
      'LEAD UNI lanza su nueva campaña de marketing digital para aumentar la visibilidad de sus programas. La campaña incluye contenido interactivo en redes sociales y estrategias de engagement estudiantil.',
    pilar: 'P. Marketing',
    'tags-contenido': 'Campaña, Digital, Lanzamiento',
    redactante: 'Lucía Vega',
    imagen1:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    imagen2: '',
    'tags-enfoque': 'Marketing Digital, Redes Sociales',
    'tags-publico': 'General, Estudiantes',
  },
  {
    id: 8,
    'hora-registro': '01/07/2025 13:15:30',
    titulo: 'Taller de Desarrollo Profesional',
    descripcion:
      'Nuevo taller enfocado en habilidades profesionales para estudiantes de ingeniería. Incluye técnicas de entrevista, elaboración de CV y networking profesional.',
    pilar: 'P. Desarrollo Profesional',
    'tags-contenido': 'Taller, Capacitación',
    redactante: 'Roberto Silva',
    imagen1:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    imagen2: '',
    'tags-enfoque': 'Capacitación, Habilidades Blandas',
    'tags-publico': 'Estudiantes, Profesionales',
  },
];

// Datos de fallback de emergencia con estructura alternativa
const emergencyFallbackData = [
  {
    id: 1,
    marcaTemporal: '10/07/2025 18:58:01',
    tituloDeLaNoticia: 'LEAD UNI en Microsoft',
    descripciónDeLaNoticia:
      'El pasado 7 de julio, tuvimos la oportunidad de presentar a LEAD UNI en las oficinas de Microsoft Perú, compartiendo los avances que hemos logrado como organización estudiantil desde nuestra formación.\n\nDurante la jornada, expusimos nuestra visión, estructura y las iniciativas que venimos impulsando con mucho compromiso y pasión. También compartimos los primeros avances de los proyectos desarrollados por los distintos pilares de la organización, demostrando cómo, en poco tiempo, hemos logrado articular ideas con impacto en diversas áreas clave de nuestra comunidad.\n\nContamos con la grata presencia de Luis Coronel y Antonny Porlles, quienes acompañaron esta presentación y compartieron su perspectiva como miembros con amplia trayectoria dentro de la comunidad LEAD, enriqueciendo aún más esta experiencia para nosotros.\n\nEste espacio marcó un paso importante en nuestro crecimiento, reafirmando que cuando el talento se une con propósito, grandes cosas pueden lograrse. ¡Vamos con todo, LEAD UNI! 💜',
    tagsContenido: 'Actividad Interna, Comunicado, Oportunidad, Resumen Mensual',
    'redactor (tuNombre)': 'Diogo Abregu',
    imagenDeLaNoticia: 'https://drive.google.com/open?id=1V4QoR4RLf-miHSOftQA1135IbPmde8PD',
    linkDeLaImagen: '',
    pilar: 'LEAD UNI',
    tagsEnfoque: 'Organización, Crecimiento',
    tagsPúblico: 'General',
  },
  {
    id: 2,
    marcaTemporal: '10/07/2025 22:13:18',
    tituloDeLaNoticia: 'Desarrollo de la Pagina Web LEAD UNI',
    descripciónDeLaNoticia:
      'En LEAD UNI sabemos que comunicar quiénes somos y lo que hacemos es tan importante como hacerlo con pasión. Por eso, una de nuestras primeras metas como organización fue comenzar a construir nuestra página web oficial: un espacio que represente nuestra identidad, nuestros pilares y nuestras ganas de transformar realidades.\n\nEl desarrollo de la web comenzó con la idea clara de que no solo debía ser informativa, sino también una carta de presentación viva de todo el trabajo que estamos haciendo como comunidad.\n\nDesde las primeras semanas nos organizamos en base a reuniones de planificación, donde cada integrante del equipo pudo aportar ideas y plantear mejoras. Poco a poco, fuimos asignando tareas, definiendo componentes y estructurando las secciones clave: desde el histórico de proyectos y el organigrama, hasta los pilares, convocatorias y la actividad reciente.\n\nGracias al compromiso del equipo, a una buena comunicación y a nuestra metodología basada en GitHub Projects, pudimos dividir el trabajo de manera ordenada y avanzar de forma constante. Cada línea de código, cada revisión y cada diseño fueron pensados para construir una web hecha con propósito.\n\nHoy seguimos avanzando en su desarrollo, puliendo los últimos detalles para brindar una experiencia clara, cercana y auténtica. Muy pronto estará disponible al público, y no podríamos estar más emocionados de compartirla con todos ustedes.\n\nPorque esto es solo el comienzo. 💻✨\n¡Vamos LEAD UNI!',
    tagsContenido: 'Reconocimiento, Actividad Interna',
    'redactor (tuNombre)': 'Diogo Abregu',
    imagenDeLaNoticia: 'https://drive.google.com/open?id=1FCypvIUp0nSbRiTCffFAuiHad9oudIvu',
    linkDeLaImagen: '',
    pilar: 'P. Excelencia Académica',
    tagsEnfoque: 'Logro, Anuncio',
    tagsPúblico: 'General',
  },
];

// Convertir datos simulados al formato esperado por los componentes
const newsData = simulatedApiData.map((item, index) => formatNewsData(item, index));

/**
 * Obtiene todas las noticias desde el endpoint con sistema de caché
 * @returns {Promise<Array>} Lista de noticias formateadas
 */
export async function getAllNews() {
  try {
    // Si no hay caché válido, hacer petición a la API PRIMERO
    console.log('🌐 Obteniendo datos frescos de la API...');
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();

    // La API de Sheety devuelve los datos en un objeto con clave "noticias"
    const newsArray = rawData.noticias || [];

    // Formatear los datos
    const formattedNews = newsArray.map((item, index) => formatNewsData(item, index));

    // Guardar en caché
    setCachedData(formattedNews);

    return formattedNews;
  } catch (error) {
    console.error('Error fetching news from API:', error);

    // Si la API falla, intentar obtener datos del caché como fallback
    console.log('🔄 API falló, intentando caché...');
    const cachedData = getCachedData();
    if (cachedData) {
      console.log('📦 Usando datos del caché como fallback');
      return cachedData;
    }

    // Si no hay caché válido, intentar usar caché expirado
    const expiredCache =
      memoryCache.data ||
      (() => {
        try {
          const cachedItem = localStorage.getItem(CACHE_KEY);
          return cachedItem ? JSON.parse(cachedItem).data : null;
        } catch {
          return null;
        }
      })();

    if (expiredCache) {
      console.log('⚠️ Usando caché expirado como fallback');
      return expiredCache;
    }

    // Si no hay caché disponible, usar datos de emergencia (datos más recientes)
    console.log('� Usando datos de emergencia como fallback');
    try {
      return emergencyFallbackData.map((item, index) => formatNewsData(item, index));
    } catch (emergencyError) {
      console.error('Error con datos de emergencia, usando datos simulados:', emergencyError);
      // Último recurso: datos simulados originales
      console.log('� Usando datos simulados como último recurso');
      return simulatedApiData.map((item, index) => formatNewsData(item, index));
    }
  }
}

/**
 * Obtiene una noticia específica por su ID desde el caché o endpoint
 * @param {string} id - ID de la noticia
 * @returns {Promise<Object|null>} Datos de la noticia formateados o null si no se encuentra
 */
export async function getNewsById(id) {
  try {
    // Obtener todas las noticias (esto usará el caché si está disponible)
    const allNews = await getAllNews();

    if (DEBUG_MODE) {
      console.log(`🔍 Buscando noticia con ID: "${id}"`);
      console.log(`📰 Total de noticias disponibles: ${allNews.length}`);
      console.log(
        '📋 IDs disponibles:',
        allNews.map(news => news.id)
      );
    }

    // Buscar la noticia específica
    const news = allNews.find(item => item.id === id);

    if (DEBUG_MODE) {
      if (news) {
        console.log(`✅ Noticia encontrada: "${news.title}"`);
      } else {
        console.log(`❌ No se encontró noticia con ID: "${id}"`);
      }
    }

    return news || null;
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    throw error;
  }
}

/**
 * Busca noticias por término usando datos del caché
 * @param {string} term - Término de búsqueda
 * @returns {Promise<Array>} Lista de noticias filtradas
 */
export async function searchNews(term) {
  try {
    // Obtener todas las noticias (esto usará el caché si está disponible)
    const allNews = await getAllNews();

    const normalizedTerm = term.toLowerCase();

    // Filtrar las noticias
    const filteredNews = allNews.filter(
      news =>
        news.title.toLowerCase().includes(normalizedTerm) ||
        news.description.toLowerCase().includes(normalizedTerm) ||
        news.category.toLowerCase().includes(normalizedTerm) ||
        news.tags.some(tag => tag.toLowerCase().includes(normalizedTerm)) ||
        news.tagsContenido.some(tag => tag.toLowerCase().includes(normalizedTerm)) ||
        news.tagsEnfoque.some(tag => tag.toLowerCase().includes(normalizedTerm)) ||
        news.tagsPublico.some(tag => tag.toLowerCase().includes(normalizedTerm)) ||
        news.pillars.some(pillar => pillar.toLowerCase().includes(normalizedTerm))
    );

    return filteredNews;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
}

/**
 * Obtiene todas las categorías únicas de todas las noticias
 * @returns {Promise<Array>} Lista de categorías únicas
 */
export async function getAllCategories() {
  try {
    const allNews = await getAllNews();
    const categories = new Set();

    allNews.forEach(news => {
      if (news.category) categories.add(news.category);
      news.pillars.forEach(pillar => categories.add(pillar));
    });

    return ['Todas', ...Array.from(categories).sort()];
  } catch (error) {
    console.error('Error getting categories:', error);
    return ['Todas'];
  }
}

/**
 * Obtiene todos los tags únicos de enfoque
 * @returns {Promise<Array>} Lista de tags de enfoque únicos
 */
export async function getEnfoqueTags() {
  try {
    const allNews = await getAllNews();
    const tags = new Set();

    allNews.forEach(news => {
      news.tagsEnfoque.forEach(tag => tags.add(tag));
    });

    return Array.from(tags).sort();
  } catch (error) {
    console.error('Error getting enfoque tags:', error);
    return [];
  }
}

/**
 * Obtiene todos los tags únicos de público
 * @returns {Promise<Array>} Lista de tags de público únicos
 */
export async function getPublicoTags() {
  try {
    const allNews = await getAllNews();
    const tags = new Set();

    allNews.forEach(news => {
      news.tagsPublico.forEach(tag => tags.add(tag));
    });

    return Array.from(tags).sort();
  } catch (error) {
    console.error('Error getting publico tags:', error);
    return [];
  }
}

/**
 * Función helper para fetch directo sin caché (para endpoints externos)
 * @param {string} endpoint - URL del endpoint
 * @returns {Promise<Array>} Datos formateados del endpoint
 */
export async function fetchFromEndpoint(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawData = await response.json();

    // Si es un array, formatear cada elemento
    if (Array.isArray(rawData)) {
      return rawData.map((item, index) => formatNewsData(item, index));
    }

    // Si es un objeto individual, formatearlo
    return formatNewsData(rawData, 0);
  } catch (error) {
    console.error('Error fetching from endpoint:', error);
    throw error;
  }
}

/**
 * Fuerza la actualización del caché obteniendo datos frescos de la API
 * @returns {Promise<Array>} Lista de noticias actualizadas
 */
export async function forceRefreshNews() {
  try {
    // Limpiar caché actual
    clearNewsCache();

    // Obtener datos frescos
    console.log('🔄 Forzando actualización de noticias...');
    return await getAllNews();
  } catch (error) {
    console.error('Error en actualización forzada:', error);
    throw error;
  }
}

/**
 * Obtiene información del estado del caché
 * @returns {Object} Información del caché
 */
export function getCacheStatus() {
  const isMemoryCacheValid = memoryCache.isValid();
  let isLocalStorageValid = false;
  let cacheAge = null;

  try {
    const cachedItem = localStorage.getItem(CACHE_KEY);
    if (cachedItem) {
      const { timestamp } = JSON.parse(cachedItem);
      isLocalStorageValid = Date.now() - timestamp < CACHE_DURATION;
      cacheAge = Math.floor((Date.now() - timestamp) / 60000); // minutos
    }
  } catch (error) {
    console.error('Error checking cache status:', error);
  }

  return {
    memoryCache: isMemoryCacheValid,
    localStorage: isLocalStorageValid,
    ageInMinutes: cacheAge,
    maxAgeInMinutes: CACHE_DURATION / 60000,
  };
}
