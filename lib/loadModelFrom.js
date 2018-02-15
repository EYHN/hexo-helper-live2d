/**
 * @description model handler from provided path and rootURL
 */


const buildGenerator = require('./buildGenerator');
const listFiles = require('./listFiles');
const path = require('path');
const url = require('url');

/**
 * @typedef {Object} ModelPackageInfo
 * @property {Array} modelGenerators   The generator-use-array for Hexo
 * @property {String} modelJsonUrl     The model.json file path, null if not found
 */

/**
 * Resolve model packages according to provided infos
 * @param  {String}  assetsDir  The path of model
 * @param  {String}  rootUrl    The target path(need to be relative)
 * @return {ModelPackageInfo}   The package info resolved
 */

module.exports = function loadModelFrom (assetsDir, rootUrl) {

  const modelFiles = listFiles(assetsDir);
  const modelGenerators = modelFiles.map((file) => buildGenerator(file, url.resolve(rootUrl, path.relative(assetsDir, file))));
  const modelJsonUrl = modelGenerators.reduce((p, generator) => {

    if (!p && generator.path.endsWith('.model.json')) {

      return generator.path;

    }
    return p;

  }, null);

  return {
    modelGenerators,
    modelJsonUrl,
  };

};
