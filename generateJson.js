const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Ruta al archivo CSV
const csvFilePath = './radiadores.csv';

// Archivo de salida JSON con el formato de módulo
const outputFilePath = './src/_data/radiadores.js';

// Crear un array para almacenar los productos
let radiadores = [];

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


// Leer el CSV y procesar cada fila
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const slug = createSlug(`${row.Identificador}`);
    // Crear un objeto con los datos del CSV para cada fila
    const radiadorData = {
        layout: "radiador",
        marca: row.Marca,
        modelo: row.Modelo,
        ano: row.Ano,
        motor: row.Motor,
        transmision: row.Transmision,
        parte: row.Parte,
        clima: row.Clima,
        alto: row.Alto,
        ancho: row.Ancho,
        observaciones: row.Observaciones,
        id: row.Identificador,
        slug: slug,
    };

    // Añadir el objeto al array de radiadores
    radiadores.push(radiadorData);
  })
  .on('end', () => {
    // Crear el contenido del archivo como un módulo de Node.js
    const fileContent = `
module.exports  = ${JSON.stringify(radiadores, null, 2).replace(/\},\s*\{/g, '},\n{')};

`;

    // Escribir el archivo con el contenido formateado
    fs.writeFileSync(outputFilePath, fileContent.trim(), 'utf8');
    console.log(`Archivo generado: ${outputFilePath}`);
  });

    // Para crear los Markdowns de manera dinámica, abrir terminal en la raíz del proyecto y pegar: node generateJson.js