/**
 * @description The live2d-widget generator for hexo
 */


'use strict'

const fs = require('hexo-fs'),
      path = require('path'),
      url = require('url'),
      _ = require('lodash'),
      crypto = require('crypto'),
      UglifyJS = require("uglify-js"),
      onSiteRootPath = '/live2dw/',
      onSiteJsPath = onSiteRootPath + 'lib/',
      onSiteModelPath = onSiteRootPath + 'assets/',
      pkgInfo = require('./package'),
      coreJsName = 'L2Dwidget.min.js',
      coreJsList = require('live2d-widget/lib/manifest'),
      coreJssPath = path.dirname(require.resolve('live2d-widget/lib/manifest')),
      coreJsDepVer = pkgInfo.dependencies['live2d-widget'],
      defaultConfig = require('live2d-widget/src/config/defaultConfig');

let fileArr = new Array(),
    config = _.defaultsDeep({}, hexo.config.live2d, hexo.theme.config.live2d, defaultConfig);

// Check if enabled
if(_.hasIn(config, 'enable')){
  if(!config.enable){
    return;
  }
  _.unset(config, 'enable');
}

function addFile(sitePath, localPath){
  fileArr.push({
    path: sitePath,
    data: () => fs.createReadStream(localPath),
  });
}

/**
// Test:
1.
consts
2.
function addFile(sitePath, localPath){
  console.log({
    "site": sitePath,
    "local": localPath,
  });
}
3.
localModelProcessor
4.
let tryModulePath = path.dirname(require.resolve('live2d-widget-model-wanko' + '/package'));
let modelPath = path.resolve(tryModulePath, './assets/');
console.log(modelPath);
console.log(localModelProcessor(modelPath));
**/
function localModelProcessor(localFolder, siteDir = onSiteModelPath){
  let lsDir = fs.readdirSync(localFolder),
      modelJsonName;
  for(let item of lsDir){
    let currLocal = path.resolve(localFolder, item);
    if(fs.statSync(currLocal).isDirectory()){
      const m = localModelProcessor(currLocal, url.resolve(siteDir, item + '/'));
      modelJsonName = modelJsonName || m;
    }else{
      addFile(url.resolve(siteDir, item), currLocal);
      if(item.endsWith('.model.json')){
        modelJsonName = url.resolve(siteDir, item);
      }
    }
  }
  return modelJsonName;
}


function localJsProcessor(){
  for(let f of Object.keys(coreJsList)){
    addFile(url.resolve(onSiteJsPath, f), path.resolve(coreJssPath, coreJsList[f]));
  }
  return url.resolve(onSiteJsPath, 'main.js');
}

function getCoreJsMD5(){
  const coreJs = path.resolve(coreJssPath, coreJsName),
        rs = fs.readFileSync(coreJs),
        hash = crypto.createHash('md5');
  return (hash.update(rs).digest('hex'));
}

function getJsPath(){
  let useHash;
  if(_.hasIn(config, 'hashLevel')){
    switch(config.hashLevel){
      case 'soft':
        useHash = `?${getCoreJsMD5()}`;
        break;
      case 'dep':
        useHash = `?${coreJsDepVer}`;
        break;
      case 'none':
        useHash = '';
        break;
      default:
        useHash = `?${getCoreJsMD5()}`;
    }
  }else{
    useHash = `?${getCoreJsMD5()}`;
  }
  if(_.hasIn(config, 'jsPath')){
    // a. have user modified config.jsPath
    switch(config.jsPath){
      case 'local':
        // a.1 is local
        // use local(1)
        return localJsProcessor() + useHash;
      case 'jsdelivr':
        // a.2 is jsdelivr online CDN
        // use jsdelivr(2)
        return `https://cdn.jsdelivr.net/npm/live2d-widget@${coreJsDepVer}/lib/${coreJsName}${useHash}`;
      case 'unpkg':
        // a.3 is unpkg online CDN
        // use unpkg(3)
        return `https://unpkg.com/live2d-widget@${coreJsDepVer}/lib/${coreJsName}${useHash}`;
      default:
        // a.4 is custom url or path, etc.
        // use custom(4), let it go~
        return config.jsPath + useHash;
    }
    _.unset(config, 'jsPath');
  }else{
    // b. don't have user modified config.jsPath
    // use local(1)
    return localJsProcessor() + useHash;
  }
}

function getModelJsonPath(){
  if(_.hasIn(config, 'model.use')){
    // a. have user modified config.model.use
    try{
      // a.1 is a npm-module(1)
      let tryModulePath = path.dirname(require.resolve(config.model.use + '/package'));
      let modelPath = path.resolve(tryModulePath, './assets/');
      return localModelProcessor(modelPath);
    }catch(e){
      let tryFolderPath = path.resolve(hexo.base_dir, path.join('./live2d_models/', config.model.use));
      fs.exists(tryFolderPath, function(exists){
        if(exists){
          // a.2 founded in live2d_models/
          let modelPath = path.resolve(tryFolderPath, './assets/');
          return localModelProcessor(modelPath);
        }else{
          // a.3 is custom url or path, etc.
          // use custom(3), let it go~
          return config.model.use;
        }
      })
    }
    _.unset(config, 'model.use');
  }else{
    // b. don't have user modified config.model.use
    // use default
    return defaultConfig.model.jsonPath;
  }
}

config.model.jsonPath = getModelJsonPath();

/**
 * Deprecated version support
 * since 3.0
 * Don't manually add live2d tag into your site template
 */

hexo.extend.helper.register('live2d', function(){
  console.warn('hexo-helper-live2d: live2d tag was deprecated since 3.0. See #36. PLEASE REMOVE live2d TAG IN YOUR TEMPLATE FILE.');
});

// injector borrowed form here:
// https://github.com/Troy-Yang/hexo-lazyload-image/blob/master/lib/addscripts.js
hexo.extend.filter.register('after_render:html', function(htmlContent){
  let launcherScript =`
L2Dwidget.init(${JSON.stringify(config)});
`;
  let injectExtraScript = `<script src="${getJsPath()}"></script><script>${UglifyJS.minify(launcherScript).code}</script>`
  if(/<\/body>/gi.test(htmlContent)){
    let lastIndex = htmlContent.lastIndexOf('</body>');
    htmlContent = htmlContent.substring(0, lastIndex) + injectExtraScript + htmlContent.substring(lastIndex, htmlContent.length);
  }
  return htmlContent;
});

hexo.extend.generator.register('live2d', function (locals) {
  return fileArr;
});
