const path = require('path');
'use strict'

const url = require('url');
const fs = require('fs');
const buildGenerator = require('./buildGenerator');
const listFiles = require('./listFiles');

module.exports = function loadModelFrom(modelPath, modelrootUrl) {
  const packageFile = path.resolve(modelPath, 'package.json');
  const packageInfo = fs.existsSync(packageFile) && require(packageFile);
  const assetsDir = path.resolve(modelPath, './assets/');
  const modelFiles = listFiles(assetsDir);
  const modelGenerators = modelFiles.map(file => {
    return buildGenerator(file, url.resolve(modelrootUrl, path.relative(assetsDir, file)))
  });
  // find the model.json from model files
  const modelJsonUrl = modelGenerators.reduce((p, generator) => {
    if (!p && generator.path.endsWith('.model.json')) {
      return generator.path;
    } else {
      return p;
    }
  }, undefined);
  return {
    generators: modelGenerators,
    jsonUrl: modelJsonUrl,
    packageInfo
  }
}