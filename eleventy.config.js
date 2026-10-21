import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // Copy the stylesheet and photos straight into the finished site.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/photos");

  // Phone photos are huge (3–8 MB). This shrinks every photo on the site
  // into fast-loading versions automatically when the site is built.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: [700, 1400],
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async" },
    },
  });

  // Every Markdown file in src/letters/ is one weekly letter.
  eleventyConfig.addCollection("letters", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/letters/*.md")
  );

  // "October 19, 2026" — dates are read as plain calendar days so they
  // never slip back a day because of time zones.
  eleventyConfig.addFilter("longDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  // Copy before reversing so the original order (used for the
  // "Older letter / Newer letter" links) stays intact.
  eleventyConfig.addFilter("newestFirst", (items = []) => [...items].reverse());

  eleventyConfig.addFilter("isoDate", (date) =>
    new Date(date).toISOString().slice(0, 10)
  );

  // A short plain-text preview of a letter for the home page.
  eleventyConfig.addFilter("excerpt", (html = "", length = 220) => {
    const text = String(html)
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length <= length) return text;
    return text.slice(0, text.lastIndexOf(" ", length)) + "…";
  });

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
