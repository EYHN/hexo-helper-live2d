import "./lib/live2d.min";
import { L2DTargetPoint, L2DViewMatrix, L2DMatrix44 } from "./lib/Live2DFramework";
import { cManager } from "./cManager"
import { MatrixStack } from "./utils/MatrixStack"
import { setContext } from "./lib/webGLContext"
import { cDefine } from "./cDefine"

// window.onerror = function (msg, url, line, col, error) {
//   let errmsg = "file:" + url + "<br>line:" + line + " " + msg;
//   console.error(errmsg);
// }

// const platform = window.navigator.platform.toLowerCase();
const live2DMgr = new cManager();
let isDrawStart = false;
let gl = null;
let canvas = null;
let dragMgr = null;
let viewMatrix = null;
let projMatrix = null;
let deviceToScreen = null;
let drag = false;
// let oldLen = 0;
let lastMouseX = 0;
let lastMouseY = 0;
// let isModelShown = 0;
// let modelurl = "";
let headPos = 0.5;
let opacityDefault = 0.7;
let opacityHover = 1;

function loadlive2d(iID, iModelUrl, iHeadPos, iOpacityDefault, iOpacityHover) {
    headPos = typeof iHeadPos === 'undefined' ? 0.5 : iHeadPos;
    opacityDefault = typeof iOpacityDefault === 'undefined' ? 0.7 : iOpacityDefault;
    opacityHover = typeof iOpacityHover === 'undefined' ? 1 : iOpacityHover;
    initCanvas(iID);
    init(iModelUrl);
}

