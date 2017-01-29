var fs = require('hexo-fs');
var path = require('path');

hexo.extend.helper.register('live2d', function (canvasID) {
  var moudleSrc = null
  if(arguments.length >= 2)moudleSrc = arguments[1];
  if(moudleSrc == null)moudleSrc = '/live2d/z16/z16.model.json';
  return '<script type="text/javascript" src="/live2d/script"></script>' +
    '<script type="text/javascript">' +
    'live2dStart(' + JSON.stringify(canvasID) + ',' + JSON.stringify(moudleSrc) + ');' +
    '</script>';
});

var generators = new Array();

registerDir('live2d/', path.resolve(__dirname, './z16'));
registerFile('live2d/script', path.resolve(__dirname, './dest/live2d.js'))

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

hexo.extend.generator.register('live2d', function (locals) {
  return generators;
});