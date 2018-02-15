/**
 * @description Resolve the path of provided package name
 */


const path = require('path');

/**
 * Resolve the package path according to provieded package name
 * @param  {String} packageName   Package need to be resolved
 * @return {String}  If detected the package, the path; if not, null
 */

module.exports = function getNodeModulePath (packageName) {

  try {

    return path.dirname(require.resolve(`${packageName}/package.json`));

  } catch (e) {

    return null;

  }

};
