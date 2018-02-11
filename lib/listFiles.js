'use strict'

const fs = require('hexo-fs');
const path = require('path');

module.exports = function listFiles(dir) {
  const lsDir = fs.readdirSync(dir);
  const files = [];
  for (const filename of lsDir) {
    const pathname = path.join(dir, filename);
    if (fs.statSync(pathname).isDirectory()) {
      files.push(...listFiles(pathname));
    }
    else files.push(pathname);
  }
  return files;
}