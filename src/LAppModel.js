import {L2DBaseModel, L2DEyeBlink} from "./lib/Live2DFramework"
import ModelSettingJson from "./lib/ModelSettingJson"
import LAppDefine from "./LAppDefine"
import MatrixStack from "./lib/MatrixStack"

//============================================================
//============================================================
//  class LAppModel     extends L2DBaseModel         
//============================================================
//============================================================
export default function LAppModel()
{
    //L2DBaseModel.apply(this, arguments);
    L2DBaseModel.prototype.constructor.call(this);
    
    this.modelHomeDir = "";
    this.modelSetting = null;
    this.tmpMatrix = [];
}

LAppModel.prototype = new L2DBaseModel();


LAppModel.prototype.load = function(gl, modelSettingPath, callback)
{
    this.setUpdating(true);
    this.setInitialized(false);

    this.modelHomeDir = modelSettingPath.substring(0, modelSettingPath.lastIndexOf("/") + 1); 

    this.modelSetting = new ModelSettingJson();
    
    var thisRef = this;
    
    this.modelSetting.loadModelSetting(modelSettingPath, function(){
        
        var path = thisRef.modelHomeDir + thisRef.modelSetting.getModelFile();
        thisRef.loadModelData(path, function(model){
            
            for (var i = 0; i < thisRef.modelSetting.getTextureNum(); i++)
            {
                
                var texPaths = thisRef.modelHomeDir + 
                    thisRef.modelSetting.getTextureFile(i);
                
                thisRef.loadTexture(i, texPaths, function() {
                    
                    if( thisRef.isTexLoaded ) {
                        
                        if (thisRef.modelSetting.getExpressionNum() > 0)
                        {
                            
                            thisRef.expressions = {};
                            
                            for (var j = 0; j < thisRef.modelSetting.getExpressionNum(); j++)
                            {
                                var expName = thisRef.modelSetting.getExpressionName(j);
                                var expFilePath = thisRef.modelHomeDir + 
                                    thisRef.modelSetting.getExpressionFile(j);
                                
                                thisRef.loadExpression(expName, expFilePath);
                            }
                        }
                        else
                        {
                            thisRef.expressionManager = null;
                            thisRef.expressions = {};
                        }
                        
                        
                        
                        if (thisRef.eyeBlink == null)
                        {
                            thisRef.eyeBlink = new L2DEyeBlink();
                        }
                        
                        
                        if (thisRef.modelSetting.getPhysicsFile() != null)
                        {
                            thisRef.loadPhysics(thisRef.modelHomeDir + 
                                                thisRef.modelSetting.getPhysicsFile());
                        }
                        else
                        {
                            thisRef.physics = null;
                        }
                        
                        
                        
                        if (thisRef.modelSetting.getPoseFile() != null)
                        {
                            thisRef.loadPose(
                                thisRef.modelHomeDir +
                                thisRef.modelSetting.getPoseFile(),
                                function() {
                                    thisRef.pose.updateParam(thisRef.live2DModel);
                                }
                            );
                        }
                        else
                        {
                            thisRef.pose = null;
                        }
                        
                        
                        
                        if (thisRef.modelSetting.getLayout() != null)
                        {
                            var layout = thisRef.modelSetting.getLayout();
                            if (layout["width"] != null)
                                thisRef.modelMatrix.setWidth(layout["width"]);
                            if (layout["height"] != null)
                                thisRef.modelMatrix.setHeight(layout["height"]);

                            if (layout["x"] != null)
                                thisRef.modelMatrix.setX(layout["x"]);
                            if (layout["y"] != null)
                                thisRef.modelMatrix.setY(layout["y"]);
                            if (layout["center_x"] != null)
                                thisRef.modelMatrix.centerX(layout["center_x"]);
                            if (layout["center_y"] != null)
                                thisRef.modelMatrix.centerY(layout["center_y"]);
                            if (layout["top"] != null)
                                thisRef.modelMatrix.top(layout["top"]);
                            if (layout["bottom"] != null)
                                thisRef.modelMatrix.bottom(layout["bottom"]);
                            if (layout["left"] != null)
                                thisRef.modelMatrix.left(layout["left"]);
                            if (layout["right"] != null)
                                thisRef.modelMatrix.right(layout["right"]);
                        }
                        
                        for (var j = 0; j < thisRef.modelSetting.getInitParamNum(); j++)
                        {
                            
                            thisRef.live2DModel.setParamFloat(
                                thisRef.modelSetting.getInitParamID(j),
                                thisRef.modelSetting.getInitParamValue(j)
                            );
                        }

                        for (var j = 0; j < thisRef.modelSetting.getInitPartsVisibleNum(); j++)
                        {
                            
                            thisRef.live2DModel.setPartsOpacity(
                                thisRef.modelSetting.getInitPartsVisibleID(j),
                                thisRef.modelSetting.getInitPartsVisibleValue(j)
                            );
                        }
                        
                        
                        
                        thisRef.live2DModel.saveParam();
                        // thisRef.live2DModel.setGL(gl);
                        
                        
                        thisRef.preloadMotionGroup(LAppDefine.MOTION_GROUP_IDLE);
                        thisRef.mainMotionManager.stopAllMotions();

                        thisRef.setUpdating(false); 
                        thisRef.setInitialized(true); 

                        if (typeof callback == "function") callback();
                        
                    }
                });
            }
        });
    });
};



