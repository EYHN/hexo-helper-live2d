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



# hexo-helper-live2d

# Important! 3.0 is under developement, informations below CANNOT WORK PROPERLY. Please visit https://www.npmjs.com/package/hexo-helper-live2d for USEABLE VERSION.

[简体中文文档](./readme.zh-CN.md)

<br>

Add the Sseexxyyy live2d to your hexo!

New web Demo and code generator: [https://eyhn.in/hexo-helper-live2d/](https://eyhn.in/hexo-helper-live2d/)

Author's Demo: [https://huaji8.top/post/live2d-plugin-2.0/](https://huaji8.top/post/live2d-plugin-2.0/)


## Installation

### Hexo

Install module:

```
npm install --save hexo-helper-live2d
```

<details><summary>Come across npm problem ?</summary><br>

> Try to use `npm cache verify` or `npm cache clean` to fix it.

</details>

<details><summary>Used legacy version before ?</summary><br>

Please delete `{{ live2d() }}` or `<%- live2d() %>` before `</body>` in `layout/layout.ejs` or `layout/_layout.swig`.

</details>

### Webpack

<details><summary>Only when you want to do some further developement or advanced useage.</summary><br>

Install module:

```
npm install --save hexo-helper-live2d
```

Import module:

```
import loadlive2d from 'hexo-helper-live2d';

// TBD.
```

</details>


## Config

Add configuration in hexo's `_config.yml` file.

An Example:

``` yml
live2d:
  model: nipsilon
```


## Settings

``` yml
# Live2D
## https://github.com/EYHN/hexo-helper-live2d
live2d:
  model: z16 # The model that you are willing to show. default: z16
  width: 150 # The width of your model. default: 150
  height: 300 # The height of your model. default: 300
  scaling: 1 # The scaling of the resolution. default: 2
  opacityDefault: 0.7 # The default opacity. default: 0.7
  opacityHover: 1 # The opacity when hover. default: 1
  mobileShow: true # Whether to show on mobile devices. default: true
  mobileScaling: 0.5 # The scaling on mobile. default: 0.5
  position: right # Which side the model is shown at. default: right
  horizontalOffset: 0 # The horizontal offset. default: 0
  verticalOffset: -20 # The offset of the bottom. default: -20
  id: live2dcanvas # The ID of the live2d element. default: live2dcanvas
  deviceJsSource: local # The source of the current-device script. default: local
```

> To use settings in Chinese, please have a look at [Chinese document](./readme.zh-CN.md).

|OPTION|default value|Optional value|description|
|:-----|:-----------:|:------------:|:----------|
|model|`z16`|*limited string* See below|The model that you are willing to show.|
|width|`150`|*real*|The width of your model.|
|height|`300`|*real*|The height of your model.|
|scaling|`2`|*real 1 = 100%*|The scaling of the resolution. The greater the value is setted, less mosaic it will be. **Now have bug, see #32, not until the bug is solved, please set this value to 1.**|
|opacityDefault|`0.7`|*real 0 - 1*|The default opacity. *(Beta)*|
|opacityHover|`1`|*real 0 - 1*|The opacity when hover. *(Beta)*|
|mobileShow|`true`|*`true` / `false`*|Whether to show on mobile devices.|
|mobileScaling|`0.5`|*real 1 = 100%*|The scaling on mobile.|
|position|`right`|*`left` / `right`*|`left` or `right` side the model is shown at.|
|horizontalOffset|`0`|*real*|The horizontal offset. <br>Change this variable to adjust the position of model.|
|verticalOffset|`-20`|*real*|The offset of the bottom. <br>Change this variable to adjust the position of model.|
|id|`live2dcanvas`|*string*|The ID of the `<canvas>` element.|
|deviceJsSource|`local`|*`local` / `official` / `string`*|The source of the current-device script.<br>We have three options to choose:<br>`local`: **Default, highly recommended.** Use the local version of script. Compressed using webpack.<br>`official`: Use the official link. [https://unpkg.com/current-device/umd/current-device.min.js](https://unpkg.com/current-device/umd/current-device.min.js)<br>`(your CDN url path)`: put your own CDN path here, must contain `.js`.|

<details><summary>Current supported models:</summary><br>

  - `chitose`
  - `Epsilon2.1`
  - `Gantzert_Felixander`
  - `haru01`
  - `haru02`
  - `haruto`
  - `hibiki`
  - `hijiki`
  - `izumi`
  - `koharu`
  - `miku`
  - `nico`
  - `ni-j`
  - `nipsilon`
  - `nito`
  - `shizuku`
  - `tororo`
  - `tsumiki`
  - `Unitychan`
  - `wanko`
  - `z16`

</details>

## Custom model

1. Create a `live2d_models` folder at your blog's root directory.

2. Create a folder by the name of your model.

3. Copy your model to this folder.

**Attention! The path of the model's json must be  `/live2d_models/{name}/{name}.model.json`**

<details><summary>An Example:</summary><br>

Your model is named `mymiku`.

Then, create a folder at  `/` (Which should exists `_config.yml` 、`sources` 、 `themes` ) named `mymiku`.

Copy your model to `/live2d_models/mymiku/`.

Up to now, there should be `mymiku.model.json` in the directory of `/live2d_models/mymiku/`.

</details>

<br>~The problem was once releated to [(#22)](https://github.com/EYHN/hexo-helper-live2d/issues/22).~

<br>

Enjoy!:beer:

> This is my first hexo plugin, star :star: and watch :eyeglasses:, pull request is also welcomed.

Github: [https://github.com/EYHN/hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

issues: [https://github.com/EYHN/hexo-helper-live2d/issues](https://github.com/EYHN/hexo-helper-live2d/issues)


## Screenshots

**Attention! The name above the shown screenshoot may not be the true name of the model. Please go to the "Settings" to find the true value of "model"**

<details><summary>Epsilon2.1</summary><br>

![](https://huaji8.top/img/live2d/Epsilon2.1.gif)

</details>
<details><summary>Gantzert_Felixander</summary><br>

![](https://huaji8.top/img/live2d/Gantzert_Felixander.gif)

</details>
<details><summary>haru</summary><br>

![](https://huaji8.top/img/live2d/haru.gif)

</details>
<details><summary>miku</summary><br>

![](https://huaji8.top/img/live2d/miku.gif)

</details>
<details><summary>ni-j</summary><br>

![](https://huaji8.top/img/live2d/ni-j.gif)

</details>
<details><summary>nico</summary><br>

![](https://huaji8.top/img/live2d/nico.gif)

</details>
<details><summary>nietzche</summary><br>

![](https://huaji8.top/img/live2d/nietzche.gif)

</details>
<details><summary>nipsilon</summary><br>

![](https://huaji8.top/img/live2d/nipsilon.gif)

</details>
<details><summary>nito</summary><br>

![](https://huaji8.top/img/live2d/nito.gif)

</details>
<details><summary>shizuku</summary><br>

![](https://huaji8.top/img/live2d/shizuku.gif)

</details>
<details><summary>tsumiki</summary><br>

![](https://huaji8.top/img/live2d/tsumiki.gif)

</details>
<details><summary>wanko</summary><br>

![](https://huaji8.top/img/live2d/wanko.gif)

</details>
<details><summary>z16</summary><br>

![](https://huaji8.top/img/live2d/z16.gif)

</details>
<details><summary>hibiki</summary><br>

![](https://huaji8.top/img/live2d/hibiki.gif)

</details>
<details><summary>koharu</summary><br>

![](https://huaji8.top/img/live2d/koharu.gif)

</details>
<details><summary>haruto</summary><br>

![](https://huaji8.top/img/live2d/haruto.gif)

</details>
<details><summary>Unitychan</summary><br>

![](https://huaji8.top/img/live2d/Unitychan.gif)

</details>
<details><summary>tororo</summary><br>

![](https://huaji8.top/img/live2d/tororo.gif)

</details>
<details><summary>hijiki</summary><br>

![](https://huaji8.top/img/live2d/hijiki.gif)

</details>

## Contribute

**Please pay enough attention to this document if you want to commit your changes or submit issues.**

[CONTRIBUTING](./CONTRIBUTING.md)

## Releated projects

- [Cubism SDK WebGL 2.1](http://sites.cybernoids.jp/cubism-sdk2_e/webgl2-1)

- [pixi-live2d](https://github.com/avgjs/pixi-live2d)

- [CubismJsComponents](https://github.com/Live2D/CubismJsComponents)


## About me

[![Author][author]][author-url]

[![QQ][qq]][qq-url]

[![Email][email]][email-url]


## Imported

[![current-device][current-device]][current-device-url]

<br>

Open sourced under the GPL v2.0 license.

[npm]: https://badge.fury.io/js/hexo-helper-live2d.svg?label=hexo-helper-live2d
[npm-url]: https://www.npmjs.com/package/hexo-helper-live2d

[deps]: https://img.shields.io/david/EYHN/hexo-helper-live2d.svg
[deps-url]: javascript:void(0);

[devdeps]:  https://img.shields.io/david/dev/EYHN/hexo-helper-live2d.svg
[devdeps-url]: javascript:void(0);

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

[author]: https://img.shields.io/badge/author-cneyhn-green.svg
[author-url]: https://delusion.coding.me/

[qq]: https://img.shields.io/badge/QQ-1106996185-blue.svg
[qq-url]: http://wpa.qq.com/msgrd?v=3&uin=&site=qq&menu=yes

[email]: https://img.shields.io/badge/Emali%20me-cneyhn@gmail.com-green.svg
[email-url]: mailto:cneyhn@gmail.com

[current-device]: https://img.shields.io/npm/v/current-device.svg?label=current-device
[current-device-url]: https://github.com/matthewhudson/current-device
