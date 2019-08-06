/* global hexo */
'use strict'

if (hexo.config.neat_enable === true) {
  // HTML minifier
  hexo.config.neat_html = Object.assign({
    enable: true,
    logger: false,
    exclude: [],
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    // Ignore '<!-- more -->' https://hexo.io/docs/tag-plugins#Post-Excerpt
    ignoreCustomComments: [/^\s*more/],
    removeComments: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true,
    globOptions: { basename: true }
  }, hexo.config.neat_html)

  // CSS minifier
  hexo.config.neat_css = Object.assign({
    enable: true,
    logger: false,
    exclude: ['*.min.css'],
    level: 2,
    globOptions: { basename: true }
  }, hexo.config.neat_css)

  // Javascript minifier
  hexo.config.neat_js = Object.assign({
    enable: true,
    logger: false,
    exclude: ['*.min.js'],
    compress: {},
    mangle: true,
    output: {},
    globOptions: { basename: true }
  }, hexo.config.neat_js)

  // SVG minifier
  hexo.config.neat_svg = Object.assign({
    enable: true,
    logger: false,
    include: ['*.svg', '!*.min.svg'],
    plugins: [],
    globOptions: { basename: true }
  }, hexo.config.neat_svg)

  // gzip compression
  hexo.config.neat_gzip = Object.assign({
    enable: true,
    logger: false,
    include: ['*.html', '*.css', '*.js', '*.txt', '*.ttf', '*.atom', '*.stl', '*.xml', '*.svg', '*.eot', '*.json'],
    globOptions: { basename: true }
  }, hexo.config.neat_gzip)

  // brotli compression
  hexo.config.neat_brotli = Object.assign({
    enable: true,
    logger: false,
    include: ['*.html', '*.css', '*.js', '*.txt', '*.ttf', '*.atom', '*.stl', '*.xml', '*.svg', '*.eot', '*.json'],
    globOptions: { basename: true }
  }, hexo.config.neat_brotli)

  const filter = require('./lib/filter')
  hexo.extend.filter.register('after_render:html', filter.logicHtml)
  hexo.extend.filter.register('after_render:css', filter.logicCss)
  hexo.extend.filter.register('after_render:js', filter.logicJs)
  hexo.extend.filter.register('after_generate', filter.logicSvg)
  hexo.extend.filter.register('after_generate', filter.logicGzip)
  hexo.extend.filter.register('after_generate', filter.logicBrotli)
}
