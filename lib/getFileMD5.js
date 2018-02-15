/**
 * @description Get the MD5 hash of provided file
 */


const crypto = require('crypto');
const fs = require('hexo-fs');

/**
 * Get file MD5 according to provieded file path
 * @param  {String} filePath File path
 * @return {String}          The MD5 hash of provided file
 */

module.exports = function getFileMD5 (filePath) {

  const rs = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5');
  return hash.update(rs).digest('hex');

};
