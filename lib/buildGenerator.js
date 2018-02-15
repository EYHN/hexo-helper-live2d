/**
 * @description Convert sourcePath and distPath to generator-use-object
 */


const fs = require('hexo-fs');

/**
 * Generate generator-use-object according to provieded information
 * @param  {String} sourcePath The source path of file
 * @param  {String} distPath   The target path of file(need to be relative)
 * @return {Object}            The generator-use-object for hexo
 */

module.exports = function buildGenerator (sourcePath, distPath) {

  return {
    'data': () => fs.createReadStream(sourcePath),
    'path': distPath,
  };

};
