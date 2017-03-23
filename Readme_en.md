
[![npm version](https://badge.fury.io/js/hexo-helper-live2d.svg)](https://badge.fury.io/js/hexo-helper-live2d)

## hexo-helper-live2d

add a sexy live2d to your hexo!

```
npm install -save hexo-helper-live2d
```

~~Example: [https://delusion.coding.me/](https://delusion.coding.me/)~~ (The example doesn't work anymore)

![范例图片](https://delusion.coding.me/img/hexo%E7%9A%84live2d%E6%8F%92%E4%BB%B6/z16.png "z16")

## How to ：

```
npm install -save hexo-helper-live2d
```

Add the following codes to your theme:

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

You can't chose other models now, but i'll update soon. You may click the `watch` to get news on time.


> My first plugin for hexo! Click `star` and `watch` to encourage me!

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)

## About me

[![Author](https://img.shields.io/badge/author-cneyhn-green.svg?style=flat-square)](https://delusion.coding.me/)
[![QQ](https://img.shields.io/badge/QQ-1106996185-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)
[![Email](https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg?style=flat-square)]()

## License

[![license](https://img.shields.io/github/license/EYHN/hexo-helper-live2d.svg?style=flat-square)](https://raw.githubusercontent.com/EYHN/hexo-helper-live2d/master/LICENSE)

Open sourced under the GPL v2.0 license.

According to GPL V2.0 license open source.
