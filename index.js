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
      	-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
        position: fixed;
        width: ${config.width}px;
        height: ${config.height}px;
        opacity:${config.opacityDefault};
        ${config.opacityDefault != config.opacityHover ? `transition:opacity 0.95s ease-out;
		-moz-transition:opacity 0.95s ease-out; /* Firefox 4 */
		-webkit-transition:opacity 0.95s ease-out; /* Safari and Chrome */
		-o-transition:opacity 0.95s ease-out; /* Opera */`: ``}
        ${config.position}: ${config.horizontalOffset}px;
        z-index: 999;
        pointer-events: none;
        bottom: ${config.verticalOffset}px;
      }
	  ${config.opacityDefault != config.opacityHover ? `#${config.id}:hover{
		opacity:${config.opacityHover};
      }`: ``}
    </style>
    <script src="/live2d/device.min.js"></script>
    <script type="text/javascript">
    (function(){
	  if(typeof(device) != "undefined"){
        if(device.mobile()){
          ${config.mobileShow ? `document.getElementById("${config.id}").style.width = '${config.width * config.mobileScaling}px';
          document.getElementById("${config.id}").style.height = '${config.height * config.mobileScaling}px';
          document.write('<script type="text/javascript" src="/live2d/script.js"><\\/script>');
          document.write('<script>loadlive2d(${JSON.stringify(config.id)}, ${JSON.stringify(url.resolve("/live2d/assets/", config.model + ".model.json"))}, 0.5)<\\/script>');` : ``}
        }else{
          document.write('<script type="text/javascript" src="/live2d/script.js"><\\/script>');
          document.write('<script>loadlive2d(${JSON.stringify(config.id)}, ${JSON.stringify(url.resolve("/live2d/assets/", config.model + ".model.json"))}, 0.5)<\\/script>');
        }
	  }else{
        document.write('<script type="text/javascript" src="/live2d/script.js"><\\/script>');
        document.write('<script>loadlive2d(${JSON.stringify(config.id)}, ${JSON.stringify(url.resolve("/live2d/assets/", config.model + ".model.json"))}, 0.5)<\\/script>');    
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

