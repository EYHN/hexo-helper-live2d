/**
 * @description The live2d-widget generator for hexo
 */
/* global hexo */


const _ = require('lodash');
const fs = require('hexo-fs');
const path = require('path');
const url = require('url');

const buildGeneratorsFromManifest = require('./lib/buildGeneratorsFromManifest');
const getFileMD5 = require('./lib/getFileMD5');
const getNodeModulePath = require('./lib/getNodeModulePath');
const loadModelFrom = require('./lib/loadModelFrom');
const print = require('./lib/print');

const generators = [];

const manifest = require('live2d-widget/lib/manifest');
const mainfestPath = require.resolve('live2d-widget/lib/manifest');
const coreScriptName = manifest['main.js'];
const thisPkgInfo = require('./package');
const widgetVer = thisPkgInfo.dependencies['live2d-widget'];
const localWidgetVer = require(path.resolve(require.resolve('live2d-widget'), '../../', 'package')).version;

const blogRoot = hexo.config.root || '/';

const defaultConfig = {
  'enable': true,
  'log': false,
  'pluginJsPath': 'lib/',
  'pluginModelPath': 'assets/',
  'pluginRootPath': 'live2dw/',
  'scriptFrom': 'local',
  'tagMode': false,
};

// Apply options with default
let config = _.defaultsDeep({
}, hexo.config.live2d, hexo.theme.config.live2d, defaultConfig);

/**
 * Get entry point script URL according to type of source
 * @param  {String} scriptFrom The type of source
 * @return {String}            URL of entry point
 */
function getScriptURL (scriptFrom) { // eslint-disable-line max-lines-per-function

  if (config.log) {

    print.log(`hexo-helper-live2d@${thisPkgInfo.version}, using live2d-widget@${widgetVer}.`);

  }

  switch (scriptFrom) {

  case 'local': {

    /*
     * Is local(1)
     * Use local
     */
    if (config.log) {

      print.log(`use local live2d-widget@${localWidgetVer}`);

    }
    const scriptGenerators = buildGeneratorsFromManifest(manifest, path.dirname(mainfestPath), `${config.pluginRootPath}${config.pluginJsPath}`);
    const useHash = getFileMD5(path.resolve(path.dirname(mainfestPath), coreScriptName));
    generators.push(...scriptGenerators);
    return `${blogRoot}${url.resolve(`${config.pluginRootPath}${config.pluginJsPath}`, coreScriptName)}?${useHash}`;

  }
  case 'jsdelivr':

    /*
     * Is jsdelivr online CDN(2)
     * Use jsdelivr
     */
    return `https://cdn.jsdelivr.net/npm/live2d-widget@${widgetVer}/lib/${coreScriptName}`;
  case 'unpkg':

    /*
     * Is unpkg online CDN(3)
     * Use unpkg
     */
    return `https://unpkg.com/live2d-widget@${widgetVer}/lib/${coreScriptName}`;
  default:

    /*
     * Is custom(4)
     * Use custom
     */
    return scriptFrom;

  }

}

