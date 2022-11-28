const { EleventyRenderPlugin } = require("@11ty/eleventy");
const Image = require("@11ty/eleventy-img");
const { DateTime } = require('luxon');

// Site directories
const dir = {
    input: 'src',
    output: '_site',
    includes: '_includes',
    layouts: '_layouts',
    data: '_data',
};

// Template language for the site: https://www.11ty.dev/docs/languages/liquid/
const TEMPLATE_ENGINE = 'liquid';

module.exports = (eleventyConfig) => {
    // Watch targets
    eleventyConfig.addWatchTarget(`${dir.input}/assets/styles`);

    // Static assets
    eleventyConfig.addPassthroughCopy('src/assets/images');
    eleventyConfig.addPassthroughCopy('src/favicon.ico');

    // Render plugin
    eleventyConfig.addPlugin(EleventyRenderPlugin, {
        tagName: 'renderTemplate',
        tagNameFile: 'renderFile',
    });

    // Image shortcode
    // Inspired by https://www.aleksandrhovhannisyan.com/blog/eleventy-image-plugin/
    const imageShortcode = async (
        src,
        alt = 'Header',
        widths = [400, 800, 1280, 2560],
        formats = ['webp', 'jpeg'],
        sizes = '100vw'
    ) => {
        const imageMetadata = await Image('src/assets/images/' + src, {
            widths: [...widths, null],
            formats: [...formats, null],
            outputDir: './_site/assets/images',
            urlPath: '/assets/images',
        });

        const imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
        };

        return Image.generateHTML(imageMetadata, imageAttributes);
    };
    eleventyConfig.addShortcode("image", imageShortcode)

    // Current date shortcode
    eleventyConfig.addShortcode("currentDate", (date = DateTime.now()) => {
        return date;
    });

    // robots.txt
    eleventyConfig.addPassthroughCopy('src/robots.txt');

    return {
        dir,
        dataTemplateEngine: TEMPLATE_ENGINE,
        markdownTemplateEngine: TEMPLATE_ENGINE,
        htmlTemplateEngine: TEMPLATE_ENGINE,
        templateFormats: ['html', 'md', TEMPLATE_ENGINE],
    };
};
