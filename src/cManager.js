import { Live2DFramework } from "./lib/Live2DFramework"
import { PlatformManager } from "./lib/PlatformManager"
import { cModel } from "./cModel"
import { cDefine } from "./cDefine"

export default function cManager() {
  // console.log("--> cManager()");

  this.models = [];
  this.count = -1;
  this.reloadFlg = false;

  Live2D.init();
  Live2DFramework.setPlatformManager(new PlatformManager);

}

cManager.prototype.createModel = function () {

  var model = new cModel();
  this.models.push(model);

  return model;

}


cManager.prototype.changeModel = function (gl, modelurl) {
  // console.log("--> cManager.update(gl)");

  if (this.reloadFlg) {
    this.reloadFlg = false;
    this.releaseModel(0, gl);
    this.createModel();
    this.models[0].load(gl, modelurl);
  }

};


cManager.prototype.getModel = function (no) {
  // console.log("--> cManager.getModel(" + no + ")");

  if (no >= this.models.length) return null;

  return this.models[no];
};



cManager.prototype.releaseModel = function (no, gl) {
  // console.log("--> cManager.releaseModel(" + no + ")");

  if (this.models.length <= no) return;

  this.models[no].release(gl);

  delete this.models[no];
  this.models.splice(no, 1);
};



cManager.prototype.numModels = function () {
  return this.models.length;
};



cManager.prototype.setDrag = function (x, y) {
  for (var i = 0; i < this.models.length; i++) {
    this.models[i].setDrag(x, y);
  }
}



cManager.prototype.maxScaleEvent = function () {
  if (cDefine.DEBUG_LOG)
    console.log("Max scale event.");
  for (var i = 0; i < this.models.length; i++) {
    this.models[i].startRandomMotion(cDefine.MOTION_GROUP_PINCH_IN,
      cDefine.PRIORITY_NORMAL);
  }
}



cManager.prototype.minScaleEvent = function () {
  if (cDefine.DEBUG_LOG)
    console.log("Min scale event.");
  for (var i = 0; i < this.models.length; i++) {
    this.models[i].startRandomMotion(cDefine.MOTION_GROUP_PINCH_OUT,
      cDefine.PRIORITY_NORMAL);
  }
}



cManager.prototype.tapEvent = function (x, y) {
  if (cDefine.DEBUG_LOG)
    console.log("tapEvent view x:" + x + " y:" + y);

  for (var i = 0; i < this.models.length; i++) {

    if (this.models[i].hitTest(cDefine.HIT_AREA_HEAD, x, y)) {

      if (cDefine.DEBUG_LOG)
        console.log("Tap face.");

      this.models[i].setRandomExpression();
    }
    else if (this.models[i].hitTest(cDefine.HIT_AREA_BODY, x, y)) {

      if (cDefine.DEBUG_LOG)
        console.log("Tap body." + " models[" + i + "]");

      this.models[i].startRandomMotion(cDefine.MOTION_GROUP_TAP_BODY,
        cDefine.PRIORITY_NORMAL);
    }
  }

  return true;
};
