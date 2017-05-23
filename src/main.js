import "./lib/live2d.min";

import { L2DTargetPoint, L2DViewMatrix, L2DMatrix44 } from "./lib/Live2DFramework";

import LAppLive2DManager from "./LAppLive2DManager"

import LAppDefine from "./LAppDefine"

import MatrixStack from "./lib/MatrixStack"

import {setContext} from "./webglcontext"

// window.onerror = function (msg, url, line, col, error) {
//   let errmsg = "file:" + url + "<br>line:" + line + " " + msg;
//   console.error(errmsg);
// }

const platform = window.navigator.platform.toLowerCase();

const live2DMgr = new LAppLive2DManager();

let isDrawStart = false;

let gl = null;

let canvas = null;

let dragMgr = null;

let viewMatrix = null;

let projMatrix = null;

let deviceToScreen = null;

let drag = false;

let oldLen = 0;

let lastMouseX = 0;

let lastMouseY = 0;

let isModelShown = 0;

let modelurl = "";

function initL2dCanvas(canvasId) {
  canvas = document.getElementById(canvasId);
  if (canvas.addEventListener) {
    //canvas.addEventListener("mousewheel", mouseEvent);
    window.addEventListener("click", mouseEvent);
    window.addEventListener("mousedown", mouseEvent);
    window.addEventListener("mousemove", mouseEvent);
    window.addEventListener("mouseup", mouseEvent);
    document.addEventListener("mouseleave", mouseEvent);
    //canvas.addEventListener("contextmenu", mouseEvent);
    window.addEventListener("touchstart", touchEvent);
    window.addEventListener("touchend", touchEvent);
    window.addEventListener("touchmove", touchEvent);
  }
}

function init(modelurl) {
  let width = canvas.width;
  let height = canvas.height;

  dragMgr = new L2DTargetPoint();

  let ratio = height / width;
  let left = LAppDefine.VIEW_LOGICAL_LEFT;
  let right = LAppDefine.VIEW_LOGICAL_RIGHT;
  let bottom = -ratio;
  let top = ratio;

  viewMatrix = new L2DViewMatrix();


  viewMatrix.setScreenRect(left, right, bottom, top);

  viewMatrix.setMaxScreenRect(LAppDefine.VIEW_LOGICAL_MAX_LEFT,
    LAppDefine.VIEW_LOGICAL_MAX_RIGHT,
    LAppDefine.VIEW_LOGICAL_MAX_BOTTOM,
    LAppDefine.VIEW_LOGICAL_MAX_TOP);

  viewMatrix.setMaxScale(LAppDefine.VIEW_MAX_SCALE);
  viewMatrix.setMinScale(LAppDefine.VIEW_MIN_SCALE);

  projMatrix = new L2DMatrix44();
  projMatrix.multScale(1, (width / height));

  deviceToScreen = new L2DMatrix44();
  deviceToScreen.multTranslate(-width / 2.0, -height / 2.0);
  deviceToScreen.multScale(2 / width, -2 / width);

  gl = getWebGLContext();
  setContext(gl);
  if (!gl) {
    console.error("Failed to create WebGL context.");
    return;
  }
  window.Live2D.setGL(gl);
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  changeModel(modelurl);
  startDraw();
}

function startDraw() {
  if (!isDrawStart) {
    isDrawStart = true;
    (function tick() {
      draw();
      let requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

      requestAnimationFrame(tick, canvas);
    })();
  }
}

function draw()
{
    MatrixStack.reset();
    MatrixStack.loadIdentity();
    dragMgr.update(); 
    live2DMgr.setDrag(dragMgr.getX(), dragMgr.getY());
    
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    MatrixStack.multMatrix(projMatrix.getArray());
    MatrixStack.multMatrix(viewMatrix.getArray());
    MatrixStack.push();
    
    for (let i = 0; i < live2DMgr.numModels(); i++)
    {
        let model = live2DMgr.getModel(i);

        if(model == null) return;
        
        if (model.initialized && !model.updating)
        {
            model.update();
            model.draw(gl);
        }
    }
    MatrixStack.pop();
}

function changeModel(modelurl)
{
    live2DMgr.reloadFlg = true;
    live2DMgr.count++;
    live2DMgr.changeModel(gl,modelurl);
}

