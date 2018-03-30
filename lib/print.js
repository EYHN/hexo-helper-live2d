/**
 * @description Package of IO in console
 */


const colors = require('colors');
const logger = require('hexo-log')();

/**
 * Print error
 * @param  {String} content Strings to print
 * @return {undefined}
 */
function error (content) {

  logger.error(`${colors.green('hexo-helper-live2d'.toUpperCase())}: ${content}`);

}

/**
 * Print log
 * @param  {String} content Strings to print
 * @return {undefined}
 */
function log (content) {

  logger.info(`${'hexo-helper-live2d'.toUpperCase().inverse}: ${content}`);

}

/**
 * Print warn
 * @param  {String} content Strings to print
 * @return {undefined}
 */
function warn (content) {

  logger.info(`${'hexo-helper-live2d'.toUpperCase().inverse}: ${content}`);

}

module.exports = {
  error,
  log,
  warn,
};
