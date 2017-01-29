
[![npm version](https://badge.fury.io/js/hexo-helper-live2d.svg)](https://badge.fury.io/js/hexo-helper-live2d)

## hexo-helper-live2d

为你的hexo添加色气满满的live2d吧！

```
npm install -save hexo-helper-live2d
```

Example: [https://delusion.coding.me/](https://delusion.coding.me/)

![范例图片](https://delusion.coding.me/img/hexo%E7%9A%84live2d%E6%8F%92%E4%BB%B6/z16.png "z16")

## 食用方法：

```
npm install -save hexo-helper-live2d
```

将下面的代码加入主题。

```
<canvas id="live2dcanvas" width="300" height="600" class="live2d"></canvas>
<%- live2d("live2dcanvas") %>
<style>
.live2d{
    position: fixed;
	bottom: -30px;
	right: 0px;
	z-index: 999;
	width: 150px;
	height: 300px;
  pointer-events: none;
}
</style>
```

Enjoy!

暂时还不能添加其他模型，不过很快就会更新，所以请点个watch实时追踪更新吧！


> 我第一个hexo插件,点个star,点个watch吧。

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)

求英文好的小伙伴提交一个英文版的README，直接提交PR就可以啦!

## About me

[![Author](https://img.shields.io/badge/author-cneyhn-green.svg?style=flat-square)](https://delusion.coding.me/)
[![QQ](https://img.shields.io/badge/QQ-1106996185-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)
[![Email](https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg?style=flat-square)]()

## License 许可证

[![license](https://img.shields.io/github/license/EYHN/hexo-helper-live2d.svg?style=flat-square)](https://raw.githubusercontent.com/EYHN/hexo-helper-live2d/master/LICENSE)

Open sourced under the GPL v2.0 license.

根据 GPL V2.0 许可证开源。
