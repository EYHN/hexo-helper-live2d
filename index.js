var fs = require('hexo-fs');
var path = require('path');
var url = require("url");


function registerFile(pathname, file) {
  generators.push( {
    path: pathname,
    data: function () {
      return fs.createReadStream(file)
    }
  });
}

function registerDir(pathname, dir) {
  var lsDir = fs.listDirSync(dir)
  lsDir.forEach(function (file) {
    registerFile(pathname + file, path.resolve(dir, file));
  }, this);
}


var generators = new Array();
var config = Object.assign( {
    model: "z16",
    width: 150,
    height: 300,
    scaling: 1,
    opacityDefault: 1,
    opacityHover: 1,
    mobileShow: "true",
    mobileScaling: 0.5,
    position: "right",
    horizontalOffset: 0,
    verticalOffset: -20,
    className: "live2d",
    id: "live2dcanvas",
    deviceJsSource: "local"
  },
  hexo.config.live2d,
  hexo.theme.config.live2d
);

hexo.extend.helper.register('live2d', function() {
  return `
<div id="hexo-helper-live2d">
  <canvas id="${config.id}" width="${config.width * config.scaling}" height="${config.height * config.scaling}" class="${config.className}"></canvas>
</div>
<style>
  #${config.id}{
    position: fixed;
    width: ${config.width}px;
    height: ${config.height}px;
    opacity:${config.opacityDefault};
    ${config.position}: ${config.horizontalOffset}px;
    z-index: 999;
    pointer-events: none;
    bottom: ${config.verticalOffset}px;
  }
</style>
<script type="text/javascript" src="${config.deviceJsSource == "local" ? `/live2d/device.min.js`: (config.deviceJsSource == "official" ? `https://unpkg.com/current-device/umd/current-device.min.js` : config.deviceJsSource)}"></script>
<script type="text/javascript">
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(typeof(callback) != "undefined"){
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}
(function(){
  if(typeof(device) != 'undefined'){
    if(device.mobile()){
      ${config.mobileShow ? `document.getElementById("${config.id}").style.width = '${config.width * config.mobileScaling}px';
      document.getElementById("${config.id}").style.height = '${config.height * config.mobileScaling}px';
      loadScript("/live2d/script.js", function(){
        loadlive2d(${JSON.stringify(config.id)}, ${JSON.stringify(url.resolve("/live2d/assets/", config.model + ".model.json"))}, 0.5);
      });` : ``}
    }else{
      loadScript("/live2d/script.js", function(){
        loadlive2d(${JSON.stringify(config.id)}, ${JSON.stringify(url.resolve("/live2d/assets/", config.model + ".model.json"))}, 0.5);
      });
    }
  }else{
    console.error('Cannot find current-device script.');
    loadScript("/live2d/script.js", function(){
      loadlive2d(${JSON.stringify(config.id)}, ${JSON.stringify(url.resolve("/live2d/assets/", config.model + ".model.json"))}, 0.5);
    });
  }
})();
</script>
`
});

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
registerFile('live2d/script.js', path.resolve(__dirname, './dist/bundle.js'));

// 复制 device.js 脚本
fs.exists(path.resolve(__dirname, './dist/device.min.js'), function(exists){
  if(exists){
    registerFile('live2d/device.min.js', path.resolve(__dirname, './dist/device.min.js'));
  }else{
    console.log("Live2d serverJs: can't find device.js, contant the author for support.");
    return ;
  }
});

hexo.extend.generator.register('live2d', function (locals) {
  return generators;
});
