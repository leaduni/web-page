// Este servicio proporciona funciones para obtener datos de noticias
import localNews from '../../backups/noticias.json';

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

// Parser robusto para fechas "dd/mm/yyyy hh:mm:ss" (o con '-') usado para ordenar de más nuevo a más antiguo
function formattedTime(dateString) {
  try {
    if (!dateString || typeof dateString !== 'string') return new Date(0);
    const trimmed = dateString.trim();
    if (!trimmed) return new Date(0);

    const [datePartRaw, timePartRaw] = trimmed.split(' ');
    const datePart = datePartRaw || '';
    const timePart = timePartRaw || '00:00:00';

    const [dayStr, monthStr, yearStr] = datePart.includes('/')
      ? datePart.split('/')
      : datePart.split('-');
    const day = parseInt(dayStr || '1', 10);
    const month = parseInt(monthStr || '1', 10);
    const year = parseInt(yearStr || '1970', 10);

    const [hStr, mStr, sStr] = timePart.split(':');
    const hours = parseInt(hStr || '0', 10) || 0;
    const minutes = parseInt(mStr || '0', 10) || 0;
    const seconds = parseInt(sStr || '0', 10) || 0;

    return new Date(year, (month || 1) - 1, day || 1, hours, minutes, seconds);
  } catch (e) {
    if (DEBUG_MODE) console.warn('formattedTime parse error:', e);
    return new Date(0);
  }
}

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
      .replace(/(^-)|(-$)/g, '') // Remover guiones al inicio y final
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
  console.log('rawData:', rawData);
  const pillar = rawData.pilarRepresentante || rawData.pilar || rawData.Pilar || 'General';
  console.log('Escogido pilar:', pillar);
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
    marcaTemporal: dateField || '',
    timestamp: (() => {
      try {
        return formattedTime(dateField).getTime();
      } catch {
        return 0;
      }
    })(),
    readTime: calculateReadTime(description),
    author: author,
    imageUrl: formatImageUrl(image1),
    imageUrl2: formatImageUrl(image2), // Segunda imagen opcional
    category: formatPillar(pillar),
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
    // new Date(year, month - 1, day) // no se usa directamente, se devuelve formateada abajo

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
  if (!pilar) {
    console.log('general');
    return 'General';
  }
  console.log('Pilar recibido:', pilar);
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
  console.log('Llamando a formatPillars con:', pillarsString);

  if (!pillarsString) return ['General'];
  console.log('Resultado de pillarsString');
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

// Usar el JSON normalizado como fuente local para el último fallback
const simulatedApiData = localNews;

const emergencyFallbackData = localNews;

// Nota: formattedTime está declarado como function arriba para que esté disponible en todo el archivo

/**
 * Obtiene todas las noticias desde el endpoint con sistema de caché
 * @returns {Promise<Array>} Lista de noticias formateadas
 */
export async function getAllNews() {
  try {
    console.log('🌐 Obteniendo datos frescos de la API...');
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();

    const newsArray = rawData.noticias || [];

    // Formatear los datos
    const formattedNews = newsArray
      .map((item, index) => formatNewsData(item, index))
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

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
      return [...cachedData].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
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
      return [...expiredCache].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }

    // Si no hay caché disponible, usar datos de emergencia (datos más recientes)
    console.log('� Usando datos de emergencia como fallback');
    try {
      return emergencyFallbackData
        .map((item, index) => formatNewsData(item, index))
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    } catch (emergencyError) {
      console.error('Error con datos de emergencia, usando datos simulados:', emergencyError);
      // Último recurso: datos simulados originales
      console.log('� Usando datos simulados como último recurso');
      return simulatedApiData
        .map((item, index) => formatNewsData(item, index))
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
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
      // Solo usar los pilares individuales del array pillars, no la categoría
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
