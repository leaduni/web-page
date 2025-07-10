// Este servicio proporciona funciones para obtener datos de noticias
// En un entorno real, estas funciones harán peticiones a una API

// Configuración del caché
const CACHE_KEY = 'lead_uni_news_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos en milisegundos
const API_URL = 'https://api.sheety.co/d6f2d24940b41006fa4497853b883dcb/leadUni/noticias';
const DEBUG_MODE = true; // Cambiar a false para quitar los logs

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
  // Generar ID único basado en el título o usar el index
  const generateId = (title, idx) => {
    if (rawData.id) return rawData.id.toString();

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

  const title = rawData.Titulo || rawData.titulo || `Noticia ${index + 1}`;

  return {
    id: generateId(title, index),
    title: title,
    description: rawData.Descripcion || rawData.descripcion || '',
    date: formatDate(rawData.fecha),
    readTime: calculateReadTime(rawData.Descripcion || rawData.descripcion || ''),
    author: rawData.Redactor || rawData.redactor || 'Autor desconocido',
    imageUrl: formatImageUrl(rawData.Imagen1 || rawData.imagen1),
    imageUrl2: formatImageUrl(rawData.Imagen2 || rawData.imagen2), // Segunda imagen opcional
    category: formatPillar(rawData.Pilar || rawData.pilar),
    tags: formatTags(rawData.Tags || rawData.tags),
    content: generateContent(
      rawData.Descripcion || rawData.descripcion || '',
      rawData.Tags || rawData.tags || ''
    ),
  };
}

/**
 * Formatea la fecha del formato del endpoint al formato esperado
 * @param {string} dateString - Fecha en formato "21/06/2025 18:43:37"
 * @returns {string} - Fecha formateada "21 de Junio, 2025"
 */
