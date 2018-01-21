/**
 * @description The live2d-widget generator for hexo
 */


'use strict'

const fs = require('hexo-fs'),
      path = require('path'),
      url = require('url'),
      _ = require('lodash'),
      jsOnLocalPath = '/live2d/lib/clL2D.min.js',
      clJs = require.resolve('live2d-widget/lib/manifest'),
      defaultConfig = require('live2d-widget/src/config/defaultConfig');

let fileArr = new Array(),
    modelPath = null,
    modelJsonPath,
    jsPath,
    config = _.defaultsDeep(hexo.config.live2d, hexo.theme.config.live2d, defaultConfig);

// Check if enabled
if(_.hasIn(config, 'enable')){
  if(!config.enable){
    return;
  }
  _.unset(config, 'enable');
}

// Generate jsPath for injecting
if(_.hasIn(config, 'jsPath')){
  switch(config.jsPath){
    case 'local':
      jsPath = jsOnLocalPath;
      break;
    case 'jsdelivr':
      jsPath = 'https://cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/clL2D.min.js';
      break;
    case 'unpkg':
      jsPath = 'https://unpkg.com/live2d-widget@3.x/lib/clL2D.min.js';
      break;
    default:
      jsPath = config.jsPath;
  }
  _.unset(config, 'jsPath');
}else{
  jsPath = jsOnLocalPath;
}

if(_.hasIn(config, 'model.path')){
  modelPath = config.model.path;
  _.unset(config, '.path');
}


function getModelJson(pathName){
  var fileName = path.parse(pathName).name.split('.');
  if(fileName[1] === 'model'){
      modelJsonPath = pathName;
  }
}

function addFile(destPath, sourceFile){
  fileArr.push({
    path: destPath,
    data: () => fs.createReadStream(sourceFile),
  });
}

function addDir(destPath, sourceDir) {
  let lsDir = fs.readdirSync(sourceDir)
  lsDir.forEach(function (file) {
    addFile(destPath + file, path.resolve(sourceDir, file));
  }, this);
}

/**
 * Deprecated version support
 * since 3.0
 * Don't manually add live2d tag into your site template
 */

hexo.extend.helper.register('live2d', function(){
  console.warn('hexo-helper-live2d: live2d tag was deprecated since 3.0. See #36. PLEASE REMOVE live2d TAG IN YOUR TEMPLATE FILE.');
});

// Copy Live2D models
// a. no user defined config, use default config, copy nothing
if(modelPath !== null){
  // b. in /live2d_models/ folder, find modelJson, copy
  let tryPath = path.resolve(hexo.base_dir, path.join('./live2d_models/', config.model.path));
  fs.exists(tryPath, function(exists){
    if(exists){
      // copy
      // find modelJson
      // apply modelJson
    }else{
      // c. in npm_modules or built-in models, find modelJson, copy

      // find module
      // copy
      // find modelJson
      // apply modelJson

      // d. doesn't found, may be a url, apply to config, copy nothing
      //       // apply modelJson
    }
  })
}

if(jsPath === jsOnLocalPath){
  // a. local, copy clJs, apply jsOnLocalPath
  // copy clJs
  // apply jsOnLocalPath
}else{
  // b. is a CDN or url, apply jsOnLocalPath
  config.model.jsonPath = jsPath;
}

// injector borrowed form here:
// https://github.com/Troy-Yang/hexo-lazyload-image/blob/master/lib/addscripts.js
hexo.extend.filter.register('after_render:html', function(htmlContent){
  let launcherScript = `L2Dwidget.init(${JSON.stringify(config)});`;
  let injectExtraScript = `<script src="${jsPath}"></script><script>${launcherScript}</script>`
  if(/<\/body>/gi.test(htmlContent)){
    let lastIndex = htmlContent.lastIndexOf('</body>');
    htmlContent = htmlContent.substring(0, lastIndex) + injectExtraScript + htmlContent.substring(lastIndex, htmlContent.length);
  }
  return htmlContent;
});

