var fs = require('hexo-fs');
var path = require('path');
var url = require("url");

var generators = new Array();

function registerFile(pathname, file) {
  generators.push({
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

hexo.extend.helper.register('live2d', function (config) {
  var config = Object.assign(
    {
      model: "z16",
      width: 150,
      height: 300,
      mobileShow: "true",
      mobileWidth: 75,
      mobileHeight: 150,
      position: "right",
      horizontalOffset: 0,
      bottomOffset: -20,
      className: "live2d",
      id: "live2dcanvas",
    },
    config, 
    hexo.config.live2d
  );

  return `
    <canvas id="${config.id}" width="${config.width}" height="${config.height}" class="${config.className}"></canvas>
    <style>
      #${config.id} {
        position: fixed;
        ${config.position}: ${config.horizontalOffset}px;
        z-index: 999;
        pointer-events: none;
        bottom: ${config.bottomOffset}px;
      }
    </style>
    <script src="live2d/device.min.js"></script>
    <script type="text/javascript">
    (function(){
      if(device.mobile()){
        if(${config.mobileShow}){
          document.getElementById("${config.id}").width = ${config.mobileWidth};
          document.getElementById("${config.id}").height = ${config.mobileHeight};
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


var config = Object.assign(
  {
    model: "z16",
  },
  config, 
  hexo.config.live2d
);

registerDir('live2d/assets/', path.resolve(__dirname, path.join('./assets/', config.model)));
registerFile('live2d/script.js', path.resolve(__dirname, './dist/bundle.js'));
registerFile('live2d/device.min.js', path.resolve(__dirname, './dist/device.min.js'));

hexo.extend.generator.register('live2d', function (locals) {
  return generators;
});
