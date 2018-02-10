/**
 * @description The live2d-widget generator for hexo
 */


'use strict'

const crypto = require('crypto'),
      fs = require('hexo-fs'),
      _ = require('lodash'),
      path = require('path'),
      UglifyJS = require("uglify-js"),
      url = require('url'),
      pkgInfo = require('./package'),
      onSiteRootPath = '/live2dw/',
      onSiteJsPath = `${onSiteRootPath}lib/`,
      onSiteModelPath = `${onSiteRootPath}assets/`,
      coreJsList = require('live2d-widget/lib/manifest'),
      coreJsName = coreJsList['main.js'],
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

function addFile(sourcePath, distPath, fileArr){
  fileArr.push({
    path: distPath,
    data: () => fs.createReadStream(sourcePath),
  });
}

function localModelProcessor(localFolder, siteDir = onSiteModelPath){
  let lsDir = fs.readdirSync(localFolder),
      modelJsonName;
  for(let item of lsDir){
    let currLocal = path.resolve(localFolder, item);
    if(fs.statSync(currLocal).isDirectory()){
      modelJsonName = modelJsonName || localModelProcessor(currLocal, url.resolve(siteDir, `${item}/`));
      // Cannot be modelJsonName || localModelProcessor,
      // because localModelProcessor must be excuted.
    }else{
      addFile(currLocal, url.resolve(siteDir, item), fileArr);
      if(item.endsWith('.model.json')){
        modelJsonName = url.resolve(siteDir, item);
      }
    }
  }
  return modelJsonName;
}


function localJsProcessor(){
  for(let f of Object.keys(coreJsList)){
    addFile(path.resolve(coreJssPath, coreJsList[f]), url.resolve(onSiteJsPath, coreJsPath[f]), fileArr);
  }
  return url.resolve(onSiteJsPath, coreJsName);
}

function getFileMD5(filePath){
  const rs = fs.readFileSync(filePath),
        hash = crypto.createHash('md5');
  return (hash.update(rs).digest('hex'));
}

function getJsPath(){
  let useHash;
  if(_.hasIn(config, 'hashLevel')){
    switch(config.hashLevel){
      case 'soft':
        useHash = `?${getFileMD5(path.resolve(coreJssPath, coreJsName))}`;
        break;
      case 'dep':
        useHash = `?${coreJsDepVer}`;
        break;
      case 'none':
        useHash = '';
        break;
      default:
        useHash = `?${getFileMD5(path.resolve(coreJssPath, coreJsName))}`;
    }
  }else{
    useHash = `?${getFileMD5(path.resolve(coreJssPath, coreJsName))}`;
  }
  if(_.hasIn(config, 'jsPath')){
    // a. have user modified config.jsPath
    switch(config.jsPath){
      case 'local':
        // a.1 is local
        // use local(1)
        return `${localJsProcessor()}${useHash}`;
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
        return `${config.jsPath}${useHash}`;
    }
    _.unset(config, 'jsPath');
  }else{
    // b. don't have user modified config.jsPath
    // use local(1)
    return `${localJsProcessor()}${useHash}`;
  }
}

function getModelJsonPath(){
  if(_.hasIn(config, 'model.use')){
    // a. have user modified config.model.use
    try{
      // a.1 is a npm-module(1)
      let tryModulePath = path.dirname(require.resolve(`${config.model.use}/package`));
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
  let scriptToInject =`
L2Dwidget.init(${JSON.stringify(config)});
`;
  let contentToInject = `<script src="${getJsPath()}"></script><script>${UglifyJS.minify(scriptToInject).code}</script>`
  if(/<\/body>/gi.test(htmlContent)){
    let lastIndex = htmlContent.lastIndexOf('</body>');
    htmlContent = `${htmlContent.substring(0, lastIndex)}${contentToInject}${htmlContent.substring(lastIndex, htmlContent.length)}`;
  }
  return htmlContent;
});

hexo.extend.generator.register('live2d', function (locals) {
  return fileArr;
});
