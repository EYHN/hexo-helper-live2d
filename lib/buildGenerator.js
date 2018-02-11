'use strict'

const fs = require('hexo-fs');

module.exports = function buildGenerator(sourcePath, distPath) {
  return {
    path: distPath,
    data: () => fs.createReadStream(sourcePath),
  };
}