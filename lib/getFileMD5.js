'use strict'

const fs = require('hexo-fs');
const crypto = require('crypto');

module.exports = function getFileMD5(filePath) {
  const rs = fs.readFileSync(filePath),
    hash = crypto.createHash('md5');
  return (hash.update(rs).digest('hex'));
}