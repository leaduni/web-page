import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function descargarJSON() {
  const url =
    'https://docs.google.com/spreadsheets/d/10nRYyf9FaQ1EZYnRMRBfb7SquKiKyh30gg_LGROEWho/export?format=csv';

  // Usa fetch global si existe (Node 18+), si no, hace fallback a node-fetch
  const fetchFn = globalThis.fetch || (await import('node-fetch')).default;
  const response = await fetchFn(url);
  const csv = await response.text();

  const { parse } = await import('csv-parse/sync');
  const records = parse(csv, {
    columns: false, // No usar los nombres de columnas, usar arrays
    skip_empty_lines: true,
  });

  // Saltar la primera fila que contiene los headers
  const dataRows = records.slice(1);

  // Transformar a la estructura requerida usando el orden de las columnas
  const normalized = dataRows.map((row, index) => {
    // Mapeo por posición de columna (índice):
    // 0: Marca temporal
    // 1: Nombre completo
    // 2: Correo personal
    // 3: Correo institucional
    // 4: Número de celular
    // 5: Carrera profesional
    // 6: Biografía breve
    // 7: Área
    // 8: Cargo
    // 9: LinkedIn
    // 10: Curriculum Vitae
    // 11: GitHub
    // 12: Portafolio
    // 13: Otro
    // 14: Premios y reconocimientos
    // 15: Eventos liderados
    // 16: Habilidades técnicas
    // 17: Habilidades blandas
    // 18: Foto personal

    const marcaTemporal = (row[0] ?? '').toString().trim();
    const nombreCompleto = (row[1] ?? '').toString().trim();
    const correoPersonal = (row[2] ?? '').toString().trim();
    const correoInstitucional = (row[3] ?? '').toString().trim();
    const numeroCelular = (row[4] ?? '').toString().trim();
    const carreraProfesional = (row[5] ?? '').toString().trim();
    const biografiaBreve = (row[6] ?? '').toString().trim();
    const area = (row[7] ?? '').toString().trim();
    const cargo = (row[8] ?? '').toString().trim();
    const linkedin = (row[9] ?? '').toString().trim();
    const curriculumVitae = (row[10] ?? '').toString().trim();
    const github = (row[11] ?? '').toString().trim();
    const portafolio = (row[12] ?? '').toString().trim();
    const otro = (row[13] ?? '').toString().trim();
    const premiosReconocimientos = (row[14] ?? '').toString().trim();
    const eventosLiderados = (row[15] ?? '').toString().trim();
    const habilidadesTecnicas = (row[16] ?? '').toString().trim();
    const habilidadesBlandas = (row[17] ?? '').toString().trim();
    const fotoPersonal = (row[18] ?? '').toString().trim();

    return {
      id: index + 1,
      marcaTemporal,
      nombreCompleto,
      correoPersonal,
      correoInstitucional,
      numeroCelular,
      carreraProfesional,
      biografiaBreve,
      area,
      cargo,
      linkedin,
      curriculumVitae,
      github,
      portafolio,
      otro,
      premiosReconocimientos,
      eventosLiderados,
      habilidadesTecnicas,
      habilidadesBlandas,
      fotoPersonal,
    };
  });

  // Asegurar que se escribe en la carpeta backups del proyecto (raíz)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, '..');
  const backupsDir = path.resolve(projectRoot, 'backups');
  const outputPath = path.resolve(backupsDir, 'organigrama.json');

  fs.mkdirSync(backupsDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2), 'utf8');
  console.log(
    `Archivo JSON del organigrama guardado en ${outputPath} (total: ${normalized.length})`
  );
}

descargarJSON().catch(console.error);
