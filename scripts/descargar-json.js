import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function descargarJSON() {
  const url =
    'https://docs.google.com/spreadsheets/d/1s2srg36pKAqHvxwrCZrTSao4ivIpa1zUkGlFkRpYl4A/export?format=csv&gid=1744794553';

  // Usa fetch global si existe (Node 18+), si no, hace fallback a node-fetch
  const fetchFn = globalThis.fetch || (await import('node-fetch')).default;
  const response = await fetchFn(url);
  const csv = await response.text();

  const { parse } = await import('csv-parse/sync');
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  });

  // Transformar a la estructura requerida y remapear campos
  const normalized = records.map((row, index) => {
    // Valores originales
    const marcaTemporal = (row['Marca temporal'] ?? '').toString().trim();
    const tituloDeLaNoticia = (row['Titulo de la Noticia'] ?? '').toString().trim();
    const descripcionRaw = (row['Descripción de la Noticia'] ?? '').toString();
    const pilarRepresentante = (row['Pilar Representante'] ?? '').toString().trim();
    const tagsContenido = (row['Tags Contenido'] ?? '').toString().trim();
    const redactorTuNombre = (
      row['Redactor (Tu Nombre)'] ??
      row['Redactor (tu Nombre)'] ??
      row['Redactor (Tu nombre)'] ??
      ''
    )
      .toString()
      .trim();
    const imagenDeLaNoticia = (row['Imagen de la Noticia'] ?? '').toString().trim();
    const linkDeLaImagenOriginal = (row['Link de la Imagen'] ?? '').toString().trim();
    const tagsEnfoqueOriginal = (row['tags-enfoque'] ?? row['Tags Enfoque'] ?? '')
      .toString()
      .trim();
    // Nota: "Tags Público" del sheet ya no participa en el mapeo final actual.
    const tagsPublico = (row['tags-publico'] ?? row['Tags Público '] ?? '').toString().trim();

    // Regla final:
    // - El valor de "Link de la Imagen" pasa a "tagsEnfoque"
    // - El valor de "tags-enfoque" pasa a "tagsPúblico"
    // - "linkDeLaImagen" se limpia (queda vacío)

    // Respetar saltos de línea en descripción
    const descripciónDeLaNoticia = descripcionRaw;

    return {
      id: index + 1,
      marcaTemporal,
      tituloDeLaNoticia,
      descripciónDeLaNoticia,
      pilarRepresentante,
      tagsContenido,
      'redactor (tuNombre)': redactorTuNombre,
      imagenDeLaNoticia,
      linkDeLaImagen: linkDeLaImagenOriginal,
      tagsEnfoque: tagsEnfoqueOriginal,
      tagsPublico,
    };
  });

  // Asegurar que se escribe en la carpeta backups del proyecto (raíz)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '..');
  const backupsDir = path.resolve(projectRoot, 'backups');
  const outputPath = path.resolve(backupsDir, 'noticias.json');

  fs.mkdirSync(backupsDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2), 'utf8');
  console.log(`Archivo JSON normalizado guardado en ${outputPath} (total: ${normalized.length})`);
}

descargarJSON().catch(console.error);
