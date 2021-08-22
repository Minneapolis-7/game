module.exports = {
  // Пути предназначены для использования с модулем `path` из Node.js
  // Пути указаны относительно свойства `base`, путь в `base` указан относительно корня
  // Нельзя использовать trailing slash (/)
  paths: {
    src: {
      base: './src',
      css: './css',
    },
    dist: {
      base: './dist',
      static: './static',
    },
    static: {
      base: './static',
      assets: './assets',
    },
  },
};
