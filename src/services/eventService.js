const PAST_EVENTS_URL = 'https://api.sheety.co/c770fc0f2cec952ae86b356ef4a77409/eventoss/respuestasDeFormulario1';
const UPCOMING_EVENTS_URL = 'https://api.sheety.co/f871ed37eae4f5d98113a2867069d03c/eventosProximos/respuestasDeFormulario1';

const EVENT_CACHE_KEY = 'lead_uni_event_cache';
const EVENT_CACHE_DURATION =  10 * 60 * 1000; //10minutos

// Caché en memoria
let memoryCache = {
  data: null,
  timestamp: null,
  isValid: function () {
    return this.data && this.timestamp && Date.now() - this.timestamp < EVENT_CACHE_DURATION;
  },
};

// Obtener del caché 
function getCachedEvents() {
  if (memoryCache.isValid()) return memoryCache.data;

  const cached = localStorage.getItem(EVENT_CACHE_KEY);
  if (!cached) return null;

  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < EVENT_CACHE_DURATION) {
      memoryCache.data = data;
      memoryCache.timestamp = timestamp;
      return data;
    }
  } catch {
    localStorage.removeItem(EVENT_CACHE_KEY);
  }

  return null;
}

// Guardar datos reales en caché

function setCachedEvents(data) {
  const isBackup = (event) => event?.esRespaldo === true;

  const containsBackup =
    data?.upcoming?.some(isBackup) || data?.past?.some(isBackup);

  if (containsBackup) {
    console.warn('Intento de guardar eventos de respaldo en caché. Cancelado.');
    return;
  }

  const item = { data, timestamp: Date.now() };
  memoryCache.data = data;
  memoryCache.timestamp = item.timestamp;
  localStorage.setItem(EVENT_CACHE_KEY, JSON.stringify(item));
}

// Convertir URL de imagen de Google Drive
function formatImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const match1 = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  if (match1 && match1[1]) return `https://drive.google.com/thumbnail?id=${match1[1]}&sz=w1000`;
  const match2 = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (match2 && match2[1]) return `https://drive.google.com/thumbnail?id=${match2[1]}&sz=w1000`;
  return url;
}

// Datos de respaldo 
const staticFallbackUpcoming = [
  {
    nombreDelEvento: 'Podcast LeadUNI 🎙️',
    fechaTentativaDelEvento: '30/07/2025',
    pilar: 'Liderazgo',
    imagenUrl: 'https://drive.google.com/thumbnail?id=1NyOuUKksL3elUHHUTCeOpoMK9GqKmlbg&sz=w1000',
    descripcionBreve: 'Desde el Pilar de Liderazgo de Lead UNI, estamos preparando un podcast pensado para inspirarte, retarte y ayudarte a crecer.¡Pronto en tus oídos! 👂🚀',

    esRespaldo: true
  },
  {
    nombreDelEvento: 'Marca Personal: Sé tu mejor Proyecto💜💼',
    fechaTentativaDelEvento: '07/08/2025',
    pilar: 'Desarrollo Profesional',
    imagenUrl: 'https://drive.google.com/thumbnail?id=1bhaIPAb_h-1CPq4zdRBR2UQmA1x3i6D_&sz=w1000',
    descripcionBreve: 'Taller enfocado en ayudarte a construir y potenciar tu marca personal, identificando tus fortalezas, valores y propósito para destacar en entornos académicos y profesionales. Mantente pendiente',

    esRespaldo: true
  },
  {
    nombreDelEvento: 'Litle Einstein-Visita a colegios🎓',
    fechaTentativaDelEvento: '22/07/2025',
    pilar: 'Impacto Social',
    imagenUrl: 'https://drive.google.com/thumbnail?id=1NIyO9ltwIfVP8jA67i8-WygIBO5RPxfm&sz=w1000',
    descripcionBreve: 'A través de este ciclo de visitas a colegios, miembros de Lead UNI llevarán charlas motivacionales y dinámicas formativas a estudiantes de nivel escolar, con el objetivo de despertar su interés por las áreas STEAM y fomentar el desarrollo del liderazgo desde temprana edad.',

    esRespaldo: true
  },
  {
    nombreDelEvento: 'Desarrollo Web💻-Pagina LeadUNI',
    fechaTentativaDelEvento: '13/07/2025',
    pilar: 'Excelencia Académica',
    imagenUrl: 'https://drive.google.com/thumbnail?id=1ZFOlXNkpy_MTv_NE4UDSVJwAg5SnwqUh&sz=w1000',
    descripcionBreve: 'Durante este proyecto colaborativo, el equipo de Excelencia Academica desarrolló la página web oficial de LeadUNI. Tiene como objetivo representar digitalmente a la organización, mostrando proyectos, eventos, noticias, convocatoria y presentando a los miembros clave de la comunidad.',
    
    esRespaldo: true
  },
];

