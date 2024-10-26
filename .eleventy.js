const fs = require('fs');
const path = require('path');
const radiadoresData = require("./src/_data/radiadores");

module.exports = function (eleventyConfig) {

  eleventyConfig.addCollection("radiadores", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/radiadores_md/*.md");
  });

  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value); // Usar JSON.stringify directamente
  });

  /*
  eleventyConfig.addCollection("posts", function(collectionApi) {
    // Accede a los datos de wordpress.js automáticamente cargados por Eleventy
    const posts = collectionApi.getAllSorted().filter(item => item.data.wordpress);

    // Devuelve los posts de la API de WordPress
    return posts;
  });
  
  eleventyConfig.addFilter("fetchPosts", async function(url) {
    try {
      let json = await EleventyFetch(url, {
        duration: "1d", // Cache the response for a day
        type: "json" // Parse response as JSON
      });
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  });
  */

  // Filtro para marcas SVG en hero
  const imageFolderPath = './src/assets/images/marcas/';

  eleventyConfig.addNunjucksFilter('getSVGs', function() {
    const directoryPath = path.join(__dirname, imageFolderPath);
    const files = fs.readdirSync(directoryPath);
    return files
      .filter(file => /\.svg$/.test(file))  // Filtra solo SVGs
      .sort((a, b) => a.localeCompare(b)); // Ordena alfabéticamente
  });


  //Filtro para FaQ
  eleventyConfig.addCollection("faq", function(collection) {
    return collection.getFilteredByGlob("./src/faq/*.md");
  });


  // Bypass
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("src/assets");
  
  return {
      dir: {
          input: "src",
          output: "public",
      },
  };
};