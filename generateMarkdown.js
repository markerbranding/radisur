const fs = require("fs");
const path = require("path");
const radiadoresData = require("./src/_data/radiadores");

// Crear la carpeta de destino para los archivos .md si no existe
const outputDir = path.join(__dirname, "src", "radiadores_md");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

radiadoresData.forEach(radiador => {
  const slug = `${radiador.id}`
    .toLowerCase()
    .replace(/\s+/g, '-');
    
  const content = `---
layout: "radiador"
permalink: "/radiadores/${slug}/"
marca: "${radiador.marca}"
modelo: "${radiador.modelo}"
ano: "${radiador.ano}"
motor: "${radiador.motor}"
transmision: "${radiador.transmision}"
parte: "${radiador.parte}"
clima: "${radiador.clima}"
alto: "${radiador.alto}"
ancho: "${radiador.ancho}"
observaciones: "${radiador.observaciones}"
id: "${radiador.id}"
---\n
`;

  // Escribir el archivo .md dentro del forEach
  const filePath = path.join(outputDir, `${slug}.md`);
  fs.writeFileSync(filePath, content, "utf-8");
});

console.log("Archivos Markdown generados exitosamente.");

/*
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Ruta al archivo CSV
const csvFilePath = './radiadores.csv';

// Carpeta donde se guardarán los archivos .md
const outputDir = './src/radiadores';

// Función para generar un slug
const createSlug = (str) => {
  return str
    .toString()
    .toLowerCase()
    .normalize("NFD") // Normaliza para eliminar acentos
    .replace(/[\u0300-\u036f]/g, "") // Elimina caracteres especiales
    .replace(/\s+/g, '-') // Reemplaza espacios por guiones
    .replace(/[^\w\-]+/g, '') // Elimina cualquier caracter que no sea palabra o guión
    .replace(/\-\-+/g, '-') // Reemplaza múltiples guiones por uno
    .replace(/^-+/, '') // Elimina guiones al inicio
    .replace(/-+$/, ''); // Elimina guiones al final
};

// Asegurarse de que la carpeta de salida existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Leer el CSV y procesar cada fila
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Crear un slug concatenando el título y el precio, por ejemplo
    //const slug = createSlug(`${row.Marca}-${row.Identificador}`);

    // Convertir cada fila en frontmatter y contenido Markdown
    const frontmatter = `---
layout: "radiador"
marca: "${row.Marca}"
modelo: "${row.Modelo}"
ano: "${row.Ano}"
motor: "${row.Motor}"
transmision: "${row.Transmision}"
parte: "${row.Parte}"
clima: "${row.Clima}"
alto: "${row.Alto}"
ancho: "${row.Ancho}"
observaciones: "${row.Observaciones}"
permalink: "${row.Identificador}"

---\n`;
//permalink: "${slug}"
    const fileName = `${row.Identificador}.md`;
    const filePath = path.join(outputDir, fileName);

    // Escribir archivo Markdown
    fs.writeFileSync(filePath, frontmatter, 'utf8');
    console.log(`Archivo creado: ${filePath}`);
  })
  .on('end', () => {
    console.log('Todos los archivos Markdown fueron generados.');
  });

  // Para crear los Markdowns de manera dinámica, abrir terminal en la raíz del proyecto y pegar: node generateMarkdown.js

  */