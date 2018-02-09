/**
 * @description The live2d-widget generator for hexo
 */


'use strict'

const fs = require('hexo-fs'),
      path = require('path'),
      url = require('url'),
      _ = require('lodash'),
      onSiteRootPath = '/live2dw/'
      onSiteJsPath = onSiteRootPath + 'lib/',
      onSiteModelPath = onSiteRootPath + 'assets/',
      pkgInfo = require('./package'),
      coreJsName = 'L2Dwidget.min.js',
      coreJsList = require('live2d-widget/lib/manifest'),
      coreJsPath = path.dirname(require.resolve('live2d-widget/lib/manifest')),
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

function addFile(destPath, sourceFile){
  fileArr.push({
    path: destPath,
    data: () => fs.createReadStream(sourceFile),
  });
}
/**
function addFile(destPath, sourceFile){
  console.log({
    "dest": destPath,
    "sour": sourceFile,
  });
}
**/

function process_modelFileIsOnLocal(where, from = onSiteModelPath) {
  if(fs.statSync(where).isDirectory()){
    let lsDir = fs.readdirSync(where),
        modelJsonName;
    for(let item of lsDir){
        modelJsonName = modelJsonName || process_modelFileIsOnLocal(path.resolve(where, item), url.resolve(from, item + (fs.statSync(where).isDirectory() ? '/' : '')));
    }
    return modelJsonName;
  }else{
    addFile(url.resolve(from, path.basename(where)), where);
    let fileName = path.basename(where);
    if(fileName.split('.')[1] === 'model'){
      return fileName;
    }
  }
}

function process_jsPathIsLocal(){
  for(let f of Object.keys(coreJsList)){
    addFile(url.resolve(onSiteJsPath, coreJsList[f]), path.resolve(coreJsPath, coreJsList[f]));
  }
  return url.resolve(onSiteJsPath, coreJsName);
}

function getJsPath(){
  if(_.hasIn(config, 'jsPath')){
    // a. have user modified config.jsPath
    switch(config.jsPath){
      case 'local':
        // a.1 is local
        // use local(1)
        return process_jsPathIsLocal();
      case 'jsdelivr':
        // a.2 is jsdelivr online CDN
        // use jsdelivr(2)
        return `https://cdn.jsdelivr.net/npm/live2d-widget@${coreJsDepVer}/lib/${coreJsName}`;
      case 'unpkg':
        // a.3 is unpkg online CDN
        // use unpkg(3)
        return `https://unpkg.com/live2d-widget@${coreJsDepVer}/lib/${coreJsName}`;
      default:
        // a.4 is custom url or path, etc.
        // use custom(4), let it go~
        return config.jsPath;
    }
    _.unset(config, 'jsPath');
  }else{
    // b. don't have user modified config.jsPath
    // use local(1)
    return process_jsPathIsLocal();
  }
}

function getModelJsonPath(){
  // Unset model.jsonPath
  if(_.hasIn(config, 'model.jsonPath')){
    _.unset(config, 'model.jsonPath');
  }

  // Process config.model.use
  if(_.hasIn(config, 'model.use')){
    // a. have user modified config.model.use
    try{
      // a.1 is a npm-module(1)
      let tryModulePath = path.dirname(require.resolve(config.model.use + '/package'));
      let modelPath = path.resolve(tryModulePath, './assets/');
      return process_modelFileIsOnLocal(modelPath);
    }catch(e){
      let tryFolderPath = path.resolve(hexo.base_dir, path.join('./live2d_models/', config.model.use));
      fs.exists(tryFolderPath, function(exists){
        if(exists){
          // a.2 founded in live2d_models/
          let modelPath = path.resolve(tryFolderPath, './assets/');
          return process_modelFileIsOnLocal(modelPath);
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
  let launcherScript = `L2Dwidget.init(${JSON.stringify(config)});`;
  let injectExtraScript = `<script src="${getJsPath()}"></script><script>${launcherScript}</script>`
  if(/<\/body>/gi.test(htmlContent)){
    let lastIndex = htmlContent.lastIndexOf('</body>');
    htmlContent = htmlContent.substring(0, lastIndex) + injectExtraScript + htmlContent.substring(lastIndex, htmlContent.length);
  }
  return htmlContent;
});

hexo.extend.generator.register('live2d', function (locals) {
  return fileArr;
});
