// Modified by xiazeyu.

/**
* @desc The definitions of values releated to model react
*/

var cDefine = {
  // above are output log settings
  DEBUG_LOG : false, // false, output events
  DEBUG_MOUSE_LOG : false, // false, output mouse tracking
  // These two commented definitions havn't been achieved yet.
  //
  // DEBUG_DRAW_HIT_AREA : false, // # 63
  // DEBUG_DRAW_ALPHA_MODEL : false, // #63

  // above are viewMatrix value settings
  VIEW_LOGICAL_LEFT : -1, // -1, the left abscissa of viewMatrix
  VIEW_LOGICAL_RIGHT : 1, // 1, the right abscissa of viewMatrix
  VIEW_LOGICAL_MAX_LEFT : -2, // -2, the max left abscissa of viewMatrix
  VIEW_LOGICAL_MAX_RIGHT : 2, // 2, the max right abscissa of viewMatrix
  VIEW_LOGICAL_MAX_BOTTOM : -2, // -2, the max bottom abscissa of viewMatrix
  VIEW_LOGICAL_MAX_TOP : 2, // 2, the max top abscissa of viewMatrix

  // above are the motions priority settings.
  PRIORITY_NONE : 0, // 0，do nothing
  PRIORITY_IDLE : 1, // 1, idle motions
  PRIORITY_NORMAL : 2, // 2, normal motions
  PRIORITY_FORCE : 3, // 3, force to show motion

  // above are the index to the motions in model.json
  // #43
  MOTION_GROUP_IDLE : "idle",
  MOTION_GROUP_TAP_BODY : "tap_body",
  MOTION_GROUP_FLICK_HEAD : "flick_head", // unused
  MOTION_GROUP_PINCH_IN : "pinch_in", // unused
  MOTION_GROUP_PINCH_OUT : "pinch_out", // unused
  MOTION_GROUP_SHAKE : "shake", // unused

  // above are the index to the hit areas in model.json
  // #43
  HIT_AREA_HEAD : "head",
  HIT_AREA_BODY : "body"
};

module.exports = cDefine;
