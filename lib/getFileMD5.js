/**
 * @description return the MD5 hash of provided file
 */


'use strict'

const fs = require('hexo-fs');
const crypto = require('crypto');

/**
 * Get file MD5 according to provieded file path
 * @param  {String} filePath File path
 * @return {String}          The MD5 hash of provided file
 */

module.exports = function getFileMD5(filePath) {
  const rs = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5');
  return (hash.update(rs).digest('hex'));
}
