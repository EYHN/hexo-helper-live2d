/**
 * @description Convert manifest to generator-use-array
 */


const buildGenerator = require('./buildGenerator');
const path = require('path');
const url = require('url');

/**
 * Generate generator-use-array according to provieded manifest
 * @param  {Object} manifest The object that key-value-match means a file
 * @param  {String} rootPath The root dir path to the files in the manifest
 * @param  {String} distPath The target path of files(need to be relative)
 * @return {Array}           The generator-use-object of all the files included in manifest for hexo
 */

module.exports = function buildGeneratorsFromManifest (manifest, rootPath, distPath) {

  const files = Object.keys(manifest).map((key) => path.resolve(rootPath, manifest[key]));
  return files.map((file) => buildGenerator(file, url.resolve(distPath, path.basename(file))));

};
