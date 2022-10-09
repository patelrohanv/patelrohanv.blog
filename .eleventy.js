const fs = require('fs');
const { DateTime } = require('luxon');
let markdownIt = require('markdown-it');
let markdownItAnchor = require('markdown-it-anchor');
const htmlmin = require('html-minifier');
const imageShortcode = require('./src/_11ty/shortcodes/image-shortcode');

// Eleventy Plugins
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/assets/scss/");

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Merge data instead of overriding https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Date formatting (human readable)
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('MMMM dd, yyyy');
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter('machineDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd');
  });

  // Nunjuck Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('Image', imageShortcode);

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath && outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/admin');
  eleventyConfig.addPassthroughCopy('src/assets/img');

  // Customize Markdown library and settings
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor,  {
    permalink: false,
  });

  eleventyConfig.setLibrary('md', markdownLibrary);

  // Add Markdown filter
  eleventyConfig.addFilter('markdown', (str) => {
    return markdownIt().render(str);
  });

  // move to head so that it does not interfere
  // with turbolinks in development
  eleventyConfig.setBrowserSyncConfig({
    // show 404s in dev. Borrowed from eleventy blog starter
    callbacks: {
      ready: function(_, browserSync) {
        //  This is keeps the exception from showing during the first local build
        const generated404Exists = fs.existsSync('_site/404.html');
        const content_404 = generated404Exists
          ? fs.readFileSync('_site/404.html')
          : '<h1>File Does Not Exist</h1>';

        browserSync.addMiddleware('*', (_, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    },
    // scripts in body conflict with Turbolinks
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function(snippet, match) {
          return snippet + match;
        }
      }
    }
  });

  return {
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      layouts: "_layouts"
    },
  };
};
