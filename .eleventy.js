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

  // Quita espacios y diagonales, y deja en minúsculas los links
  eleventyConfig.addFilter("normalizeString", function(value) {
    return value.toLowerCase().replace(/\s+/g, '-').replace(/[\/]/g, '-');
  });

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