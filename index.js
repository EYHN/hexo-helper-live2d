/**
 * @description The live2d-widget generator for hexo
 */


'use strict'

const fs = require('hexo-fs'),
      path = require('path'),
      url = require('url'),
      _ = require('lodash'),
      jsOnLocalPath = '/live2d/lib/clL2D.min.js',
      clJsPath = require.resolve('live2d-widget/lib/manifest'),
      defaultConfig = require('live2d-widget/src/config/defaultConfig');

let fileArray = new Array(),
    modelJsonPath,
    jsPath,
    config = _.defaultsDeep(hexo.config.live2d, hexo.theme.config.live2d, defaultConfig);


if(_.hasIn(config, 'enable')){
  if(!config.enable){
    return;
  }
  _.unset(config, 'enable');
}

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


hexo.extend.filter.register('after_render:html', function(htmlContent){
  let launcherScript = `L2Dwidget.init(${JSON.stringify(config)});`;
  let injectExtraScript = `<script src="${jsPath}"></script><script>${launcherScript}</script>`
  if(/<\/body>/gi.test(htmlContent)){
    let lastIndex = htmlContent.lastIndexOf('</body>');
    htmlContent = htmlContent.substring(0, lastIndex) + injectExtraScript + htmlContent.substring(lastIndex, htmlContent.length);
  }
  return htmlContent;
});
/*

// 复制live2d模型文件
// 先在 博客目录/live2d_models/ 目录下寻找
fs.exists(path.resolve(hexo.base_dir, path.join('./live2d_models/', config.model)), function(exists){
  if(exists){
    registerDir("live2d/assets/", path.resolve(hexo.base_dir, path.join('./live2d_models/', config.model)));
  }else{ // 若未找到，在 插件目录/assets/ 下继续寻找
    registerDir('live2d/assets/', path.resolve(__dirname, path.join('./assets/', config.model)));
  }
});

// 复制 live2d客户端 脚本
registerFile('live2d/cLive2d.min.js', path.resolve(__dirname, './dist/cLive2d.min.js'));
*/