function modelScaling(scale)
{
    let isMaxScale = viewMatrix.isMaxScale();
    let isMinScale = viewMatrix.isMinScale();
    
    viewMatrix.adjustScale(0, 0, scale);

    if (!isMaxScale)
    {
        if (viewMatrix.isMaxScale())
        {
            live2DMgr.maxScaleEvent();
        }
    }
    
    if (!isMinScale)
    {
        if (viewMatrix.isMinScale())
        {
            live2DMgr.minScaleEvent();
        }
    }
}

function modelTurnHead(event)
{
    drag = true;
    
    let rect = canvas.getBoundingClientRect();
    
    let sx = transformScreenX(event.clientX - rect.left);
    let sy = transformScreenY(event.clientY - rect.top);
    let vx = transformViewX(event.clientX - rect.left);
    let vy = transformViewY(event.clientY - rect.top);
    
    if (LAppDefine.DEBUG_MOUSE_LOG)
        console.log("onMouseDown device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    lastMouseX = sx;
    lastMouseY = sy;

    dragMgr.setPoint(vx, vy); 
    
    live2DMgr.tapEvent(vx, vy);
}

function followPointer(event)
{    
    let rect = canvas.getBoundingClientRect();
    
    let sx = transformScreenX(event.clientX - rect.left);
    let sy = transformScreenY(event.clientY - rect.top);
    let vx = transformViewX(event.clientX - rect.left);
    let vy = transformViewY(event.clientY - rect.top);
    
    if (LAppDefine.DEBUG_MOUSE_LOG)
        console.log("onMouseMove device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    if (drag)
    {
        lastMouseX = sx;
        lastMouseY = sy;
        dragMgr.setPoint(vx, vy); 
    }
}

function lookFront()
{   
    if (drag)
    {
        drag = false;
    }
    dragMgr.setPoint(0, 0);
}

function mouseEvent(e)
{
    //e.preventDefault();
    if (e.type == "mousewheel") {
        // if (e.clientX < 0 || canvas.clientWidth < e.clientX || 
        // e.clientY < 0 || canvas.clientHeight < e.clientY)
        // {
        //     return;
        // }
        // if (e.wheelDelta > 0) modelScaling(1.1); 
        // else modelScaling(0.9); 
    } else if (e.type == "mousedown") {
        if("button" in e && e.button != 0) return;
        // modelTurnHead(e);
    } else if (e.type == "mousemove") {
        modelTurnHead(e);
    } else if (e.type == "mouseup") {
        if("button" in e && e.button != 0) return;
        // lookFront();
    } else if (e.type == "mouseleave") {
        lookFront();
    }
}

function touchEvent(e)
{
    var touch = e.touches[0];
    if (e.type == "touchstart") {
        if (e.touches.length == 1) modelTurnHead(touch);
        // onClick(touch);
    } else if (e.type == "touchmove") {
        followPointer(touch);
        if (e.touches.length == 2) {
            var touch1 = e.touches[0];
            var touch2 = e.touches[1];
            
            var len = Math.pow(touch1.pageX - touch2.pageX, 2) + Math.pow(touch1.pageY - touch2.pageY, 2);
            if (oldLen - len < 0) modelScaling(1.025); 
            else modelScaling(0.975); 
            
            oldLen = len;
        }
    } else if (e.type == "touchend") {
        lookFront();
    }
}

function transformViewX(deviceX)
{
    var screenX = deviceToScreen.transformX(deviceX); 
    return viewMatrix.invertTransformX(screenX); 
}


function transformViewY(deviceY)
{
    var screenY = deviceToScreen.transformY(deviceY); 
    return viewMatrix.invertTransformY(screenY); 
}


function transformScreenX(deviceX)
{
    return deviceToScreen.transformX(deviceX);
}


function transformScreenY(deviceY)
{
    return deviceToScreen.transformY(deviceY);
}

function getWebGLContext()
{
    var NAMES = [ "webgl" , "experimental-webgl" , "webkit-3d" , "moz-webgl"];
    for( var i = 0; i < NAMES.length; i++ ){
        try{
            var ctx = canvas.getContext(NAMES[i], {premultipliedAlpha : true});
            if(ctx) return ctx;
        }
        catch(e){}
    }
    return null;
};

function loadlive2d(id,modelurl) {
    initL2dCanvas(id);
    init(modelurl);
}

window.loadlive2d = loadlive2d;