if (config.enable) {

  _.unset(config, 'enable');
  if (_.hasIn(config, 'model.use')) {

    let modelJsonUrl = null;
    let tryPath = path.resolve(hexo.base_dir, './live2d_models/', config.model.use);
    if (fs.existsSync(tryPath)) { // eslint-disable-line no-sync

      /*
       * Is in live2d_models(2)
       * LoadModelFrom
       */
      const {
        modelGenerators,
        'modelJsonUrl': pkgModelJsonUrl,
      } = loadModelFrom(tryPath, `${config.pluginRootPath}${config.pluginModelPath}`);
      modelJsonUrl = `${blogRoot}${pkgModelJsonUrl}`;
      generators.push(...modelGenerators);
      if (config.log) {

        print.log(`Loaded model from live2d_models folder(2), '${url.parse(modelJsonUrl).pathname}' from '${tryPath}'`);

      }

    } else {

      tryPath = path.resolve(hexo.base_dir, config.model.use);
      if (fs.existsSync(tryPath)) { // eslint-disable-line no-sync

        /*
         * Is in hexo base releated path(3)
         * LoadModelFrom
         */
        const {
          modelGenerators,
          'modelJsonUrl': pkgModelJsonUrl,
        } = loadModelFrom(tryPath, `${config.pluginRootPath}${config.pluginModelPath}`);
        modelJsonUrl = `${blogRoot}${pkgModelJsonUrl}`;
        generators.push(...modelGenerators);
        if (config.log) { // eslint-disable-line max-depth

          print.log(`Loaded model from hexo base releated path(3), '${url.parse(modelJsonUrl).pathname}' from '${tryPath}'`);

        }

      } else if (getNodeModulePath(config.model.use) === null) {

        /*
         * Is custom(4)
         * Use custom
         */
        modelJsonUrl = config.model.use;
        if (config.log) { // eslint-disable-line max-depth

          print.log(`Loaded Model from custom(4), at '${modelJsonUrl}'`);

        }

      } else {

        /*
         * Is npm-module(1)
         * Convert path to assets folder
         * LoadModelFrom
         */
        const packageJsonPath = path.resolve(getNodeModulePath(config.model.use), 'package.json');
        const packageJsonObj = require(packageJsonPath); // eslint-disable-line global-require
        const assetsDir = path.resolve(getNodeModulePath(config.model.use), './assets/');
        const {
          modelGenerators,
          'modelJsonUrl': pkgModelJsonUrl,
        } = loadModelFrom(assetsDir, `${config.pluginRootPath}${config.pluginModelPath}`);
        modelJsonUrl = `${blogRoot}${pkgModelJsonUrl}`;
        generators.push(...modelGenerators);
        if (config.log) { // eslint-disable-line max-depth

          print.log(`Loaded model from npm-module(1), ${packageJsonObj.name}@${packageJsonObj.version} from '${assetsDir}'`);

        }

      }

    }
    if (modelJsonUrl === null) {

      print.error('Did not found model json');

    }
    _.unset(config, 'model.use');
    config = _.set(config, 'model.jsonPath', modelJsonUrl);

  }

  const scriptUrlToInject = getScriptURL(config.scriptFrom);
  _.unset(config, 'scriptFrom');

  if (config.tagMode) {

    hexo.extend.helper.register('live2d', () => {

      if (config.log) {

        print.log('live2d tag detected, use tagMode.');

      }
      const scriptToInject = `L2Dwidget.init(${JSON.stringify(config)});`;
      const contentToInject = `<script src="${scriptUrlToInject}"></script><script>${scriptToInject}</script>`;
      return contentToInject;

    });

  } else {

    hexo.extend.helper.register('live2d', () => {

      print.warn('live2d tag detected, but won\'t be use. Make sure \'tagMode\' config is expected. See #36, #122.');

    });

  }

  /*
   * Injector borrowed form here:
   * https://github.com/Troy-Yang/hexo-lazyload-image/blob/master/lib/addscripts.js
   */
  if (!config.tagMode) {

    hexo.extend.filter.register('after_render:html', (htmlContent) => {

      const scriptToInject = `L2Dwidget.init(${JSON.stringify(config)});`;
      const contentToInject = `<script src="${scriptUrlToInject}"></script><script>${scriptToInject}</script>`;
      let newHtmlContent = htmlContent;
      if ((/([\n\r\s\t]*<\/body>)/i).test(htmlContent)) {

        const lastIndex = htmlContent.lastIndexOf('</body>');
        newHtmlContent = `${htmlContent.substring(0, lastIndex)}${contentToInject}${htmlContent.substring(lastIndex, htmlContent.length)}`; // eslint-disable-line no-magic-numbers

      }
      return newHtmlContent;

    });

  }

  hexo.extend.generator.register('live2d', () => generators);

}
