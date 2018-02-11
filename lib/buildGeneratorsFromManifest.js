'use strict'

const path = require('path');
const url = require('url');
const buildGenerator = require('./buildGenerator');

module.exports = function buildGeneratorsFromManifest(manifest, dirname, distPath) {
  const files = Object.keys(manifest).map(key => path.resolve(dirname, manifest[key]));
  return files.map((file) => {
    return buildGenerator(file, url.resolve(distPath, path.basename(file)))
  });
}