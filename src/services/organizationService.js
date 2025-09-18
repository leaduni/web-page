// Importar datos del JSON
import organizationData from '../../backups/organigrama.json';

// Función para formatear URLs de Google Drive (tomada del newsService)
function formatImageUrl(imageUrl) {
  if (!imageUrl || imageUrl.trim() === '') {
    // Imagen por defecto si no hay imagen
    return 'https://drive.google.com/thumbnail?id=1FCypvIUp0nSbRiTCffFAuiHad9oudIvu&sz=w1000';
  }

  // Limpiar la URL de espacios
  const cleanUrl = imageUrl.trim();

  // Si es una URL de Google Drive, convertirla a formato thumbnail
  if (cleanUrl.includes('drive.google.com')) {
    let fileId = null;

    // Formato: https://drive.google.com/open?id=...
    if (cleanUrl.includes('open?id=')) {
      fileId = cleanUrl.split('open?id=')[1].split('&')[0];
    }
    // Formato: https://drive.google.com/file/d/.../view
    else if (cleanUrl.includes('/file/d/')) {
      fileId = cleanUrl.split('/file/d/')[1].split('/')[0];
    }
    // Formato: ...id=...
    else if (cleanUrl.includes('id=')) {
      fileId = cleanUrl.split('id=')[1].split('&')[0];
    }

    if (fileId && fileId.trim() !== '') {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }

    // Si no se puede extraer el fileId, intentar usar uc?id= como alternativa
    if (cleanUrl.includes('open?id=')) {
      const fallbackId = cleanUrl.split('open?id=')[1].split('&')[0];
      return `https://drive.google.com/uc?id=${fallbackId}`;
    }
  }

  return cleanUrl;
}

// Mapeo de áreas del JSON a IDs de departamentos
const areaMapping = {
  'Dirección General': 'direccion',
  Liderazgo: 'liderazgo',
  'Excelencia Académica': 'academica',
  'Desarrollo Profesional': 'profesional',
  'Impacto Social': 'social',
  'LEAD Academia': 'academia',
  Marketing: 'marketing',
  'Desarrollo del Capítulo': 'capitulo',
  'Impulso Femenino': 'femenina',
};

// Función para normalizar el nombre del cargo
function normalizePosition(cargo, area) {
  if (cargo.toLowerCase().includes('presidente') && !cargo.toLowerCase().includes('vice')) {
    return 'Presidenta';
  }
  if (cargo.toLowerCase().includes('vicepresidente')) {
    return 'Vicepresidente';
  }
  if (cargo.toLowerCase().includes('tesorero')) {
    return 'Tesorero';
  }
  if (cargo.toLowerCase().includes('jefe') || cargo.toLowerCase().includes('jefa')) {
    return 'Jefa de Personal';
  }
  if (cargo.toLowerCase().includes('director')) {
    return `Director del Pilar de ${area}`;
  }
  if (cargo.toLowerCase().includes('subdirector')) {
    return `Subdirectora de ${area}`;
  }
  return cargo;
}

// Función para procesar y agrupar miembros por departamento
function processMembersData() {
  const membersBase = {
    direccion: [],
    liderazgo: [],
    academica: [],
    profesional: [],
    social: [],
    academia: [],
    marketing: [],
    capitulo: [],
    femenina: [],
    todos: [],
  };

  organizationData.forEach(member => {
    const departmentId = areaMapping[member.area] || 'todos';

    // Determinar clase de imagen basada en el área o nombre (puedes personalizar esto)
    let imgClass = '';
    if (member.nombreCompleto.includes('Arianna')) {
      imgClass = 'object-[center_top]';
    } else if (member.nombreCompleto.includes('Claudia')) {
      imgClass = 'object-top';
    } else if (member.nombreCompleto.includes('Miguel')) {
      imgClass = 'object-top md:object-center';
    } else if (member.nombreCompleto.includes('Yuleimy')) {
      imgClass = 'object-top';
    } else if (member.nombreCompleto.includes('Daniel')) {
      imgClass = 'object-top';
    } else if (member.nombreCompleto.includes('Angela')) {
      imgClass = 'object-[center_top]';
    }

    const memberData = {
      name: member.nombreCompleto,
      position: normalizePosition(member.cargo, member.area),
      image: formatImageUrl(member.fotoPersonal),
      ...(imgClass && { imgClass }),
    };

    if (departmentId !== 'todos') {
      membersBase[departmentId].push(memberData);
    }
  });

  // Generar lista completa de todos los miembros
  membersBase.todos = Object.values(membersBase)
    .filter((_, k) => k !== 'todos')
    .flatMap(x => x);

  return membersBase;
}

