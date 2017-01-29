console.log('live2d loading...');
var thisRef = this;

var live2dCanveId = '';

window.onerror = function(msg, url, line, col, error) {
    var errmsg = "file:" + url + "<br>line:" + line + " " + msg;
    l2dError(errmsg);
}

function live2dStart(canvaId,moudleSrc)
{
    LAppDefine.MODEL = moudleSrc;
    live2dCanveId = canvaId;
    this.platform = window.navigator.platform.toLowerCase();
    
    this.live2DMgr = new LAppLive2DManager();

    this.isDrawStart = false;
    
    this.gl = null;
    this.canvas = null;
    
    this.dragMgr = null; /*new L2DTargetPoint();*/ 
    this.viewMatrix = null; /*new L2DViewMatrix();*/
    this.projMatrix = null; /*new L2DMatrix44()*/
    this.deviceToScreen = null; /*new L2DMatrix44();*/
    
    this.drag = false; 
    this.oldLen = 0;    
    
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    
    this.isModelShown = false;
    
    
    initL2dCanvas(canvaId);
    
    
    init();
}


function initL2dCanvas(canvasId)
{
    
	this.canvas = document.getElementById(canvasId);
    
    
    if(this.canvas.addEventListener) {
        // this.canvas.addEventListener("mousewheel", mouseEvent, false);
//        window.addEventListener("click", mouseEvent, true);

//        window.addEventListener("mousedown", mouseEvent, true);
    	window.addEventListener("mousemove", mouseEvent, true);
        window.addEventListener("mouseleave", mouseEvent, true);

//        window.addEventListener("mouseup", mouseEvent, true);
//        window.addEventListener("mouseout", mouseEvent, true);
//    	document.addEventListener("contextmenu", mouseEvent, true);


    	window.addEventListener("touchstart", touchEvent, true);
    	window.addEventListener("touchend", touchEvent, true);
    	window.addEventListener("touchmove", touchEvent, true);
        
    }
    
    // btnChangeModel = document.getElementById("btnChange");
    // btnChangeModel.addEventListener("click", function(e) {
    //     changeModel();
    // });
}


function init()
{    
    
    var width = this.canvas.width;
    var height = this.canvas.height;
    
    this.dragMgr = new L2DTargetPoint();

    
    var ratio = height / width;
    var left = LAppDefine.VIEW_LOGICAL_LEFT;
    var right = LAppDefine.VIEW_LOGICAL_RIGHT;
    var bottom = -ratio;
    var top = ratio;

    this.viewMatrix = new L2DViewMatrix();

    
    this.viewMatrix.setScreenRect(left, right, bottom, top);
    
    
    this.viewMatrix.setMaxScreenRect(LAppDefine.VIEW_LOGICAL_MAX_LEFT,
                                     LAppDefine.VIEW_LOGICAL_MAX_RIGHT,
                                     LAppDefine.VIEW_LOGICAL_MAX_BOTTOM,
                                     LAppDefine.VIEW_LOGICAL_MAX_TOP); 

    this.viewMatrix.setMaxScale(LAppDefine.VIEW_MAX_SCALE);
    this.viewMatrix.setMinScale(LAppDefine.VIEW_MIN_SCALE);

    this.projMatrix = new L2DMatrix44();
    this.projMatrix.multScale(1, (width / height));

    
    this.deviceToScreen = new L2DMatrix44();
    this.deviceToScreen.multTranslate(-width / 2.0, -height / 2.0);
    this.deviceToScreen.multScale(2 / width, -2 / width);
    
    
    
	this.gl = getWebGLContext();
	if (!this.gl) {
        l2dError("Failed to create WebGL context.");
        return;
    }

	
	this.gl.clearColor(0.0, 0.0, 0.0, 0.0);

    changeModel();
    
    startDraw();
}


function startDraw() {
    if(!this.isDrawStart) {
        this.isDrawStart = true;
        (function tick() {
                draw(); 

                var requestAnimationFrame = 
                    window.requestAnimationFrame || 
                    window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame || 
                    window.msRequestAnimationFrame;

                
                requestAnimationFrame(tick ,this.canvas);   
        })();
    }
}


function draw()
{
    // l2dLog("--> draw()");

    MatrixStack.reset();
    MatrixStack.loadIdentity();
    
    this.dragMgr.update(); 
    this.live2DMgr.setDrag(this.dragMgr.getX(), this.dragMgr.getY());
    
    
	this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
    MatrixStack.multMatrix(projMatrix.getArray());
    MatrixStack.multMatrix(viewMatrix.getArray());
    MatrixStack.push();
    
    for (var i = 0; i < this.live2DMgr.numModels(); i++)
    {
        var model = this.live2DMgr.getModel(i);

        if(model == null) return;
        
        if (model.initialized && !model.updating)
        {
            model.update();
            model.draw(this.gl);
            
            if (!this.isModelShown && i == this.live2DMgr.numModels()-1) {
                this.isModelShown = !this.isModelShown;
                // var btnChange = document.getElementById("btnChange");
                // btnChange.textContent = "Change Model";
                // btnChange.removeAttribute("disabled");
                // btnChange.setAttribute("class", "active");
            }
        }
    }
    
    MatrixStack.pop();
}


