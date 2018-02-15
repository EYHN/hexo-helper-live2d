/**
 * @description Package of IO in console
 */


const colors = require('colors');

/**
 * Print log
 * @param  {...String} argvs Strings to print
 * @return {undefined}
 */
function log (...argvs) {

  console.log(`${colors.green('hexo-helper-live2d'.toUpperCase())}: ${argvs}`);

}

/**
 * Print warn
 * @param  {...String} argvs Strings to print
 * @return {undefined}
 */
function warn (...argvs) {

  console.log(`${colors.yellow('hexo-helper-live2d'.toUpperCase())}: ${argvs}`);

}

/**
 * Print error
 * @param  {...String} argvs Strings to print
 * @return {undefined}
 */
function error (...argvs) {

  console.log(`${colors.red('hexo-helper-live2d'.toUpperCase())}: ${argvs}`);

}

module.exports = {
  error,
  log,
  warn,
};
