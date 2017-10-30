
[![npm version](https://badge.fury.io/js/hexo-helper-live2d.svg)](https://badge.fury.io/js/hexo-helper-live2d)

# hexo-helper-live2d

> Updated to Version 2.0!

[简体中文文档](./readme.zh-CN.md)

<br>

Add the Sseexxyyy live2d to your hexo!

Demo: [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)


## Installation

Install module:

```
npm install -save hexo-helper-live2d
```

> Tips: If you run into a npm problem, try to use `npm cache verify` or `npm cache clean` to fix it.

And then add the next line to your hexo theme.

Usually added before `</body>` in `layout/layout.ejs` or `layout/_layout.swig`.

ejs:
``` ejs
<%- live2d() %>
```

swig (like "next" theme):
``` swig
{{ live2d() }}
```


## Config

Two Methods

#### Method 1

Add configuration in hexo's `_config.yml` file.

``` yml
live2d:
  model: nipsilon
```

#### Method 2

Add configuration in hexo theme's `_config.yml` file.

``` yml
live2d:
  model: nipsilon
```

> Notes: Option 2 has higher priority, it will overwrite Option 1.


## Settings

``` yml
# Live2D
## https://github.com/EYHN/hexo-helper-live2d
live2d:
  model: z16 # The model that you are willing to show. default: z16
  width: 150 # The width of your model. default: 150
  height: 300 # The height of your model. default: 300
  mobileShow: true # Whether to show on mobile devices. default: true
  mobileWidth: 75 # The width of your model on mobile devices. default: 150
  mobileHeight: 150 # The height of your model on mobile devices. default: 75
  position: right # Which side the model is shown at. default: right
  horizontalOffset: 0 # The horizontal offset. default: 0
  bottomOffset: -20 # The offset of the bottom. default: -20
  className: live2d # The class name of the element. default: live2d
  id: live2dcanvas # The ID of the live2d element. default: live2dcanvas
```

> To use settings in Chinese, please have a look at Chinese document.

- `model`: The model that you are willing to show. default: z16
	- Gantzert_Felixander
	- Epsilon2.1
	- haru
	- miku
	- ni-j
	- nico
	- nito
	- nipsilon
	- nietzsche
	- shizuku
	- tsumiki
	- wanko
	- z16
	- hibiki
	- koharu
	- haruto
	- Unitychan
	- tororo
	- hijiki

Attention! **The path of the model's json must be `node_modules/hexo-helper-live2d/assets/{name}/{name}.model.json`**

- `width`: The width of your model. default: 150
- `height`: The height of your model. default: 300
- `mobileShow`: Whether to show on mobile devices. default: true
- `mobileWidth`: The width of your model on mobile devices. default: 150
- `mobileHeight`: The height of your model on mobile devices. default: 75
- `horizontalOffset`: The horizontal offset. default: 0
- `bottomOffset`: The offset of the bottom. default: -20
- `position`:  `left` or `right` side the model is shown at. default: right
- `className`: The class name of the `<canvas>` element. default: live2d
- `id`: The ID of the `<canvas>` element. default: live2dcanvas
	Change this variable to adjust the position of model.


## Custom model

Have a look at[(#22)](https://github.com/EYHN/hexo-helper-live2d/issues/22).

<br>

Enjoy!:beer:

> This is my first hexo plugin, star :star: and watch :eyeglasses:, pull request is also welcomed.

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Screenshots

#### Epsilon2.1
![](https://huaji8.top/img/live2d/Epsilon2.1.gif)

#### Gantzert_Felixander
![](https://huaji8.top/img/live2d/Gantzert_Felixander.gif)

#### haru
![](https://huaji8.top/img/live2d/haru.gif)

#### miku
![](https://huaji8.top/img/live2d/miku.gif)

#### ni-j
![](https://huaji8.top/img/live2d/ni-j.gif)

#### nico
![](https://huaji8.top/img/live2d/nico.gif)

#### nietzche
![](https://huaji8.top/img/live2d/nietzche.gif)

#### nipsilon
![](https://huaji8.top/img/live2d/nipsilon.gif)

#### nito
![](https://huaji8.top/img/live2d/nito.gif)

#### shizuku
![](https://huaji8.top/img/live2d/shizuku.gif)

#### tsumiki
![](https://huaji8.top/img/live2d/tsumiki.gif)

#### wanko
![](https://huaji8.top/img/live2d/wanko.gif)

#### z16
![](https://huaji8.top/img/live2d/z16.gif)

#### hibiki
![](https://huaji8.top/img/live2d/hibiki.gif)

#### koharu
![](https://huaji8.top/img/live2d/koharu.gif)

#### haruto
![](https://huaji8.top/img/live2d/haruto.gif)

#### Unitychan
![](https://huaji8.top/img/live2d/Unitychan.gif)

#### tororo
![](https://huaji8.top/img/live2d/tororo.gif)

#### hijiki
![](https://huaji8.top/img/live2d/hijiki.gif)


## Todo

> May have some delay, because I mostly edit Chinese document's Todo first.

- Add module "Everyday Tips"(#16)

## About me

[![Author](https://img.shields.io/badge/author-cneyhn-green.svg?style=flat-square)](https://delusion.coding.me/)
[![QQ](https://img.shields.io/badge/QQ-1106996185-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)
[![Email](https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg?style=flat-square)]()


## License

[![license](https://img.shields.io/github/license/EYHN/hexo-helper-live2d.svg?style=flat-square)](https://raw.githubusercontent.com/EYHN/hexo-helper-live2d/master/LICENSE)


## Included

[device.js](https://github.com/matthewhudson/device.js)

<br>

Open sourced under the GPL v2.0 license.
