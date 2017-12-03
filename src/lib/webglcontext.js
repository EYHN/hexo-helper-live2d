// Modified by xiazeyu.

/**
* @desc A basic storage of webGL context
*/


// Defined a global variable to record the current WebGL context.
var context = undefined;

/**
* @name setContext
* @desc record the current WebGL context
* @param {String} msg Message to log
* @returns {Element} webGL context being captured
*/
export function setContext(webglContext) {
  context = webglContext;
}


/**
* @name getContext
* @desc return the current WebGL context
* @param null
* @returns {Element} current webGL context
*/
export function getContext() {
  return context;
}