function changeModel()
{
    // var btnChange = document.getElementById("btnChange");
    // btnChange.setAttribute("disabled","disabled");
    // btnChange.setAttribute("class", "inactive");
    // btnChange.textContent = "Now Loading...";
    this.isModelShown = false;
    
    this.live2DMgr.reloadFlg = true;
    this.live2DMgr.count++;

    this.live2DMgr.changeModel(this.gl);
}




function modelScaling(scale)
{   
    var isMaxScale = thisRef.viewMatrix.isMaxScale();
    var isMinScale = thisRef.viewMatrix.isMinScale();
    
    thisRef.viewMatrix.adjustScale(0, 0, scale);

    
    if (!isMaxScale)
    {
        if (thisRef.viewMatrix.isMaxScale())
        {
            thisRef.live2DMgr.maxScaleEvent();
        }
    }
    
    if (!isMinScale)
    {
        if (thisRef.viewMatrix.isMinScale())
        {
            thisRef.live2DMgr.minScaleEvent();
        }
    }
}



function modelTurnHead(event)
{
    thisRef.drag = true;
    
    var rect = document.getElementById(live2dCanveId).getBoundingClientRect();
    
    var sx = transformScreenX(event.clientX - rect.left);
    var sy = transformScreenY(event.clientY - rect.top);
    var vx = transformViewX(event.clientX - rect.left);
    var vy = transformViewY(event.clientY - rect.top);
    
    if (LAppDefine.DEBUG_MOUSE_LOG)
        l2dLog("onMouseDown device( x:" + event.clientX + " y:" + event.clientY + " rect.left:" + rect.left + " ) view( x:" + vx + " y:" + vy + ")");

    thisRef.lastMouseX = sx;
    thisRef.lastMouseY = sy;

    thisRef.dragMgr.setPoint(vx, vy); 
    
    
    thisRef.live2DMgr.tapEvent(vx, vy);
}



function followPointer(event)
{    
    var rect = document.getElementById(live2dCanveId).getBoundingClientRect();
    
    var sx = transformScreenX(event.clientX - rect.left);
    var sy = transformScreenY(event.clientY - rect.top);
    var vx = transformViewX(event.clientX - rect.left);
    var vy = transformViewY(event.clientY - rect.top);
    
    if (LAppDefine.DEBUG_MOUSE_LOG)
        l2dLog("onMouseMove device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

    if (thisRef.drag)
    {
        thisRef.lastMouseX = sx;
        thisRef.lastMouseY = sy;

        thisRef.dragMgr.setPoint(vx, vy); 
    }
}

		

function lookFront()
{   
    if (thisRef.drag)
    {
        thisRef.drag = false;
    }

    thisRef.dragMgr.setPoint(0, 0);
}


function mouseEvent(e)
{
//    e.preventDefault();
    
    if (e.type == "mousewheel") {

        if (e.clientX < 0 || thisRef.canvas.clientWidth < e.clientX || 
        e.clientY < 0 || thisRef.canvas.clientHeight < e.clientY)
        {
            return;
        }
        
        if (e.wheelDelta > 0) modelScaling(1.1); 
        else modelScaling(0.9); 

        
    } else if (e.type == "mousedown") {


        if("button" in e && e.button != 0) return;

        // modelTurnHead(e);
        
    } else if (e.type == "mousemove") {

//        modelTurnHead(e);
        thisRef.drag = true;
         followPointer(e);
        
    } else if (e.type == "mouseup") {
        
        
        if("button" in e && e.button != 0) return;

        // lookFront();
        
    } else if (e.type == "mouseout") {
        
         lookFront();
        
    } else if (e.type == "contextmenu") {
        
        changeModel();
    } else if (e.type = "mouseleave"){
        lookFront();
    }

}


function touchEvent(e)
{
    //e.preventDefault();
    
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
            if (thisRef.oldLen - len < 0) modelScaling(1.025); 
            else modelScaling(0.975); 
            
            thisRef.oldLen = len;
        }
        
    } else if (e.type == "touchend") {
        lookFront();
    }
}




function transformViewX(deviceX)
{
    var screenX = this.deviceToScreen.transformX(deviceX); 
    return viewMatrix.invertTransformX(screenX); 
}


function transformViewY(deviceY)
{
    var screenY = this.deviceToScreen.transformY(deviceY); 
    return viewMatrix.invertTransformY(screenY); 
}


function transformScreenX(deviceX)
{
    return this.deviceToScreen.transformX(deviceX);
}


function transformScreenY(deviceY)
{
    return this.deviceToScreen.transformY(deviceY);
}



function getWebGLContext()
{
	var NAMES = [ "webgl" , "experimental-webgl" , "webkit-3d" , "moz-webgl"];
	
	for( var i = 0; i < NAMES.length; i++ ){
		try{
			var ctx = this.canvas.getContext(NAMES[i], {premultipliedAlpha : true});
			if(ctx) return ctx;
		} 
		catch(e){}
	}
	return null;
};



function l2dLog(msg) {
    if(!LAppDefine.DEBUG_LOG) return;
    
    // var myconsole = document.getElementById("myconsole");
    // myconsole.innerHTML = myconsole.innerHTML + "<br>" + msg;
    
    console.log(msg);
}



function l2dError(msg)
{
    if(!LAppDefine.DEBUG_LOG) return;
    
    l2dLog( "<span style='color:red'>" + msg + "</span>");
    
	console.error(msg);
};