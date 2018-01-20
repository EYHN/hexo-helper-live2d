/**
 * @description The live2d-widget generator for hexo
 */


'use strict'

const fs = require('hexo-fs');
const path = require('path');
const url = require('url');
const defaultConfig = require('live2d-widget/src/config/defaultConfig');

let generators = new Array();
let modelJsonPath;
let config = Object.assign({
    model: "z16",
    width: 150,
    height: 300,
    scaling: 1,
    opacityDefault: 0.7,
    opacityHover: 1,
    mobileShow: "true",
    mobileScaling: 0.5,
    position: "right",
    horizontalOffset: 0,
    verticalOffset: -20,
    id: "live2dcanvas",
    deviceJsSource: "local",
  },
  hexo.config.live2d,
  hexo.theme.config.live2d,
);

if(!hexo.config.live2d.enable){
  return;
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
 * Old version support
 */

hexo.extend.helper.register('live2d', function(){
  console.warn('hexo-helper-live2d: live2d tag was deprecated since 3.0. See #36. PLEASE REMOVE live2d TAG IN YOUR TEMPLATE FILE.');
});

hexo.extend.filter.register('after_render:html', require('./lib/addScripts').addScript);


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

