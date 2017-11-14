
<div align="center">

[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![devdeps][devdeps]][devdeps-url]
[![downloads][downloads]][downloads-url]
[![downloads-month][downloads-month]][downloads-month-url]
[![GitHub stars][GitHub stars]][GitHub stars-url]
[![GitHub forks][GitHub forks]][GitHub forks-url]
[![GitHub issues][GitHub issues]][GitHub issues-url]
[![Commitizen friendly][Commitizen friendly]][Commitizen friendly-url]
[![PRs Welcome][PRs Welcome]][PRs Welcome-url]
[![license][license]][license-url]

</div>


# hexo-helper-live2d

> Updated to Version 2.0!

[简体中文文档](./readme.zh-CN.md)

<br>

Add the Sseexxyyy live2d to your hexo!

Demo: [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)


## Installation

Install module:

```
npm install --save hexo-helper-live2d
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
  scaling: 1 # The scaling of the resolution. default: 2
  opacityDefault: 1 # The default opacity. default: 1
  #opacityHover: 1 # The opacity when hover. default: 1
  mobileShow: true # Whether to show on mobile devices. default: true
  mobileScaling: 0.5 # The scaling on mobile. default: 0.5
  position: right # Which side the model is shown at. default: right
  horizontalOffset: 0 # The horizontal offset. default: 0
  verticalOffset: -20 # The offset of the bottom. default: -20
  className: live2d # The class name of the element. default: live2d
  id: live2dcanvas # The ID of the live2d element. default: live2dcanvas
```

> To use settings in Chinese, please have a look at Chinese document.

- `model`: The model that you are willing to show. default: z16
  - Epsilon2.1
  - Gantzert_Felixander
  - haru01
  - haru02
  - haruto
  - hibiki
  - hijiki
  - koharu
  - miku
  - nico
  - ni-j
  - nipsilon
  - nito
  - shizuku
  - tororo
  - tsumiki
  - Unitychan
  - wanko
  - z16

- `width`: The width of your model.  *( real ) default: 150*
- `height`: The height of your model.  *( real ) default: 300*
- `scaling`: The scaling of the resolution. The greater the value is setted, less mosaic it will be. **Now have bug, see #32, not until the bug is solved, please set this value to 1.**  *( 1 = 100% ) default: 2*
- `opacityDefault`: The default opacity. *(Beta)*  *( 0 - 1 ) default: 1*
~- `opacityHover`: The opacity when hover. *(Beta)*  *( 0 - 1 ) default: 1*~ Not work now.
- `mobileShow`: Whether to show on mobile devices.  *( true / false ) default: true*
- `mobileScaling`: The scaling on mobile. default:  *( 1 = 100% ) 0.5*
- `position`:  `left` or `right` side the model is shown at.  *( left / right ) default: right*
- `horizontalOffset`: The horizontal offset. Change this variable to adjust the position of model.  *( real ) default: 0*
- `verticalOffset`: The offset of the bottom. Change this variable to adjust the position of model.  *( real ) default: -20*
- `className`: The class name of the `<canvas>` element.  *( string ) default: live2d*
- `id`: The ID of the `<canvas>` element.  *( string ) default: live2dcanvas*


## Custom model

1. Create a `live2d_models` folder at your blog's root directory.

2. Create a folder by the name of your model.

3. Copy your model to this folder.

**Attention! The path of the model's json must be  `/live2d_models/{name}/{name}.model.json`**

For example:

Your model is named `mymiku`.

Then, create a folder at  `/` (Which should exists `_config.yml` 、`sources` 、 `themes` ) named `mymiku`.

Copy your model to `/live2d_models/mymiku/`.

Up to now, there should be `mymiku.model.json` in the directory of `/live2d_models/mymiku/`.


Have a look at[(#22)](https://github.com/EYHN/hexo-helper-live2d/issues/22).

<br>

Enjoy!:beer:

> This is my first hexo plugin, star :star: and watch :eyeglasses:, pull request is also welcomed.

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Screenshots

**Attention! The name above the shown screenshoot may not be the true name of the model. Please go to the "Settings" to find the true value of "model"**

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


## Contribute

[CONTRIBUTING](./CONTRIBUTING.md)


## About me

[![Author](https://img.shields.io/badge/author-cneyhn-green.svg?style=flat-square)](https://delusion.coding.me/)

[![QQ](https://img.shields.io/badge/QQ-1106996185-blue.svg?style=flat-square)](http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes)

[![Email](https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg?style=flat-square)]()


## Included

[device.js](https://github.com/matthewhudson/device.js)

<br>

Open sourced under the GPL v2.0 license.

[npm]: https://badge.fury.io/js/hexo-helper-live2d.svg
[npm-url]: https://www.npmjs.com/package/hexo-helper-live2d

[deps]: https://img.shields.io/david/EYHN/hexo-helper-live2d.svg
[deps-url]: #

[devdeps]:  https://img.shields.io/david/dev/EYHN/hexo-helper-live2d.svg
[devdeps-url]: #

[license]: https://img.shields.io/github/license/EYHN/hexo-helper-live2d.svg
[license-url]: https://github.com/EYHN/hexo-helper-live2d/blob/master/LICENSE

[PRs Welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[PRs Welcome-url]: http://makeapullrequest.com

[downloads]:  https://img.shields.io/npm/dt/hexo-helper-live2d.svg
[downloads-url]: https://www.npmjs.com/package/hexo-helper-live2d

[downloads-month]: https://img.shields.io/npm/dm/hexo-helper-live2d.svg
[downloads-month-url]: https://www.npmjs.com/package/hexo-helper-live2d

[Commitizen friendly]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[Commitizen friendly-url]: http://commitizen.github.io/cz-cli/

[GitHub stars]: https://img.shields.io/github/stars/EYHN/hexo-helper-live2d.svg
[GitHub stars-url]: https://github.com/EYHN/hexo-helper-live2d/stargazers

[GitHub forks]: https://img.shields.io/github/forks/EYHN/hexo-helper-live2d.svg
[GitHub forks-url]: https://github.com/EYHN/hexo-helper-live2d/network

[GitHub issues]: https://img.shields.io/github/issues/EYHN/hexo-helper-live2d.svg
[GitHub issues-url]: https://github.com/EYHN/hexo-helper-live2d/issues
