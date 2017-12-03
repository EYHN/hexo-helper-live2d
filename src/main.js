// Created by xiazeyu.

/**
* @desc The entry for live2D loading
*/

'use strict';

import { device } from 'current-device'; // import the device judge script
/*
export interface L2DOption{
  modelPath?: string;
  modelWidth?: number;
  modelHeight?: number;
  modelScaling?: number;
  AASetting?: number;
  mobileShow?: boolean;
  mobileScaling?: number;
  position?: string;
  horizontalOffset?: number;
  verticalOffset?: number;
  horizontalHeadPos?: number;
  verticalHeadPos?: number;
  opacityDefault?: number;
  opacityHover?: number;
  canvasID?: string;
  divID?: string;
}
*/
const defaultOptions/*: L2DOption*/ = { // Setting default value of options
  modelPath: 'https://raw.githubusercontent.com/EYHN/hexo-helper-live2d/master/assets/z16/z16.model.json',
  modelWidth: 150,
  modelHeight: 300,
  modelScaling: 1,
  AASetting: 2,
  mobileShow: true,
  mobileScaling: 0.5,
  position: 'right',
  horizontalOffset: 0,
  verticalOffset: -20,
  horizontalHeadPos: 0.5,
  verticalHeadPos: 0.618,
  opacityDefault: 0.7,
  opacityHover: 0.1,
  canvasID: 'live2DCanvas',
  divID: 'hexo-helper-live2d'
}
/*
export class loadL2D{
  constructor( iOptions ){
    super();
    options = Object.assign({
      defaultOptions,
      iOptions
    });
    if(( this.position != 'left' ) && ( this.position != 'right' )){
      console.error('L2D: Invalid position setting');
    }
  }
}

window.loadL2D = loadL2D; // expose the entry function
*/

import './cLive2DApp.js';
window.loadlive2d = loadlive2d;
