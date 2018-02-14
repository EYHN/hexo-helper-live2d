/**
 * @description The live2d-widget generator for hexo
 */
/*global hexo*/

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

// Apply options with default
let config = _.defaultsDeep({}, hexo.config.live2d, hexo.theme.config.live2d, defaultConfig);


function getScriptURL (scriptFrom) {
  switch (scriptFrom) {
  case 'local': {
    // Is local
    // Use local(1)
    const scriptGenerators = buildGeneratorsFromManifest(manifest, path.dirname(mainfestPath), onSiteJsPath);
    const useHash = getFileMD5(path.resolve(path.dirname(mainfestPath), coreScriptName));
    generators.push(...scriptGenerators);
    return `${url.resolve(onSiteJsPath, coreScriptName)}?${useHash}`;
  }
  case 'jsdelivr':
    // Is jsdelivr online CDN
    // Use jsdelivr(2)
    return `https://cdn.jsdelivr.net/npm/live2d-widget@${coreJsDepVer}/lib/${coreScriptName}`;
  case 'unpkg':
    // Is unpkg online CDN
    // Use unpkg(3)
    return `https://unpkg.com/live2d-widget@${coreJsDepVer}/lib/${coreScriptName}`;
  default:
    // Is custom
    // Use custom(4)
    return scriptFrom;
  }
}

if (config.enable) {
  _.unset(config, 'enable');
  if (config.model.use) {
    let modelPath;
    let type;
    const modelInHexoBaseDir = [
      path.resolve(hexo.base_dir, './live2d_models/', config.model.use),
      path.resolve(hexo.base_dir, config.model.use),
    ]
      .reduce((p, value, index) => {
        if (!p && fs.existsSync(value)) {
          type = index + 2;
          return value;
        }
        return p;
      }, undefined);
    if(type === undefined) {
      if(getNodeModulePath(config.model.use) !== '') {
        type = 1;
        modelPath = getNodeModulePath(config.model.use);
      }else{
        type = 4;
        modelPath = config.model.use;
      }
    }else{
      modelPath = modelInHexoBaseDir;
    }
    const {
      modelGenerators,
      modelJsonUrl,
      packageJsonObj,
    } = loadModelFrom(modelPath, onSiteModelPath, type);
    generators.push(...modelGenerators);
    config = _.set(config, 'model.jsonPath', modelJsonUrl);
    switch(type) {
    case 1:
      console.log(`${colors.green('hexo-helper-live2d'.toUpperCase())}: Loaded model from npm-module(1), ${packageJsonObj.name}@${packageJsonObj.version} from '${modelPath}'`);
      break;
    case 2:
      console.log(`${colors.green('hexo-helper-live2d'.toUpperCase())}: Loaded model from live2d_models folder(2), '${url.pathname(modelJsonUrl)}' from '${modelPath}'`);
      break;
    case 3:
      console.log(`${colors.green('hexo-helper-live2d'.toUpperCase())}: Loaded model from hexo base folder(3), '${url.pathname(modelJsonUrl)}' from '${modelPath}'`);
      break;
    case 4:
      console.log(`${colors.green('hexo-helper-live2d'.toUpperCase())}: Loaded Model from online(4), at '${modelJsonUrl}'`);
      break;
    // No default
    }
  }

  /**
   * Deprecated version support
   * since 3.0
   * Don't manually add live2d tag into your site template
   */

  hexo.extend.helper.register('live2d', function deprecatedWarning () {
    console.warn(`${colors.green('hexo-helper-live2d'.toUpperCase())}: live2d tag was deprecated since 3.0. See #36. PLEASE REMOVE live2d TAG IN YOUR TEMPLATE FILE.`);
  });

  // Injector borrowed form here:
  // https://github.com/Troy-Yang/hexo-lazyload-image/blob/master/lib/addscripts.js
  hexo.extend.filter.register('after_render:html', function HTMLInjector (htmlContent) {
    const scriptFrom = config.scriptFrom;
    _.unset(config, 'scriptFrom');
    const scriptToInject = `L2Dwidget.init(${JSON.stringify(config)});`;
    const contentToInject = `<script src="${getScriptURL(scriptFrom)}"></script><script>${scriptToInject}</script>`;
    if (/<\/body>/gi.test(htmlContent)) {
      const lastIndex = htmlContent.lastIndexOf('</body>');
      htmlContent = `${htmlContent.substring(0, lastIndex)}${contentToInject}${htmlContent.substring(lastIndex, htmlContent.length)}`;
    }
    return htmlContent;
  });

  hexo.extend.generator.register('live2d', function fileGenerator () {
    return generators;
  });
}