function formatDate(dateString) {
  if (!dateString) return new Date().toLocaleDateString('es-ES');

  try {
    // Si viene en formato "21/06/2025 18:43:37"
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
  if (!imageUrl) {
    // Imagen por defecto si no hay imagen
    return 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80';
  }

  // Si es una URL de Google Drive, convertirla a formato thumbnail
  if (imageUrl.includes('drive.google.com') && imageUrl.includes('id=')) {
    const fileId = imageUrl.split('id=')[1].split('&')[0];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return imageUrl;
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
    'P. Marketing': 'Marketing',
    // Variaciones sin prefijo
    'Excelencia Académica': 'Excelencia Académica',
    'Impulso Femenino': 'Impulso Femenino',
    'LEAD Academia': 'LEAD Academia',
    'Impacto Social': 'Impacto Social',
    'Desarrollo de Capítulo': 'Desarrollo de Capítulo',
    Marketing: 'Marketing',
  };

  return pilarMapping[pilar] || pilar;
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

// Datos simulados con la nueva estructura del endpoint
const simulatedApiData = [
  {
    id: '1',
    fecha: '21/06/2025 18:43:37',
    Titulo: 'Novedad en la UNI',
    Descripcion:
      'Ninguna por mientras, aunque esto lo pueden generar con IA. LEAD UNI está trabajando en nuevas iniciativas para mejorar la experiencia estudiantil y el desarrollo profesional de sus miembros.',
    Pilar: 'P. Excelencia Académica',
    Tags: 'Novedoso, Tecnológico',
    Redactor: 'Diogo Abregu',
    Imagen1: 'https://drive.google.com/open?id=1vCJhIXk36vLNOXuay02G1EpQCA_ygLa2',
    Imagen2: '',
  },
  {
    id: '2',
    fecha: '20/06/2025 15:30:00',
    Titulo: 'LEAD en los Colegios de SJL',
    Descripcion:
      'LEAD UNI llega a los colegios de San Juan de Lurigancho con su programa educativo. Una iniciativa que busca impactar positivamente en la educación de los jóvenes, proporcionando talleres de liderazgo y orientación académica.',
    Pilar: 'P. Impacto Social',
    Tags: 'Educación, Comunidad, Outreach',
    Redactor: 'María González',
    Imagen1:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
    Imagen2: '',
  },
  {
    id: '3',
    fecha: '19/06/2025 10:15:22',
    Titulo: 'Nuevo Programa de Liderazgo',
    Descripcion:
      'LEAD UNI lanza su nuevo programa de liderazgo para estudiantes universitarios, enfocado en desarrollar habilidades de gestión y emprendimiento. El programa incluye talleres prácticos, mentoría personalizada y proyectos de impacto social.',
    Pilar: 'P. LEAD Academia',
    Tags: 'Liderazgo, Programas, Desarrollo',
    Redactor: 'Carlos Ramírez',
    Imagen1:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    Imagen2: '',
  },
  {
    id: '4',
    fecha: '18/06/2025 14:20:45',
    Titulo: 'Conferencia Internacional de Tecnología',
    Descripcion:
      'LEAD UNI organiza conferencia internacional sobre innovación y tecnología, reuniendo a expertos de todo el mundo para discutir las últimas tendencias. El evento incluirá keynotes, paneles y talleres prácticos.',
    Pilar: 'P. Marketing',
    Tags: 'Tecnología, Innovación, Conferencia',
    Redactor: 'Ana López',
    Imagen1:
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
    Imagen2: '',
  },
  {
    id: '5',
    fecha: '17/06/2025 11:45:30',
    Titulo: 'Iniciativa de Impulso Femenino',
    Descripcion:
      'LEAD UNI lanza una nueva iniciativa para promover el liderazgo femenino en STEM. El programa incluye mentorías, talleres especializados y networking con profesionales exitosas del sector tecnológico.',
    Pilar: 'P. Impulso Femenino',
    Tags: 'Mujeres, STEM, Liderazgo, Empoderamiento',
    Redactor: 'Sofía Mendoza',
    Imagen1:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    Imagen2: '',
  },
  {
    id: '6',
    fecha: '16/06/2025 09:30:15',
    Titulo: 'Desarrollo del Capítulo LEAD',
    Descripcion:
      'El capítulo LEAD UNI presenta su plan de crecimiento y expansión para el próximo semestre. Nuevas alianzas estratégicas y proyectos comunitarios marcan el rumbo hacia un mayor impacto estudiantil.',
    Pilar: 'P. Desarrollo de Capítulo',
    Tags: 'Crecimiento, Estrategia, Comunidad',
    Redactor: 'Diego Torres',
    Imagen1:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    Imagen2: '',
  },
  {
    id: '7',
    fecha: '15/06/2025 16:00:00',
    Titulo: 'Campaña de Marketing Digital',
    Descripcion:
      'LEAD UNI lanza su nueva campaña de marketing digital para aumentar la visibilidad de sus programas. La campaña incluye contenido interactivo en redes sociales y estrategias de engagement estudiantil.',
    Pilar: 'P. Marketing',
    Tags: 'Marketing, Digital, Redes Sociales, Engagement',
    Redactor: 'Lucía Vega',
    Imagen1:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    Imagen2: '',
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
    // Primero intentar obtener datos del caché
    const cachedData = getCachedData();
    if (cachedData) {
      return cachedData;
    }

    // Si no hay caché válido, hacer petición a la API
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
    console.error('Error fetching news:', error);

    // Si hay error, intentar usar datos del caché aunque estén expirados
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
      console.log('⚠️ Error en API, usando caché expirado como fallback');
      return expiredCache;
    }

    // Si no hay caché disponible, usar datos simulados como última opción
    console.log('📋 Usando datos simulados como fallback');
    return simulatedApiData.map((item, index) => formatNewsData(item, index));
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
        news.tags.some(tag => tag.toLowerCase().includes(normalizedTerm))
    );

    return filteredNews;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
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
