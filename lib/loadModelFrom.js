/**
 * @description model handler from provided path and rootURL
 */


const buildGenerator = require('./buildGenerator');
const listFiles = require('./listFiles');
const path = require('path');
const url = require('url');

/**
 * @typedef {Object} PackageInfo
 * @property {Array} modelGenerators              The generator-use-array for Hexo
 * @property {String} modelJsonUrl                The model.json file path
 * @property {Object or Undefined} packageJsonObj The object of provied packageinfo(if don't have, undefined)
 */

/**
 * Resolve model packages according to provided infos
 * @param  {String}  modelPaths Search paths for the model folder
 * @param  {String}  rootUrl    The target path(need to be relative)
 * @return {PackageInfo}        The package info resolved
 */

module.exports = function loadModelFrom (modelPaths, rootUrl, type) {
  const packageJsonPath = path.resolve(modelPaths, 'package.json');
  let assetsDir;
  let modelGenerators;
  let modelJsonUrl;
  let packageJsonObj;
  if(type === 1) {
    packageJsonObj = require(packageJsonPath); // eslint-disable-line
    assetsDir = path.resolve(modelPaths, './assets/'); // Convert 1 to 2.5
  }else if(type === 4) {
    modelJsonUrl = modelPaths;
  }else{
    assetsDir = modelPaths;
  }
  if(type !== 4) {
    const modelFiles = listFiles(assetsDir);
    modelGenerators = modelFiles.map((file) =>
      buildGenerator(file, url.resolve(rootUrl, path.relative(assetsDir, file))));
    modelJsonUrl = modelGenerators.reduce((p, generator) => {
      if (!p && generator.path.endsWith('.model.json')) {
        return generator.path;
      }
      return p;
    }, undefined); // 1, 2, 3 Done.
  }

  return {
    modelGenerators,
    modelJsonUrl,
    packageJsonObj,
  };
};
