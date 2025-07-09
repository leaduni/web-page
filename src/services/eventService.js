const PAST_EVENTS_URL = 'https://api.sheety.co/2857d43ef362a7d0ed8ea6b48c2792d9/eventoss/respuestasDeFormulario1';
const UPCOMING_EVENTS_URL = 'https://api.sheety.co/2857d43ef362a7d0ed8ea6b48c2792d9/eventosProximos/respuestasDeFormulario1';

let cache = {
  past: null,
  upcoming: null,
};

//export function transformGoogleDriveLink(url) {
//  if (!url || typeof url !== 'string') {
//    console.error("❌ URL inválida recibida en transformGoogleDriveLink:", url);
  //  return null;
  //}

  //const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  //if (match && match[1]) {
   // return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  //}

  //console.error("❌ No se pudo extraer ID de la URL:", url);
  //return null;
//}

export async function getPastEvents() {
  if (cache.past) return cache.past;

  try {
    const response = await fetch(PAST_EVENTS_URL);
    const data = await response.json();

    cache.past = data.respuestasDeFormulario1.map(event => {
      //const transformedUrl = transformGoogleDriveLink(event.imagenUrl);
      return {
        nombreDelEvento: event.nombreDelEvento,
        fechaDelEvento: event.fechaDelEvento,
        pilar: event.pilar,
        imagenUrl: event.imagenUrl,
        descripcion: event.descripcion,
        cantidadDeAsistentes: event.cantidadDeAsistentes,
        cantidadDePonentes: event.cantidadDePonentes,
        carrerasParticipantes: event.carrerasParticipantes,
        universidadesParticipantes: event.universidadesParticipantes,
        porcentajeCiclosSuperiores: event.porcentajeCiclosSuperiores,
        nivelSatisfaccion: event.nivelSatisfaccion,
      };
    });

    return cache.past;
  } catch (error) {
    console.error('Error fetching past events:', error);
    return [];
  }
}

export async function getUpcomingEvents() {
  if (cache.upcoming) return cache.upcoming;

  try {
    const response = await fetch(UPCOMING_EVENTS_URL);
    const data = await response.json();

    cache.upcoming = data.respuestasDeFormulario1.map(event => {
      return {
        nombreDelEvento: event.nombreDelEvento,
        fechaTentativaDelEvento: event.fechaTentativaDelEvento,
        pilar: event.pilar,
        imagenUrl: event.imagenUrl,
        descripcionBreve: event.descripcionBreve,
        linkDeInscripcion: event.linkDeInscripción,
      };
    });

    return cache.upcoming;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}
