/**
 * @description The script to add script to pages.
 * borrowed from https://github.com/Troy-Yang/hexo-lazyload-image/blob/master/lib/addscripts.js
 */


'use strict'

const fs = require('hexo-fs');
const UglifyJS = require('uglify-js');
const jsPath = require.resolve('live2d-widget/lib/manifest');

/**
 * Add script to HTML
 * @param {String} htmlContent HTML content
 */

module.exports.addScript = function(htmlContent){

    let injectExtraScript = function () {

        if (!fs.exists(lazyLoadPath)) throw new TypeError(lazyLoadPath + ' not found!');

        let lazyLoadSourceCode = fs.readFileSync(lazyLoadPath, { escape: true });

        return '<script>' + UglifyJS.minify(lazyLoadSourceCode).code + '</script>';

    };

    if (/<\/body>/gi.test(htmlContent)) {

        let lastIndex = htmlContent.lastIndexOf('</body>');

        htmlContent = htmlContent.substring(0, lastIndex) + injectExtraScript() + htmlContent.substring(lastIndex, htmlContent.length);

    }

    return htmlContent;

};
