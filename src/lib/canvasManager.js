// Modified by xiazeyu.

/**
* @desc A library to create and init canvas.
*/

const htmlTemplate = require('../tmplate/innerHTML.tmpl.html')

export function createCanvas(canvasID) {

}


export function initCanvas(canvasId) {
  canvas = document.getElementById(canvasId);
  if (canvas.addEventListener) {
    window.addEventListener("click", mouseEvent);
    window.addEventListener("mousedown", mouseEvent);
    window.addEventListener("mousemove", mouseEvent);
    window.addEventListener("mouseup", mouseEvent);
    document.addEventListener("mouseleave", mouseEvent);
    window.addEventListener("touchstart", touchEvent);
    window.addEventListener("touchend", touchEvent);
    window.addEventListener("touchmove", touchEvent);
  }
}
