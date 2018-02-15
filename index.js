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
const coreJsDepVer = thisPkgInfo.dependencies['live2d-widget'];

const onSiteRootPath = '/live2dw/';
const onSiteJsPath = `${onSiteRootPath}lib/`;
const onSiteModelPath = `${onSiteRootPath}assets/`;

const defaultConfig = {
  'enable': true,
  'scriptFrom': 'local',
};

// Apply options with default
let config = _.defaultsDeep({}, hexo.config.live2d, hexo.theme.config.live2d, defaultConfig);

/**
 * Get entry point script URL according to type of source
 * @param  {String} scriptFrom The type of source
 * @return {String}            URL of entry point
 */
function getScriptURL (scriptFrom) {

  switch (scriptFrom) {

  case 'local': {

    /*
     * Is local(1)
     * Use local
     */
    const scriptGenerators = buildGeneratorsFromManifest(manifest, path.dirname(mainfestPath), onSiteJsPath);
    const useHash = getFileMD5(path.resolve(path.dirname(mainfestPath), coreScriptName));
    generators.push(...scriptGenerators);
    return `${url.resolve(onSiteJsPath, coreScriptName)}?${useHash}`;

  }
  case 'jsdelivr':

    /*
     * Is jsdelivr online CDN(2)
     * Use jsdelivr
     */
    return `https://cdn.jsdelivr.net/npm/live2d-widget@${coreJsDepVer}/lib/${coreScriptName}`;
  case 'unpkg':

    /*
     * Is unpkg online CDN(3)
     * Use unpkg
     */
    return `https://unpkg.com/live2d-widget@${coreJsDepVer}/lib/${coreScriptName}`;
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
    if (fs.existsSync(tryPath)) {

      /*
       * Is in live2d_models(2)
       * LoadModelFrom
       */
      const {
        modelGenerators,
        'modelJsonUrl': pkgModelJsonUrl,
      } = loadModelFrom(tryPath, onSiteModelPath);
      modelJsonUrl = pkgModelJsonUrl;
      generators.push(...modelGenerators);
      print.log(`Loaded model from live2d_models folder(2), '${url.parse(modelJsonUrl).pathname}' from '${tryPath}'`);

    } else {

      tryPath = path.resolve(hexo.base_dir, config.model.use);
      if (fs.existsSync(tryPath)) {

        /*
         * Is in hexo base releated path(3)
         * LoadModelFrom
         */
        const {
          modelGenerators,
          'modelJsonUrl': pkgModelJsonUrl,
        } = loadModelFrom(tryPath, onSiteModelPath);
        modelJsonUrl = pkgModelJsonUrl;
        generators.push(...modelGenerators);
        print.log(`Loaded model from hexo base releated path(3), '${url.parse(modelJsonUrl).pathname}' from '${tryPath}'`);

      } else if (getNodeModulePath(config.model.use) === null) {

        /*
         * Is custom(4)
         * Use custom
         */
        modelJsonUrl = config.model.use;
        print.log(`Loaded Model from custom(4), at '${modelJsonUrl}'`);

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
        } = loadModelFrom(assetsDir, onSiteModelPath);
        modelJsonUrl = pkgModelJsonUrl;
        generators.push(...modelGenerators);
        print.log(`Loaded model from npm-module(1), ${packageJsonObj.name}@${packageJsonObj.version} from '${assetsDir}'`);

      }

    }
    if (modelJsonUrl === null) {

      print.error('Did not found model json');

    }
    _.unset(config, 'model.use');
    config = _.set(config, 'model.jsonPath', modelJsonUrl);

  }

  /**
   * Deprecated version support
   * since 3.0
   * Don't manually add live2d tag into your site template
   */

  hexo.extend.helper.register('live2d', () => {

    print.warn('live2d tag was deprecated since 3.0. See #36. PLEASE REMOVE live2d TAG IN YOUR TEMPLATE FILE.');

  });

  const scriptUrlToInject = getScriptURL(config.scriptFrom);
  _.unset(config, 'scriptFrom');

  /*
   * Injector borrowed form here:
   * https://github.com/Troy-Yang/hexo-lazyload-image/blob/master/lib/addscripts.js
   */
  hexo.extend.filter.register('after_render:html', (htmlContent) => {

    const scriptToInject = `L2Dwidget.init(${JSON.stringify(config)});`;
    const contentToInject = `<script src="${scriptUrlToInject}"></script><script>${scriptToInject}</script>`;
    let newHtmlContent = htmlContent;
    if (/<\/body>/gi.test(htmlContent)) {

      const lastIndex = htmlContent.lastIndexOf('</body>');
      newHtmlContent = `${htmlContent.substring(0, lastIndex)}${contentToInject}${htmlContent.substring(lastIndex, htmlContent.length)}`;

    }
    return newHtmlContent;

  });

  hexo.extend.generator.register('live2d', () => generators);

}
