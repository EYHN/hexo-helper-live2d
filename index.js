/**
 * @description The live2d-widget generator for hexo
 */


'use strict'

const fs = require('hexo-fs');
const _ = require('lodash');
const path = require('path');
const url = require('url');
const colors = require('colors');

const buildGeneratorsFromManifest = require('./lib/buildGeneratorsFromManifest');
const getFileMD5 = require('./lib/getFileMD5');
const getNodeModulePath = require('./lib/getNodeModulePath');
const loadModelFrom = require('./lib/loadModelFrom');

const defaultConfig = _.merge({},
  {
    enable: false,
    scriptFrom: 'local'
  })

// using default options
let config = _.defaultsDeep({}, hexo.config.live2d, hexo.theme.config.live2d, defaultConfig);

// Check if enabled
if (!config.enable) {
  return;
}

const generators = [];

const manifest = require('live2d-widget/lib/manifest');
const mainfestPath = require.resolve('live2d-widget/lib/manifest');
const coreScriptName = manifest['main.js'];
const pkgInfo = require('./package');
const coreJsDepVer = pkgInfo.dependencies['live2d-widget'];

const onSiteRootPath = '/live2dw/';
const onSiteJsPath = `${onSiteRootPath}lib/`;
const onSiteModelPath = `${onSiteRootPath}assets/`;

let scriptURL;

switch (config.scriptFrom) {
  case 'local':
    // a.1 is local
    // use local(1)
    const scriptGenerators = buildGeneratorsFromManifest(manifest, path.dirname(mainfestPath), onSiteJsPath)
    const useHash = getFileMD5(path.resolve(path.dirname(mainfestPath), coreScriptName));
    generators.push(...scriptGenerators);
    scriptURL = `${url.resolve(onSiteJsPath, coreScriptName)}?${useHash}`;
    break;
  case 'jsdelivr':
    // a.2 is jsdelivr online CDN
    // use jsdelivr(2)
    scriptURL = `https://cdn.jsdelivr.net/npm/live2d-widget@${coreJsDepVer}/lib/${coreScriptName}`;
    break;
  case 'unpkg':
    // a.3 is unpkg online CDN
    // use unpkg(3)
    scriptURL = `https://unpkg.com/live2d-widget@${coreJsDepVer}/lib/${coreScriptName}`;
    break;
  default:
    scriptURL = config.scriptFrom;
    break;
}

if (config.model.use) {
  // try './live2d_models/%config.model.use%' or './%config.model.use%'
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
  const modelPath = modelInHexoBaseDir || getNodeModulePath(config.model.use);
  const { generators: modelGenerators, jsonUrl: modelJsonUrl, packageInfo } = loadModelFrom(modelPath, onSiteModelPath);
  generators.push(...modelGenerators);
  config = _.set(config, 'model.jsonPath', modelJsonUrl);
  if (packageInfo) {
    console.log(`${colors.green('hexo-helper-live2d'.toUpperCase())}: Load model ${packageInfo.name || config.model.use}${`@${packageInfo.version}` || ''} at '${modelPath}'`);
  }
}

/**
 * Deprecated version support
 * since 3.0
 * Don't manually add live2d tag into your site template
 */

hexo.extend.helper.register('live2d', function () {
  console.warn(`${colors.green('hexo-helper-live2d'.toUpperCase())}  live2d tag was deprecated since 3.0. See #36. PLEASE REMOVE live2d TAG IN YOUR TEMPLATE FILE.`);
});

// injector borrowed form here:
// https://github.com/Troy-Yang/hexo-lazyload-image/blob/master/lib/addscripts.js
hexo.extend.filter.register('after_render:html', function (htmlContent) {
  const scriptToInject = `L2Dwidget.init(${JSON.stringify(config)});`;
  const contentToInject = `<script src="${scriptURL}"></script><script>${scriptToInject}</script>`;
  if (/<\/body>/gi.test(htmlContent)) {
    let lastIndex = htmlContent.lastIndexOf('</body>');
    htmlContent = `${htmlContent.substring(0, lastIndex)}${contentToInject}${htmlContent.substring(lastIndex, htmlContent.length)}`;
  }
  return htmlContent;
});

hexo.extend.generator.register('live2d', function (locals) {
  return generators;
});
