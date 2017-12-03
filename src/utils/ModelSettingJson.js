// Modified by xiazeyu.

/**
* @desc To get the model settings from given json file
*/

import { Live2DFramework } from "../lib/Live2DFramework"

/**
* @name ModelSettingJson
* @desc return the struct of ModelSettingJson
* @param null
* @returns {Structure} ModelSettingJson
*/
export default function ModelSettingJson()
{   // Define the index in the json file.
    this.NAME = "name";
    this.ID = "id";
    this.MODEL = "model";
    this.TEXTURES = "textures";
    this.HIT_AREAS = "hit_areas";
    this.PHYSICS = "physics";
    this.POSE = "pose";
    this.EXPRESSIONS = "expressions";
    this.MOTION_GROUPS = "motions";
    this.SOUND = "sound";
    this.FADE_IN = "fade_in";
    this.FADE_OUT = "fade_out";
    this.LAYOUT = "layout";
    this.INIT_PARAM = "init_param";
    this.INIT_PARTS_VISIBLE = "init_parts_visible";
    this.VALUE = "val";
    this.FILE = "file";
    this.json = {};
}

/**
* @name loadModelSetting
* @desc load model settings from json
* @param {string} jsonPath, {function} callback
* @returns null
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.loadModelSetting = function(path, callback)
{
    var thisRef = this;
    var pm = Live2DFramework.getPlatformManager();
    pm.loadBytes(path, function(buf) {
        var str = String.fromCharCode.apply(null,new Uint8Array(buf));
        thisRef.json = JSON.parse(str);
        callback();
    });
};

/**
* @name getTextureFile
* @desc get texture file from json
* @param {int} order number of texture
* @returns {string} file path
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getTextureFile = function(n)
{
    if (this.json[this.TEXTURES] == null || this.json[this.TEXTURES][n] == null)
        return null;

    return this.json[this.TEXTURES][n];
}

/**
* @name getModelFile
* @desc get model file from json
* @param null
* @returns {string} file path
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getModelFile = function()
{
    return this.json[this.MODEL];
};

/**
* @name getTextureNum
* @desc get the amount of textures from json
* @param null
* @returns {int} amout
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getTextureNum = function()
{
    if (this.json[this.TEXTURES] == null) return 0;

    return this.json[this.TEXTURES].length;
}

/**
* @name getHitAreaNum
* @desc get the amount of hit area from json
* @param null
* @returns {int} amout
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getHitAreaNum = function()
{
    if (this.json[this.HIT_AREAS] == null)
        return 0;

    return this.json[this.HIT_AREAS].length;
}

/**
* @name getHitAreaID
* @desc get the hit area ID of given index from json
* @param {int} index
* @returns {int} ID
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getHitAreaID = function(n)
{
    if (this.json[this.HIT_AREAS] == null ||
        this.json[this.HIT_AREAS][n] == null)
        return null;

    return this.json[this.HIT_AREAS][n][this.ID];
}

/**
* @name getHitAreaName
* @desc get the hit area name of given index from json
* @param {int} index
* @returns {string} name
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getHitAreaName = function(n)
{
    if (this.json[this.HIT_AREAS] == null ||
        this.json[this.HIT_AREAS][n] == null)
        return null;

    return this.json[this.HIT_AREAS][n][this.NAME];
}

/**
* @name getPhysicsFile
* @desc get physics file from json
* @param null
* @returns {string} file path
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getPhysicsFile = function()
{
    return this.json[this.PHYSICS];
}

/**
* @name getPoseFile
* @desc get pose file from json
* @param null
* @returns {string} file path
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getPoseFile = function()
{
    return this.json[this.POSE];
}

/**
* @name getExpressionNum
* @desc get the amount of expressions from json
* @param null
* @returns {int} amout
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getExpressionNum = function()
{
    return (this.json[this.EXPRESSIONS] == null) ? 0 : this.json[this.EXPRESSIONS].length;
}

/**
* @name getExpressionFile
* @desc get expression file from json
* @param null
* @returns {string} file path
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getExpressionFile = function(n)
{
    if (this.json[this.EXPRESSIONS] == null)
        return null;
    return this.json[this.EXPRESSIONS][n][this.FILE];
}

/**
* @name getExpressionName
* @desc get the hit expression name of given index from json
* @param {int} index
* @returns {string} name
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getExpressionName = function(n)
{
    if (this.json[this.EXPRESSIONS] == null)
        return null;
    return this.json[this.EXPRESSIONS][n][this.NAME];
}

/**
* @name getLayout
* @desc get the layout from json
* @param null
* @returns {string} layout
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getLayout = function()
{
    return this.json[this.LAYOUT];
}

/**
* @name getInitParamNum
* @desc get the amount of init parameter from json
* @param null
* @returns {int} amount
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getInitParamNum = function()
{
    return (this.json[this.INIT_PARAM] == null) ? 0 : this.json[this.INIT_PARAM].length;
}

/**
* @name getMotionNum
* @desc get the amount of motions from json
* @param null
* @returns {int} amout
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getMotionNum = function(name)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null)
        return 0;

    return this.json[this.MOTION_GROUPS][name].length;
}

/**
* @name getMotionFile
* @desc get motion file from json
* @param null
* @returns {string} file path
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getMotionFile = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null ||
        this.json[this.MOTION_GROUPS][name][n] == null)
        return null;

    return this.json[this.MOTION_GROUPS][name][n][this.FILE];
}

/**
* @name getMotionSound
* @desc get motion's sound file from json
* @param null
* @returns {string} file path
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getMotionSound = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null ||
        this.json[this.MOTION_GROUPS][name][n] == null ||
        this.json[this.MOTION_GROUPS][name][n][this.SOUND] == null)
        return null;

    return this.json[this.MOTION_GROUPS][name][n][this.SOUND];
}

/**
* @name getMotionFadeIn
* @desc get the motion's fade in setting from json
* @param {string} name, {int} index
* @returns {int} time (1000 if not found)
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getMotionFadeIn = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null ||
        this.json[this.MOTION_GROUPS][name][n] == null ||
        this.json[this.MOTION_GROUPS][name][n][this.FADE_IN] == null)
        return 1000;

    return this.json[this.MOTION_GROUPS][name][n][this.FADE_IN];
}

/**
* @name getMotionFadeOut
* @desc get the motion's fade out setting from json
* @param {string} name, {int} index
* @returns {int} time (1000 if not found)
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getMotionFadeOut = function(name, n)
{
    if (this.json[this.MOTION_GROUPS] == null ||
        this.json[this.MOTION_GROUPS][name] == null ||
        this.json[this.MOTION_GROUPS][name][n] == null ||
        this.json[this.MOTION_GROUPS][name][n][this.FADE_OUT] == null)
        return 1000;

    return this.json[this.MOTION_GROUPS][name][n][this.FADE_OUT];
}

/**
* @name getInitParamID
* @desc get the visible ID of init parameter from json
* @param {(int)} index
* @returns {int} ID
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getInitParamID = function(n)
{
    if (this.json[this.INIT_PARAM] == null ||
        this.json[this.INIT_PARAM][n] == null)
        return null;

    return this.json[this.INIT_PARAM][n][this.ID];
}

/**
* @name getInitParamValue
* @desc get the visible value of init parameter from json
* @param {(int)} index
* @returns {int} value
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getInitParamValue = function(n)
{
    if (this.json[this.INIT_PARAM] == null || this.json[this.INIT_PARAM][n] == null)
        return NaN;

    return this.json[this.INIT_PARAM][n][this.VALUE];
}

/**
* @name getInitPartsVisibleNum
* @desc get the amount of init parts visible from json
* @param null
* @returns {int} amout
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getInitPartsVisibleNum = function()
{
    return (this.json[this.INIT_PARTS_VISIBLE] == null) ? 0 : this.json[this.INIT_PARTS_VISIBLE].length;
}

/**
* @name getInitPartsVisibleID
* @desc get the visible ID of init parts from json
* @param {(int)} index
* @returns {int} ID
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getInitPartsVisibleID = function(n)
{
    if (this.json[this.INIT_PARTS_VISIBLE] == null || this.json[this.INIT_PARTS_VISIBLE][n] == null)
        return null;
    return this.json[this.INIT_PARTS_VISIBLE][n][this.ID];
}

/**
* @name getInitPartsVisibleValue
* @desc get the visible value of init parts from json
* @param {(int)} index
* @returns {int} value
* @memberOf ModelSettingJson
*/
ModelSettingJson.prototype.getInitPartsVisibleValue = function(n)
{
    if (this.json[this.INIT_PARTS_VISIBLE] == null || this.json[this.INIT_PARTS_VISIBLE][n] == null)
        return NaN;

    return this.json[this.INIT_PARTS_VISIBLE][n][this.VALUE];
}
