
/**
 *
 *  You can modify and use this source freely
 *  only for the development of application related Live2D.
 *
 *  (c) Live2D Inc. All rights reserved.
 */

// Modified by xiazeyu.

import { getContext } from "./webGLContext";
import { Live2DModelWebGL } from "./live2d.min";


//============================================================
//============================================================
//  class PlatformManager     extend IPlatformManager
//============================================================
//============================================================

/**
* @name PlatformManager
* @desc Define the variable type of PlatformManager
* @param null
* @returns {Structure} PlatformManager
*/
export default function PlatformManager()
{

}


//============================================================
//    PlatformManager # loadBytes()
//============================================================

/**
* @name loadBytes
* @desc load bytes from the path and callback
* @param {String} path, {Function} callback
* @returns callback {raw} context
* @memberOf PlatformManager
*/

PlatformManager.prototype.loadBytes       = function(path/*String*/, callback)
{
    var request = new XMLHttpRequest();
    request.open("GET", path, true);
    request.responseType = "arraybuffer";
    request.onload = function(){
        switch(request.status){
        case 200:
            callback(request.response);
            break;
        default:
            console.error("Failed to load (" + request.status + ") : " + path);
            break;
        }
    }
    request.send(null);
    // return request;
}


//============================================================
//    PlatformManager # loadString()
//============================================================

/**
* @name loadString
* @desc load bytes from the path and put it into buffer
* @param {String} path
* @returns buffer {raw} context
* @memberOf PlatformManager
*/
PlatformManager.prototype.loadString      = function(path/*String*/)
{

    this.loadBytes(path, function(buf) {
        return buf;
    });

}


//============================================================
//    PlatformManager # loadLive2DModel()
//============================================================

/**
* @name loadLive2DModel
* @desc load Live2DModel from the path and put it into buffer
* @param {String} path, {function} callback
* @returns callback loaded model
* @memberOf PlatformManager
*/
PlatformManager.prototype.loadLive2DModel = function(path/*String*/, callback)
{
    var model = null;

    // load moc
    this.loadBytes(path, function(buf){
        model = Live2DModelWebGL.loadModel(buf);
        callback(model);
    });

}


//============================================================
//    PlatformManager # loadTexture()
//============================================================

/**
* @name loadTexture
* @desc load Live2DModel's Texture and callback
* @param {Live2DModelWebGL}model, {int}no, {string}path, {function}callback
* @returns callback
* @memberOf PlatformManager
*/
PlatformManager.prototype.loadTexture     = function(model/*ALive2DModel*/, no/*int*/, path/*String*/, callback)
{
    // load textures
    var loadedImage = new Image();
    loadedImage.src = path;
    loadedImage.onload = onload;
    loadedImage.onerror = onerror;

    // var thisRef = this;
    loadedImage.onload = function() {
        // create texture
        var gl = getContext();
        var texture = gl.createTexture();
        if (!texture){ console.error("Failed to generate gl texture name."); return -1; }

        if(!model.isPremultipliedAlpha()){
            // 乗算済アルファテクスチャ以外の場合
            // emmmm, maybe do something for textures with alpha layer.
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
        }
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                      gl.UNSIGNED_BYTE, loadedImage);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);



        model.setTexture(no, texture);

        // テクスチャオブジェクトを解放
        // Release the texture object to prevent buffer overruns.
        texture = null;

        if (typeof callback == "function") callback();
    };

    loadedImage.onerror = function() {
        console.error("Failed to load image : " + path);
    }
}


//============================================================
//    PlatformManager # parseFromBytes(buf)

//============================================================

/**
* @name jsonParseFromBytes
* @desc parse json file into arrays
* @param {raw} buf
* @returns {Array}jsonObj
* @memberOf PlatformManager
*/
PlatformManager.prototype.jsonParseFromBytes = function(buf){

    var jsonStr;
    var bomCode = new Uint8Array(buf, 0, 3);
    if (bomCode[0] == 239 && bomCode[1] == 187 && bomCode[2] == 191) {
        jsonStr = String.fromCharCode.apply(null, new Uint8Array(buf, 3));
    } else {
        jsonStr = String.fromCharCode.apply(null, new Uint8Array(buf));
    }

    var jsonObj = JSON.parse(jsonStr);

    return jsonObj;
};



//============================================================
//    PlatformManager # log()
//============================================================

/**
* @name log
* @desc output log in console
* @param {string} txt
* @returns null
* @memberOf PlatformManager
*/
PlatformManager.prototype.log             = function(txt/*String*/)
{
    console.log(txt);
}
