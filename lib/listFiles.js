/**
 * @description List files of provided path
 */


const fs = require('hexo-fs');
const path = require('path');

/**
 * List files in the provieded directory path
 * @param  {String} dirPath The path to the dir
 * @return {Array}          An array that contains all the file paths
 */

module.exports = function listFiles (dirPath) {

  const lsDir = fs.readdirSync(dirPath);
  const filesArr = [];
  for (const fileName of lsDir) {

    const pathName = path.join(dirPath, fileName);
    if (fs.statSync(pathName).isDirectory()) {

      filesArr.push(...listFiles(pathName));

    } else {

      filesArr.push(pathName);

    }

  }
  return filesArr;

};
