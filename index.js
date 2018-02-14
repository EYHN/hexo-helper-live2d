/**
 * @description The live2d-widget generator for hexo
 */
/*global hexo*/

'use strict';

const _ = require('lodash');
const colors = require('colors');
const fs = require('hexo-fs');
const path = require('path');
const url = require('url');

const buildGeneratorsFromManifest = require('./lib/buildGeneratorsFromManifest');
const getFileMD5 = require('./lib/getFileMD5');
const getNodeModulePath = require('./lib/getNodeModulePath');
const loadModelFrom = require('./lib/loadModelFrom');

const generators = [];

const manifest = require('live2d-widget/lib/manifest');
const mainfestPath = require.resolve('live2d-widget/lib/manifest');
const coreScriptName = manifest['main.js'];
const thisPkgInfo = require('./package');
const coreJsDepVer = thisPkgInfo.dependencies['live2d-widget'];

const onSiteRootPath = '/live2dw/';
const onSiteJsPath = `${onSiteRootPath}lib/`;
const onSiteModelPath = `${onSiteRootPath}assets/`;

const defaultConfig = _.merge({},
  {
    enable: true,
    scriptFrom: 'local',
  });

// apply options with default
let config = _.defaultsDeep({}, hexo.config.live2d, hexo.theme.config.live2d, defaultConfig);


function getScriptURL(scriptFrom) {
  switch (scriptFrom) {
  case 'local':{
    // a.1 is local
    // use local(1)
    const scriptGenerators = buildGeneratorsFromManifest(manifest, path.dirname(mainfestPath), onSiteJsPath);
    const useHash = getFileMD5(path.resolve(path.dirname(mainfestPath), coreScriptName));
    generators.push(...scriptGenerators);
    return `${url.resolve(onSiteJsPath, coreScriptName)}?${useHash}`;
  }
  case 'jsdelivr':
    // a.2 is jsdelivr online CDN
    // use jsdelivr(2)
    return `https://cdn.jsdelivr.net/npm/live2d-widget@${coreJsDepVer}/lib/${coreScriptName}`;
  case 'unpkg':
    // a.3 is unpkg online CDN
    // use unpkg(3)
    return `https://unpkg.com/live2d-widget@${coreJsDepVer}/lib/${coreScriptName}`;
  default:
    // a.4 is custom
    // use custom(4)
    return scriptFrom;
  }
}

if (config.enable) {
  _.unset(config, 'enable');
  if (config.model.use) {
    const modelInHexoBaseDir = [
      path.resolve(hexo.base_dir, './live2d_models/', config.model.use),
      path.resolve(hexo.base_dir, config.model.use),
    ]
      .reduce((p, path) => {
        if (!p && fs.existsSync(path))
          return path;
        else
          return p;
      }, undefined);
    const modelPaths = modelInHexoBaseDir || getNodeModulePath(config.model.use) || config.model.use; // Search paths
    const { modelGenerators, modelJsonUrl, packageJsonObj, type } = loadModelFrom(modelPaths, onSiteModelPath);
    generators.push(...modelGenerators);
    config = _.set(config, 'model.jsonPath', modelJsonUrl);
    switch(type){
    case 1:
      console.log(`${colors.green('hexo-helper-live2d'.toUpperCase())}: Loaded model from npm-module(1), ${packageJsonObj.name}@${packageJsonObj.version} from '${modelPaths}'`);
      break;
    case 2.5:
      console.log(`${colors.green('hexo-helper-live2d'.toUpperCase())}: Loaded model from folder(2/3), '${url.pathname(modelJsonUrl)}' from '${modelPaths}'`);
      break;
    case 4:
      console.log(`${colors.green('hexo-helper-live2d'.toUpperCase())}: Loaded Model from online(4), at '${modelJsonUrl}'`);
      break;
    }
  }

  /**
   * Deprecated version support
   * since 3.0
   * Don't manually add live2d tag into your site template
   */

  hexo.extend.helper.register('live2d', function () {
    console.warn(`${colors.green('hexo-helper-live2d'.toUpperCase())}: live2d tag was deprecated since 3.0. See #36. PLEASE REMOVE live2d TAG IN YOUR TEMPLATE FILE.`);
  });

  // injector borrowed form here:
  // https://github.com/Troy-Yang/hexo-lazyload-image/blob/master/lib/addscripts.js
  hexo.extend.filter.register('after_render:html', function (htmlContent) {
    const scriptFrom = config.scriptFrom;
    _.unset(config, 'scriptFrom');
    const scriptToInject = `L2Dwidget.init(${JSON.stringify(config)});`;
    const contentToInject = `<script src="${getScriptURL(scriptFrom)}"></script><script>${scriptToInject}</script>`;
    if (/<\/body>/gi.test(htmlContent)) {
      let lastIndex = htmlContent.lastIndexOf('</body>');
      htmlContent = `${htmlContent.substring(0, lastIndex)}${contentToInject}${htmlContent.substring(lastIndex, htmlContent.length)}`;
    }
    return htmlContent;
  });

  hexo.extend.generator.register('live2d', function () {
    return generators;
  });
}
