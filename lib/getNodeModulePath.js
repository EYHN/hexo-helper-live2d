/**
 * @description resolve the path of provided package name
 */


'use strict'

const path = require('path');

/**
 * Resolve the package path according to provieded package name
 * @param  {String} packageName   Package need to be resolved
 * @return {String or Undefined}  if detected the package, the path; if not, undefined
 */

module.exports = function getNodeModulePath(packageName) {
  try{
    return path.dirname(require.resolve(packageName + '/package.json'));
  }catch(e){
    return undefined;
  }
}
