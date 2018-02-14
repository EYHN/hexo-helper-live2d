/**
 * @description model handler from provided path and rootURL
 */


'use strict';

const buildGenerator = require('./buildGenerator');
const fs = require('hexo-fs');
const listFiles = require('./listFiles');
const path = require('path');
const url = require('url');

/**
 * @typedef {Object} PackageInfo
 * @property {Array} modelGenerators              The generator-use-array for Hexo
 * @property {String} modelJsonUrl                The model.json file path
 * @property {Object or Undefined} packageJsonObj The object of provied packageinfo(if don't have, undefined)
 * @property {Number} type                        The type of this package, see README
 */

/**
 * Resolve model packages according to provided infos
 * @param  {String}  modelPaths Search paths for the model folder
 * @param  {String}  rootUrl    The target path(need to be relative)
 * @return {PackageInfo}        The package info resolved
 */

module.exports = function loadModelFrom(modelPaths, rootUrl) {
  const packageJsonPath = path.resolve(modelPaths, 'package.json');
  let assetsDir, modelGenerators, modelJsonUrl, packageJsonObj, type;
  if(fs.existsSync(packageJsonPath)){
    type = 1;
    packageJsonObj = require(packageJsonPath);
    assetsDir = path.resolve(modelPaths, './assets/'); // convert 1 to 2/3
  }else{
    if(fs.existsSync(modelPaths)){
      type = 2.5; // 2 or 3
      assetsDir = modelPaths;
    }else{
      type = 4;
      modelJsonUrl = modelPaths; // 4 Done.
    }
  }
  if(type !== 4){
    const modelFiles = listFiles(assetsDir);
    modelGenerators = modelFiles.map(file => {
      return buildGenerator(file, url.resolve(rootUrl, path.relative(assetsDir, file)));
    });
    modelJsonUrl = modelGenerators.reduce((p, generator) => {
      if (!p && generator.path.endsWith('.model.json')) {
        return generator.path;
      } else {
        return p;
      }
    }, undefined); // 1, 2, 3 Done.
  }

  return {
    modelGenerators,
    modelJsonUrl,
    packageJsonObj,
    type,
  };
};