LAppModel.prototype.release = function(gl)
{
    // this.live2DModel.deleteTextures();
    var pm = Live2DFramework.getPlatformManager();

    gl.deleteTexture(pm.texture);
}



LAppModel.prototype.preloadMotionGroup = function(name)
{
    var thisRef = this;
    
    for (var i = 0; i < this.modelSetting.getMotionNum(name); i++)
    {
        var file = this.modelSetting.getMotionFile(name, i);
        this.loadMotion(file, this.modelHomeDir + file, function(motion) {
            motion.setFadeIn(thisRef.modelSetting.getMotionFadeIn(name, i));
            motion.setFadeOut(thisRef.modelSetting.getMotionFadeOut(name, i));
        });
        
    }
}


LAppModel.prototype.update = function()
{
    // console.log("--> LAppModel.update()");

    if(this.live2DModel == null) 
    {
        if (LAppDefine.DEBUG_LOG) console.error("Failed to update.");
        
        return;
    }
    
    var timeMSec = UtSystem.getUserTimeMSec() - this.startTimeMSec;
    var timeSec = timeMSec / 1000.0;
    var t = timeSec * 2 * Math.PI; 
    
    
    if (this.mainMotionManager.isFinished())
    {
        
        this.startRandomMotion(LAppDefine.MOTION_GROUP_IDLE, LAppDefine.PRIORITY_IDLE);
    }
    
    //-----------------------------------------------------------------		
    
    
    this.live2DModel.loadParam();
    
    
    
    var update = this.mainMotionManager.updateParam(this.live2DModel); 
    if (!update) {
        
        if(this.eyeBlink != null) {
            this.eyeBlink.updateParam(this.live2DModel);
        }
    }

    
    this.live2DModel.saveParam();
    
    //-----------------------------------------------------------------		
    
    
    if (this.expressionManager != null && 
        this.expressions != null && 
        !this.expressionManager.isFinished())
    {
        this.expressionManager.updateParam(this.live2DModel); 
    }

    
    
    this.live2DModel.addToParamFloat("PARAM_ANGLE_X", this.dragX * 30, 1); 
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", this.dragY * 30, 1);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", (this.dragX * this.dragY) * -30, 1);

    
    
    this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", this.dragX*10, 1); 

    
    
    this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1); 
    this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1);


    
    this.live2DModel.addToParamFloat("PARAM_ANGLE_X", 
                                     Number((15 * Math.sin(t / 6.5345))), 0.5);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", 
                                     Number((8 * Math.sin(t / 3.5345))), 0.5);
    this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", 
                                     Number((10 * Math.sin(t / 5.5345))), 0.5);
    this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", 
                                     Number((4 * Math.sin(t / 15.5345))), 0.5);
    this.live2DModel.setParamFloat("PARAM_BREATH", 
                                   Number((0.5 + 0.5 * Math.sin(t / 3.2345))), 1);
    
    
    if (this.physics != null)
    {
        this.physics.updateParam(this.live2DModel); 
    }
    
    
    if (this.lipSync == null)
    {
        this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y",
                                       this.lipSyncValue);
    }
    
    
    if( this.pose != null ) {
        this.pose.updateParam(this.live2DModel);
    }
        
    this.live2DModel.update();
};