function initCanvas(canvasId) {
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

function init(modelUrl) {
  // 此处获取的是canvas的大小 即绘制大小，与实际显示大小无关
  let width = canvas.width;
  let height = canvas.height;
  // 以下为实际显示大小
  // let sWidth = parseInt(canvas.style.width);
  // let sHeight = parseInt(canvas.style.height);

  dragMgr = new L2DTargetPoint();
  // 绘图相关..暂时看不懂
  let ratio = height / width;
  let left = cDefine.VIEW_LOGICAL_LEFT;
  let right = cDefine.VIEW_LOGICAL_RIGHT;
  let bottom = -ratio;
  let top = ratio;

  viewMatrix = new L2DViewMatrix();

  viewMatrix.setScreenRect(left, right, bottom, top);

  viewMatrix.setMaxScreenRect(cDefine.VIEW_LOGICAL_MAX_LEFT,
    cDefine.VIEW_LOGICAL_MAX_RIGHT,
    cDefine.VIEW_LOGICAL_MAX_BOTTOM,
    cDefine.VIEW_LOGICAL_MAX_TOP);
  // 这2行可能没用
  viewMatrix.setMaxScale(cDefine.VIEW_MAX_SCALE);
  viewMatrix.setMinScale(cDefine.VIEW_MIN_SCALE);

  projMatrix = new L2DMatrix44();
  projMatrix.multScale(1, (width / height));

  deviceToScreen = new L2DMatrix44();
  deviceToScreen.multTranslate(-width / 2.0, -height / 2.0);
  deviceToScreen.multScale(2 / width, -2 / width);

  gl = getWebGLContext();
  setContext(gl);
  if (!gl) { // 检测是否成功创造WebGL元素
    console.error("Failed to create WebGL context.");
    if(!window.WebGLRenderingContext){
      console.error("Your browser don't support WebGL, check https://get.webgl.org/ for futher information.");
    }
    return;
  }
  window.Live2D.setGL(gl);
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  changeModel(modelUrl);
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

function changeModel(modelurl) // 更换模型
{
    live2DMgr.reloadFlg = true;
    live2DMgr.count++; // 现在仍有多模型支持，稍后可以精简
    live2DMgr.changeModel(gl, modelurl);
}
/*
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
*//*
function transformRange(center, transform, range)
{
    let a = {
        x: transform.x - center.x,
        y: transform.y - center.y
    }
    let r = Math.sqrt(Math.pow(a.x,2) + Math.pow(a.y,2));
    if (r > range) {
        a = {
            x: a.x / r * range + center.x,
            y: a.y / r * range + center.y
        };
        return a;
    } else {
        return transform;
    }
}
*/
function dot(A,B)
{
    return A.x * B.x + A.y * B.y;
}

function normalize(x,y)
{
    let length = Math.sqrt(x * x + y * y)
    return {
        x: x / length,
        y: y / length
    }
}

function transformRect(center, transform, rect)
{
    if (transform.x < rect.left + rect.width && transform.y < rect.top + rect.height &&
        transform.x > rect.left && transform.y > rect.top) return transform;
    let Len_X = center.x - transform.x;
    let Len_Y = center.y - transform.y;

    function angle(Len_X, Len_Y)
    {
        return Math.acos(dot({
            x: 0,
            y: 1
        }, normalize(Len_X, Len_Y))) * 180 / Math.PI
    }

    let angleTarget = angle(Len_X, Len_Y);
    if (transform.x < center.x) angleTarget = 360 - angleTarget;
    let angleLeftTop = 360 - angle(rect.left - center.x, (rect.top - center.y) * -1);
    let angleLeftBottom = 360 - angle(rect.left - center.x, (rect.top + rect.height - center.y) * -1);
    let angleRightTop = angle(rect.left + rect.width - center.x, (rect.top - center.y) * -1);
    let angleRightBottom = angle(rect.left + rect.width - center.x, (rect.top + rect.height - center.y) * -1);
    let scale = Len_Y / Len_X;
    let res = {};

    if (angleTarget < angleRightTop) {
        let y3 = rect.top - center.y;
        let x3 = y3 / scale;
        res = {
            y: center.y + y3,
            x: center.x + x3
        }
    } else if(angleTarget < angleRightBottom) {
        let x3 = rect.left + rect.width - center.x;
        let y3 = x3 * scale;
        res = {
            y: center.y + y3,
            x: center.x + x3
        }
    } else if (angleTarget < angleLeftBottom) {
        let y3 = rect.top + rect.height - center.y;
        let x3 = y3 / scale;
        res = {
            y: center.y + y3,
            x: center.x + x3
        }
    } else if (angleTarget < angleLeftTop) {
        let x3 = center.x - rect.left;
        let y3 = x3 * scale;
        res = {
            y: center.y - y3,
            x: center.x - x3
        }
    } else {
        let y3 = rect.top - center.y;
        let x3 = y3 / scale;
        res = {
            y: center.y + y3,
            x: center.x + x3
        }
    }

    return res;
}

function modelTurnHead(event)
{
    drag = true;

    let rect = canvas.getBoundingClientRect();

    let sx = transformScreenX(event.clientX - rect.left);
    let sy = transformScreenY(event.clientY - rect.top);
    let target = transformRect({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * headPos
    }, {
        x: event.clientX,
        y: event.clientY
    }, rect)
    let vx = transformViewX(target.x - rect.left);
    let vy = transformViewY(target.y - rect.top);

    if (cDefine.DEBUG_MOUSE_LOG)
        console.log("modelTurnHead onMouseMove device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    lastMouseX = sx;
    lastMouseY = sy;

    dragMgr.setPoint(vx, vy);
}

function modelTapEvent(event)
{
    drag = true;

    let rect = canvas.getBoundingClientRect();

    let sx = transformScreenX(event.clientX - rect.left);
    let sy = transformScreenY(event.clientY - rect.top);
    let target = transformRect({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * headPos
    }, {
        x: event.clientX,
        y: event.clientY
    }, rect)
    let vx = transformViewX(target.x - rect.left);
    let vy = transformViewY(target.y - rect.top);

    if (cDefine.DEBUG_MOUSE_LOG)
        console.log("modelTapEvent onMouseDown device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    lastMouseX = sx;
    lastMouseY = sy;

    live2DMgr.tapEvent(vx, vy);
}

function followPointer(event)
{
    let rect = canvas.getBoundingClientRect();

    let sx = transformScreenX(event.clientX - rect.left);
    let sy = transformScreenY(event.clientY - rect.top);

    // log but seems ok
    // console.log("ecx=" + event.clientX + " ecy=" + event.clientY + " sx=" + sx + " sy=" + sy);

    let target = transformRect({// seems ok here
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * headPos
    }, {
        x: event.clientX,
        y: event.clientY
    }, rect)
    let vx = transformViewX(target.x - rect.left);
    let vy = transformViewY(target.y - rect.top);

    if (cDefine.DEBUG_MOUSE_LOG)
        console.log("followPointer onMouseMove device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    if (drag)
    {
        lastMouseX = sx;
        lastMouseY = sy;
        dragMgr.setPoint(vx, vy);
    }
}

function lookFront()
{
    if (drag) {
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
        modelTapEvent(e);
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
        if (e.touches.length == 1) modelTapEvent(touch);
        // onClick(touch);
    } else if (e.type == "touchmove") {
        followPointer(touch);
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

window.loadlive2d = loadlive2d;