const staticFallbackPast = [
  {
    nombreDelEvento: 'WOMEN LEADING DATA & IA💜🚀',
    fechaDelEvento: '13/06/2025',
    pilar: 'Impulso Femenino',
    imagenUrl: 'https://drive.google.com/thumbnail?id=1GXIWUVFVCAJNoIA4do0dombACYPNYX4a&sz=w1000',
    descripcion: 'Una jornada inspiradora donde mujeres líderes en tecnología compartieron sus historias reales de transformación e impacto sobre el uso de inteligencia artificial y análisis de datos para liderar el cambio en distintas industrias.',
    cantidadDeAsistentes: 20,
    cantidadDePonentes: 5,
    carrerasParticipantes: 7,
    universidadesParticipantes: 10,
    porcentajeCiclosSuperiores: 50,
    nivelSatisfaccion: 95,
    esRespaldo: true
  },
  {
    nombreDelEvento: 'Google Cloud Skills Boost',
    fechaDelEvento: '25/05/2025',
    pilar: 'Lead Academia',
    imagenUrl: 'https://drive.google.com/thumbnail?id=1xbGynF9sZsggJxACCmvg_WUQcaeYUhbY&sz=w1000',
    descripcion: 'Impulsamos una iniciativa de formación gratuita en tecnologías emergentes con cursos 100% online en inteligencia artificial, análisis de datos y cloud computing para certificarte con Google.',
    esRespaldo: true
  },
  {
    nombreDelEvento: '1° Integración LeadUNI',
    fechaDelEvento: '18/05/2025',
    pilar: 'Desarrollo del Capítulo',
    imagenUrl: 'https://drive.google.com/thumbnail?id=1wtjBznBHjgmiq7z3wuMOWNcruas32USj&sz=w1000',
    descripcion: 'Primera integración del equipo Lead UNI, un espacio de encuentro donde se realizaron dinámicas, charlas y actividades orientadas a fortalecer el propósito común, fomentar el trabajo en equipo y generar una conexión real entre las distintas áreas.',
    esRespaldo: true
  },
];

export async function getUpcomingEvents() {
  const cached = getCachedEvents();
  if (cached?.upcoming && memoryCache.isValid()) {
    console.log("Usando eventos próximos desde caché válido");
    return cached.upcoming;
  }

  try {
    const response = await fetch(UPCOMING_EVENTS_URL);
    const data = await response.json();

    if (data.errors || !Array.isArray(data.respuestasDeFormulario1)) {
      throw new Error('API con error o datos inválidos');
    }

    const upcoming = data.respuestasDeFormulario1.map(event => ({
      nombreDelEvento: event.nombreDelEvento,
      fechaTentativaDelEvento: event.fechaTentativaDelEvento,
      pilar: event.pilar,
      imagenUrl: formatImageUrl(event.imagenUrl),
      descripcionBreve: event.descripcionBreve || '',
      linkDeInscripcion: event.linkDeInscripcion || '',
      esRespaldo: false,
    }));

     upcoming.sort((a, b) => new Date(a.fechaTentativaDelEvento) - new Date(b.fechaTentativaDelEvento));

    if (upcoming.length === 0) {
      console.warn('API sin eventos.Usando respaldo');
      return staticFallbackUpcoming.sort((a, b) => new Date(a.fechaTentativaDelEvento) - new Date(b.fechaTentativaDelEvento));; // ⚠️ NO guardar si está vacío
    }


    // Solo guardar si son reales
    const updated = {
      upcoming,
      past: cached?.past || null,
    };
    setCachedEvents(updated);

    return upcoming;

  } catch (error) {
    console.warn('ERROR en getUpcomingEvents:', error.message);
    return staticFallbackUpcoming.sort((a, b) => new Date(a.fechaTentativaDelEvento) - new Date(b.fechaTentativaDelEvento)); // ⚠️ NO SE GUARDA NADA
  }
}

export async function getPastEvents() {
  const cached = getCachedEvents();
  if (cached?.past && memoryCache.isValid()) {
    console.log("Usando eventos pasados desde caché válido");
    return cached.past;
  }

  try {
    const response = await fetch(PAST_EVENTS_URL);
    const data = await response.json();

    if (
      data.errors ||
      !Array.isArray(data.respuestasDeFormulario1) ||
      data.respuestasDeFormulario1.length === 0
    ) {
      throw new Error('API con error o sin eventos pasados');
    }

    const past = data.respuestasDeFormulario1.map(event => ({
      nombreDelEvento: event.nombreDelEvento,
      fechaDelEvento: event.fechaDelEvento,
      pilar: event.pilar,
      descripcion: event.descripcion,
      imagenUrl: formatImageUrl(event.imagenUrl),
      cantidadDeAsistentes: event.cantidadDeAsistentes,
      cantidadDePonentes: event.cantidadDePonentes,
      carrerasParticipantes: event.carrerasParticipantes,
      universidadesParticipantes: event.universidadesParticipantes,
      porcentajeCiclosSuperiores: event.porcentajeCiclosSuperiores,
      nivelSatisfaccion: event.nivelSatisfaccion,
      esRespaldo: false,
    }));

    past.sort((a, b) => new Date(b.fechaDelEvento) - new Date(a.fechaDelEvento));

    const upcoming = cached?.upcoming || staticFallbackUpcoming;

    // Validación : detecta si los eventos pasados son respaldo
    const esRespaldo = past.some(e => e.esRespaldo === true);

    if (!esRespaldo) {
      setCachedEvents({ past, upcoming });
    } else {
      console.warn('Eventos pasados detectados como respaldo.');
    }

    return past;
  } catch (error) {
    console.error('cargando eventos pasados:', error.message);
    return staticFallbackPast.sort((a, b) => new Date(b.fechaDelEvento) - new Date(a.fechaDelEvento));
  }
}


// Limpiar manualmente caché
export function clearEventCache() {
  memoryCache.data = null;
  memoryCache.timestamp = null;
  localStorage.removeItem(EVENT_CACHE_KEY);
  console.log('Caché de eventos limpiado');
}

// Refrescar todo 
export async function forceRefreshEvents() {
  clearEventCache();
  return Promise.all([getUpcomingEvents(), getPastEvents()]);
}


