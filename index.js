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
    scaling: 2,
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
      #${config.id} {
        position: fixed;
        width: ${config.width}px;
        height: ${config.height}px;
        ${config.position}: ${config.horizontalOffset}px;
        z-index: 999;
        pointer-events: none;
        bottom: ${config.verticalOffset}px;
      }
    </style>
    <script src="/live2d/device.min.js"></script>
    <script type="text/javascript">
    (function(){
    if(device.mobile()){
      ${config.mobileShow ? `
      document.getElementById("${config.id}").style.width = '${config.width * config.mobileScaling}px';
      document.getElementById("${config.id}").style.height = '${config.height * config.mobileScaling}px';
      document.write('<script type="text/javascript" src="/live2d/script.js"><\\/script>');
      document.write('<script>loadlive2d(${JSON.stringify(config.id)}, ${JSON.stringify(url.resolve("/live2d/assets/", config.model + ".model.json"))}, 0.5)<\\/script>');
      ` : ``}
    }else{
      document.write('<script type="text/javascript" src="/live2d/script.js"><\\/script>');
      document.write('<script>loadlive2d(${JSON.stringify(config.id)}, ${JSON.stringify(url.resolve("/live2d/assets/", config.model + ".model.json"))}, 0.5)<\\/script>');
    }
    })();
    </script>
`
});

fs.exists(path.resolve(hexo.base_dir, path.join('./live2d_models/', config.model)), function(exists){
  if(exists){
    registerDir("live2d/assets/", path.resolve(hexo.base_dir, path.join('./live2d_models/', config.model)));
  }else{
  registerDir('live2d/assets/', path.resolve(__dirname, path.join('./assets/', config.model)));
  }
});

registerFile('live2d/script.js', path.resolve(__dirname, './dist/bundle.js'));
registerFile('live2d/script.js.map', path.resolve(__dirname, './dist/bundle.js.map'));
registerFile('live2d/device.min.js', path.resolve(__dirname, './dist/device.min.js'));

hexo.extend.generator.register('live2d', function (locals) {
  return generators;
});