LAppModel.prototype.setRandomExpression = function()
{
    var tmp = [];
    for (var name in this.expressions)
    {
        tmp.push(name);
    }

    var no = parseInt(Math.random() * tmp.length);

    this.setExpression(tmp[no]);
}



LAppModel.prototype.startRandomMotion = function(name, priority)
{
    var max = this.modelSetting.getMotionNum(name);
    var no = parseInt(Math.random() * max);
    this.startMotion(name, no, priority);
}



LAppModel.prototype.startMotion = function(name, no, priority)
{
    // console.log("startMotion : " + name + " " + no + " " + priority);
    
    var motionName = this.modelSetting.getMotionFile(name, no);
    
    if (motionName == null || motionName == "")
    {
        if (LAppDefine.DEBUG_LOG)
            console.error("Failed to motion.");
        return;
    }

    if (priority == LAppDefine.PRIORITY_FORCE) 
    {
        this.mainMotionManager.setReservePriority(priority);
    }
    else if (!this.mainMotionManager.reserveMotion(priority))
    {
        if (LAppDefine.DEBUG_LOG)
            console.log("Motion is running.")
        return;
    }

    var thisRef = this;
    var motion;

    if (this.motions[name] == null) 
    {
        this.loadMotion(null, this.modelHomeDir + motionName, function(mtn) {
            motion = mtn;
            
            
            thisRef.setFadeInFadeOut(name, no, priority, motion);
            
        });
    }
    else 
    {
        motion = this.motions[name];
        
        
        thisRef.setFadeInFadeOut(name, no, priority, motion);
    }
}


LAppModel.prototype.setFadeInFadeOut = function(name, no, priority, motion)
{
    var motionName = this.modelSetting.getMotionFile(name, no);
    
    motion.setFadeIn(this.modelSetting.getMotionFadeIn(name, no));
    motion.setFadeOut(this.modelSetting.getMotionFadeOut(name, no));
    
    
    if (LAppDefine.DEBUG_LOG)
            console.log("Start motion : " + motionName);

    if (this.modelSetting.getMotionSound(name, no) == null)
    {
        this.mainMotionManager.startMotionPrio(motion, priority);
    }
    else
    {
        var soundName = this.modelSetting.getMotionSound(name, no);
        // var player = new Sound(this.modelHomeDir + soundName);
        
        var snd = document.createElement("audio");
        snd.src = this.modelHomeDir + soundName;
        
        if (LAppDefine.DEBUG_LOG)
            console.log("Start sound : " + soundName);
        
        snd.play();
        this.mainMotionManager.startMotionPrio(motion, priority);
    }
}



LAppModel.prototype.setExpression = function(name)
{
    var motion = this.expressions[name];
    
    if (LAppDefine.DEBUG_LOG)
        console.log("Expression : " + name);
        
    this.expressionManager.startMotion(motion, false);
}



LAppModel.prototype.draw = function(gl)
{
    //console.log("--> LAppModel.draw()");
    
    // if(this.live2DModel == null) return;
    
    
    MatrixStack.push();
    
    MatrixStack.multMatrix(this.modelMatrix.getArray());
    
    this.tmpMatrix = MatrixStack.getMatrix()
    this.live2DModel.setMatrix(this.tmpMatrix);
    this.live2DModel.draw();
    
    MatrixStack.pop();
    
};
        


LAppModel.prototype.hitTest = function(id, testX, testY)
{
    var len = this.modelSetting.getHitAreaNum();
    for (var i = 0; i < len; i++)
    {        
        if (id == this.modelSetting.getHitAreaName(i))
        {
            var drawID = this.modelSetting.getHitAreaID(i);
            
            return this.hitTestSimple(drawID, testX, testY);
        }
    }
    
    return false; 
}