// Función para procesar detalles completos de miembros
function processMemberDetails() {
  const memberDetails = {};

  organizationData.forEach(member => {
    // Procesar contactos
    const contacto = [
      member.linkedin || '',
      member.curriculumVitae || '',
      member.github || '',
      member.portafolio || '',
      member.otro || '',
    ];

    // Procesar eventos
    const premios = member.premiosReconocimientos
      ? member.premiosReconocimientos
          .split('\n')
          .map(p => p.trim().replace(/^-\s*/, ''))
          .filter(p => p && p !== '0' && p !== '.' && p !== '-')
      : [];

    const liderados = member.eventosLiderados
      ? member.eventosLiderados
          .split('\n')
          .map(l => l.trim().replace(/^-\s*/, ''))
          .filter(l => l && l !== '0' && l !== '.' && l !== '-')
      : [];

    // Procesar habilidades
    const hardSkills = member.habilidadesTecnicas
      ? member.habilidadesTecnicas
          .split(/[,\n]/)
          .map(h => h.trim().replace(/^-\s*/, ''))
          .filter(h => h)
      : [];

    const softSkills = member.habilidadesBlandas
      ? member.habilidadesBlandas
          .split(/[,\n]/)
          .map(h => h.trim().replace(/^-\s*/, ''))
          .filter(h => h)
      : [];

    memberDetails[member.nombreCompleto] = {
      bio: member.biografiaBreve || '',
      contacto: contacto,
      eventos: {
        premios: premios,
        liderados: liderados,
      },
      habilidades: {
        hard: hardSkills,
        soft: softSkills,
      },
      image: formatImageUrl(member.fotoPersonal),
    };
  });

  return memberDetails;
}
// Datos de los pilares de LEAD UNI (mantenemos esto ya que no está en el JSON)
export const pillars = [
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

// Datos de los departamentos
export const departments = [
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

// Generar datos dinámicamente desde el JSON
const membersBase = processMembersData();
export const memberDetails = processMemberDetails();

// Exportar datos de miembros
export const members = membersBase;

// Funciones de utilidad para obtener datos
export const getAllMembers = () => {
  return [...members.todos].sort((a, b) => {
    const getCargoPriority = position => {
      const pos = position.toLowerCase();

      if (pos.includes('presidenta') || pos.includes('presidente')) return 1;
      if (pos.includes('vicepresidente') || pos.includes('vicepresidenta')) return 2;
      if (pos.includes('jefa de personal') || pos.includes('jefe de personal')) return 3;
      if (pos.includes('tesorero') || pos.includes('tesorera')) return 4;

      if (pos.includes('director') || pos.includes('directora')) return 10;
      if (pos.includes('subdirector') || pos.includes('subdirectora')) return 11;
      if (pos.includes('coordinador') || pos.includes('coordinadora')) return 12;

      if (pos.includes('miembro') || pos.includes('miembra')) return 20;

      // Por defecto, si no coincide con ninguna categoría
      return 15;
    };

    const priorityA = getCargoPriority(a.position);
    const priorityB = getCargoPriority(b.position);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return a.name.localeCompare(b.name);
  });
};
export const getMembersByDepartment = departmentId => members[departmentId] || [];
export const getMemberDetails = memberName => memberDetails[memberName] || null;
export const getDepartments = () => departments;
export const getPillars = () => pillars;
