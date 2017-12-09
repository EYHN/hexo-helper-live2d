/**
 *
 *  You can modify and use this source freely
 *  only for the development of application related Live2D.
 *
 *  (c) Live2D Inc. All rights reserved.
 */

/**
 * EYHN 修改
 *
 * Copyright © 2016 - 2017 EYHN
 */

// Modified by xiazeyu.

/**
* @desc A matrix stack releated to draw the model
*/

function MatrixStack() {}

MatrixStack.matrixStack = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
MatrixStack.depth = 0;
MatrixStack.currentMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
MatrixStack.tmp = new Array(16);

/**
* @name reset
* @desc reset the stack
* @param null
* @returns null
* @memberOf MatrixStack
*/
MatrixStack.reset = function(){
  this.depth = 0;
}

/**
* @name loadIdentity
* @desc reset values in the stack to whether it can be divisible by 5
* @param null
* @returns null
* @memberOf MatrixStack
*/
MatrixStack.loadIdentity = function(){
  var thisRef = this;
  for (var i = 0; i < 16; i++){
    thisRef.currentMatrix[i] = (i % 5 == 0) ? 1 : 0;
  }
}

/**
* @name push
* @desc push a new element into the stack
* @param null
* @returns null
* @memberOf MatrixStack
*/
MatrixStack.push = function(){
  var thisRef = this;
  // var offset = thisRef.depth * 16;
  var nextOffset = (thisRef.depth + 1) * 16;

  if (thisRef.matrixStack.length < nextOffset + 16){
    thisRef.matrixStack.length = nextOffset + 16;
  }

  for (var i = 0; i < 16; i++){
    thisRef.matrixStack[nextOffset + i] = thisRef.currentMatrix[i];
  }

  thisRef.depth++;
}

/**
* @name pop
* @desc pop an element from the stack
* @param null
* @returns null
* @memberOf MatrixStack
*/
MatrixStack.pop = function(){
  var thisRef = this;
  thisRef.depth--;
  if (thisRef.depth < 0){ // stack is underflow?????
    myError("Invalid matrix stack.");
    thisRef.depth = 0;
  }

  var offset = thisRef.depth * 16;
  for (var i = 0; i < 16; i++){
    thisRef.currentMatrix[i] = thisRef.matrixStack[offset + i];
  }
}

/**
* @name getMatrix
* @desc return the current matrix stack
* @param null
* @returns {Array} current matrix stack
* @memberOf MatrixStack
*/
MatrixStack.getMatrix = function(){
  return this.currentMatrix;
}

/**
* @name multMatrix
* @desc matrix multiplication, save to the currentMatrix
* @param null
* @returns null
* @memberOf MatrixStack
*/
MatrixStack.multMatrix = function(matNew)
{
  var thisRef = this;
  var i, j, k;

  for (i = 0; i < 16; i++){
    thisRef.tmp[i] = 0;
  }

  for (i = 0; i < 4; i++){
    for (j = 0; j < 4; j++){
      for (k = 0; k < 4; k++){
        thisRef.tmp[i + j * 4] += thisRef.currentMatrix[i + k * 4] * matNew[k + j * 4];
      }
    }
  }
  for (i = 0; i < 16; i++){
    thisRef.currentMatrix[i] = thisRef.tmp[i];
  }
}

module.exports = MatrixStack;
