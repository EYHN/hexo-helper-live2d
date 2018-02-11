'use strict'

const path = require('path');

module.exports = function getNodeModulePath(packageName) {
  return path.dirname(require.resolve(packageName + '/package.json'));
}