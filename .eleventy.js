const EleventyFetch = require("@11ty/eleventy-fetch");
const fs = require('fs');
const path = require('path');

module.exports = function (eleventyConfig) {

  
  
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